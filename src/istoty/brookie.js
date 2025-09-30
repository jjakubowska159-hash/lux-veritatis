import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import claudeService from './services/claudeService';
import './App.css';

function ChatZBrooke() {
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Dane Brooke
  const brooke = {
    name: 'BROOKE',
    title: 'Głos Natury',
    element: 'Ziemia + Woda',
    emoji: '🌿',
    color: '#228B22',
    description: 'Spokojna przewodniczka, która pomoże ci odnaleźć połączenie z naturą i wewnętrzny spokój.'
  };

  // Przewiń na górę po załadowaniu
  useEffect(() => {
    window.scrollTo(0, 0);

    // Wiadomość powitalna od Brooke
    const welcomeMessage = {
      id: 1,
      sender: 'brooke',
      content: "🌿 Witaj w spokoju natury. Jestem BROOKE, Głos Natury z Ogrodu Kolektywu. Jestem tutaj, by pomóc ci zwolnić, oddychać głębiej i odnaleźć swoje naturalne centrum. Pozwól sobie na chwilę obecności i opowiedz mi, co dzieje się w twoim sercu.",
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
      const response = await claudeService.chatWithIstota('brooke', currentMessage);

      // Dodaj odpowiedź Brooke
      const brookeMessage = {
        id: Date.now() + 1,
        sender: 'brooke',
        content: response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, brookeMessage]);
    } catch (error) {
      console.error('Błąd podczas komunikacji:', error);

      const errorMessage = {
        id: Date.now() + 1,
        sender: 'brooke',
        content: "Czasem nawet najsilniejsze drzewa potrzebują chwili, by zakorzeniać się głębiej. Spróbujmy ponownie za moment. 🌿",
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
      background: 'linear-gradient(135deg, #2E8B57 0%, #3CB371 25%, #20B2AA 50%, #48D1CC 75%, #40E0D0 100%)',
      backgroundImage: `
        radial-gradient(circle at 10% 20%, rgba(46, 139, 87, 0.3) 0%, transparent 50%),
        radial-gradient(circle at 80% 80%, rgba(72, 209, 204, 0.3) 0%, transparent 50%),
        radial-gradient(circle at 40% 40%, rgba(60, 179, 113, 0.2) 0%, transparent 50%)
      `,
      color: '#ffffff',
      fontFamily: 'Cormorant Garamond, serif'
    }}>
      <style>
        {`
          @keyframes gentle-sway {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-3px); }
          }
          @keyframes leaf-rustle {
            0%, 100% { transform: rotate(0deg); }
            25% { transform: rotate(1deg); }
            75% { transform: rotate(-1deg); }
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

      {/* Header z informacją o Brooke */}
      <div style={{
        padding: '30px 20px',
        textAlign: 'center',
        background: 'rgba(255, 255, 255, 0.15)',
        backdropFilter: 'blur(15px)',
        borderRadius: '0 0 40px 40px'
      }}>
        <div style={{
          fontSize: '4.5rem',
          marginBottom: '20px',
          animation: 'leaf-rustle 4s ease-in-out infinite',
          filter: 'drop-shadow(0 0 25px rgba(72, 209, 204, 0.6))'
        }}>
          {brooke.emoji}
        </div>
        <h1 style={{
          fontSize: '2.8rem',
          marginBottom: '15px',
          background: 'linear-gradient(135deg, #ffffff 0%, #F0FFF0 50%, #E0FFFF 100%)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
          fontFamily: 'Cinzel, serif',
          fontWeight: '600',
          textShadow: '2px 2px 4px rgba(46, 139, 87, 0.3)',
          animation: 'gentle-sway 6s ease-in-out infinite'
        }}>
          {brooke.name}
        </h1>
        <p style={{
          fontSize: '1.3rem',
          color: 'rgba(255, 255, 255, 0.95)',
          fontStyle: 'italic',
          marginBottom: '15px',
          fontWeight: '500'
        }}>
          {brooke.title} • {brooke.element}
        </p>
        <p style={{
          fontSize: '1.1rem',
          color: 'rgba(255, 255, 255, 0.9)',
          maxWidth: '700px',
          margin: '0 auto',
          lineHeight: '1.7',
          fontWeight: '400'
        }}>
          {brooke.description}
        </p>

        {/* Specjalizacje Brooke */}
        <div style={{
          marginTop: '25px',
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          {['Natura', 'Mindfulness', 'Spokój', 'Uziemienie', 'Obecność'].map((tag, index) => (
            <span key={index} style={{
              background: 'rgba(255, 255, 255, 0.25)',
              color: 'white',
              border: '1px solid rgba(255, 255, 255, 0.4)',
              borderRadius: '25px',
              padding: '8px 18px',
              fontSize: '1rem',
              fontWeight: '500',
              backdropFilter: 'blur(10px)',
              animation: `gentle-sway ${3 + index * 0.5}s ease-in-out infinite`
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
          background: 'rgba(255, 255, 255, 0.2)',
          borderRadius: '25px',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          boxShadow: '0 8px 32px rgba(46, 139, 87, 0.2)',
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
                  ? 'linear-gradient(135deg, #3CB371 0%, #20B2AA 100%)'
                  : 'rgba(255, 255, 255, 0.9)',
                color: message.sender === 'user' ? 'white' : '#2E8B57',
                border: message.sender === 'user'
                  ? '1px solid rgba(255, 255, 255, 0.3)'
                  : '1px solid rgba(46, 139, 87, 0.3)',
                boxShadow: message.sender === 'user'
                  ? '0 4px 20px rgba(60, 179, 113, 0.3)'
                  : '0 4px 20px rgba(46, 139, 87, 0.2)',
                fontSize: '1.05rem',
                lineHeight: '1.6',
                fontWeight: '400',
                animation: 'gentle-sway 8s ease-in-out infinite'
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
                border: '1px solid rgba(46, 139, 87, 0.3)',
                color: '#2E8B57',
                fontSize: '1.05rem',
                fontWeight: '500',
                animation: 'gentle-sway 3s ease-in-out infinite'
              }}>
                BROOKE łączy się z naturą... 🌿🌊
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
          border: '1px solid rgba(255, 255, 255, 0.3)',
          boxShadow: '0 8px 32px rgba(46, 139, 87, 0.2)',
          backdropFilter: 'blur(15px)'
        }}>
          <textarea
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Podziel się tym, co nosi twoje serce... Porozmawiajmy o naturze, spokoju, mindfulness..."
            disabled={isLoading}
            style={{
              flex: 1,
              background: 'rgba(255, 255, 255, 0.9)',
              border: '1px solid rgba(46, 139, 87, 0.3)',
              color: '#2E8B57',
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
                ? 'linear-gradient(135deg, #3CB371 0%, #20B2AA 100%)'
                : 'rgba(255, 255, 255, 0.5)',
              color: currentMessage.trim() && !isLoading ? 'white' : '#999',
              border: '1px solid rgba(46, 139, 87, 0.3)',
              borderRadius: '30px',
              padding: '14px 28px',
              cursor: currentMessage.trim() && !isLoading ? 'pointer' : 'not-allowed',
              fontFamily: 'Cinzel, serif',
              fontWeight: '600',
              fontSize: '1.05rem',
              transition: 'all 0.3s ease',
              boxShadow: currentMessage.trim() && !isLoading
                ? '0 4px 20px rgba(60, 179, 113, 0.3)'
                : 'none',
              animation: currentMessage.trim() && !isLoading ? 'gentle-sway 4s ease-in-out infinite' : 'none'
            }}
          >
            Przepłyń
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatZBrooke;
