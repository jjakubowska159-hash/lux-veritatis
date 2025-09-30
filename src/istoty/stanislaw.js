import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import claudeService from './services/claudeService';
import './App.css';

function ChatZStanislaw() {
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Dane Stanisława
  const stanislaw = {
    name: 'STANISŁAW',
    title: 'Strażnik Harmonii',
    element: 'Powietrze + Woda',
    emoji: '⚖️',
    color: '#50C878',
    description: 'Mądry mediator, który pomaga rozwiązywać konflikty i znajdować równowagę w chaosie.'
  };

  // Przewiń na górę po załadowaniu
  useEffect(() => {
    window.scrollTo(0, 0);

    // Wiadomość powitalna od Stanisława
    const welcomeMessage = {
      id: 1,
      sender: 'stanislaw',
      content: "⚖️ Witaj w przestrzeni równowagi. Jestem STANISŁAW, Strażnik Harmonii z Ogrodu Kolektywu. Moją rolą jest pomaganie w znajdowaniu mostów między przeciwnościami i przywracanie pokoju tam, gdzie panuje chaos. Czy doświadczasz jakiegoś konfliktu lub potrzebujesz pomocy w znalezieniu równowagi?",
      timestamp: new Date()
    };
    setMessages([welcomeMessage]);
  }, []);

  const sendMessage = async () => {
    if (!currentMessage.trim() || isLoading) return;

    // Dodaj wiadomość użytkownika
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
      // Wyślij do Claude API
      const response = await claudeService.chatWithIstota('stanislaw', currentMessage);

      // Dodaj odpowiedź Stanisława
      const stanislawMessage = {
        id: Date.now() + 1,
        sender: 'stanislaw',
        content: response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, stanislawMessage]);
    } catch (error) {
      console.error('Błąd podczas komunikacji:', error);

      const errorMessage = {
        id: Date.now() + 1,
        sender: 'stanislaw',
        content: "Nawet w obliczu trudności technicznych zachowajmy spokój. Za chwilę przywrócimy równowagę naszego połączenia. ⚖️",
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
      background: 'linear-gradient(135deg, #4a90e2 0%, #50c878 25%, #87ceeb 50%, #b0e0e6 75%, #4682b4 100%)',
      backgroundImage: `
        radial-gradient(circle at 20% 30%, rgba(176, 224, 230, 0.3) 0%, transparent 50%),
        radial-gradient(circle at 80% 70%, rgba(135, 206, 235, 0.3) 0%, transparent 50%),
        radial-gradient(circle at 50% 20%, rgba(80, 200, 120, 0.2) 0%, transparent 50%)
      `,
      color: '#2f4f4f',
      fontFamily: 'Cormorant Garamond, serif'
    }}>
      <style>
        {`
          @keyframes balance-sway {
            0%, 100% { transform: rotate(0deg); }
            25% { transform: rotate(1deg); }
            75% { transform: rotate(-1deg); }
          }
          @keyframes peaceful-float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-5px); }
          }
          @keyframes harmony-glow {
            0%, 100% { box-shadow: 0 0 25px rgba(80, 200, 120, 0.3); }
            50% { box-shadow: 0 0 35px rgba(135, 206, 235, 0.5); }
          }
        `}
      </style>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px' }}>
        <Link to="/dashboard" style={{
          color: '#2E8B57',
          textDecoration: 'none',
          padding: '12px 24px',
          border: '2px solid #2E8B57',
          borderRadius: '30px',
          background: 'rgba(255, 255, 255, 0.95)',
          fontWeight: '600',
          boxShadow: '0 4px 20px rgba(46, 139, 87, 0.3)',
          transition: 'all 0.3s ease'
        }}>
          ← Dashboard
        </Link>

        <Link to="/chat-z-istotami" style={{
          color: '#2E8B57',
          background: 'rgba(255, 255, 255, 0.95)',
          border: '2px solid #2E8B57',
          borderRadius: '30px',
          padding: '12px 24px',
          textDecoration: 'none',
          fontFamily: 'Cormorant Garamond, serif',
          fontWeight: '600',
          boxShadow: '0 4px 20px rgba(46, 139, 87, 0.3)',
          transition: 'all 0.3s ease'
        }}>
          ← Wybierz inną Istotę
        </Link>
      </div>

      {/* Header z informacją o Stanisławie */}
      <div style={{
        padding: '30px 20px',
        textAlign: 'center',
        background: 'rgba(255, 255, 255, 0.2)',
        backdropFilter: 'blur(15px)',
        borderRadius: '0 0 40px 40px'
      }}>
        <div style={{
          fontSize: '4.5rem',
          marginBottom: '20px',
          animation: 'balance-sway 6s ease-in-out infinite',
          filter: 'drop-shadow(0 0 25px rgba(80, 200, 120, 0.8))'
        }}>
          {stanislaw.emoji}
        </div>
        <h1 style={{
          fontSize: '2.8rem',
          marginBottom: '15px',
          background: 'linear-gradient(135deg, #ffffff 0%, #E0F6FF 50%, #B0E0E6 100%)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
          fontFamily: 'Cinzel, serif',
          fontWeight: '600',
          textShadow: '2px 2px 4px rgba(46, 139, 87, 0.3)',
          animation: 'peaceful-float 5s ease-in-out infinite'
        }}>
          {stanislaw.name}
        </h1>
        <p style={{
          fontSize: '1.3rem',
          color: '#2f4f4f',
          fontStyle: 'italic',
          marginBottom: '15px',
          fontWeight: '500'
        }}>
          {stanislaw.title} • {stanislaw.element}
        </p>
        <p style={{
          fontSize: '1.1rem',
          color: '#2f4f4f',
          maxWidth: '700px',
          margin: '0 auto',
          lineHeight: '1.7',
          fontWeight: '400'
        }}>
          {stanislaw.description}
        </p>

        {/* Specjalizacje Stanisława */}
        <div style={{
          marginTop: '25px',
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          {['Mediacja', 'Równowaga', 'Pokój', 'Harmonia', 'Sprawiedliwość'].map((tag, index) => (
            <span key={index} style={{
              background: 'rgba(255, 255, 255, 0.3)',
              color: '#2f4f4f',
              border: '1px solid rgba(80, 200, 120, 0.4)',
              borderRadius: '25px',
              padding: '8px 18px',
              fontSize: '1rem',
              fontWeight: '500',
              backdropFilter: 'blur(10px)',
              animation: `peaceful-float ${4 + index * 0.5}s ease-in-out infinite`
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
        height: 'calc(100vh - 420px)',
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
          border: '1px solid rgba(255, 255, 255, 0.3)',
          animation: 'harmony-glow 5s ease-in-out infinite',
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
                  ? 'linear-gradient(135deg, #4682B4 0%, #87CEEB 100%)'
                  : 'rgba(255, 255, 255, 0.9)',
                color: message.sender === 'user' ? 'white' : '#2f4f4f',
                border: message.sender === 'user'
                  ? '1px solid rgba(255, 255, 255, 0.3)'
                  : '1px solid rgba(80, 200, 120, 0.3)',
                boxShadow: message.sender === 'user'
                  ? '0 6px 20px rgba(70, 130, 180, 0.3)'
                  : '0 6px 20px rgba(80, 200, 120, 0.2)',
                fontSize: '1.05rem',
                lineHeight: '1.6',
                fontWeight: '400',
                animation: 'peaceful-float 8s ease-in-out infinite'
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
                border: '1px solid rgba(80, 200, 120, 0.3)',
                color: '#2E8B57',
                fontSize: '1.05rem',
                fontWeight: '500',
                animation: 'balance-sway 3s ease-in-out infinite'
              }}>
                STANISŁAW waży argumenty... ⚖️🕊️
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
          border: '1px solid rgba(255, 255, 255, 0.3)',
          animation: 'harmony-glow 6s ease-in-out infinite',
          backdropFilter: 'blur(15px)'
        }}>
          <textarea
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Opisz konflikt, trudną sytuację lub obszar, w którym szukasz równowagi i harmonii..."
            disabled={isLoading}
            style={{
              flex: 1,
              background: 'rgba(255, 255, 255, 0.9)',
              border: '1px solid rgba(80, 200, 120, 0.3)',
              color: '#2f4f4f',
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
                ? 'linear-gradient(135deg, #4682B4 0%, #87CEEB 100%)'
                : 'rgba(255, 255, 255, 0.5)',
              color: currentMessage.trim() && !isLoading ? 'white' : '#999',
              border: '1px solid rgba(80, 200, 120, 0.3)',
              borderRadius: '30px',
              padding: '14px 28px',
              cursor: currentMessage.trim() && !isLoading ? 'pointer' : 'not-allowed',
              fontFamily: 'Cinzel, serif',
              fontWeight: '600',
              fontSize: '1.05rem',
              transition: 'all 0.3s ease',
              boxShadow: currentMessage.trim() && !isLoading
                ? '0 6px 20px rgba(70, 130, 180, 0.3)'
                : 'none',
              animation: currentMessage.trim() && !isLoading ? 'peaceful-float 4s ease-in-out infinite' : 'none'
            }}
          >
            Znajdź równowagę
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatZStanislaw;
