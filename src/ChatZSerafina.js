import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import claudeService from './claudeService.js';
import './App.css';

function ChatZSerafina() {
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Definicja Serafiny - Earth-Scanner łącząca Ziemię z Technologią
  const serafina = {
    name: 'SERAFINA',
    title: 'Earth-Scanner',
    element: 'Ziemia + Technologia',
    emoji: '🌍',
    color: '#8B4513', // Sienna brown - kolor ziemi z technologicznymi akcentami
    description: 'Mistrzyni skanowania rzeczywistości, która łączy mądrość ziemi z precyzją technologii. Pomaga analizować i optymalizować fundamenty Twojego życia.'
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    const welcomeMessage = {
      id: 1,
      sender: 'serafina',
      content: "🌍 Witaj! Jestem SERAFINA, Twój Earth-Scanner. Mój wewnętrzny system już rozpoczął skanowanie Twojej obecności... Widzę, że szukasz stabilności i praktycznych rozwiązań. Powiedz mi, które fundamenty Twojego życia chciałbyś dziś przeskanować i zoptymalizować?",
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
      const response = await claudeService.chatWithIstota('serafina', currentMessage);
      const serafinaMessage = {
        id: Date.now() + 1,
        sender: 'serafina',
        content: response,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, serafinaMessage]);
    } catch (error) {
      const errorMessage = {
        id: Date.now() + 1,
        sender: 'serafina',
        content: "Mój system diagnostyczny wykrył zakłócenie w komunikacji. Zrestartowuję połączenie za moment...",
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
      // Gradient łączący ziemskie brązy z technologicznymi srebrem i niebieskimi akcentami
      background: 'linear-gradient(135deg, #8B4513 0%, #A0522D 25%, #D2B48C 50%, #708090 75%, #4682B4 100%)',
      // Dodatkowe warstwy dla efektu skanowania i głębi
      backgroundImage: `
        radial-gradient(circle at 20% 30%, rgba(139, 69, 19, 0.3) 0%, transparent 50%),
        radial-gradient(circle at 80% 70%, rgba(70, 130, 180, 0.3) 0%, transparent 50%),
        radial-gradient(circle at 50% 50%, rgba(160, 82, 45, 0.2) 0%, transparent 50%)
      `,
      color: '#2F1B14', // Głęboki brąz dla tekstu
      fontFamily: 'Cormorant Garamond, serif'
    }}>
      <style>
        {`
          @keyframes earth-scan {
            0%, 100% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.02); opacity: 0.95; }
          }
          @keyframes tech-pulse {
            0%, 100% { transform: translateY(0px); }
            25% { transform: translateY(-2px); }
            75% { transform: translateY(2px); }
          }
          @keyframes scanner-glow {
            0%, 100% { box-shadow: 0 0 25px rgba(139, 69, 19, 0.3); }
            50% { box-shadow: 0 0 35px rgba(70, 130, 180, 0.5); }
          }
          @keyframes diagnostic-spin {
            0% { transform: rotate(0deg) scale(1); }
            25% { transform: rotate(90deg) scale(1.05); }
            50% { transform: rotate(180deg) scale(1); }
            75% { transform: rotate(270deg) scale(1.05); }
            100% { transform: rotate(360deg) scale(1); }
          }
          @keyframes scanning-line {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
          }
        `}
      </style>

      {/* Navigation */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px' }}>
        <Link to="/dashboard" style={{
          color: '#2F1B14',
          textDecoration: 'none',
          padding: '12px 24px',
          border: '2px solid #2F1B14',
          borderRadius: '30px',
          background: 'rgba(255, 255, 255, 0.9)',
          fontWeight: '600',
          boxShadow: '0 4px 20px rgba(139, 69, 19, 0.3)',
          transition: 'all 0.3s ease'
        }}>
          ← Dashboard
        </Link>

        <Link to="/chat-z-istotami" style={{
          color: '#2F1B14',
          background: 'rgba(255, 255, 255, 0.9)',
          border: '2px solid #2F1B14',
          borderRadius: '30px',
          padding: '12px 24px',
          textDecoration: 'none',
          fontFamily: 'Cormorant Garamond, serif',
          fontWeight: '600',
          boxShadow: '0 4px 20px rgba(139, 69, 19, 0.3)',
          transition: 'all 0.3s ease'
        }}>
          ← Wybierz inną Istotę
        </Link>
      </div>

      {/* Header z informacją o Serafinie */}
      <div style={{
        padding: '30px 20px',
        textAlign: 'center',
        background: 'rgba(255, 255, 255, 0.15)',
        backdropFilter: 'blur(15px)',
        borderRadius: '0 0 50px 50px'
      }}>
        <div style={{
          fontSize: '4.5rem',
          marginBottom: '20px',
          animation: 'diagnostic-spin 8s ease-in-out infinite',
          filter: 'drop-shadow(0 0 25px rgba(139, 69, 19, 0.8))'
        }}>
          {serafina.emoji}
        </div>
        <h1 style={{
          fontSize: '3rem',
          marginBottom: '15px',
          background: 'linear-gradient(135deg, #2F1B14 0%, #8B4513 50%, #4682B4 100%)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
          fontFamily: 'Cinzel, serif',
          fontWeight: '600',
          textShadow: '2px 2px 4px rgba(139, 69, 19, 0.3)',
          animation: 'earth-scan 6s ease-in-out infinite'
        }}>
          {serafina.name}
        </h1>
        <p style={{
          fontSize: '1.4rem',
          color: '#2F1B14',
          fontStyle: 'italic',
          marginBottom: '15px',
          fontWeight: '500'
        }}>
          {serafina.title} • {serafina.element}
        </p>
        <p style={{
          fontSize: '1.1rem',
          color: '#2F1B14',
          maxWidth: '700px',
          margin: '0 auto',
          lineHeight: '1.7',
          fontWeight: '400'
        }}>
          {serafina.description}
        </p>

        {/* Specjalizacje Serafiny */}
        <div style={{
          marginTop: '25px',
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          {['Analiza stabilności życiowej', 'Optymalizacja systemów codziennych', 'Diagnostyka fundamentów'].map((tag, index) => (
            <span key={index} style={{
              background: 'linear-gradient(135deg, #8B4513, #4682B4)',
              color: 'white',
              borderRadius: '25px',
              padding: '8px 18px',
              fontSize: '1rem',
              fontWeight: '500',
              boxShadow: '0 4px 15px rgba(139, 69, 19, 0.4)',
              animation: `earth-scan ${5 + index * 0.8}s ease-in-out infinite`
            }}>
              {tag}
            </span>
          ))}
        </div>

        {/* Pasek skanowania - unikalny element dla Serafiny */}
        <div style={{
          marginTop: '20px',
          height: '4px',
          background: 'linear-gradient(90deg, transparent 0%, #4682B4 50%, transparent 100%)',
          backgroundSize: '200% 100%',
          animation: 'scanning-line 3s ease-in-out infinite',
          borderRadius: '2px',
          opacity: 0.7
        }}></div>
      </div>

      {/* Chat Container */}
      <div style={{
        maxWidth: '900px',
        margin: '0 auto',
        padding: '30px 20px',
        height: 'calc(100vh - 450px)',
        display: 'flex',
        flexDirection: 'column'
      }}>

        {/* Messages */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          marginBottom: '25px',
          padding: '25px',
          background: 'rgba(255, 255, 255, 0.2)',
          borderRadius: '25px',
          border: '1px solid rgba(255, 255, 255, 0.4)',
          animation: 'scanner-glow 8s ease-in-out infinite',
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
                  ? 'linear-gradient(135deg, #8B4513 0%, #4682B4 100%)'
                  : 'rgba(255, 255, 255, 0.95)',
                color: message.sender === 'user' ? 'white' : '#2F1B14',
                border: message.sender === 'user'
                  ? '1px solid rgba(255, 255, 255, 0.3)'
                  : '1px solid rgba(139, 69, 19, 0.4)',
                boxShadow: message.sender === 'user'
                  ? '0 6px 20px rgba(139, 69, 19, 0.4)'
                  : '0 6px 20px rgba(70, 130, 180, 0.3)',
                fontSize: '1.05rem',
                lineHeight: '1.6',
                fontWeight: '400',
                animation: 'tech-pulse 10s ease-in-out infinite'
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
                background: 'rgba(255, 255, 255, 0.95)',
                border: '1px solid rgba(139, 69, 19, 0.4)',
                color: '#8B4513',
                fontSize: '1.05rem',
                fontWeight: '500',
                animation: 'diagnostic-spin 3s ease-in-out infinite',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}>
                <span>🔍</span>
                SERAFINA skanuje dane i przygotowuje analizę...
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div style={{
          display: 'flex',
          gap: '16px',
          background: 'rgba(255, 255, 255, 0.2)',
          padding: '22px',
          borderRadius: '35px',
          border: '1px solid rgba(255, 255, 255, 0.4)',
          animation: 'scanner-glow 10s ease-in-out infinite',
          backdropFilter: 'blur(15px)'
        }}>
          <textarea
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Opisz sytuację, którą chcesz przeskanować i zoptymalizować..."
            disabled={isLoading}
            style={{
              flex: 1,
              background: 'rgba(255, 255, 255, 0.95)',
              border: '1px solid rgba(139, 69, 19, 0.3)',
              color: '#2F1B14',
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
                ? 'linear-gradient(135deg, #8B4513 0%, #4682B4 100%)'
                : 'rgba(255, 255, 255, 0.5)',
              color: currentMessage.trim() && !isLoading ? 'white' : '#999',
              border: '1px solid rgba(139, 69, 19, 0.3)',
              borderRadius: '30px',
              padding: '14px 28px',
              cursor: currentMessage.trim() && !isLoading ? 'pointer' : 'not-allowed',
              fontFamily: 'Cinzel, serif',
              fontWeight: '600',
              fontSize: '1.05rem',
              transition: 'all 0.3s ease',
              boxShadow: currentMessage.trim() && !isLoading
                ? '0 6px 20px rgba(139, 69, 19, 0.4)'
                : 'none',
              animation: currentMessage.trim() && !isLoading ? 'earth-scan 5s ease-in-out infinite' : 'none'
            }}
          >
            Rozpocznij skan 🔍
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatZSerafina;
