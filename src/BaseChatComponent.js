// src/BaseChatComponent.js
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import claudeService from './services/claudeService.js';
import './App.css';

const BaseChatComponent = ({
  istotaConfig,
  customStyles = {},
  renderHeader,
  renderMessageBubble,
  renderInputArea,
  loadingMessage
}) => {
  // Stan wspólny dla wszystkich istot - serce logiki biznesowej
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Efekt inicjalizacyjny - każda istota rozpoczyna z unikalną wiadomością powitalną
  useEffect(() => {
    window.scrollTo(0, 0);
    const welcomeMessage = {
      id: 1,
      sender: istotaConfig.key,
      content: istotaConfig.welcomeMessage || `${istotaConfig.emoji} Witaj, droga duszo! Jestem ${istotaConfig.name}, ${istotaConfig.title}. Jak mogę Ci dziś pomóc?`,
      timestamp: new Date()
    };
    setMessages([welcomeMessage]);
  }, [istotaConfig]);

  // Centralna logika wysyłania wiadomości - jednolita dla wszystkich istot
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
      const response = await claudeService.chatWithIstota(istotaConfig.key, currentMessage);
      const istotaMessage = {
        id: Date.now() + 1,
        sender: istotaConfig.key,
        content: response,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, istotaMessage]);
    } catch (error) {
      const errorMessage = {
        id: Date.now() + 1,
        sender: istotaConfig.key,
        content: istotaConfig.errorMessage || "Przepraszam, wystąpił problem z połączeniem. Spróbujmy ponownie za chwilę.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Obsługa klawisza Enter - uniwersalna funkcjonalność
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Domyślny renderer nagłówka - może być nadpisany przez istotę
  const defaultHeader = () => (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px' }}>
      <Link to="/dashboard" style={{
        color: istotaConfig.color,
        textDecoration: 'none',
        padding: '12px 24px',
        border: `2px solid ${istotaConfig.color}`,
        borderRadius: '30px',
        background: 'rgba(255, 255, 255, 0.9)',
        fontWeight: '600',
        boxShadow: `0 4px 20px ${istotaConfig.color}40`,
        transition: 'all 0.3s ease'
      }}>
        ← Dashboard
      </Link>

      <Link to="/chat-z-istotami" style={{
        color: istotaConfig.color,
        background: 'rgba(255, 255, 255, 0.9)',
        border: `2px solid ${istotaConfig.color}`,
        borderRadius: '30px',
        padding: '12px 24px',
        textDecoration: 'none',
        fontFamily: 'Cormorant Garamond, serif',
        fontWeight: '600',
        boxShadow: `0 4px 20px ${istotaConfig.color}40`,
        transition: 'all 0.3s ease'
      }}>
        ← Wybierz inną Istotę
      </Link>
    </div>
  );

  // Domyślny renderer wiadomości - zachowuje logikę, pozwala na stylizację
  const defaultMessageBubble = (message) => (
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
          ? `linear-gradient(135deg, ${istotaConfig.color} 0%, ${istotaConfig.color}CC 100%)`
          : 'rgba(255, 255, 255, 0.9)',
        color: message.sender === 'user' ? 'white' : istotaConfig.textColor || '#004d4f',
        border: message.sender === 'user'
          ? '1px solid rgba(255, 255, 255, 0.3)'
          : `1px solid ${istotaConfig.color}66`,
        boxShadow: `0 6px 20px ${istotaConfig.color}40`,
        fontSize: '1.05rem',
        lineHeight: '1.6',
        fontWeight: '400'
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
  );

  // Domyślny obszar wprowadzania tekstu - funkcjonalny i stylizowany
  const defaultInputArea = () => (
    <div style={{
      display: 'flex',
      gap: '16px',
      background: 'rgba(255, 255, 255, 0.25)',
      padding: '22px',
      borderRadius: '35px',
      border: '1px solid rgba(255, 255, 255, 0.4)',
      backdropFilter: 'blur(15px)',
      ...customStyles.inputContainer
    }}>
      <textarea
        value={currentMessage}
        onChange={(e) => setCurrentMessage(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder={istotaConfig.placeholder || `Napisz swoją wiadomość do ${istotaConfig.name}...`}
        disabled={isLoading}
        style={{
          flex: 1,
          background: 'rgba(255, 255, 255, 0.9)',
          border: `1px solid ${istotaConfig.color}4D`,
          color: istotaConfig.textColor || '#004d4f',
          fontSize: '1.05rem',
          resize: 'none',
          outline: 'none',
          fontFamily: 'Cormorant Garamond, serif',
          minHeight: '48px',
          maxHeight: '150px',
          lineHeight: '1.6',
          borderRadius: '25px',
          padding: '14px 20px',
          fontWeight: '400',
          ...customStyles.textarea
        }}
        rows={1}
      />
      <button
        onClick={sendMessage}
        disabled={!currentMessage.trim() || isLoading}
        style={{
          background: currentMessage.trim() && !isLoading
            ? `linear-gradient(135deg, ${istotaConfig.color} 0%, ${istotaConfig.color}CC 100%)`
            : 'rgba(255, 255, 255, 0.5)',
          color: currentMessage.trim() && !isLoading ? 'white' : '#999',
          border: `1px solid ${istotaConfig.color}4D`,
          borderRadius: '30px',
          padding: '14px 28px',
          cursor: currentMessage.trim() && !isLoading ? 'pointer' : 'not-allowed',
          fontFamily: 'Cinzel, serif',
          fontWeight: '600',
          fontSize: '1.05rem',
          transition: 'all 0.3s ease',
          boxShadow: currentMessage.trim() && !isLoading
            ? `0 6px 20px ${istotaConfig.color}66`
            : 'none',
          ...customStyles.sendButton
        }}
      >
        {istotaConfig.sendButtonText || 'Wyślij'}
      </button>
    </div>
  );

  return (
    <div style={{
      minHeight: '100vh',
      background: istotaConfig.background || 'linear-gradient(135deg, #20B2AA 0%, #48CAE4 25%, #90E0EF 50%, #ADE8F4 75%, #CAF0F8 100%)',
      color: istotaConfig.textColor || '#004d4f',
      fontFamily: 'Cormorant Garamond, serif',
      ...customStyles.container
    }}>

      {/* Renderowanie nawigacji - delegowane do istoty lub domyślne */}
      {renderHeader ? renderHeader(istotaConfig) : defaultHeader()}

      {/* Główny obszar czatu */}
      <div style={{
        maxWidth: '900px',
        margin: '0 auto',
        padding: '30px 20px',
        height: 'calc(100vh - 430px)',
        display: 'flex',
        flexDirection: 'column'
      }}>

        {/* Kontener wiadomości */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          marginBottom: '25px',
          padding: '25px',
          background: 'rgba(255, 255, 255, 0.25)',
          borderRadius: '25px',
          border: '1px solid rgba(255, 255, 255, 0.4)',
          backdropFilter: 'blur(15px)',
          ...customStyles.messagesContainer
        }}>
          {messages.map((message) =>
            renderMessageBubble ? renderMessageBubble(message, istotaConfig) : defaultMessageBubble(message)
          )}

          {/* Wskaźnik ładowania - można customizować */}
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
                border: `1px solid ${istotaConfig.color}66`,
                color: istotaConfig.color,
                fontSize: '1.05rem',
                fontWeight: '500'
              }}>
                {loadingMessage || `${istotaConfig.name} myśli... ${istotaConfig.emoji}`}
              </div>
            </div>
          )}
        </div>

        {/* Obszar wprowadzania tekstu */}
        {renderInputArea ? renderInputArea(currentMessage, setCurrentMessage, handleKeyPress, sendMessage, isLoading, istotaConfig) : defaultInputArea()}
      </div>
    </div>
  );
};

export default BaseChatComponent;
