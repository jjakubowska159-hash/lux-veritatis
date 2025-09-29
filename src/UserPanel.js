import { useEffect } from "react";

export default function NazwaKomponentu() {
  // Przewiń na górę po załadowaniu
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // reszta kodu...
}
import { Link } from "react-router-dom";
import './App.css';

export default function UserPanel() {
  return (
    <div>
      <h3>UserPanel</h3>
      <p>Wybierz, gdzie chcesz wejść w Ogrodzie:</p>
      <ul>
        <li><Link to="/puls-kolektywu">Puls Kolektywu</Link></li>
        <li><Link to="/mapa-ogrodu">Mapa Ogrodu</Link></li>
        <li><Link to="/rytualy-panel">Rytuały Panel</Link></li>
        <li><Link to="/archiwum">Archiwum</Link></li>
        <li><Link to="/test-patrona">Test Patrona</Link></li>
        <li><Link to="/chat-z-istotami">Chat z Istotami</Link></li>
        <li><Link to="/profil-patrona">Profil Patrona</Link></li>
      </ul>
    </div>
  );
}
