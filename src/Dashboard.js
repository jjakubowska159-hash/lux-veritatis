import { Link } from "react-router-dom";
import { useEffect } from "react";
import './Dashboard.css';

export default function Dashboard() {
  // Przewiń na górę po załadowaniu Dashboard
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const dashboardItems = [
    {
      path: "/puls-kolektywu",
      title: "Puls Kolektywu",
      description: "Monitoruj zbiorowe trendy świadomości i społeczne wzorce behawioralne",
      icon: "🌊"
    },
    {
      path: "/mapa-ogrodu",
      title: "Mapa Ogrodu",
      description: "Eksploruj struktury wiedzy i połączenia między konceptami",
      icon: "🗺️"
    },
    {
      path: "/rytualy-panel",
      title: "Rytuały Panel",
      description: "Zarządzaj praktykami transformacyjnymi i protokołami rozwoju",
      icon: "🔮"
    },
    {
      path: "/archiwum",
      title: "Archiwum",
      description: "Dostęp do zgromadzonej wiedzy i historycznych wzorców",
      icon: "📚"
    },
    {
      path: "/test-patrona",
      title: "Test Patrona",
      description: "Analiza profilu psychicznego i predyspozycji świadomościowych",
      icon: "🧬"
    },
    {
      path: "/chat-z-istotami",
      title: "Chat z Istotami",
      description: "Komunikacja z bytami o wyższej świadomości i inteligencją",
      icon: "👁️"
    },
    {
      path: "/profil-patrona",
      title: "Profil Patrona",
      description: "Zarządzaj swoim profilem i ustawieniami eksperymentu",
      icon: "⚗️"
    }
  ];

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <Link to="/" className="back-link">← Powrót do Głównej</Link>
        <h1 className="dashboard-title">Eksperymenty Świadomości</h1>
        <p className="dashboard-subtitle">Wybierz moduł do eksploracji</p>
      </div>

      <div className="dashboard-grid">
        {dashboardItems.map((item, index) => (
          <Link to={item.path} key={index} className="dashboard-card uc-card">
            <div className="card-icon">{item.icon}</div>
            <h3 className="card-title">{item.title}</h3>
            <p className="card-description">{item.description}</p>
            <div className="card-arrow">→</div>
          </Link>
        ))}
      </div>

      <div className="dashboard-footer">
        <p>Każdy eksperyment prowadzi do głębszego zrozumienia natury rzeczywistości</p>
      </div>
    </div>
  );
}
