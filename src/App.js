import logo from './logo.svg';
import './App.css';
import XTermTerminal from './componants/xterm.js';
import { useEffect, useRef } from 'react';

function App() {
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
      className="App"
      style={{
        background: 'radial-gradient(circle at var(--mouse-x) var(--mouse-y), #1a6638, #0a3d1f)',
        '--mouse-x': '50%',
        '--mouse-y': '50%'
      }}
    >
      <XTermTerminal />
    </div>
  );
}

export default App;
