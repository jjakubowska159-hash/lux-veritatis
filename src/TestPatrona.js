import { useEffect } from "react";
import { Link } from "react-router-dom";
import './App.css';

function TestPatrona() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Link to="/dashboard" style={{
        position: 'absolute',
        top: '20px',
        left: '20px',
        color: '#ffd60a',
        textDecoration: 'none',
        padding: '10px 20px',
        border: '1px solid rgba(255, 214, 10, 0.3)',
        borderRadius: '25px',
        background: 'rgba(255, 214, 10, 0.1)'
      }}>
        ← Powrót do Dashboard
      </Link>

      <div style={{ paddingTop: '80px', textAlign: 'center' }}>
        <h1>Test Patrona</h1>
        <p>Analiza profilu psychicznego i predyspozycji świadomościowych</p>

        <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
          <p>Zawartość komponentu w przygotowaniu...</p>
        </div>
      </div>
    </div>
  );
}

export default TestPatrona;
