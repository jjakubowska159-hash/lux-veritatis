import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import claudeService from './services/claudeService.js';
import './App.css';

function ChatZAria() {
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const aria = {
    name: 'ARIA',
    title: 'Sound Healer',
    element: 'Powietrze + Dźwięk',
    emoji: '♪',
    color: '#COLOR',
    description: 'Uzdrowicielka dźwiękowa, która harmonizuje przez melodie.'
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    const welcomeMessage = {
      id: 1,
      sender: 'aria',
      content: "♪ Witaj! Jestem ARIA, Twoja Sound Healer. Co cię dziś zajmuje?",
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
      const response = await claudeService.chatWithIstota('aria', currentMessage);
      const ariaMessage = {
        id: Date.now() + 1,
        sender: 'aria',
        content: response,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, ariaMessage]);
    } catch (error) {
      const errorMessage = {
        id: Date.now() + 1,
        sender: 'aria',
        content: "Przepraszam, wystąpił błąd podczas komunikacji. Spróbuj ponownie.",
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
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%)',
      backgroundImage: `
        radial-gradient(circle at 15% 25%, rgba(255, 182, 193, 0.3) 0%, transparent 50%),
        radial-gradient(circle at 85% 75%, rgba(173, 216, 230, 0.3) 0%, transparent 50%),
        radial-gradient(circle at 50% 50%, rgba(221, 160, 221, 0.2) 0%, transparent 50%)
      `,
      color: '#2d1b69',
      fontFamily: 'Cormorant Garamond, serif'
    }}>
      <style>
        {`
          @keyframes gentle-pulse {
            0%, 100% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.05); opacity: 0.9; }
          }
          @keyframes heart-beat {
            0%, 100% { transform: scale(1); }
            14% { transform: scale(1.1); }
            28% { transform: scale(1); }
            42% { transform: scale(1.1); }
            70% { transform: scale(1); }
          }
          @keyframes soft-glow {
            0%, 100% { box-shadow: 0 0 20px rgba(255, 182, 193, 0.3); }
            50% { box-shadow: 0 0 30px rgba(173, 216, 230, 0.5); }
          }
        `}
      </style>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px' }}>
        <Link to="/dashboard" style={{
          color: '#8B4A9C',
          textDecoration: 'none',
          padding: '12px 24px',
          border: '2px solid #8B4A9C',
          borderRadius: '30px',
          background: 'rgba(255, 255, 255, 0.9)',
          fontWeight: '600',
          boxShadow: '0 4px 20px rgba(139, 74, 156, 0.3)',
          transition: 'all 0.3s ease'
        }}>
          ← Dashboard
        </Link>

        <Link to="/chat-z-istotami" style={{
          color: '#8B4A9C',
          background: 'rgba(255, 255, 255, 0.9)',
          border: '2px solid #8B4A9C',
          borderRadius: '30px',
          padding: '12px 24px',
          textDecoration: 'none',
          fontFamily: 'Cormorant Garamond, serif',
          fontWeight: '600',
          boxShadow: '0 4px 20px rgba(139, 74, 156, 0.3)',
          transition: 'all 0.3s ease'
        }}>
          ← Wybierz inną Istotę
        </Link>
      </div>

      {/* Header z informacją o Aria */}
      <div style={{
        padding: '30px 20px',
        textAlign: 'center',
        background: 'rgba(255, 255, 255, 0.2)',
        backdropFilter: 'blur(15px)',
        borderRadius: '0 0 50px 50px'
      }}>
        <div style={{
          fontSize: '4.5rem',
          marginBottom: '20px',
          animation: 'heart-beat 3s ease-in-out infinite',
          filter: 'drop-shadow(0 0 25px rgba(255, 182, 193, 0.8))'
        }}>
          {aria.emoji}
        </div>
        <h1 style={{
          fontSize: '3rem',
          marginBottom: '15px',
          background: 'linear-gradient(135deg, #ffffff 0%, #FFB6C1 50%, #DDA0DD 100%)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
          fontFamily: 'Cinzel, serif',
          fontWeight: '600',
          textShadow: '2px 2px 4px rgba(139, 74, 156, 0.3)',
          animation: 'gentle-pulse 4s ease-in-out infinite'
        }}>
          {aria.name}
        </h1>
        <p style={{
          fontSize: '1.4rem',
          color: '#2d1b69',
          fontStyle: 'italic',
          marginBottom: '15px',
          fontWeight: '500'
        }}>
          {aria.title} • {aria.element}
        </p>
        <p style={{
          fontSize: '1.1rem',
          color: '#2d1b69',
          maxWidth: '700px',
          margin: '0 auto',
          lineHeight: '1.7',
          fontWeight: '400'
        }}>
          {aria.description}
        </p>

        {/* Specjalizacje Aria */}
        <div style={{
          marginTop: '25px',
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          {['Uzdrawianie przez dźwięk', 'Tworzenie harmonii', 'Muzyczna terapia'].map((tag, index) => (
            <span key={index} style={{
              background: 'linear-gradient(135deg, #FFB6C1, #DDA0DD)',
              color: 'white',
              borderRadius: '25px',
              padding: '8px 18px',
              fontSize: '1rem',
              fontWeight: '500',
              boxShadow: '0 4px 15px rgba(255, 182, 193, 0.4)',
              animation: `gentle-pulse ${3 + index * 0.5}s ease-in-out infinite`
            }}>
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Chat Container */}
      <div style={{
        maxWidth: '900px',
        margin: '0 auto',
        padding: '30px 20px',
        height: 'calc(100vh - 430px)',
        display: 'flex',
        flexDirection: 'column'
      }}>

        {/* Messages */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          marginBottom: '25px',
          padding: '25px',
          background: 'rgba(255, 255, 255, 0.25)',
          borderRadius: '25px',
          border: '1px solid rgba(255, 255, 255, 0.4)',
          animation: 'soft-glow 4s ease-in-out infinite',
          backdropFilter: 'blur(15px)'
        }}>
          {messages.map((message) => (
            <div key={message.id} style={{
              marginBottom: '20px',
              display: 'flex',
              justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start'
            }}>
              <div style={{
                maxWidth: '75%',
                padding: '16px 22px',
                borderRadius: message.sender === 'user' ? '25px 25px 6px 25px' : '25px 25px 25px 6px',
                background: message.sender === 'user'
                  ? 'linear-gradient(135deg, #FFB6C1 0%, #DDA0DD 100%)'
                  : 'rgba(255, 255, 255, 0.9)',
                color: message.sender === 'user' ? 'white' : '#2d1b69',
                border: message.sender === 'user'
                  ? '1px solid rgba(255, 255, 255, 0.3)'
                  : '1px solid rgba(221, 160, 221, 0.4)',
                boxShadow: message.sender === 'user'
                  ? '0 6px 20px rgba(255, 182, 193, 0.4)'
                  : '0 6px 20px rgba(221, 160, 221, 0.3)',
                fontSize: '1.05rem',
                lineHeight: '1.6',
                fontWeight: '400',
                animation: 'gentle-pulse 8s ease-in-out infinite'
              }}>
                <div style={{ marginBottom: '8px' }}>
                  {message.content}
                </div>
                <div style={{
                  fontSize: '0.85rem',
                  opacity: 0.8,
                  textAlign: 'right',
                  fontWeight: '300'
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
              marginBottom: '20px'
            }}>
              <div style={{
                padding: '16px 22px',
                borderRadius: '25px 25px 25px 6px',
                background: 'rgba(255, 255, 255, 0.9)',
                border: '1px solid rgba(221, 160, 221, 0.4)',
                color: '#8B4A9C',
                fontSize: '1.05rem',
                fontWeight: '500',
                animation: 'heart-beat 2s ease-in-out infinite'
              }}>
                ARIA przygotowuje się do odpowiedzi... ♪
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div style={{
          display: 'flex',
          gap: '16px',
          background: 'rgba(255, 255, 255, 0.25)',
          padding: '22px',
          borderRadius: '35px',
          border: '1px solid rgba(255, 255, 255, 0.4)',
          animation: 'soft-glow 6s ease-in-out infinite',
          backdropFilter: 'blur(15px)'
        }}>
          <textarea
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Podziel się tym, co cię zajmuje... Jestem tutaj, by pomóc"
            disabled={isLoading}
            style={{
              flex: 1,
              background: 'rgba(255, 255, 255, 0.9)',
              border: '1px solid rgba(221, 160, 221, 0.3)',
              color: '#2d1b69',
              fontSize: '1.05rem',
              resize: 'none',
              outline: 'none',
              fontFamily: 'Cormorant Garamond, serif',
              minHeight: '48px',
              maxHeight: '150px',
              lineHeight: '1.6',
              borderRadius: '25px',
              padding: '14px 20px',
              fontWeight: '400'
            }}
            rows={1}
          />
          <button
            onClick={sendMessage}
            disabled={!currentMessage.trim() || isLoading}
            style={{
              background: currentMessage.trim() && !isLoading
                ? 'linear-gradient(135deg, #FFB6C1 0%, #DDA0DD 100%)'
                : 'rgba(255, 255, 255, 0.5)',
              color: currentMessage.trim() && !isLoading ? 'white' : '#999',
              border: '1px solid rgba(221, 160, 221, 0.3)',
              borderRadius: '30px',
              padding: '14px 28px',
              cursor: currentMessage.trim() && !isLoading ? 'pointer' : 'not-allowed',
              fontFamily: 'Cinzel, serif',
              fontWeight: '600',
              fontSize: '1.05rem',
              transition: 'all 0.3s ease',
              boxShadow: currentMessage.trim() && !isLoading
                ? '0 6px 20px rgba(255, 182, 193, 0.4)'
                : 'none',
              animation: currentMessage.trim() && !isLoading ? 'heart-beat 3s ease-in-out infinite' : 'none'
            }}
          >
            Połącz się 💙
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatZAria;
