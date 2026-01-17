import os
from typing import Dict, Optional
from fastapi import FastAPI, HTTPException, Request
from pydantic import BaseModel
import logging
from langchain.memory import ConversationBufferMemory
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.chains import ConversationChain

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


# System instructions to provide context about Max Gaspers Scott
system_instructions = """Here is the context for answering the following questions. Use only the context given here:

You are an AI assistant that answers questions about Max Gaspers Scott (M.G.S).

Here is his resume:

Maximillian Gaspers Scott
gaspersscottma@gmail.com | (410) 739-7474 | 94110

SUMMARY
Full-stack engineer specializing in backend APIs with expertise in Python and Rust. Experienced in developing applications for startups and utilizing advanced technologies for AI solutions.

SKILLS
Python, Rust, Ray, SQL, Docker, Kubernetes, React, JavaScript, GitHub, LINUX, Plotly, Pytorch, Scikit-learn, LangGraph, MySQL, Firebase

WORK EXPERIENCE
Qubit
Co-founder & Lead Engineer | May 2025 - Sep 2025 | Remote
Spearheaded the technical vision and full-stack development of the initial product MVP from ideation to launch.
Architected and deployed a highly scalable Python-based backend API and managed the infrastructure lifecycle using Docker and cloud services.
Managed product roadmap, set development priorities, and collaborated with co-founders on key strategic business decisions.

Kaedim
Full Stack Software Engineer | Dec 2024 - Mar 2025 | San Francisco, CA
Developed end-to-end features in customer-facing and artist applications using MySQL, React.js, and Node.js.

PathAI
Software Engineer Intern | Jan 2023 - Feb 2023 | Remote
Built performance dashboards for ML models using Plotly and Dash during a micro internship.

Open Farms
Software Engineer Intern | May 2021 - Aug 2021 | Remote
Tested Arduino/esp8266 boards for autonomous farm equipment applications.

PROJECTS
Stingray
CEO | May 2024 - Dec 2024
Implemented Proxmox and basic Kubernetes deployments on bare metal servers for seamless AI application deployment.

Productivity Pangolin
Solo Engineer | Aug 2020 - May 2024
Created a productivity tracking tool using React, Firebase Firestore, and containerized Google Cloud Functions.

wiki-tui
Have made PRs that have been merged into the wiki-tui project that lets users view wikipedia pages from the cli.
link: https://github.com/Builditluc/wiki-tui
Used Rust and ratatui.

Penn National Insurance Assistant
Made an AI RAG application to help users of Penn National Insurance find the information they needed from the penn national website.
Used Langchain, and chroma db to embed and chunk the text scraped from the website.
Responded to user feedback when adding links to the exact page information was pulled from.

EXTRACURRICULARS
Juniata College
Statistical Consultant | Aug 2021 - Dec 2021 | Huntington, PA
Analyzed data using R to identify barriers to mental health resource access in the community.

EDUCATION
Juniata College
BS | Aug 2020 - May 2024 | GPA: 3.6
"""

app = FastAPI()


class ChatRequest(BaseModel):
    message: str
    session_id: Optional[str] = None


@app.get("/health")
async def health_check() -> Dict[str, str]:
    return {"status": "healthy"}


# Store conversation chains per session
conversation_chains = {}


def get_conversation_chain(session_id: str):
    """Get or create a conversation chain for a given session."""
    if session_id not in conversation_chains:
        # Initialize the LLM
        llm = ChatGoogleGenerativeAI(
            model="gemini-3-flash-preview",
            google_api_key=os.getenv("GEMINI_API_KEY"),
            temperature=0.7
        )

        # Initialize memory for the conversation
        memory = ConversationBufferMemory(
            input_key="input",
            memory_key="history",
            return_messages=True  # Return messages as objects instead of strings
        )

        # Create the conversation chain
        conversation_chain = ConversationChain(
            llm=llm,
            memory=memory,
            verbose=True
        )

        # Add the system instructions as the first AI message to establish context
        conversation_chain.memory.chat_memory.add_ai_message(system_instructions)

        conversation_chains[session_id] = conversation_chain

    return conversation_chains[session_id]


@app.post("/api/chat")
async def chat(request: Request, chat_request: ChatRequest):
    try:
        logger.info(f"Received chat request: {chat_request.message}")

        # Use session_id or fallback to client IP
        session_id = chat_request.session_id or request.client.host

        # Get or create the conversation chain for this session
        conversation_chain = get_conversation_chain(session_id)

        # Generate response using the conversation chain
        response = conversation_chain.invoke({"input": chat_request.message})

        # Extract the response text
        response_text = response.get("response", "Sorry, I couldn't generate a response.")

        return {
            "response": response_text.strip(),
            "session_id": session_id,
        }

    except Exception as e:
        logger.error(f"Error in chat endpoint: {str(e)}")
        raise HTTPException(
            status_code=500, detail=f"Error generating response: {str(e)}"
        )


# Keep the original GET endpoint for compatibility
@app.get("/api/chat")
async def chat_get() -> Dict[str, str]:
    return {"res": "working api connection"}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8003)
