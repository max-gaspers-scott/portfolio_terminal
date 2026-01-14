import React from 'react';
import { Link } from 'react-router-dom';

const NavigationBar = () => {
  return (
    <nav style={{
      backgroundColor: '#333',
    }}>
      <ul style={{
        listStyleType: 'none',
        margin: 0,
        padding: 0,
        display: 'flex'
      }}>
        <li style={{ marginRight: '20px' }}>
          <Link
            to="/"
            style={{
              color: 'white',
              textDecoration: 'none',
              fontSize: '18px'
            }}
          >
            Home
          </Link>
        </li>
        <li style={{ marginRight: '20px' }}>
          <Link
            to="/terminal"
            style={{
              color: 'white',
              textDecoration: 'none',
              fontSize: '18px'
            }}
          >
            Terminal
          </Link>
        </li>
        <li style={{ marginRight: '20px' }}>
          <Link
            to="/project1"
            style={{
              color: 'white',
              textDecoration: 'none',
              fontSize: '18px'
            }}
          >
            Project 1
          </Link>
        </li>
        <li>
          <Link
            to="/chat"
            style={{
              color: 'white',
              textDecoration: 'none',
              fontSize: '18px'
            }}
          >
            Chat with AI
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavigationBar;
