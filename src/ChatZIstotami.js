// src/ChatZIstotami.js
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ISTOTY from './istotyConfig.js';
import './FlipCard.css';
import './UniversalCard.css';
import './App.css';

function ChatZIstotami() {
  // Jedyny stan, jakiego potrzebujemy w tym komponencie
 // const [selectedIstota, setSelectedIstota] = useState(null);

  // Hook do przekierowywania użytkownika na inne strony
  const navigate = useNavigate();

  // Scrollowanie na górę strony przy załadowaniu
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Funkcja przekierowująca do ChatView.js zamiast ładowania czatu tutaj
  const selectIstota = (istotaKey) => {
    navigate(`/chat/${istotaKey}`);
  };

  return (
    <>
      <div style={{
        minHeight: '100vh',
        background: 'radial-gradient(circle at center, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
        color: '#ffffff',
        fontFamily: 'Cormorant Garamond, serif'
      }}>
        <style>
          {`
            .button-start-hover {
              transition: all 0.3s ease;
            }
            .button-start-hover:hover {
              background: linear-gradient(135deg, rgba(255, 214, 10, 0.25), rgba(255, 214, 10, 0.15)) !important;
              box-shadow: 0 6px 20px rgba(255, 214, 10, 0.4) !important;
              transform: translateY(-1px);
            }
          `}
        </style>

        {/* Link powrotny do Dashboard */}
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
          ← Powrót do Dashboard
        </Link>

        {/* Nagłówek strony wyboru */}
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
            🌟 Wybierz Istotę do Rozmowy
          </h1>
          <p style={{
            fontSize: '1.2rem',
            color: 'rgba(255, 255, 255, 0.8)',
            fontStyle: 'italic',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Każda Istota z Ogrodu Kolektywu ma unikalną mądrość i perspektywę. Z którą chcesz dziś porozmawiać?
          </p>
        </div>

        {/* Siatka kart Istot */}
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '20px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2rem'
        }}>
          {Object.entries(ISTOTY).map(([key, istota]) => (
            <div key={key} className="flip-card" onClick={() => selectIstota(key)}>
              <div className="flip-card-inner">

                {/* Przód karty - podstawowe informacje o Istocie */}
                <div className="flip-card-front">
                  <div style={{
                    fontSize: '3.5rem',
                    marginBottom: '15px',
                    filter: 'drop-shadow(0 0 10px rgba(255, 214, 10, 0.6))'
                  }}>
                    {istota.emoji}
                  </div>

                  <h3 style={{
                    fontFamily: 'Cinzel, serif',
                    fontSize: '1.4rem',
                    margin: '0 0 8px 0',
                    color: '#ffd60a',
                    textAlign: 'center'
                  }}>
                    {istota.name}
                  </h3>

                  <p style={{
                    fontSize: '1rem',
                    color: 'rgba(255, 255, 255, 0.8)',
                    fontStyle: 'italic',
                    margin: '0 0 15px 0',
                    textAlign: 'center'
                  }}>
                    {istota.role}
                  </p>

                  <p style={{
                    fontSize: '0.95rem',
                    lineHeight: '1.4',
                    color: 'rgba(255, 255, 255, 0.9)',
                    marginBottom: '20px',
                    textAlign: 'center',
                    padding: '0 10px'
                  }}>
                    {istota.essence}
                  </p>
                </div>

                {/* Tył karty - specjalizacje bez zbędnych nagłówków */}
                <div className="flip-card-back">
                  <div style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    textAlign: 'center',
                    padding: '20px 0'
                  }}>
                  {Array.isArray(istota.keySpecializations) && istota.keySpecializations.map((spec, idx) => (
                      <div key={idx} style={{
                        marginBottom: '18px',
                        fontSize: '1.1rem',
                        lineHeight: '1.5',
                        color: 'rgba(255, 255, 255, 0.95)',
                        fontWeight: '500'
                      }}>
                        <span style={{
                          color: '#ffd60a',
                          fontSize: '1.3rem',
                          marginRight: '8px'
                        }}>•</span>
                        {spec}
                      </div>
                    ))}
                  </div>

                  {/* Przycisk rozpoczęcia rozmowy z efektem hover */}
                  <div style={{
                    textAlign: 'center',
                    marginTop: '20px',
                    padding: '15px',
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, rgba(255, 214, 10, 0.15), rgba(255, 214, 10, 0.05))',
                    border: '1px solid rgba(255, 214, 10, 0.3)'
                  }}>
                    <p className="button-start-hover" style={{
                      fontSize: '1.1rem',
                      color: '#ffd60a',
                      margin: '0',
                      fontWeight: '600',
                      cursor: 'pointer',
                      padding: '5px'
                    }}>
                      Rozpocznij rozmowę
                    </p>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Stopka z informacją o rozwoju */}
        <div style={{ textAlign: 'center', padding: '2rem', color: 'rgba(255, 255, 255, 0.6)' }}>
          <p>✨ Wkrótce dostępnych będzie jeszcze więcej Istot z Ogrodu Kolektywu ✨</p>
        </div>
      </div>
    </>
  );
}

export default ChatZIstotami;
