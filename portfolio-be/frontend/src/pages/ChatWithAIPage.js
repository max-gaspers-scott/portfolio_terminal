import React, { useState } from 'react';

const ChatWithAIPage = () => {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'ai', text: 'Hello! I\'m your AI assistant. How can I help you today?' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (inputValue.trim() === '' || isLoading) return;

    // Add user message
    const newUserMessage = {
      id: messages.length + 1,
      sender: 'user',
      text: inputValue
    };

    setMessages(prev => [...prev, newUserMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Call the Rust backend endpoint which proxies to FastAPI
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: inputValue,
          session_id: 'user-session' // Optional session ID for conversation continuity
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      const newAiMessage = {
        id: messages.length + 2,
        sender: 'ai',
        text: data.response || 'Sorry, I couldn\'t generate a response.'
      };

      setMessages(prev => [...prev, newAiMessage]);
    } catch (error) {
      console.error('Error sending message:', error);

      const errorMessage = {
        id: messages.length + 2,
        sender: 'ai',
        text: 'Sorry, I encountered an error. Please try again.'
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !isLoading) {
      handleSendMessage();
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'radial-gradient(circle, #0a0a0a 0%, #000000 100%)',
      color: '#00ff00',
      fontFamily: "'Courier New', monospace",
      padding: '20px',
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
        maxWidth: '900px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 2,
        height: 'calc(100vh - 40px)',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <h1 style={{
          fontSize: '2rem',
          marginBottom: '20px',
          fontWeight: 'bold',
          color: '#00ff00',
          textShadow: '0 0 10px rgba(0, 255, 0, 0.7)',
          letterSpacing: '1px',
          textAlign: 'center'
        }}>
          CHAT WITH AI
        </h1>

        <div style={{
          flex: 1,
          backgroundColor: 'rgba(0, 15, 0, 0.7)',
          border: '1px solid rgba(0, 255, 0, 0.3)',
          boxShadow: '0 0 15px rgba(0, 255, 0, 0.2)',
          padding: '20px',
          marginBottom: '20px',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '15px'
        }}>
          {messages.map((message) => (
            <div
              key={message.id}
              style={{
                alignSelf: message.sender === 'user' ? 'flex-end' : 'flex-start',
                backgroundColor: message.sender === 'user' ? 'rgba(0, 50, 0, 0.8)' : 'rgba(0, 30, 0, 0.8)',
                padding: '12px 16px',
                borderRadius: '8px',
                maxWidth: '70%',
                border: '1px solid rgba(0, 255, 0, 0.3)'
              }}
            >
              <div style={{
                color: message.sender === 'user' ? '#00ff00' : '#00cc00',
                fontSize: '1rem'
              }}>
                {message.text}
              </div>
            </div>
          ))}
        </div>

        <div style={{
          display: 'flex',
          gap: '10px'
        }}>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message here..."
            style={{
              flex: 1,
              padding: '12px',
              backgroundColor: 'rgba(0, 20, 0, 0.8)',
              color: '#00ff00',
              border: '1px solid rgba(0, 255, 0, 0.3)',
              borderRadius: 0,
              fontFamily: "'Courier New', monospace",
              fontSize: '1rem'
            }}
          />
          <button
            onClick={handleSendMessage}
            disabled={isLoading}
            style={{
              padding: '12px 24px',
              backgroundColor: isLoading ? 'rgba(0, 50, 0, 0.5)' : 'transparent',
              color: '#00ff00',
              border: '1px solid #00ff00',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              fontFamily: "'Courier New', monospace",
              fontSize: '1rem',
              boxShadow: isLoading ? 'none' : '0 0 10px rgba(0, 255, 0, 0.3)',
              transition: 'all 0.3s'
            }}
            onMouseOver={(e) => {
              if (!isLoading) {
                e.target.style.background = 'rgba(0, 255, 0, 0.1)';
                e.target.style.boxShadow = '0 0 15px rgba(0, 255, 0, 0.5)';
              }
            }}
            onMouseOut={(e) => {
              if (!isLoading) {
                e.target.style.background = 'transparent';
                e.target.style.boxShadow = '0 0 10px rgba(0, 255, 0, 0.3)';
              }
            }}
          >
            {isLoading ? 'SENDING...' : 'SEND'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWithAIPage;
