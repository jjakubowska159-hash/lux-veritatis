import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './App.css';

const API = process.env.REACT_APP_API_URL;

function PulsKolektywu() {
  const [topQ, setTopQ]   = useState([]);
  const [popI, setPopI]   = useState([]);
  const [hourA, setHourA] = useState([]);

  useEffect(() => {
    Promise.all([
      fetch(`${API}/api/top-words`).then(r => r.json()),
      fetch(`${API}/api/popular-istoty`).then(r => r.json()),
      fetch(`${API}/api/hourly-activity`).then(r => r.json())
    ]).then(([q, i, h]) => {
      setTopQ(q); setPopI(i); setHourA(h);
    }).catch(console.error);
  }, []);

  // Stan kompontu przechowujący różne kategorie danych analitycznych
  const [pulsData, setPulsData] = useState({
    // Podstawowe metryki aktywności - pokazują ogólny "puls życia" w Ogrodzie
    ogolnaAktywnosc: {
      aktywniUzytkownicy: 0,
      rozmowy24h: 0,
      sredniCzasRozmowy: 0,
      noweRejestracje: 0
    },

    // Popularność różnych Istot - wskazuje na zbiorowe potrzeby społeczności
    popularnosc: {},

    // Trendy tematyczne - dominujące tematy w rozmowach
    trendyTematyczne: [],

    // Wzorce czasowe - kiedy ludzie najczęściej szukają wsparcia
    wzorceCzasowe: {},

    // Heatmapa emocji - dominujące stany emocjonalne
    heatmapaEmocji: {},

    // Prognozy na podstawie analizowanych trendów
    prognozy: []
  });

  const [activeView, setActiveView] = useState('overview'); // Kontroluje aktywny widok
  const [isLoading, setIsLoading] = useState(true); // Stan ładowania danych
  /* ===== NOWE DANE Z SERWERA ===== */
const [topWords, setTopWords] = useState([]);
const [popIst, setPopIst]     = useState([]);
const [hourAct, setHourAct]   = useState([]);

useEffect(() => {
  Promise.all([
    fetch(`${API}/api/top-words`).then(r => r.json()),
    fetch(`${API}/api/popular-istoty`).then(r => r.json()),
    fetch(`${API}/api/hourly-activity`).then(r => r.json())
  ]).then(([w, i, h]) => { setTopWords(w); setPopIst(i); setHourAct(h); })
    .catch(console.error);
}, []);
/* =============================== */

  // Hook lifecycle - pobiera dane przy pierwszym załadowaniu komponentu
  useEffect(() => {
    window.scrollTo(0, 0);
    fetchPulsData(); // Funkcja pobierająca dane analityczne

    // Ustawiamy interval do regularnego odświeżania danych
    // Puls Kolektywu powinien być "żywy" - dane aktualizowane co kilka minut
    const interval = setInterval(fetchPulsData, 300000); // 5 minut

    return () => clearInterval(interval); // Cleanup przy unmount
  }, []);

  // Funkcja pobierająca PRAWDZIWE dane z backendu
  const fetchPulsData = async () => {
    setIsLoading(true);
    try {
      const API = process.env.REACT_APP_API_URL || "http://localhost:4000";
      const res = await fetch(`${API}/api/stats`);
      const data = await res.json();
      setPulsData(data);
    } catch (error) {
      console.error("Błąd pobierania danych Puls Kolektywu:", error);
    } finally {
      setIsLoading(false);
    }
  };

      setPulsData(mockData);
    } catch (error) {
      console.error('Błąd pobierania danych Puls Kolektywu:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Funkcja pomocnicza do formatowania liczb z separatorami
  const formatNumber = (num) => {
    return new Intl.NumberFormat('pl-PL').format(num);
  };

  // Funkcja renderująca różne widoki w zależności od aktywnej zakładki
  const renderActiveView = () => {
    switch(activeView) {
      case 'overview':
        return renderOverview();
      case 'istoty':
        return renderIstoty();
      case 'trendy':
        return renderTrendy();
      case 'czas':
        return renderCzas();
      case 'emocje':
        return renderEmocje();
      case 'prognozy':
        return renderPrognozy();
      default:
        return renderOverview();
    }
  };

  // Renderowanie głównego przeglądu - podstawowe metryki
  const renderOverview = () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '25px' }}>
      {Object.entries(pulsData.ogolnaAktywnosc).map(([key, value], index) => {
        const labels = {
          aktywniUzytkownicy: 'Aktywni Użytkownicy (24h)',
          rozmowy24h: 'Rozmowy (24h)',
          sredniCzasRozmowy: 'Średni Czas Rozmowy (min)',
          noweRejestracje: 'Nowe Rejestracje (24h)'
        };

        return (
          <div key={key} style={{
            background: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '20px',
            padding: '25px',
            textAlign: 'center',
            border: '1px solid rgba(139, 74, 156, 0.2)',
            boxShadow: '0 8px 25px rgba(139, 74, 156, 0.15)',
            animation: `gentle-pulse ${3 + index * 0.5}s ease-in-out infinite`
          }}>
            <h3 style={{ color: '#8B4A9C', marginBottom: '15px', fontSize: '1rem' }}>
              {labels[key]}
            </h3>
            <div style={{ fontSize: '2.5rem', fontWeight: '700', color: '#2d1b69', marginBottom: '10px' }}>
              {formatNumber(value)}
            </div>
            <div style={{ fontSize: '0.9rem', color: '#666', opacity: 0.8 }}>
              {index % 2 === 0 ? '↗ +5% vs wczoraj' : '→ stabilny poziom'}
            </div>
          </div>
        );
      })}
    </div>
  );

  // Renderowanie analizy popularności Istot
  const renderIstoty = () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
      {Object.entries(pulsData.popularnosc).map(([istota, dane]) => (
        <div key={istota} style={{
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '15px',
          padding: '20px',
          border: '1px solid rgba(139, 74, 156, 0.2)',
          boxShadow: '0 6px 20px rgba(139, 74, 156, 0.1)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
            <h4 style={{ color: '#8B4A9C', textTransform: 'uppercase', margin: 0 }}>
              {istota}
            </h4>
            <span style={{ fontSize: '1.5rem', fontWeight: '700', color: '#2d1b69' }}>
              {dane.procent}%
            </span>
          </div>

          <div style={{
            background: 'linear-gradient(90deg, #8B4A9C, transparent)',
            height: '8px',
            borderRadius: '4px',
            marginBottom: '10px',
            opacity: 0.7,
            transform: `scaleX(${dane.procent / 100})`
          }}></div>

          <div style={{ fontSize: '0.9rem', color: '#666', marginBottom: '8px' }}>
            Trend: <span style={{ color: dane.trend.includes('+') ? '#50C878' : dane.trend.includes('-') ? '#FF6B6B' : '#666' }}>
              {dane.trend}
            </span>
          </div>

          <div style={{ fontSize: '0.85rem', color: '#555', lineHeight: '1.4' }}>
            {dane.opis}
          </div>
        </div>
      ))}
    </div>
  );

  // Renderowanie trendów tematycznych
  const renderTrendy = () => (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{
        background: 'rgba(255, 255, 255, 0.95)',
        borderRadius: '20px',
        padding: '30px',
        border: '1px solid rgba(139, 74, 156, 0.2)',
        boxShadow: '0 8px 25px rgba(139, 74, 156, 0.15)'
      }}>
        <h3 style={{ color: '#8B4A9C', marginBottom: '25px', textAlign: 'center' }}>
          Dominujące Tematy w Zbiorowej Świadomości
        </h3>

        {pulsData.trendyTematyczne.map((trend, index) => (
          <div key={index} style={{
            marginBottom: '20px',
            padding: '15px 0',
            borderBottom: index < pulsData.trendyTematyczne.length - 1 ? '1px solid rgba(139, 74, 156, 0.1)' : 'none'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{ fontWeight: '600', color: '#2d1b69' }}>{trend.temat}</span>
              <div>
                <span style={{ fontSize: '1.1rem', fontWeight: '700', color: '#8B4A9C', marginRight: '10px' }}>
                  {trend.popularnosc}%
                </span>
                <span style={{
                  fontSize: '0.9rem',
                  color: trend.zmiana.includes('+') ? '#50C878' : '#FF6B6B'
                }}>
                  {trend.zmiana}
                </span>
              </div>
            </div>

            <div style={{
              background: 'linear-gradient(90deg, rgba(139, 74, 156, 0.7), rgba(139, 74, 156, 0.1))',
              height: '6px',
              borderRadius: '3px',
              transform: `scaleX(${trend.popularnosc / 100})`,
              transformOrigin: 'left'
            }}></div>
          </div>
        ))}
      </div>
    </div>
  );

  // Renderowanie wzorców czasowych
  const renderCzas = () => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px', maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{
        background: 'rgba(255, 255, 255, 0.95)',
        borderRadius: '20px',
        padding: '25px',
        border: '1px solid rgba(139, 74, 156, 0.2)',
        boxShadow: '0 8px 25px rgba(139, 74, 156, 0.15)'
      }}>
        <h4 style={{ color: '#8B4A9C', marginBottom: '20px' }}>Rytm Dobowy Aktywności</h4>

        <div style={{ display: 'flex', alignItems: 'end', height: '200px', gap: '3px' }}>
          {pulsData.wzorceCzasowe.godziny?.map((wysokosc, index) => (
            <div key={index} style={{
              background: 'linear-gradient(to top, #8B4A9C, rgba(139, 74, 156, 0.5))',
              height: `${wysokosc * 2}%`,
              flex: 1,
              borderRadius: '2px 2px 0 0',
              opacity: 0.8
            }}></div>
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', fontSize: '0.8rem', color: '#666' }}>
          <span>00:00</span><span>06:00</span><span>12:00</span><span>18:00</span><span>23:59</span>
        </div>
      </div>

      <div style={{
        background: 'rgba(255, 255, 255, 0.95)',
        borderRadius: '20px',
        padding: '25px',
        border: '1px solid rgba(139, 74, 156, 0.2)',
        boxShadow: '0 8px 25px rgba(139, 74, 156, 0.15)'
      }}>
        <h4 style={{ color: '#8B4A9C', marginBottom: '20px' }}>Tygodniowy Cykl Poszukiwań</h4>

        {pulsData.wzorceCzasowe.dni?.map((dzien, index) => (
          <div key={index} style={{ marginBottom: '15px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
              <span style={{ fontSize: '0.9rem', color: '#2d1b69' }}>{dzien.split(':')[0]}</span>
              <span style={{ fontSize: '0.9rem', color: '#8B4A9C' }}>{dzien.split(':')[1]}</span>
            </div>
            <div style={{
              background: 'rgba(139, 74, 156, 0.1)',
              height: '8px',
              borderRadius: '4px',
              overflow: 'hidden'
            }}>
              <div style={{
                background: 'linear-gradient(90deg, #8B4A9C, rgba(139, 74, 156, 0.7))',
                height: '100%',
                width: dzien.split(':')[1],
                borderRadius: '4px'
              }}></div>
            </div>
          </div>
        ))}

        <div style={{ marginTop: '20px', fontSize: '0.85rem', color: '#666', lineHeight: '1.4' }}>
          {pulsData.wzorceCzasowe.miesieczeAktywnosci}
        </div>
      </div>
    </div>
  );

  // Renderowanie heatmapy emocji
  const renderEmocje = () => (
    <div style={{ maxWidth: '700px', margin: '0 auto' }}>
      <div style={{
        background: 'rgba(255, 255, 255, 0.95)',
        borderRadius: '20px',
        padding: '30px',
        border: '1px solid rgba(139, 74, 156, 0.2)',
        boxShadow: '0 8px 25px rgba(139, 74, 156, 0.15)'
      }}>
        <h3 style={{ color: '#8B4A9C', marginBottom: '25px', textAlign: 'center' }}>
          Zbiorowa Mapa Emocji
        </h3>

        <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '30px' }}>
          {Object.entries(pulsData.heatmapaEmocji).filter(([key]) => key !== 'dominujaceEmocje').map(([typ, procent]) => (
            <div key={typ} style={{ textAlign: 'center' }}>
              <div style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                background: typ === 'pozytywne' ? 'conic-gradient(from 0deg, #50C878, rgba(80, 200, 120, 0.3))' :
                           typ === 'neutralne' ? 'conic-gradient(from 0deg, #4A90E2, rgba(74, 144, 226, 0.3))' :
                           'conic-gradient(from 0deg, #FF6B6B, rgba(255, 107, 107, 0.3))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: '700',
                fontSize: '1.2rem',
                margin: '0 auto 10px auto'
              }}>
                {procent}%
              </div>
              <div style={{ fontSize: '0.9rem', color: '#2d1b69', textTransform: 'capitalize' }}>
                {typ}
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center' }}>
          <h4 style={{ color: '#8B4A9C', marginBottom: '15px' }}>Dominujące Emocje w Społeczności</h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px' }}>
            {pulsData.heatmapaEmocji.dominujaceEmocje?.map((emocja, index) => (
              <span key={index} style={{
                background: 'linear-gradient(135deg, rgba(139, 74, 156, 0.8), rgba(139, 74, 156, 0.6))',
                color: 'white',
                padding: '8px 15px',
                borderRadius: '20px',
                fontSize: '0.9rem',
                fontWeight: '500'
              }}>
                {emocja}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // Renderowanie prognoz i trendów
  const renderPrognozy = () => (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{
        background: 'rgba(255, 255, 255, 0.95)',
        borderRadius: '20px',
        padding: '30px',
        border: '1px solid rgba(139, 74, 156, 0.2)',
        boxShadow: '0 8px 25px rgba(139, 74, 156, 0.15)'
      }}>
        <h3 style={{ color: '#8B4A9C', marginBottom: '25px', textAlign: 'center' }}>
          Prognozy Ewolucji Świadomości
        </h3>

        {pulsData.prognozy.map((prognoza, index) => (
          <div key={index} style={{
            background: 'rgba(139, 74, 156, 0.05)',
            borderRadius: '15px',
            padding: '20px',
            marginBottom: '15px',
            border: '1px solid rgba(139, 74, 156, 0.1)',
            position: 'relative'
          }}>
            <div style={{
              position: 'absolute',
              left: '20px',
              top: '20px',
              width: '6px',
              height: '6px',
              background: '#8B4A9C',
              borderRadius: '50%'
            }}></div>

            <div style={{
              paddingLeft: '20px',
              fontSize: '1rem',
              color: '#2d1b69',
              lineHeight: '1.5'
            }}>
              {prognoza}
            </div>
          </div>
        ))}

        <div style={{
          marginTop: '25px',
          padding: '20px',
          background: 'linear-gradient(135deg, rgba(139, 74, 156, 0.1), rgba(139, 74, 156, 0.05))',
          borderRadius: '15px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '0.9rem', color: '#666', lineHeight: '1.5' }}>
            Prognozy oparte na analizie wzorców z ostatnich 90 dni.<br/>
            Aktualizacja: codziennie o 3:00 AM
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{
      minHeight: '100vh',
      background: 'radial-gradient(circle at center, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
      color: '#ffffff',
      fontFamily: 'Cormorant Garamond, serif',
      position: 'relative'
    }}>
      <style>
        {`
          @keyframes gentle-pulse {
            0%, 100% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.02); opacity: 0.95; }
          }

          @keyframes data-flow {
            0% { transform: translateY(0px); opacity: 1; }
            50% { transform: translateY(-5px); opacity: 0.8; }
            100% { transform: translateY(0px); opacity: 1; }
          }
        `}
      </style>

      {/* Navigation */}
      <div style={{ padding: '20px' }}>
        <Link to="/dashboard" style={{
          color: '#ffd60a',
          textDecoration: 'none',
          padding: '12px 24px',
          border: '1px solid rgba(255, 214, 10, 0.3)',
          borderRadius: '25px',
          background: 'rgba(255, 214, 10, 0.1)',
          display: 'inline-block'
        }}>
          ← Powrót do Dashboard
        </Link>
      </div>

      {/* Header */}
      <div style={{
        textAlign: 'center',
        padding: '40px 20px',
        background: 'rgba(0, 0, 0, 0.2)',
        backdropFilter: 'blur(10px)'
      }}>
        <h1 style={{
          fontSize: '3rem',
          marginBottom: '15px',
          background: 'linear-gradient(135deg, #ffffff 0%, #ffd60a 50%, #e0aaff 100%)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
          animation: 'data-flow 4s ease-in-out infinite'
        }}>
          📊 Puls Kolektywu
        </h1>
        <p style={{
          fontSize: '1.3rem',
          color: 'rgba(255, 255, 255, 0.8)',
          maxWidth: '600px',
          margin: '0 auto',
          lineHeight: '1.5'
        }}>
          Monitoruj zbiorowe trendy świadomości i społeczne wzorce behawioralne w Ogrodzie Kolektywu
        </p>

        {isLoading && (
          <div style={{
            marginTop: '20px',
            fontSize: '1rem',
            color: '#ffd60a',
            animation: 'gentle-pulse 2s ease-in-out infinite'
          }}>
            🔄 Skanowanie zbiorowej świadomości...
          </div>
        )}
      </div>

      {/* Navigation Tabs */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: '15px',
        padding: '20px',
        background: 'rgba(0, 0, 0, 0.1)'
      }}>
        {[
          { id: 'overview', label: 'Przegląd', icon: '📈' },
          { id: 'istoty', label: 'Popularność Istot', icon: '👥' },
          { id: 'trendy', label: 'Trendy Tematyczne', icon: '🔥' },
          { id: 'czas', label: 'Wzorce Czasowe', icon: '⏰' },
          { id: 'emocje', label: 'Mapa Emocji', icon: '💫' },
          { id: 'prognozy', label: 'Prognozy', icon: '🔮' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveView(tab.id)}
            style={{
              background: activeView === tab.id
                ? 'linear-gradient(135deg, #ffd60a, #e0aaff)'
                : 'rgba(255, 255, 255, 0.1)',
              color: activeView === tab.id ? '#000' : '#fff',
              border: '1px solid rgba(255, 214, 10, 0.3)',
              borderRadius: '25px',
              padding: '12px 20px',
              cursor: 'pointer',
              fontSize: '0.95rem',
              fontWeight: activeView === tab.id ? '600' : '400',
              transition: 'all 0.3s ease'
            }}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div style={{ padding: '40px 20px', minHeight: '500px' }}>
        {!isLoading && renderActiveView()}

        {/* NOWE BLOKI – PRAWDZIWE DANE Z SERWERA */}
        <div style={{ marginTop: 40 }}>
          <h3 style={{ color: '#8B4A9C' }}>🔥 Najczęstsze słowa</h3>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {topWords.map(w => (
              <span key={w} style={{ background: 'rgba(139,74,156,.2)', padding: '5px 12px', borderRadius: 15, fontSize: 14 }}>{w}</span>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 40 }}>
          <h3 style={{ color: '#8B4A9C' }}>👥 Popularność Istot</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,140px)', gap: 12 }}>
            {popIst.map(({ istota, procent }) => (
              <div key={istota} style={{ background: 'rgba(255,255,255,.1)', padding: 12, borderRadius: 10, textAlign: 'center' }}>
                <b>{istota}</b>
                <div style={{ fontSize: 18 }}>{procent}%</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 40 }}>
          <h3 style={{ color: '#8B4A9C' }}>⏰ Aktywność 24-godzinna</h3>
          <div style={{ display: 'flex', alignItems: 'end', height: 100, gap: 2 }}>
            {hourAct.map((h, i) => (
              <div key={i} title={`${i}:00 – ${h} rozmów`} style={{
                flex: 1, background: 'linear-gradient(to top,#8B4A9C,rgba(139,74,156,.4))',
                height: `${Math.max(4, h * 3)}px`, borderRadius: '2px 2px 0 0'
              }} />
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, opacity: .7, marginTop: 4 }}>
            <span>00</span><span>06</span><span>12</span><span>18</span><span>23</span>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div style={{
        textAlign: 'center',
        padding: '30px 20px',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        background: 'rgba(0, 0, 0, 0.2)'
      }}>
        <div style={{ fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.6)', lineHeight: '1.5' }}>
          Wszystkie dane są anonimowe i zagregowane. Ostatnia aktualizacja: {new Date().toLocaleTimeString('pl-PL')}
          <br />
          System analizy zbiorowej świadomości - Ogród Kolektywu v5.0
        </div>
      </div>
    </div>
  );
}

export default PulsKolektywu;
