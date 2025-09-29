import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import "./UniversalCard.css";

// Strony główne
import HomePage from "./HomePage";
import Dashboard from "./Dashboard";

// Moduły aplikacji
import PulsKolektywu from "./PulsKolektywu";
import MapaOgrodu from "./MapaOgrodu";
import RytualyPanel from "./RytualyPanel";
import Archiwum from "./Archiwum";
import TestPatrona from "./TestPatrona";
import ProfilPatrona from "./ProfilPatrona";

// Chat z Istotami (wybór + interfejs rozmowy)
import ChatZIstotami from "./ChatZIstotami";
import ChatView from "./ChatView";

function App() {
  return (
    <Router>
      <div className="App">
        {/* Globalna gwiazdka na wszystkich stronach */}
        <div className="fixed-star">✦</div>

        <Routes>
          {/* Strona główna */}
          <Route path="/" element={<HomePage />} />

          {/* Dashboard */}
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Moduły aplikacji */}
          <Route path="/puls-kolektywu" element={<PulsKolektywu />} />
          <Route path="/mapa-ogrodu" element={<MapaOgrodu />} />
          <Route path="/rytualy-panel" element={<RytualyPanel />} />
          <Route path="/archiwum" element={<Archiwum />} />
          <Route path="/test-patrona" element={<TestPatrona />} />
          <Route path="/profil-patrona" element={<ProfilPatrona />} />

          {/* Chat z Istotami */}
          <Route path="/chat-z-istotami" element={<ChatZIstotami />} />
          <Route path="/chat/:istotaKey" element={<ChatView />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
