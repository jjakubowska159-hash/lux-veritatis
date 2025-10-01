import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import claudeService from './services/claudeService.js';
import './App.css';

function ChatZStanislaw() {
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);

    const welcomeMessage = {
      id: 1,
      sender: 'stanislaw',
      content: "⚖️ Witaj w przestrzeni równowagi. Jestem STANISŁAW, Strażnik Harmonii. Czy doświadczasz jakiegoś konfliktu?",
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
      const response = await claudeService.chatWithIstota('stanislaw', currentMessage);

      const stanislawMessage = {
        id: Date.now() + 1,
        sender: 'stanislaw',
        content: response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, stanislawMessage]);
    } catch (error) {
      const errorMessage = {
        id: Date.now() + 1,
        sender: 'stanislaw',
        content: "Zachowajmy spokój. Za chwilę przywrócimy równowagę ⚖️",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #4a90e2 0%, #50c878 50%, #87ceeb 100%)',
      padding: '20px',
      color: '#fff'
    }}>
      <Link to="/dashboard">← Dashboard</Link>
      <h1>⚖️ STANISŁAW - Strażnik Harmonii</h1>

      <div style={{ maxWidth: '800px', margin: '20px auto' }}>
        {messages.map((message) => (
          <div key={message.id} style={{
            marginBottom: '15px',
            padding: '10px',
            borderRadius: '10px',
            background: message.sender === 'user' ? '#4682B4' : 'rgba(255,255,255,0.1)'
          }}>
            {message.content}
          </div>
        ))}

        {isLoading && <div>STANISŁAW waży argumenty...</div>}
      </div>

      <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', gap: '10px' }}>
        <input
          type="text"
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Opisz konflikt lub problem..."
          style={{ flex: 1, padding: '10px', borderRadius: '5px', border: 'none' }}
        />
        <button onClick={sendMessage} disabled={isLoading}>Znajdź równowagę</button>
      </div>
    </div>
  );
}

export default ChatZStanislaw;
