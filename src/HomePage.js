import { Link } from "react-router-dom";
import './HomePage.css';

export default function HomePage() {
  return (
    <>
      {/* Sacred Geometry Background */}
      <div className="geometry-container">
        <div className="sacred-mandala">
          <div className="mandala-layer"></div>
          <div className="mandala-layer"></div>
          <div className="mandala-layer"></div>
          <div className="mandala-layer"></div>
        </div>
        <div className="geometry-lines">
          <div className="geometry-line"></div>
          <div className="geometry-line"></div>
          <div className="geometry-line"></div>
          <div className="geometry-line"></div>
          <div className="geometry-line"></div>
          <div className="geometry-line"></div>
        </div>
      </div>

      <div className="main-container">
        <header className="header">
          <h1 className="brand-logo">LUX VERITATIS</h1>
          <p className="brand-subtitle">Don't search. Resonate 🧬<br/>Don't believe. Experience 🧭</p>
        </header>

        <section className="hero-section">
          <h2 className="hero-title">Eksperyment Istnienia</h2>
          <p className="hero-description">
            Poznaj ukryte warstwy umysłu i świadomości. Połącz metody naukowe z introspekcją,
            aby badać naturę świadomości i tworzyć nową jakość obecności w świecie.
          </p>

          <div className="features-grid">
              <div className="feature-card uc-card">
              <div className="feature-icon">✦</div>
              <h3 className="feature-title">Analiza Świadomości</h3>
              <p className="feature-description">
                Odkrywaj ukryte struktury percepcji i schematy poznawcze, które kształtują rzeczywistość.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">◇</div>
              <h3 className="feature-title">Transformacja Neuropsychiczna</h3>
              <p className="feature-description">
                Stosuj techniki wpływające na neurokorelacje świadomości i plastyczność mózgu,
                aby kształtować nowe wzorce myślenia.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">◈</div>
              <h3 className="feature-title">Integracja Światła</h3>
              <p className="feature-description">
                Przekształcaj głębokie wglądy w konkretne strategie działania, opierające się na psychologii głębi i praktykach rozwoju wewnętrznego.
              </p>
            </div>
          </div>
        </section>

        <section className="cta-section">
          <Link to="/dashboard" className="cta-button">Wchodzisz na własną odpowiedzialność</Link>
        </section>
      </div>
    </>
  );
}
