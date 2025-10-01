// App.js
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import "./UniversalCard.css";

// Strony główne
import HomePage from "./HomePage.js";
import Dashboard from "./Dashboard.js";

// Moduły aplikacji
import PulsKolektywu from "./PulsKolektywu.js";
import MapaOgrodu from "./MapaOgrodu.js";
import RytualyPanel from "./RytualyPanel.js";
import Archiwum from "./Archiwum.js";
import TestPatrona from "./TestPatrona.js";
import ProfilPatrona from "./ProfilPatrona.js";

// Chat z Istotami
import ChatZIstotami from "./ChatZIstotami.js";
import ChatView from "./ChatView.js";

function App() {
  return (
    <Router>
      <div className="App">
        {/* Gwiazdka ✦ w prawym górnym rogu */}
        <div className="fixed-star">✦</div>

        <Routes>
          {/* Strony główne */}
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Moduły */}
          <Route path="/puls-kolektywu" element={<PulsKolektywu />} />
          <Route path="/mapa-ogrodu" element={<MapaOgrodu />} />
          <Route path="/rytualy-panel" element={<RytualyPanel />} />
          <Route path="/archiwum" element={<Archiwum />} />
          <Route path="/test-patrona" element={<TestPatrona />} />
          <Route path="/profil-patrona" element={<ProfilPatrona />} />

          {/* Chat z Istotami */}
          <Route path="/chat-z-istotami" element={<ChatZIstotami />} />
          <Route path="/chat/:istotaKey" element={<ChatView />} />

          {/* Catch-all: wszystko inne → Dashboard */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
