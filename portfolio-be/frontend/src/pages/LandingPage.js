import React, { useState, useEffect } from 'react';

const LandingPage = () => {
  const [terminalText, setTerminalText] = useState('');
  const fullText = '> Welcome, USER_MAXGASPERSSCOTT. Initializing connection... Connection established.';

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < fullText.length) {
        setTerminalText(fullText.slice(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 50);

    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'radial-gradient(circle, #0a0a0a 0%, #000000 100%)',
      color: '#00ff00',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      fontFamily: "'Courier New', monospace",
      padding: 0,
      margin: 0,
      width: '100%',
      boxSizing: 'border-box',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Scanline effect */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '10px',
        background: 'rgba(0, 255, 0, 0.1)',
        animation: 'scan 8s linear infinite',
        zIndex: 10
      }}></div>

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

      {/* Glitch effect overlay */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 250 250\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' opacity=\'0.1\'/%3E%3C/svg%3E")',
        zIndex: 1
      }}></div>

      <div style={{
        width: 'calc(100% - 80px)',
        maxWidth: 'none',
        padding: '40px',
        backgroundColor: 'rgba(0, 15, 0, 0.7)',
        borderRadius: '0',
        boxShadow: '0 0 20px rgba(0, 255, 0, 0.3), inset 0 0 10px rgba(0, 255, 0, 0.2)',
        boxSizing: 'border-box',
        border: '1px solid rgba(0, 255, 0, 0.3)',
        zIndex: 2,
        position: 'relative',
        backdropFilter: 'blur(2px)',
        margin: '0 auto'
      }}>
        <div style={{
          marginBottom: '20px',
          fontFamily: "'Courier New', monospace",
          fontSize: '1.2rem',
          color: '#00aa00',
          textAlign: 'left',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          borderRight: '2px solid #00ff00',
          width: 'fit-content',
          maxWidth: '100%'
        }}>
          {terminalText}
          <span style={{opacity: 0.8}}>_</span>
        </div>

        <h1 style={{
          fontSize: '3rem',
          marginBottom: '20px',
          fontWeight: 'bold',
          fontFamily: "'Courier New', monospace",
          color: '#00ff00',
          textShadow: '0 0 10px rgba(0, 255, 0, 0.7)',
          letterSpacing: '2px',
          margin: '30px 0'
        }}>
          MAX GASPERS SCOTT
        </h1>

        <h2 style={{
          fontSize: '1.8rem',
          marginBottom: '30px',
          fontWeight: 'normal',
          fontFamily: "'Courier New', monospace",
          color: '#00cc00',
          letterSpacing: '1px'
        }}>
          SOFTWARE ENGINEER
        </h2>

        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '20px',
          marginTop: '20px',
          marginBottom: '40px',
          zIndex: 2
        }}>
          <a href="https://github.com/max-gaspers-scott" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
            <button style={{
              backgroundColor: 'transparent',
              color: '#00ff00',
              border: '1px solid #00ff00',
              padding: '12px 24px',
              fontSize: '1rem',
              borderRadius: 0,
              cursor: 'pointer',
              transition: 'all 0.3s',
              fontFamily: "'Courier New', monospace",
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 0 10px rgba(0, 255, 0, 0.3)'
            }}
            onMouseOver={(e) => {
              e.target.style.background = 'rgba(0, 255, 0, 0.1)';
              e.target.style.boxShadow = '0 0 15px rgba(0, 255, 0, 0.5)';
            }}
            onMouseOut={(e) => {
              e.target.style.background = 'transparent';
              e.target.style.boxShadow = '0 0 10px rgba(0, 255, 0, 0.3)';
            }}>
              GITHUB
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'linear-gradient(90deg, transparent, rgba(0, 255, 0, 0.2), transparent)',
                transform: 'translateX(-100%)',
                transition: 'transform 0.5s'
              }}></div>
            </button>
          </a>
          <a href="mailto:gaspersscottma@gmail.com" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
            <button style={{
              backgroundColor: 'transparent',
              color: '#00ff00',
              border: '1px solid #00ff00',
              padding: '12px 24px',
              fontSize: '1rem',
              borderRadius: 0,
              cursor: 'pointer',
              transition: 'all 0.3s',
              fontFamily: "'Courier New', monospace",
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 0 10px rgba(0, 255, 0, 0.3)'
            }}
            onMouseOver={(e) => {
              e.target.style.background = 'rgba(0, 255, 0, 0.1)';
              e.target.style.boxShadow = '0 0 15px rgba(0, 255, 0, 0.5)';
            }}
            onMouseOut={(e) => {
              e.target.style.background = 'transparent';
              e.target.style.boxShadow = '0 0 10px rgba(0, 255, 0, 0.3)';
            }}>
              INITIATE CONTACT
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'linear-gradient(90deg, transparent, rgba(0, 255, 0, 0.2), transparent)',
                transform: 'translateX(-100%)',
                transition: 'transform 0.5s'
              }}></div>
            </button>
          </a>
        </div>

        <div style={{ margin: '30px 0', zIndex: 2 }}>
          <h3 style={{
            fontSize: '1.5rem',
            marginBottom: '15px',
            color: '#00ff00',
            fontFamily: "'Courier New', monospace",
            borderBottom: '1px solid #00aa00',
            paddingBottom: '5px',
            display: 'inline-block'
          }}>
            README.md
          </h3>
          <p style={{
            fontSize: '1.1rem',
            lineHeight: '1.7',
            marginBottom: '20px',
            textAlign: 'left',
            fontFamily: "'Courier New', monospace",
            color: '#00cc00',
            marginTop: '30px'
          }}>
            I am a full-stack developer with expertise in building maintainable and scalable code, and building end-to-end retures in response to user pain points
          </p>
          <p style={{
            fontSize: '1.1rem',
            lineHeight: '1.7',
            textAlign: 'left',
            fontFamily: "'Courier New', monospace",
            color: '#00cc00'
          }}>
            My experience spans across web development, API design, and software architecture. I enjoy creating usefull aplications and implementing innovative solutions.
          </p>

          {/* Skills Section */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: '20px',
            marginTop: '30px',
            flexWrap: 'wrap'
          }}>
            <div style={{
              flex: '1',
              minWidth: '250px',
              backgroundColor: 'rgba(0, 20, 0, 0.8)',
              padding: '20px',
              border: '1px solid rgba(0, 255, 0, 0.3)',
              boxShadow: '0 0 10px rgba(0, 255, 0, 0.2)'
            }}>
              <h4 style={{
                color: '#00ff00',
                fontFamily: "'Courier New', monospace",
                marginBottom: '15px',
                borderBottom: '1px solid #008800',
                paddingBottom: '5px'
              }}>FRONTEND</h4>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                textAlign: 'left'
              }}>
                <li style={{ marginBottom: '10px', color: '#00cc00' }}>• React.js</li>
                <li style={{ marginBottom: '10px', color: '#00cc00' }}>• JavaScript</li>
                <li style={{ marginBottom: '10px', color: '#00cc00' }}>• HTML5/CSS3</li>
                <li style={{ marginBottom: '10px', color: '#00cc00' }}>• Responsive Design</li>
                <li style={{ marginBottom: '10px', color: '#00cc00' }}>• Tailwind css</li>
              </ul>
            </div>

            <div style={{
              flex: '1',
              minWidth: '250px',
              backgroundColor: 'rgba(0, 20, 0, 0.8)',
              padding: '20px',
              border: '1px solid rgba(0, 255, 0, 0.3)',
              boxShadow: '0 0 10px rgba(0, 255, 0, 0.2)'
            }}>
              <h4 style={{
                color: '#00ff00',
                fontFamily: "'Courier New', monospace",
                marginBottom: '15px',
                borderBottom: '1px solid #008800',
                paddingBottom: '5px'
              }}>BACKEND</h4>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                textAlign: 'left'
              }}>
                <li style={{ marginBottom: '10px', color: '#00cc00' }}>• Python/FastAPI</li>
                <li style={{ marginBottom: '10px', color: '#00cc00' }}>• Node.js</li>
                <li style={{ marginBottom: '10px', color: '#00cc00' }}>• Rust/Axum</li>
                <li style={{ marginBottom: '10px', color: '#00cc00' }}>• RESTful APIs</li>
                <li style={{ marginBottom: '10px', color: '#00cc00' }}>• Postgres</li>
                <li style={{ marginBottom: '10px', color: '#00cc00' }}>• GCP</li>
              </ul>
            </div>

            <div style={{
              flex: '1',
              minWidth: '250px',
              backgroundColor: 'rgba(0, 20, 0, 0.8)',
              padding: '20px',
              border: '1px solid rgba(0, 255, 0, 0.3)',
              boxShadow: '0 0 10px rgba(0, 255, 0, 0.2)'
            }}>
              <h4 style={{
                color: '#00ff00',
                fontFamily: "'Courier New', monospace",
                marginBottom: '15px',
                borderBottom: '1px solid #008800',
                paddingBottom: '5px'
              }}>TOOLS</h4>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                textAlign: 'left'
              }}>
                <li style={{ marginBottom: '10px', color: '#00cc00' }}>• Git Version Control</li>
                <li style={{ marginBottom: '10px', color: '#00cc00' }}>• Docker</li>
                <li style={{ marginBottom: '10px', color: '#00cc00' }}>• Linux/Unix</li>

              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Animated elements */}
      <div style={{
        position: 'absolute',
        bottom: '20px',
        left: '20px',
        fontSize: '0.8rem',
        color: 'rgba(0, 255, 0, 0.5)',
        fontFamily: "'Courier New', monospace",
        zIndex: 2
      }}>
        SYSTEM STATUS: <span style={{color: '#00ff00'}}>ONLINE</span>
      </div>

      <div style={{
        position: 'absolute',
        bottom: '20px',
        right: '20px',
        fontSize: '0.8rem',
        color: 'rgba(0, 255, 0, 0.5)',
        fontFamily: "'Courier New', monospace",
        zIndex: 2
      }}>
        ENCRYPTION: <span style={{color: '#00ff00'}}>AES-256</span>
      </div>

      <style>{`
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
      `}</style>
    </div>
  );
};

export default LandingPage;
