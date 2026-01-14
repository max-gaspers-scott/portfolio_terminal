use axum::http::Method;
use axum::http::StatusCode;
use axum::{Json, Router, extract::Path, routing::{get, post}};
use minio_rsc::{Minio, client::PresignedArgs, provider::StaticProvider};
use serde_json::{Value, json};
use sqlx::postgres::PgPoolOptions;
use std::env;
use std::process::Command;
use std::result::Result;
use tower_http::cors::{AllowOrigin, CorsLayer};

use axum::response::{Html, IntoResponse};
use tower::service_fn;
use tower_http::services::ServeDir;

use socketioxide::{
    SocketIo,
    extract::{Data, SocketRef},
};
use tracing::info;

async fn python() -> Result<Json<Value>, (StatusCode, String)> {
    // Call the Python FastAPI service
    let client = reqwest::Client::new();
    let res = client
        .get("http://python:8003/api/chat") // Use service name and correct port
        .send()
        .await
        .map_err(|e| {
            (
                StatusCode::INTERNAL_SERVER_ERROR,
                format!("Request failed: {}", e),
            )
        })?;

    if res.status().is_client_error() || res.status().is_server_error() {
        return Err((
            StatusCode::BAD_REQUEST,
            format!("Error from Python service: {}", res.status()),
        ));
    }

    let json_response: Value = res.json().await.map_err(|e| {
        (
            StatusCode::INTERNAL_SERVER_ERROR,
            format!("Failed to parse JSON: {}", e),
        )
    })?;

    Ok(Json(json!({"payload": json_response})))
}

// Handler for chat endpoint that forwards to FastAPI
async fn chat_endpoint(Json(payload): Json<Value>) -> Result<Json<Value>, (StatusCode, String)> {
    let client = reqwest::Client::new();
    let res = client
        .post("http://python:8003/api/chat") // Use service name and correct port
        .json(&payload) // Forward the JSON payload
        .send()
        .await
        .map_err(|e| {
            (
                StatusCode::INTERNAL_SERVER_ERROR,
                format!("Request failed: {}", e),
            )
        })?;

    if res.status().is_client_error() || res.status().is_server_error() {
        return Err((
            StatusCode::BAD_REQUEST,
            format!("Error from Python service: {}", res.status()),
        ));
    }

    let json_response: Value = res.json().await.map_err(|e| {
        (
            StatusCode::INTERNAL_SERVER_ERROR,
            format!("Failed to parse JSON: {}", e),
        )
    })?;

    Ok(Json(json_response))
}

async fn health() -> String {
    "healthy".to_string()
}

async fn websocket_handler(socket: SocketRef) {
    info!(ns = ?socket.ns(), "WebSocket connected");

    socket.on(
        "terminal_input",
        |socket: SocketRef, data: Data<String>| async move {
            info!(input = data.as_str(), "Received terminal input");

            match Command::new(data.as_str()).output() {
                Ok(output) => {
                    // Convert the command output to a string
                    let output_str = String::from_utf8_lossy(&output.stdout);
                    let _ = socket.emit("terminal_output", output_str.as_ref());

                    // Also send stderr if there's an error status
                    if !output.status.success() {
                        let error_str = String::from_utf8_lossy(&output.stderr);
                        if !error_str.is_empty() {
                            let _ = socket.emit("terminal_output", format!("Error: {}", error_str));
                        }
                    }
                }
                Err(e) => {
                    let _ =
                        socket.emit("terminal_output", format!("Command execution error: {}", e));
                }
            }
        },
    );
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    tracing_subscriber::fmt::init();

    let db_url = env::var("DATABASE_URL")
        .unwrap_or_else(|_| "postgres://dbuser:p@localhost:1111/data".to_string());
    let pool = PgPoolOptions::new()
        .max_connections(100)
        .connect(&db_url)
        .await?;

    let migrate = sqlx::migrate!("./migrations").run(&pool).await;

    match migrate {
        Ok(_) => println!("Migrations applied successfully."),
        Err(e) => eprintln!("Error applying migrations: {}", e),
    };

    let static_service =
        ServeDir::new("frontend/build").not_found_service(service_fn(|_req| async {
            match tokio::fs::read_to_string("frontend/build/index.html").await {
                Ok(body) => Ok((StatusCode::OK, Html(body)).into_response()),
                Err(err) => Ok((
                    StatusCode::INTERNAL_SERVER_ERROR,
                    format!("Failed to read index.html: {}", err),
                )
                    .into_response()),
            }
        }));

    // Initialize Socket.IO
    let (layer, io) = SocketIo::new_layer();

    // Register the namespace handler
    io.ns("/", websocket_handler);

    let app = Router::new()
        .route("/health", get(health))
        .route("/signed-urls/:video_path", get(get_signed_url))
        .route("/python", get(python))
        .route("/api/chat", post(chat_endpoint))  // Add the chat endpoint
        .fallback_service(static_service)
        .layer(
            CorsLayer::new()
                .allow_origin(AllowOrigin::list(vec![
                    "http://localhost:8081".parse().unwrap(),
                    "https://example.com".parse().unwrap(),
                ]))
                .allow_methods([Method::GET, Method::POST])
                .allow_headers(tower_http::cors::Any),
        )
        .layer(layer) // Add the Socket.IO layer
        .with_state(pool);

    let listener = tokio::net::TcpListener::bind("0.0.0.0:8081").await.unwrap();

    axum::serve(listener, app).await.unwrap();
    Ok(())
}

