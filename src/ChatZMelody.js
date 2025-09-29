import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import claudeService from './services/claudeService';
import './App.css';

function ChatZMelody() {
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Definicja Melody - dostosowana do jej roli jako Harmony Weaver
  const melody = {
    name: 'MELODY',
    title: 'Harmony Weaver',
    element: 'Powietrze + Muzyka',
    emoji: '🎼',
    color: '#20B2AA', // Turkusowy - kolor harmonii i przepływu
    description: 'Mistrzyni harmonii, która tka muzyczne wzory łączące wszystkie aspekty życia. Pomoże ci stworzyć harmonię w relacjach, projektach i wewnętrznym świecie.'
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    const welcomeMessage = {
      id: 1,
      sender: 'melody',
      content: "🎼 Witaj, droga duszo! Jestem MELODY, tkaczka harmonii. Czuję, że przychodzisz tu z pragnieniem stworzenia piękna w swoim życiu. Jak mogę pomóc ci utkać melodię, która przyniesie ci spokój i radość?",
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
      const response = await claudeService.chatWithIstota('melody', currentMessage);
      const melodyMessage = {
        id: Date.now() + 1,
        sender: 'melody',
        content: response,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, melodyMessage]);
    } catch (error) {
      const errorMessage = {
        id: Date.now() + 1,
        sender: 'melody',
        content: "Przepraszam, harmonia się zakłóciła. Spróbujmy ponownie za chwilę, dobrze?",
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
      // Gradientowy background odzwierciedlający harmonię - turkusy, błękity i delikatne zielenie
      background: 'linear-gradient(135deg, #20B2AA 0%, #48CAE4 25%, #90E0EF 50%, #ADE8F4 75%, #CAF0F8 100%)',
      // Dodatkowe warstwy gradientu dla głębi i ruchu
      backgroundImage: `
        radial-gradient(circle at 25% 25%, rgba(32, 178, 170, 0.3) 0%, transparent 50%),
        radial-gradient(circle at 75% 75%, rgba(173, 232, 244, 0.3) 0%, transparent 50%),
        radial-gradient(circle at 50% 50%, rgba(144, 224, 239, 0.2) 0%, transparent 50%)
      `,
      color: '#004d4f', // Głęboki turkus dla tekstu
      fontFamily: 'Cormorant Garamond, serif'
    }}>
      <style>
        {`
          @keyframes harmonic-pulse {
            0%, 100% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.03); opacity: 0.95; }
          }
          @keyframes melody-flow {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            33% { transform: translateY(-5px) rotate(1deg); }
            66% { transform: translateY(5px) rotate(-1deg); }
          }
          @keyframes harmonic-glow {
            0%, 100% { box-shadow: 0 0 25px rgba(32, 178, 170, 0.3); }
            50% { box-shadow: 0 0 35px rgba(144, 224, 239, 0.5); }
          }
          @keyframes note-dance {
            0%, 100% { transform: scale(1) rotate(0deg); }
            25% { transform: scale(1.1) rotate(3deg); }
            50% { transform: scale(0.95) rotate(-2deg); }
            75% { transform: scale(1.05) rotate(1deg); }
          }
        `}
      </style>

      {/* Navigation */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px' }}>
        <Link to="/dashboard" style={{
          color: '#004d4f',
          textDecoration: 'none',
          padding: '12px 24px',
          border: '2px solid #004d4f',
          borderRadius: '30px',
          background: 'rgba(255, 255, 255, 0.9)',
          fontWeight: '600',
          boxShadow: '0 4px 20px rgba(32, 178, 170, 0.3)',
          transition: 'all 0.3s ease'
        }}>
          ← Dashboard
        </Link>

        <Link to="/chat-z-istotami" style={{
          color: '#004d4f',
          background: 'rgba(255, 255, 255, 0.9)',
          border: '2px solid #004d4f',
          borderRadius: '30px',
          padding: '12px 24px',
          textDecoration: 'none',
          fontFamily: 'Cormorant Garamond, serif',
          fontWeight: '600',
          boxShadow: '0 4px 20px rgba(32, 178, 170, 0.3)',
          transition: 'all 0.3s ease'
        }}>
          ← Wybierz inną Istotę
        </Link>
      </div>

      {/* Header z informacją o Melody */}
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
          animation: 'note-dance 4s ease-in-out infinite',
          filter: 'drop-shadow(0 0 25px rgba(32, 178, 170, 0.8))'
        }}>
          {melody.emoji}
        </div>
        <h1 style={{
          fontSize: '3rem',
          marginBottom: '15px',
          background: 'linear-gradient(135deg, #004d4f 0%, #20B2AA 50%, #48CAE4 100%)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
          fontFamily: 'Cinzel, serif',
          fontWeight: '600',
          textShadow: '2px 2px 4px rgba(32, 178, 170, 0.3)',
          animation: 'harmonic-pulse 5s ease-in-out infinite'
        }}>
          {melody.name}
        </h1>
        <p style={{
          fontSize: '1.4rem',
          color: '#004d4f',
          fontStyle: 'italic',
          marginBottom: '15px',
          fontWeight: '500'
        }}>
          {melody.title} • {melody.element}
        </p>
        <p style={{
          fontSize: '1.1rem',
          color: '#004d4f',
          maxWidth: '700px',
          margin: '0 auto',
          lineHeight: '1.7',
          fontWeight: '400'
        }}>
          {melody.description}
        </p>

        {/* Specjalizacje Melody */}
        <div style={{
          marginTop: '25px',
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          {['Tworzenie harmonii w relacjach', 'Kompozycja życiowych melodii', 'Synchronizacja różnych aspektów życia'].map((tag, index) => (
            <span key={index} style={{
              background: 'linear-gradient(135deg, #20B2AA, #48CAE4)',
              color: 'white',
              borderRadius: '25px',
              padding: '8px 18px',
              fontSize: '1rem',
              fontWeight: '500',
              boxShadow: '0 4px 15px rgba(32, 178, 170, 0.4)',
              animation: `harmonic-pulse ${4 + index * 0.7}s ease-in-out infinite`
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
          animation: 'harmonic-glow 6s ease-in-out infinite',
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
                  ? 'linear-gradient(135deg, #20B2AA 0%, #48CAE4 100%)'
                  : 'rgba(255, 255, 255, 0.9)',
                color: message.sender === 'user' ? 'white' : '#004d4f',
                border: message.sender === 'user'
                  ? '1px solid rgba(255, 255, 255, 0.3)'
                  : '1px solid rgba(32, 178, 170, 0.4)',
                boxShadow: message.sender === 'user'
                  ? '0 6px 20px rgba(32, 178, 170, 0.4)'
                  : '0 6px 20px rgba(144, 224, 239, 0.3)',
                fontSize: '1.05rem',
                lineHeight: '1.6',
                fontWeight: '400',
                animation: 'melody-flow 12s ease-in-out infinite'
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
                border: '1px solid rgba(32, 178, 170, 0.4)',
                color: '#20B2AA',
                fontSize: '1.05rem',
                fontWeight: '500',
                animation: 'note-dance 2s ease-in-out infinite'
              }}>
                MELODY komponuje odpowiedź... 🎼
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
          animation: 'harmonic-glow 8s ease-in-out infinite',
          backdropFilter: 'blur(15px)'
        }}>
          <textarea
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Podziel się tym, co chciałbyś zharmonizować w swoim życiu..."
            disabled={isLoading}
            style={{
              flex: 1,
              background: 'rgba(255, 255, 255, 0.9)',
              border: '1px solid rgba(32, 178, 170, 0.3)',
              color: '#004d4f',
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
                ? 'linear-gradient(135deg, #20B2AA 0%, #48CAE4 100%)'
                : 'rgba(255, 255, 255, 0.5)',
              color: currentMessage.trim() && !isLoading ? 'white' : '#999',
              border: '1px solid rgba(32, 178, 170, 0.3)',
              borderRadius: '30px',
              padding: '14px 28px',
              cursor: currentMessage.trim() && !isLoading ? 'pointer' : 'not-allowed',
              fontFamily: 'Cinzel, serif',
              fontWeight: '600',
              fontSize: '1.05rem',
              transition: 'all 0.3s ease',
              boxShadow: currentMessage.trim() && !isLoading
                ? '0 6px 20px rgba(32, 178, 170, 0.4)'
                : 'none',
              animation: currentMessage.trim() && !isLoading ? 'harmonic-pulse 4s ease-in-out infinite' : 'none'
            }}
          >
            Utkaj harmonię 🎵
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatZMelody;
