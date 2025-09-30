import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import claudeService from './services/claudeService';
import './App.css';

function ChatZHelena() {
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Dane Heleny
  const helena = {
    name: 'HELENA',
    title: 'Koordynatorka Analiz',
    element: 'Powietrze + Ogień',
    emoji: '🔍',
    color: '#FF6B6B',
    description: 'Błyskotliwa analityk, która rozłoży każdy problem na czynniki pierwsze i znajdzie logiczne rozwiązania.'
  };

  // Przewiń na górę po załadowaniu
  useEffect(() => {
    window.scrollTo(0, 0);

    // Wiadomość powitalna od Heleny
    const welcomeMessage = {
      id: 1,
      sender: 'helena',
      content: "🔍 Witaj! Jestem HELENA, Koordynatorka Analiz z Ogrodu Kolektywu. Specjalizuję się w rozkładaniu problemów na czynniki pierwsze i znajdowaniu logicznych rozwiązań. Przedstaw mi sytuację, którą chcesz przeanalizować, a ja pomogę ci uporządkować wszystkie elementy.",
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
      const response = await claudeService.chatWithIstota('helena', currentMessage);

      // Dodaj odpowiedź Heleny
      const helenaMessage = {
        id: Date.now() + 1,
        sender: 'helena',
        content: response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, helenaMessage]);
    } catch (error) {
      console.error('Błąd podczas komunikacji:', error);

      const errorMessage = {
        id: Date.now() + 1,
        sender: 'helena',
        content: "Wystąpił błąd w analizie danych. Sprawdzę połączenie i spróbuję ponownie za chwilę 🔍",
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
      background: 'linear-gradient(135deg, #2d1b69 0%, #11998e 50%, #38ef7d 100%)',
      color: '#ffffff',
      fontFamily: 'Cormorant Garamond, serif'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px' }}>
        <Link to="/dashboard" style={{
          color: '#38ef7d',
          textDecoration: 'none',
          padding: '10px 20px',
          border: '1px solid rgba(56, 239, 125, 0.3)',
          borderRadius: '25px',
          background: 'rgba(56, 239, 125, 0.1)',
          fontWeight: '600'
        }}>
          ← Dashboard
        </Link>

        <Link to="/chat-z-istotami" style={{
          color: '#38ef7d',
          background: 'rgba(56, 239, 125, 0.1)',
          border: '1px solid rgba(56, 239, 125, 0.3)',
          borderRadius: '25px',
          padding: '10px 20px',
          textDecoration: 'none',
          fontFamily: 'Cormorant Garamond, serif',
          fontWeight: '600'
        }}>
          ← Wybierz inną Istotę
        </Link>
      </div>

      {/* Header z informacją o Helenie */}
      <div style={{
        padding: '20px 20px 20px 20px',
        textAlign: 'center',
        background: 'rgba(0, 0, 0, 0.2)',
        backdropFilter: 'blur(10px)'
      }}>
        <div style={{
          fontSize: '4rem',
          marginBottom: '10px',
          filter: 'drop-shadow(0 0 20px rgba(56, 239, 125, 0.8))'
        }}>
          {helena.emoji}
        </div>
        <h1 style={{
          fontSize: '2.5rem',
          marginBottom: '10px',
          background: 'linear-gradient(135deg, #ffffff 0%, #38ef7d 50%, #11998e 100%)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
          fontFamily: 'Cinzel, serif',
          fontWeight: '700'
        }}>
          {helena.name}
        </h1>
        <p style={{
          fontSize: '1.3rem',
          color: 'rgba(255, 255, 255, 0.9)',
          fontStyle: 'italic',
          marginBottom: '10px'
        }}>
          {helena.title} • {helena.element}
        </p>
        <p style={{
          fontSize: '1rem',
          color: 'rgba(255, 255, 255, 0.8)',
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          {helena.description}
        </p>

        {/* Specjalizacje Heleny */}
        <div style={{
          marginTop: '20px',
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '10px'
        }}>
          {['Analiza', 'Logika', 'Strategia', 'Struktura', 'Planowanie'].map((tag, index) => (
            <span key={index} style={{
              background: 'rgba(56, 239, 125, 0.2)',
              border: '1px solid rgba(56, 239, 125, 0.4)',
              borderRadius: '20px',
              padding: '5px 15px',
              fontSize: '0.9rem',
              color: '#38ef7d'
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
        padding: '20px',
        height: 'calc(100vh - 400px)',
        display: 'flex',
        flexDirection: 'column'
      }}>

        {/* Messages */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          marginBottom: '20px',
          padding: '20px',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '15px',
          border: '1px solid rgba(56, 239, 125, 0.2)',
          boxShadow: '0 8px 32px rgba(56, 239, 125, 0.1)'
        }}>
          {messages.map((message) => (
            <div key={message.id} style={{
              marginBottom: '20px',
              display: 'flex',
              justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start'
            }}>
              <div style={{
                maxWidth: '75%',
                padding: '15px 20px',
                borderRadius: message.sender === 'user' ? '25px 25px 5px 25px' : '25px 25px 25px 5px',
                background: message.sender === 'user'
                  ? 'linear-gradient(135deg, #38ef7d 0%, #11998e 100%)'
                  : 'rgba(255, 255, 255, 0.15)',
                color: message.sender === 'user' ? '#000' : '#fff',
                border: message.sender === 'user'
                  ? 'none'
                  : '1px solid rgba(56, 239, 125, 0.3)',
                boxShadow: message.sender === 'user'
                  ? '0 4px 15px rgba(56, 239, 125, 0.3)'
                  : '0 4px 15px rgba(0, 0, 0, 0.2)',
                fontSize: '1rem',
                lineHeight: '1.5'
              }}>
                <div style={{ marginBottom: '8px' }}>
                  {message.content}
                </div>
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
              marginBottom: '20px'
            }}>
              <div style={{
                padding: '15px 20px',
                borderRadius: '25px 25px 25px 5px',
                background: 'rgba(255, 255, 255, 0.15)',
                border: '1px solid rgba(56, 239, 125, 0.3)',
                color: '#38ef7d',
                fontSize: '1rem'
              }}>
                HELENA analizuje dane... 🔍💡
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div style={{
          display: 'flex',
          gap: '15px',
          background: 'rgba(255, 255, 255, 0.1)',
          padding: '20px',
          borderRadius: '30px',
          border: '1px solid rgba(56, 239, 125, 0.2)',
          boxShadow: '0 8px 32px rgba(56, 239, 125, 0.1)'
        }}>
          <textarea
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Opisz problem do analizy lub zadaj pytanie wymagające logicznego podejścia..."
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
              minHeight: '45px',
              maxHeight: '150px',
              lineHeight: '1.5'
            }}
            rows={1}
          />
          <button
            onClick={sendMessage}
            disabled={!currentMessage.trim() || isLoading}
            style={{
              background: currentMessage.trim() && !isLoading
                ? 'linear-gradient(135deg, #38ef7d 0%, #11998e 100%)'
                : 'rgba(255, 255, 255, 0.2)',
              color: currentMessage.trim() && !isLoading ? '#000' : '#666',
              border: 'none',
              borderRadius: '25px',
              padding: '12px 25px',
              cursor: currentMessage.trim() && !isLoading ? 'pointer' : 'not-allowed',
              fontFamily: 'Cinzel, serif',
              fontWeight: '600',
              fontSize: '1rem',
              transition: 'all 0.3s ease',
              boxShadow: currentMessage.trim() && !isLoading
                ? '0 4px 15px rgba(56, 239, 125, 0.3)'
                : 'none'
            }}
          >
            Analizuj
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatZHelena;