async fn generate_signed_url(object_key: String) -> Result<String, anyhow::Error> {
    let endpoint = env::var("MINIO_ENDPOINT").unwrap_or_else(|_| "localhost:9001".to_string());
    let access_key = env::var("MINIO_ACCESS_KEY").unwrap_or_else(|_| "minioadmin".to_string());
    let secret_key = env::var("MINIO_SECRET_KEY").unwrap_or_else(|_| "minioadmin".to_string());
    let bucket = env::var("MINIO_BUCKET").unwrap_or_else(|_| "bucket".to_string());
    let endpoint = env::var("MINIO_ENDPOINT").unwrap_or_else(|_| "localhost:9000".to_string());
    let secure = env::var("MINIO_SECURE")
        .map(|s| s.to_lowercase() == "true")
        .unwrap_or(false);

    let provider = StaticProvider::new(&access_key, &secret_key, None);

    let minio = Minio::builder()
        .endpoint(&endpoint)
        .provider(provider)
        .secure(secure)
        .region("us-east-1".to_string()) // Explicitly set region to match MinIO default
        .build()
        .map_err(|e| anyhow::anyhow!("Failed to create MinIO client: {}", e))?;

    let presigned_url = minio
        .presigned_get_object(
            PresignedArgs::new(bucket, object_key).expires(3600), // 1 hour in seconds
        )
        .await
        .map_err(|e| anyhow::anyhow!("Failed to generate presigned URL: {}", e))?;
    Ok(presigned_url)
}

async fn get_signed_url(Path(video_path): Path<String>) -> impl IntoResponse {
    let object_key = video_path;
    println!("Environment variables:");
    println!(
        "MINIO_ENDPOINT: {}",
        env::var("MINIO_ENDPOINT").unwrap_or_else(|_| "not set".to_string())
    );
    println!(
        "MINIO_BUCKET: {}",
        env::var("MINIO_BUCKET").unwrap_or_else(|_| "not set, using default 'test'".to_string())
    );

    match generate_signed_url(object_key).await {
        Ok(url) => (StatusCode::OK, url).into_response(),
        Err(e) => {
            eprintln!("Error generating signed URL: {}", e);
            (
                StatusCode::INTERNAL_SERVER_ERROR,
                format!("Failed to generate signed URL: {}", e),
            )
                .into_response()
        }
    }
}
async fn upload_video(// mut multipart: Multipart,
) -> Result<Json<Value>, (StatusCode, String)> {
    let provider = StaticProvider::new("minioadmin", "minioadmin", None);
    let minio = Minio::builder()
        .endpoint("minio:9000")
        .provider(provider)
        .secure(false)
        .build()
        .unwrap();

    let _data = "hello minio";

    let upload_result = minio.put_object("bucket", "file.txt", _data.into()).await;

    return Ok(Json(json!({
        "status": upload_result.is_ok(),
        "message": if upload_result.is_ok() {
            "File uploaded successfully"
        } else {
            "Failed to upload file"
        },
        "file_name": "file.txt"
    })));
}
