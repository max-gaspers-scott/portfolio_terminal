
import React, { useEffect, useRef } from 'react';
import { Terminal } from 'xterm';
import 'xterm/css/xterm.css';
import { FitAddon } from 'xterm-addon-fit';

const files = {
  'about-me.txt': 'My name is max. \r\nIm a software engineer. I\'ve worked across the stack \r\nand like working in fast pased invirenments where I can have an impact on users', 
  'file2.js': 'this is the contents of file 2', 
  'notes.md': 'here are some notes '
};



const fitAddon = new FitAddon();


let passt_commands = [];



function XTermTerminal() {
  const terminalRef = useRef(null);
  const xtermRef = useRef(null);
  const containerRef = useRef(null);
  const mousePosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const initTerminal = () => {
      xtermRef.current = new Terminal({
        theme: {
          background: '#000000', // Black background
          foreground: '#e0e0e0', // Light text color
        }
      });
      xtermRef.current.loadAddon(fitAddon);

      if (terminalRef.current) {
        xtermRef.current.open(terminalRef.current);
        fitAddon.fit(); // Call after opening the terminal

        xtermRef.current.write('Welcome to the fake terminal!\r\nType "ls" to list files.\r\n$ ');

        let command = '';


        xtermRef.current.onData((data) => {

          passt_commands.push(data);
          if (data === '\x1b[A') {
            //xtermRef.current.write(passt_commands[passt_commands.length -1]);
            //command = passt_commands[passt_commands.length -1];
            return;
          } else if (data === '\x1b[B' || data == '\x1b[C' || data === '\x1b[D') {
            return;
          } else if (data.charCodeAt(0) === 13) { // Enter key
            xtermRef.current.write('\r\n');
            if (command.trim() === 'ls') {
              xtermRef.current.write(Object.keys(files).join('\r\n') + '\r\n');
            } else if (command.trim().split(" ")[0] === 'cat') {
              xtermRef.current.write("")
              xtermRef.current.write(files[command.trim().split(" ")[1]] + "\r\n")
            } else if (command === "") {
              xtermRef.current.write("\r");
            } else {
              xtermRef.current.write('Command not found\r\n');
            }
            xtermRef.current.write('$ ');
            command = '';
          } else if (data.charCodeAt(0) === 127) { // Backspace
            if (command.length > 0) {
              xtermRef.current.write('\b \b');
              command = command.slice(0, -1);
            }
          } else if (data.charCodeAt(0) === 37){
            command = passt_commands[passt_commands.length -1];
            xtermRef.current.write(command);
          } else {
            xtermRef.current.write(data);
            command += data;
          }
        });
      }
    };

    // Add mouse move event listener to track cursor position for gradient
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        mousePosition.current = {
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100
        };
        
        // Update gradient position
        containerRef.current.style.setProperty('--mouse-x', `${mousePosition.current.x}%`);
        containerRef.current.style.setProperty('--mouse-y', `${mousePosition.current.y}%`);
      }
    };

    // Delay initialization to ensure DOM is ready
    const timer = setTimeout(() => {
      initTerminal();
      if (containerRef.current) {
        containerRef.current.addEventListener('mousemove', handleMouseMove);
      }
    }, 0);

    return () => {
      clearTimeout(timer);
      if (containerRef.current) {
        containerRef.current.removeEventListener('mousemove', handleMouseMove);
      }
      if (xtermRef.current) {
        xtermRef.current.dispose();
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="terminal-container"
      style={{
        position: 'relative',
        width: '600px',
        height: '300px',
        margin: '20px auto 0', // Center the div with top margin but no bottom margin
        background: 'radial-gradient(circle at var(--mouse-x) var(--mouse-y), #1a6638, #0a3d1f)',
        '--mouse-x': '50%',
        '--mouse-y': '50%',
        borderRadius: '8px',
        overflow: 'hidden',
      }}
    >
      <div 
        ref={terminalRef} 
        className="terminal-content"
        style={{ 
          width: '100%', 
          height: '100%',
          backgroundColor: '#000000', // Black background for terminal
          overflow: 'hidden' // Hide scrollbar
        }} 
      />
    </div>
  );
}

export default XTermTerminal;


