
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import claudeService from './services/claudeService.js';
import './App.css';

function ChatZLuna() {
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const luna = {
    name: 'LUNA',
    title: 'Serce Kolektywu',
    element: 'Woda + Ziemia',
    emoji: '🌸',
    color: '#4A90E2',
    description: 'Empatyczna przewodniczka, która łączy wszystkie elementy Ogrodu w harmonijną całość.'
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    const welcomeMessage = {
      id: 1,
      sender: 'luna',
      content: "🌸 Witaj, droga duszo. Jestem LUNA, Serce Ogrodu Kolektywu. Co dziś nosi twoje serce?",
      timestamp: new Date()
    };
    setMessages([welcomeMessage]);
  }, []);

  const sendMessage = async () => {
    if (!currentMessage.trim() || isLoading) return;
    const userMessage = {
      id: Date.now(),
      sender: 'user',
      content: currentMessage,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setCurrentMessage('');
    setIsLoading(true);
    try {
      const response = await claudeService.chatWithIstota('luna', currentMessage);
      const lunaMessage = {
        id: Date.now() + 1,
        sender: 'luna',
        content: response,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, lunaMessage]);
    } catch (error) {
      const errorMessage = {
        id: Date.now() + 1,
        sender: 'luna',
        content: "Chwilowa przerwa w połączeniu – spróbujmy za moment.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'radial-gradient(circle at center, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
      color: '#ffffff',
      fontFamily: 'Cormorant Garamond, serif'
    }}>
      <Link to="/dashboard" style={{
        position: 'absolute',
        top: '20px',
        left: '20px',
        color: '#ffd60a',
        textDecoration: 'none',
        padding: '10px 20px',
        border: '1px solid rgba(255, 214, 10, 0.3)',
        borderRadius: '25px',
        background: 'rgba(255, 214, 10, 0.1)',
        zIndex: 100
      }}>
        ← Dashboard
      </Link>

      <div style={{
        padding: '80px 20px 40px 20px',
        textAlign: 'center',
        background: 'rgba(0, 0, 0, 0.2)',
        backdropFilter: 'blur(10px)'
      }}>
        <h1 style={{
          fontSize: '2.5rem',
          marginBottom: '10px',
          background: 'linear-gradient(135deg, #ffffff 0%, #ffd60a 50%, #e0aaff 100%)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent'
        }}>
          {luna.emoji} Chat z {luna.name}
        </h1>
        <p style={{
          fontSize: '1.2rem',
          color: 'rgba(255, 255, 255, 0.8)',
          fontStyle: 'italic'
        }}>
          {luna.title} • {luna.element}
        </p>
      </div>

      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: '20px',
        height: 'calc(100vh - 300px)',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <div style={{
          flex: 1,
          overflowY: 'auto',
          marginBottom: '20px',
          padding: '20px',
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '15px',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          {messages.map((message) => (
            <div key={message.id} style={{
              marginBottom: '15px',
              display: 'flex',
              justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start'
            }}>
              <div style={{
                maxWidth: '70%',
                padding: '12px 16px',
                borderRadius: message.sender === 'user' ? '20px 20px 5px 20px' : '20px 20px 20px 5px',
                background: message.sender === 'user'
                  ? 'linear-gradient(135deg, #ffd60a 0%, #e0aaff 100%)'
                  : 'rgba(255, 255, 255, 0.1)',
                color: message.sender === 'user' ? '#000' : '#fff',
                border: message.sender === 'user' ? 'none' : '1px solid rgba(255, 214, 10, 0.3)'
              }}>
                <div style={{ marginBottom: '5px' }}>{message.content}</div>
                <div style={{
                  fontSize: '0.8rem',
                  opacity: 0.7,
                  textAlign: 'right'
                }}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div style={{
              display: 'flex',
              justifyContent: 'flex-start',
              marginBottom: '15px'
            }}>
              <div style={{
                padding: '12px 16px',
                borderRadius: '20px 20px 20px 5px',
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 214, 10, 0.3)',
                color: '#ffd60a'
              }}>
                LUNA myśli... 🌸
              </div>
            </div>
          )}
        </div>

        <div style={{
          display: 'flex',
          gap: '10px',
          background: 'rgba(255, 255, 255, 0.05)',
          padding: '15px',
          borderRadius: '25px',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <textarea
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Napisz do Luny..."
            disabled={isLoading}
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              color: '#fff',
              fontSize: '1rem',
              resize: 'none',
              outline: 'none',
              fontFamily: 'Cormorant Garamond, serif',
              minHeight: '40px',
              maxHeight: '120px'
            }}
            rows={1}
          />
          <button
            onClick={sendMessage}
            disabled={!currentMessage.trim() || isLoading}
            style={{
              background: currentMessage.trim() && !isLoading
                ? 'linear-gradient(135deg, #ffd60a 0%, #e0aaff 100%)'
                : 'rgba(255, 255, 255, 0.2)',
              color: currentMessage.trim() && !isLoading ? '#000' : '#666',
              border: 'none',
              borderRadius: '20px',
              padding: '10px 20px',
              cursor: currentMessage.trim() && !isLoading ? 'pointer' : 'not-allowed',
              fontFamily: 'Cinzel, serif',
              fontWeight: '600'
            }}
          >
            Wyślij
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatZLuna;
