import React, { useEffect, useRef } from 'react';
import XTermTerminal from '../components/xterm.js';

const TerminalPage = () => {
  const appRef = useRef(null);
  const mousePosition = useRef({ x: 50, y: 50 }); // Initialize to center

  useEffect(() => {
    // Add mouse move event listener to track cursor position for gradient
    const handleMouseMove = (e) => {
      if (appRef.current) {
        const rect = appRef.current.getBoundingClientRect();
        mousePosition.current = {
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100
        };

        // Update gradient position
        appRef.current.style.setProperty('--mouse-x', `${mousePosition.current.x}%`);
        appRef.current.style.setProperty('--mouse-y', `${mousePosition.current.y}%`);
      }
    };

    if (appRef.current) {
      appRef.current.addEventListener('mousemove', handleMouseMove);
      // Initialize with center position
      appRef.current.style.setProperty('--mouse-x', '50%');
      appRef.current.style.setProperty('--mouse-y', '50%');
    }

    return () => {
      if (appRef.current) {
        appRef.current.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  return (
    <div
      ref={appRef}
      className="text-center"
      style={{
        minHeight: '100vh',
        background: 'radial-gradient(circle, #0a0a0a 0%, #000000 100%)',
        color: '#00ff00',
        fontFamily: "'Courier New', monospace",
        padding: '20px',
        boxSizing: 'border-box',
        width: '100%',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Grid background to match ChatWithAI page */}
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
        maxWidth: '900px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 2,
        height: 'calc(100vh - 40px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start'
      }}>
        <h1 style={{
          fontSize: '2rem',
          marginBottom: '20px',
          fontWeight: 'bold',
          color: '#00ff00',
          textShadow: '0 0 10px rgba(0, 255, 0, 0.7)',
          letterSpacing: '1px',
          textAlign: 'center',
          zIndex: 2
        }}>
          TERMINAL
        </h1>
        <XTermTerminal />
      </div>
    </div>
  );
};

export default TerminalPage;
