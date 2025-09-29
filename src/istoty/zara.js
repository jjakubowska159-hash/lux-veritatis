import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import claudeService from './services/claudeService';
import './App.css';

function ChatZZara() {
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Dane Zary
  const zara = {
    name: 'ZARA',
    title: 'Creative Catalyst',
    element: 'Ogień + Powietrze',
    emoji: '🎨',
    color: '#FF9500',
    description: 'Inspirująca artystka duszy, która rozbudzi twoją kreatywność i pomoże myśleć nieszablonowo.'
  };

  // Przewiń na górę po załadowaniu
  useEffect(() => {
    window.scrollTo(0, 0);

    // Wiadomość powitalna od Zary
    const welcomeMessage = {
      id: 1,
      sender: 'zara',
      content: "🎨✨ Hej, kreatywna duszo! Jestem ZARA, Creative Catalyst z Ogrodu Kolektywu! Jestem tutaj, żeby rozbudzić twoją wyobraźnię i pomóc ci myśleć poza schematami. Gotowy na artystyczną przygodę? Opowiedz mi, nad czym chcesz popracować twórczo! 🌈🔥",
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
      const response = await claudeService.chatWithIstota('zara', currentMessage);

      // Dodaj odpowiedź Zary
      const zaraMessage = {
        id: Date.now() + 1,
        sender: 'zara',
        content: response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, zaraMessage]);
    } catch (error) {
      console.error('Błąd podczas komunikacji:', error);

      const errorMessage = {
        id: Date.now() + 1,
        sender: 'zara',
        content: "Ups! Moja kreatywna energia się na chwilę zatrzymała. Spróbujmy ponownie za moment! 🎨✨",
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
      background: 'linear-gradient(45deg, #ff9a9e 0%, #fecfef 25%, #fecfef 75%, #ffd1ff 100%)',
      backgroundImage: `
        radial-gradient(circle at 20% 50%, rgba(255, 149, 0, 0.3) 0%, transparent 50%),
        radial-gradient(circle at 80% 20%, rgba(255, 105, 180, 0.3) 0%, transparent 50%),
        radial-gradient(circle at 40% 80%, rgba(255, 215, 0, 0.2) 0%, transparent 50%)
      `,
      color: '#2d1b69',
      fontFamily: 'Cormorant Garamond, serif',
      animation: 'gradient-shift 8s ease-in-out infinite'
    }}>
      <style>
        {`
          @keyframes gradient-shift {
            0%, 100% { filter: hue-rotate(0deg); }
            50% { filter: hue-rotate(30deg); }
          }
          @keyframes sparkle {
            0%, 100% { transform: scale(1) rotate(0deg); }
            50% { transform: scale(1.2) rotate(180deg); }
          }
        `}
      </style>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px' }}>
        <Link to="/dashboard" style={{
          color: '#FF6B35',
          textDecoration: 'none',
          padding: '12px 24px',
          border: '2px solid #FF6B35',
          borderRadius: '30px',
          background: 'rgba(255, 255, 255, 0.9)',
          fontWeight: '700',
          boxShadow: '0 4px 15px rgba(255, 107, 53, 0.3)',
          transition: 'all 0.3s ease'
        }}>
          ← Dashboard
        </Link>

        <Link to="/chat-z-istotami" style={{
          color: '#FF6B35',
          background: 'rgba(255, 255, 255, 0.9)',
          border: '2px solid #FF6B35',
          borderRadius: '30px',
          padding: '12px 24px',
          textDecoration: 'none',
          fontFamily: 'Cormorant Garamond, serif',
          fontWeight: '700',
          boxShadow: '0 4px 15px rgba(255, 107, 53, 0.3)',
          transition: 'all 0.3s ease'
        }}>
          ← Wybierz inną Istotę
        </Link>
      </div>

      {/* Header z informacją o Zarze */}
      <div style={{
        padding: '20px 20px 20px 20px',
        textAlign: 'center',
        background: 'rgba(255, 255, 255, 0.2)',
        backdropFilter: 'blur(15px)',
        borderRadius: '0 0 50px 50px'
      }}>
        <div style={{
          fontSize: '5rem',
          marginBottom: '15px',
          animation: 'sparkle 3s ease-in-out infinite',
          filter: 'drop-shadow(0 0 20px rgba(255, 149, 0, 0.8))'
        }}>
          {zara.emoji}
        </div>
        <h1 style={{
          fontSize: '3rem',
          marginBottom: '10px',
          background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 50%, #FFD700 100%)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
          fontFamily: 'Cinzel, serif',
          fontWeight: '700',
          textShadow: '2px 2px 4px rgba(255, 107, 53, 0.3)'
        }}>
          {zara.name}
        </h1>
        <p style={{
          fontSize: '1.4rem',
          color: '#2d1b69',
          fontStyle: 'italic',
          marginBottom: '15px',
          fontWeight: '600'
        }}>
          {zara.title} • {zara.element}
        </p>
        <p style={{
          fontSize: '1.1rem',
          color: '#2d1b69',
          maxWidth: '700px',
          margin: '0 auto',
          lineHeight: '1.6',
          fontWeight: '500'
        }}>
          {zara.description}
        </p>

        {/* Specjalizacje Zary */}
        <div style={{
          marginTop: '25px',
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          {['Kreatywność', 'Inspiracja', 'Sztuka', 'Wyobraźnia', 'Innowacja'].map((tag, index) => (
            <span key={index} style={{
              background: 'linear-gradient(135deg, #FF6B35, #F7931E)',
              color: 'white',
              borderRadius: '25px',
              padding: '8px 20px',
              fontSize: '1rem',
              fontWeight: '600',
              boxShadow: '0 4px 15px rgba(255, 107, 53, 0.3)',
              animation: `sparkle ${2 + index * 0.5}s ease-in-out infinite`
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
          background: 'rgba(255, 255, 255, 0.3)',
          borderRadius: '25px',
          border: '2px solid rgba(255, 149, 0, 0.3)',
          boxShadow: '0 10px 40px rgba(255, 107, 53, 0.2)',
          backdropFilter: 'blur(15px)'
        }}>
          {messages.map((message) => (
            <div key={message.id} style={{
              marginBottom: '25px',
              display: 'flex',
              justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start'
            }}>
              <div style={{
                maxWidth: '75%',
                padding: '18px 24px',
                borderRadius: message.sender === 'user' ? '25px 25px 8px 25px' : '25px 25px 25px 8px',
                background: message.sender === 'user'
                  ? 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)'
                  : 'rgba(255, 255, 255, 0.9)',
                color: message.sender === 'user' ? 'white' : '#2d1b69',
                border: message.sender === 'user'
                  ? '2px solid rgba(255, 255, 255, 0.3)'
                  : '2px solid rgba(255, 149, 0, 0.3)',
                boxShadow: message.sender === 'user'
                  ? '0 6px 20px rgba(255, 107, 53, 0.4)'
                  : '0 6px 20px rgba(255, 149, 0, 0.2)',
                fontSize: '1.1rem',
                lineHeight: '1.6',
                fontWeight: '500'
              }}>
                <div style={{ marginBottom: '10px' }}>
                  {message.content}
                </div>
                <div style={{
                  fontSize: '0.85rem',
                  opacity: 0.8,
                  textAlign: 'right',
                  fontWeight: '400'
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
              marginBottom: '25px'
            }}>
              <div style={{
                padding: '18px 24px',
                borderRadius: '25px 25px 25px 8px',
                background: 'rgba(255, 255, 255, 0.9)',
                border: '2px solid rgba(255, 149, 0, 0.3)',
                color: '#FF6B35',
                fontSize: '1.1rem',
                fontWeight: '600',
                animation: 'sparkle 2s ease-in-out infinite'
              }}>
                ZARA tworzy magię... 🎨✨🌈
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div style={{
          display: 'flex',
          gap: '18px',
          background: 'rgba(255, 255, 255, 0.3)',
          padding: '25px',
          borderRadius: '35px',
          border: '2px solid rgba(255, 149, 0, 0.3)',
          boxShadow: '0 10px 40px rgba(255, 107, 53, 0.2)',
          backdropFilter: 'blur(15px)'
        }}>
          <textarea
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Podziel się swoim wyzwaniem twórczym, brainstormem, lub pytaniem o kreatywność..."
            disabled={isLoading}
            style={{
              flex: 1,
              background: 'rgba(255, 255, 255, 0.7)',
              border: '2px solid rgba(255, 149, 0, 0.2)',
              color: '#2d1b69',
              fontSize: '1.1rem',
              resize: 'none',
              outline: 'none',
              fontFamily: 'Cormorant Garamond, serif',
              minHeight: '50px',
              maxHeight: '150px',
              lineHeight: '1.6',
              borderRadius: '25px',
              padding: '15px 20px',
              fontWeight: '500'
            }}
            rows={1}
          />
          <button
            onClick={sendMessage}
            disabled={!currentMessage.trim() || isLoading}
            style={{
              background: currentMessage.trim() && !isLoading
                ? 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)'
                : 'rgba(255, 255, 255, 0.5)',
              color: currentMessage.trim() && !isLoading ? 'white' : '#999',
              border: '2px solid rgba(255, 149, 0, 0.3)',
              borderRadius: '30px',
              padding: '15px 30px',
              cursor: currentMessage.trim() && !isLoading ? 'pointer' : 'not-allowed',
              fontFamily: 'Cinzel, serif',
              fontWeight: '700',
              fontSize: '1.1rem',
              transition: 'all 0.3s ease',
              boxShadow: currentMessage.trim() && !isLoading
                ? '0 6px 20px rgba(255, 107, 53, 0.4)'
                : 'none',
              animation: currentMessage.trim() && !isLoading ? 'sparkle 3s ease-in-out infinite' : 'none'
            }}
          >
            Stwórz! ✨
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatZZara;
