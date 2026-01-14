import React, { useState } from 'react';
import img1_1 from '../media/img1-1.png';
import img1_2 from '../media/img1-2.png';

const Project1Page = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const [imageAlt, setImageAlt] = useState('');

  const openModal = (imageSrc, alt) => {
    setCurrentImage(imageSrc);
    setImageAlt(alt);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setCurrentImage(null);
    setImageAlt('');
  };
  return (
    <div style={{
      minHeight: '100vh',
      background: 'radial-gradient(circle, #0a0a0a 0%, #000000 100%)',
      color: '#00ff00',
      fontFamily: "'Courier New', monospace",
      padding: '40px 20px',
      boxSizing: 'border-box',
      width: '100%',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Grid background */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `
          linear-gradient(rgba(0, 255, 0, 0.05) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0, 255, 0, 0.05) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px',
        zIndex: 0
      }}></div>

      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 2
      }}>
        <h1 style={{
          fontSize: '2.5rem',
          marginBottom: '20px',
          fontWeight: 'bold',
          color: '#00ff00',
          textShadow: '0 0 10px rgba(0, 255, 0, 0.7)',
          letterSpacing: '2px',
          textAlign: 'center'
        }}>
          RAG AI APPLICATION FOR PENN NATIONAL INSURANCE
        </h1>

        <p style={{
          fontSize: '1.2rem',
          marginBottom: '40px',
          textAlign: 'center',
          color: '#00cc00',
          maxWidth: '800px',
          margin: '0 auto 40px'
        }}>
          AI solution for processing and understanding large amounts of documentation.
        </p>

        <section style={{
          marginBottom: '40px',
          backgroundColor: 'rgba(0, 15, 0, 0.7)',
          padding: '30px',
          border: '1px solid rgba(0, 255, 0, 0.3)',
          boxShadow: '0 0 15px rgba(0, 255, 0, 0.2)'
        }}>
          <h2 style={{
            fontSize: '1.8rem',
            marginBottom: '20px',
            color: '#00ff00',
            borderBottom: '1px solid #00aa00',
            paddingBottom: '10px'
          }}>
            OVERVIEW
          </h2>
          <p style={{
            fontSize: '1.1rem',
            lineHeight: '1.7',
            color: '#00cc00',
            marginBottom: '15px'
          }}>
            This site is a demo sent to Penn National Insurance after some of their staff noted that reading through their documentation was consuming more time than they could spare. I made this to show how I could help their company as a contract software engineer. Negotiation is currently under way.
          </p>
          <p style={{
            fontSize: '1.1rem',
            lineHeight: '1.7',
            color: '#00cc00'
          }}>
            Check it out: <a 
              href="http://penn-demo.team-stingray.com" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{
                color: '#00ff00',
                textDecoration: 'underline'
              }}
            >
              penn-demo.team-stingray.com
            </a>
          </p>
        </section>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '30px',
          marginBottom: '40px'
        }}>
          <section style={{
            backgroundColor: 'rgba(0, 15, 0, 0.7)',
            padding: '30px',
            border: '1px solid rgba(0, 255, 0, 0.3)',
            boxShadow: '0 0 15px rgba(0, 255, 0, 0.2)'
          }}>
            <h2 style={{
              fontSize: '1.8rem',
              marginBottom: '20px',
              color: '#00ff00',
              borderBottom: '1px solid #00aa00',
              paddingBottom: '10px'
            }}>
              TECHNOLOGY USED
            </h2>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              color: '#00cc00'
            }}>
              <li style={{ marginBottom: '10px' }}>• React.js</li>
              <li style={{ marginBottom: '10px' }}>• Python</li>
              <li style={{ marginBottom: '10px' }}>• FastAPI</li>
              <li style={{ marginBottom: '10px' }}>• OpenAI API</li>
              <li style={{ marginBottom: '10px' }}>• Vector Databases</li>
              <li style={{ marginBottom: '10px' }}>• Docker</li>
              <li>• Cloud Infrastructure</li>
            </ul>
          </section>

          <section style={{
            backgroundColor: 'rgba(0, 15, 0, 0.7)',
            padding: '30px',
            border: '1px solid rgba(0, 255, 0, 0.3)',
            boxShadow: '0 0 15px rgba(0, 255, 0, 0.2)'
          }}>
            <h2 style={{
              fontSize: '1.8rem',
              marginBottom: '20px',
              color: '#00ff00',
              borderBottom: '1px solid #00aa00',
              paddingBottom: '10px'
            }}>
              FEATURES
            </h2>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              color: '#00cc00'
            }}>
              <li style={{ marginBottom: '10px' }}>• Document Upload & Processing</li>
              <li style={{ marginBottom: '10px' }}>• Natural Language Querying</li>
              <li style={{ marginBottom: '10px' }}>• Context-Aware Responses</li>
              <li style={{ marginBottom: '10px' }}>• Interactive Chat Interface</li>
              <li style={{ marginBottom: '10px' }}>• Secure Data Handling</li>
              <li>• Performance Monitoring</li>
            </ul>
          </section>
        </div>

        <section style={{
          marginBottom: '40px',
          backgroundColor: 'rgba(0, 15, 0, 0.7)',
          padding: '30px',
          border: '1px solid rgba(0, 255, 0, 0.3)',
          boxShadow: '0 0 15px rgba(0, 255, 0, 0.2)'
        }}>
          <h2 style={{
            fontSize: '1.8rem',
            marginBottom: '20px',
            color: '#00ff00',
            borderBottom: '1px solid #00aa00',
            paddingBottom: '10px'
          }}>
            SCREENSHOTS
          </h2>
          <div style={{
            display: 'flex',
            justifyContent: 'space-around',
            flexWrap: 'wrap',
            gap: '20px'
          }}>
            <div style={{
              flex: '1',
              minWidth: '300px',
              textAlign: 'center'
            }}>
              <img
                src={img1_2}
                alt="Application Interface"
                style={{
                  width: '100%',
                  maxHeight: '200px',
                  objectFit: 'contain',
                  border: '1px solid rgba(0, 255, 0, 0.3)',
                  marginBottom: '10px',
                  cursor: 'pointer'
                }}
                onClick={() => openModal(img1_1, "Application Interface")}
              />
              <p style={{ color: '#00cc00' }}>Application Interface</p>
            </div>
            <div style={{
              flex: '1',
              minWidth: '300px',
              textAlign: 'center'
            }}>
              <img
                src={img1_1}
                alt="Query Results"
                style={{
                  width: '100%',
                  maxHeight: '200px',
                  objectFit: 'contain',
                  border: '1px solid rgba(0, 255, 0, 0.3)',
                  marginBottom: '10px',
                  cursor: 'pointer'
                }}
                onClick={() => openModal(img1_2, "Query Results")}
              />
              <p style={{ color: '#00cc00' }}>Query Results</p>
            </div>
          </div>
        </section>

        <section style={{
          backgroundColor: 'rgba(0, 15, 0, 0.7)',
          padding: '30px',
          border: '1px solid rgba(0, 255, 0, 0.3)',
          boxShadow: '0 0 15px rgba(0, 255, 0, 0.2)'
        }}>
          <h2 style={{
            fontSize: '1.8rem',
            marginBottom: '20px',
            color: '#00ff00',
            borderBottom: '1px solid #00aa00',
            paddingBottom: '10px'
          }}>
            OUTCOME
          </h2>
          <p style={{
            fontSize: '1.1rem',
            lineHeight: '1.7',
            color: '#00cc00'
          }}>
            This application served as a successful demo to show how I could help Penn National solve real problems.
          </p>
        </section>

        {/* Modal for displaying enlarged images */}
        {modalOpen && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              backgroundColor: 'rgba(0, 0, 0, 0.9)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 1000,
              cursor: 'pointer'
            }}
            onClick={closeModal}
          >
            <div style={{
              position: 'relative',
              maxWidth: '90%',
              maxHeight: '90%'
            }}>
              <img
                src={currentImage}
                alt={imageAlt}
                style={{
                  maxWidth: '100%',
                  maxHeight: '90vh',
                  objectFit: 'contain'
                }}
              />
              <p style={{
                color: '#00ff00',
                textAlign: 'center',
                marginTop: '10px',
                fontFamily: "'Courier New', monospace"
              }}>
                {imageAlt}
              </p>
            </div>
            <span
              style={{
                position: 'absolute',
                top: '20px',
                right: '30px',
                fontSize: '50px',
                fontWeight: 'bold',
                color: '#00ff00',
                cursor: 'pointer'
              }}
              onClick={(e) => {
                e.stopPropagation();
                closeModal();
              }}
            >
              &times;
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Project1Page;
