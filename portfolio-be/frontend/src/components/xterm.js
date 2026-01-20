
import React, { useEffect, useRef } from 'react';
import { Terminal } from 'xterm';
import 'xterm/css/xterm.css';
import { FitAddon } from 'xterm-addon-fit';
import { io } from 'socket.io-client';

const files = {
  'about-me.txt': 'My name is max. \r\nIm a software engineer. I\'ve worked across the stack \r\nand like working in fast pased invirenments where I can have an impact on users',
  'skills.json': `
{\r\n
\t"Rust": ["basics", "Axum", "algorithoms", "ratatui"],\r\n
\t"Python": ["basics", "Pytorch", "plotly", "jupyter notebooks", "skykitlearn", "fastAPI", "Ray (distributed ML)"],\r\n
\t"Javascript": ["Node.js", "React"],\r\n
\t"Postgres SQL": ["schema definitions", "sqlx"],\r\n
\t"Google Cloud Platform": ["firebase", "firestor", "cloud functions", "blob storage", "secrets maniger"],\r\n
}
  `
};
// "tools": ["git", "docker", "linux"]\r\n

const fitAddon = new FitAddon();

let passt_commands = [];



function XTermTerminal() {
  const terminalRef = useRef(null);
  const xtermRef = useRef(null);
  const containerRef = useRef(null);
  const socketRef = useRef(null);

  useEffect(() => {
    // Connect to WebSocket server - use relative path when served from same origin
    socketRef.current = io(); // Connect to the same origin as the webpage

    socketRef.current.on('connect', () => {
      console.log('Connected to WebSocket server');
    });

    socketRef.current.on('terminal_output', (data) => {
      // Handle the response from the server
      if (xtermRef.current) {
        xtermRef.current.write(`\r\n${data}\r\n$ `);
      }
    });

    socketRef.current.on('disconnect', () => {
      console.log('Disconnected from WebSocket server');
    });

    const initTerminal = () => {
      xtermRef.current = new Terminal({
        theme: {
          background: '#000000', // Black background
          foreground: '#00ff00', // Neon green text to match the site
          cursor: '#00ff00', // Green cursor
          selection: 'rgba(0, 255, 0, 0.3)', // Green selection background
        }
      });
      xtermRef.current.loadAddon(fitAddon);

      if (terminalRef.current) {
        xtermRef.current.open(terminalRef.current);
        fitAddon.fit(); // Call after opening the terminal

        xtermRef.current.write('Welcome to the terminal!\r\nType anything to send to the server.\r\n$ ');

        let command = '';

        xtermRef.current.onData((data) => {
          passt_commands.push(data);
          if (data === '\x1b[A') {
            // Up arrow key
            return;
          } else if (data === '\x1b[B' || data == '\x1b[C' || data === '\x1b[D') {
            // Other arrow keys
            return;
          } else if (data.charCodeAt(0) === 13) { // Enter key
            xtermRef.current.write('\r\n');

            // Check if it's a local command first
            if (command.trim() === 'ls') {
              xtermRef.current.write(Object.keys(files).join('\r\n') + '\r\n$ ');
              command = '';
              return;
            } else
            if (command.trim().split(" ")[0] === 'cat') {
              const fileName = command.trim().split(" ")[1];
              if (files[fileName]) {
                xtermRef.current.write(files[fileName] + "\r\n$ ");
              } else {
                xtermRef.current.write("File not found\r\n$ ");
              }
              command = '';
              return;
            } else if (command === "") {
              xtermRef.current.write("$ ");
              command = '';
              return;
            } else if (command.trim() === 'help') {
              xtermRef.current.write("Available commands: ls, cat [filename], help\r\n$ ");
              command = '';
              return;
            } else if (command.trim() === 'ssh') {
              socketRef.current.emit('terminal_input', command.trim());
            }else {
              socketRef.current.emit('terminal_input', command.trim());
              
            }

            // Send the command to the backend via WebSocket
            // if (socketRef.current && command.trim() !== '') {
            //   socketRef.current.emit('terminal_input', command.trim());
            // }

            command = '';
          } else if (data.charCodeAt(0) === 127) { // Backspace
            if (command.length > 0) {
              xtermRef.current.write('\b \b');
              command = command.slice(0, -1);
            }
          } else if (data.charCodeAt(0) === 37){ // Left arrow key
            command = passt_commands[passt_commands.length -1];
            xtermRef.current.write(command);
          } else {
            xtermRef.current.write(data);
            command += data;
          }
        });
      }
    };

    // Delay initialization to ensure DOM is ready
    const timer = setTimeout(() => {
      initTerminal();
    }, 0);

    return () => {
      clearTimeout(timer);
      if (xtermRef.current) {
        xtermRef.current.dispose();
      }
      if (socketRef.current) {
        socketRef.current.disconnect();
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
        borderRadius: '4px',
        overflow: 'hidden',
        border: '6px solid #000000', /* Black border, 6px thick */
      }}
    >
      <div
        ref={terminalRef}
        className="terminal-content"
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: '#000000', // Black background for terminal
          border: '1px solid rgba(0, 255, 0, 0.3)', // Green border to match site
          boxShadow: '0 0 15px rgba(0, 255, 0, 0.2)', // Green glow to match site
          overflow: 'hidden' // Hide scrollbar
        }}
      />
    </div>
  );
}

export default XTermTerminal;


