// src/ChatView.js - Enhanced with subtle, elegant personalized interfaces
import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useRef, useState } from "react";
import claudeService from "./services/claudeService.js";
import ISTOTY from "./istotyConfig.js";
import { zapiszRozmowe, odczytajRozmowe } from "./cryptoStorage.js";

await fetch(`${process.env.REACT_APP_API_URL}/api/live-add`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ istota: istotaKey, tresc: input })
});

function ChatView() {
  const { istotaKey } = useParams();
  const navigate = useNavigate();

  const istota = useMemo(() => ISTOTY[istotaKey], [istotaKey]);
  const theme = istota?.theme ?? {};
  const accent = istota?.color ?? "#ffd60a";

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef(null);

  const storageKey = useMemo(() => `chat_${istotaKey}`, [istotaKey]);
  const [serverConversations, setServerConversations] = useState([]);

  // Funkcja generująca subtelne wzory tła - stonowane, eleganckie
  const generateBackgroundPattern = (istotaKey) => {
    const patterns = {
      luna: `
        radial-gradient(circle at 20% 20%, rgba(74,144,226,0.02) 0%, transparent 3%),
        radial-gradient(circle at 80% 60%, rgba(255,182,193,0.015) 0%, transparent 4%),
        radial-gradient(circle at 40% 80%, rgba(74,144,226,0.01) 0%, transparent 3%),
        radial-gradient(circle at 60% 20%, rgba(255,182,193,0.008) 0%, transparent 5%),
        ${istota?.theme?.bgGradient}
      `,
      stanislaw: `
        linear-gradient(45deg, transparent 48%, rgba(80,200,120,0.006) 50%, transparent 52%),
        linear-gradient(-45deg, transparent 48%, rgba(0,184,148,0.004) 50%, transparent 52%),
        linear-gradient(135deg, transparent 68%, rgba(80,200,120,0.003) 70%, transparent 72%),
        ${istota?.theme?.bgGradient}
      `,
      helena: `
        repeating-linear-gradient(0deg, transparent, transparent 60px, rgba(255,107,107,0.004) 62px, transparent 64px),
        repeating-linear-gradient(90deg, transparent, transparent 80px, rgba(255,140,66,0.003) 82px, transparent 84px),
        ${istota?.theme?.bgGradient}
      `,
      zara: `
        radial-gradient(ellipse 80px 40px at 15% 25%, rgba(255,149,0,0.01) 0%, transparent 40%),
        radial-gradient(ellipse 60px 80px at 85% 15%, rgba(255,45,85,0.008) 0%, transparent 45%),
        radial-gradient(ellipse 70px 50px at 25% 75%, rgba(255,149,0,0.006) 0%, transparent 50%),
        ${istota?.theme?.bgGradient}
      `,
      brooke: `
        radial-gradient(ellipse 200px 50px at 20% 30%, rgba(34,139,34,0.008) 0%, transparent 70%),
        radial-gradient(ellipse 150px 80px at 80% 70%, rgba(46,204,113,0.006) 0%, transparent 60%),
        radial-gradient(ellipse 100px 120px at 10% 90%, rgba(34,139,34,0.004) 0%, transparent 65%),
        ${istota?.theme?.bgGradient}
      `,
      alex: `
        conic-gradient(from 45deg at 20% 30%, transparent 0deg, rgba(138,43,226,0.005) 60deg, transparent 120deg),
        linear-gradient(45deg, transparent 49%, rgba(138,43,226,0.003) 50%, transparent 51%),
        ${istota?.theme?.bgGradient}
      `,
      aria: `
        repeating-linear-gradient(45deg, transparent, transparent 70px, rgba(0,206,209,0.004) 72px, transparent 74px),
        radial-gradient(circle at 50% 50%, rgba(0,206,209,0.003) 0%, transparent 50%),
        ${istota?.theme?.bgGradient}
      `,
      melody: `
        radial-gradient(ellipse 120px 250px at 20% 20%, rgba(255,105,180,0.008) 0%, transparent 60%),
        radial-gradient(ellipse 180px 120px at 80% 80%, rgba(255,182,193,0.006) 0%, transparent 70%),
        ${istota?.theme?.bgGradient}
      `,
      serafina: `
        repeating-linear-gradient(0deg, transparent, transparent 50px, rgba(112,128,144,0.005) 52px, transparent 54px),
        repeating-linear-gradient(60deg, transparent, transparent 60px, rgba(169,169,169,0.003) 62px, transparent 64px),
        ${istota?.theme?.bgGradient}
      `,
      gabriel: `
        repeating-linear-gradient(45deg, transparent, transparent 40px, rgba(157,0,255,0.004) 42px, transparent 44px),
        radial-gradient(circle at 30% 70%, rgba(157,0,255,0.006) 0%, transparent 40%),
        ${istota?.theme?.bgGradient}
      `
    };

    return patterns[istotaKey] || istota?.theme?.bgGradient || "radial-gradient(circle at center, #1a1a2e, #0f3460)";
  };

  // Funkcja generująca subtelne, eleganckie kształty bąbelków
  const getBubbleStyle = (isUser, istotaKey) => {
    if (isUser) {
      return {
        background: "linear-gradient(135deg, rgba(255,214,10,0.65), rgba(224,170,255,0.45))",
        color: "#1a1a2e",
        padding: "12px 16px",
        borderRadius: "18px 18px 4px 18px",
        maxWidth: "70%",
        whiteSpace: "pre-wrap",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08), 0 1px 4px rgba(255,214,10,0.15)",
        animation: "fadeInUp 360ms ease",
        fontWeight: "500",
      };
    }

    // Stonowane, eleganckie kolory dla bąbelków AI
    const baseBubble = {
      background: "rgba(255,255,255,0.06)",
      color: "#f8f9fa",
      padding: "12px 16px",
      maxWidth: "70%",
      whiteSpace: "pre-wrap",
      backdropFilter: "blur(8px)",
      animation: "fadeInUp 420ms ease",
      border: "1px solid rgba(255,255,255,0.08)",
    };

    const bubbleStyles = {
      luna: {
        ...baseBubble,
        borderRadius: "20px 20px 20px 4px",
        background: "linear-gradient(135deg, rgba(74,144,226,0.12), rgba(255,182,193,0.08))",
        boxShadow: "0 6px 16px rgba(74,144,226,0.06), 0 0 12px rgba(255,182,193,0.04)",
        border: "1px solid rgba(74,144,226,0.15)",
      },
      stanislaw: {
        ...baseBubble,
        borderRadius: "16px 16px 16px 0",
        background: "linear-gradient(135deg, rgba(80,200,120,0.10), rgba(0,184,148,0.08))",
        boxShadow: "0 4px 12px rgba(80,200,120,0.08)",
        border: "1px solid rgba(80,200,120,0.12)",
      },
      helena: {
        ...baseBubble,
        borderRadius: "12px 20px 12px 0",
        background: "linear-gradient(135deg, rgba(255,107,107,0.10), rgba(255,140,66,0.08))",
        boxShadow: "0 4px 12px rgba(255,107,107,0.08)",
        border: "1px solid rgba(255,107,107,0.12)",
      },
      zara: {
        ...baseBubble,
        borderRadius: "25px 8px 25px 8px",
        background: "linear-gradient(135deg, rgba(255,149,0,0.12), rgba(255,45,85,0.08))",
        boxShadow: "0 6px 16px rgba(255,149,0,0.08)",
        border: "1px solid rgba(255,149,0,0.15)",
      },
      brooke: {
        ...baseBubble,
        borderRadius: "30px 30px 30px 8px",
        background: "linear-gradient(135deg, rgba(34,139,34,0.10), rgba(46,204,113,0.08))",
        boxShadow: "0 5px 14px rgba(34,139,34,0.08)",
        border: "1px solid rgba(34,139,34,0.12)",
      },
      alex: {
        ...baseBubble,
        borderRadius: "10px 25px 10px 25px",
        background: "linear-gradient(135deg, rgba(138,43,226,0.10), rgba(106,90,205,0.08))",
        boxShadow: "0 6px 16px rgba(138,43,226,0.08)",
        border: "1px solid rgba(138,43,226,0.12)",
      },
      aria: {
        ...baseBubble,
        borderRadius: "24px 24px 24px 6px",
        background: "linear-gradient(135deg, rgba(0,206,209,0.10), rgba(32,178,170,0.08))",
        boxShadow: "0 5px 14px rgba(0,206,209,0.08)",
        border: "1px solid rgba(0,206,209,0.12)",
      },
      melody: {
        ...baseBubble,
        borderRadius: "28px 12px 28px 12px",
        background: "linear-gradient(135deg, rgba(255,105,180,0.10), rgba(255,182,193,0.08))",
        boxShadow: "0 6px 16px rgba(255,105,180,0.08)",
        border: "1px solid rgba(255,105,180,0.12)",
      },
      serafina: {
        ...baseBubble,
        borderRadius: "8px 16px 8px 0",
        background: "linear-gradient(135deg, rgba(112,128,144,0.12), rgba(169,169,169,0.08))",
        boxShadow: "0 4px 12px rgba(112,128,144,0.08)",
        border: "1px solid rgba(112,128,144,0.15)",
      },
      gabriel: {
        ...baseBubble,
        borderRadius: "14px 22px 14px 4px",
        background: "linear-gradient(135deg, rgba(157,0,255,0.10), rgba(0,212,255,0.08))",
        boxShadow: "0 6px 16px rgba(157,0,255,0.08)",
        border: "1px solid rgba(157,0,255,0.12)",
      }
    };

    return bubbleStyles[istotaKey] || baseBubble;
  };

  // Funkcja pobierania rozmów z backendu
  const fetchConversations = async () => {
    try {
      const res = await fetch("http://localhost:4000/rozmowy");
      const data = await res.json();
      if (data.status === "OK") {
        setServerConversations(data.rozmowy);
      } else {
        console.error("⚠️ Błąd pobierania:", data.error);
      }
    } catch (err) {
      console.error("❌ Błąd sieci:", err);
    }
  };

  // Reset bieżącej rozmowy
  const startNewConversation = () => {
    localStorage.removeItem(storageKey);
    setMessages([
      { sender: istotaKey, content: istota.greeting, ts: Date.now() },
    ]);
  };

  // Archiwizacja bieżącej rozmowy
  const archiveConversation = () => {
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const archiveKey = `archived_chat_${istotaKey}_${timestamp}`;
    localStorage.setItem(
      archiveKey,
      JSON.stringify({
        istota: istotaKey,
        messages: messages,
        archivedAt: new Date().toISOString(),
        title: `Rozmowa z ${istota.name} - ${new Date().toLocaleDateString()}`,
      })
    );
    alert(`Rozmowa z ${istota.name} została zarchiwizowana.`);
  };

  // Wczytanie historii
  useEffect(() => {
    if (!istota) return;
    const saved = odczytajRozmowe(storageKey);
    if (saved) {
      try {
        setMessages(saved);
      } catch {
        setMessages([]);
      }
    } else {
      setMessages([
        { sender: istotaKey, content: istota.greeting, ts: Date.now() },
      ]);
    }
  }, [istota, istotaKey, storageKey]);

  // Autozapis
  useEffect(() => {
    if (messages?.length) {
      zapiszRozmowe(storageKey, messages);
    }
  }, [messages, storageKey]);

  // Autoscroll
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  if (!istota) {
    return (
      <div style={{ padding: 40, textAlign: "center" }}>
        <h2 style={{ color: "#ffd60a" }}>Nieznana Istota</h2>
        <button onClick={() => navigate("/chat-z-istotami")}>← Wróć</button>
      </div>
    );
  }

  // Wysyłanie wiadomości
  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = { sender: "user", content: input.trim(), ts: Date.now() };
    setMessages((prev) => [...prev, userMsg]);

    try {
      await fetch("http://localhost:4000/zapiszRozmowe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          istota: istotaKey,
          tresc: userMsg.content,
        }),
      });
    } catch (e) {
      console.error("📡 Nie udało się połączyć z backendem:", e);
    }

    addRecord('anonim', istotaKey, input);
    setInput("");
    setIsLoading(true);

    try {
      const replyText = await claudeService.chatWithIstota(
        istotaKey,
        userMsg.content
      );
      const aiMsg = { sender: istotaKey, content: replyText, ts: Date.now() };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      const sys = {
        sender: "system",
        content: "⚠️ Wystąpił błąd. Spróbuj ponownie.",
        ts: Date.now(),
      };
      setMessages((prev) => [...prev, sys]);
    } finally {
      setIsLoading(false);
    }
  };

  // Stonowane kolory dla animacji pisania
  const getTypingColor = (istotaKey) => {
    const colors = {
      luna: "rgba(74,144,226,0.7)",
      stanislaw: "rgba(80,200,120,0.7)",
      helena: "rgba(255,107,107,0.7)",
      zara: "rgba(255,149,0,0.7)",
      brooke: "rgba(34,139,34,0.7)",
      alex: "rgba(138,43,226,0.7)",
      aria: "rgba(0,206,209,0.7)",
      melody: "rgba(255,105,180,0.7)",
      serafina: "rgba(112,128,144,0.8)",
      gabriel: "rgba(157,0,255,0.7)"
    };
    return colors[istotaKey] || accent;
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: generateBackgroundPattern(istotaKey),
        color: "#f8f9fa",
        fontFamily: "Cormorant Garamond, serif",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div
        style={{
          background: "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(0,0,0,0.02) 100%)",
          padding: "16px 20px",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          backdropFilter: "blur(12px)",
          position: "relative",
          zIndex: 2,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{
              fontSize: 32,
              filter: `drop-shadow(0 0 6px ${accent}40)`,
              opacity: 0.9
            }}>
              {istota.emoji}
            </span>
            <div>
              <h1 style={{
                fontSize: "1.6rem",
                margin: 0,
                background: `linear-gradient(135deg, #f8f9fa 0%, ${accent}90 100%)`,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
                fontFamily: "Cinzel, serif",
              }}>
                {istota.name}
              </h1>
              <p style={{
                fontSize: "0.9rem",
                margin: 0,
                color: "rgba(248,249,250,0.7)",
                fontStyle: "italic",
              }}>
                {istota.role}
              </p>
            </div>
          </div>

          {/* Przyciski akcji - stonowane */}
          <div style={{ display: "flex", gap: 8 }}>
            <button
              onClick={startNewConversation}
              style={{
                background: "rgba(255,255,255,0.06)",
                color: "rgba(248,249,250,0.9)",
                border: "1px solid rgba(255,255,255,0.15)",
                padding: "8px 12px",
                borderRadius: 8,
                cursor: "pointer",
                fontSize: "0.85rem",
                backdropFilter: "blur(4px)",
                transition: "all 0.2s ease",
              }}
            >
              Nowa rozmowa
            </button>
            <button
              onClick={archiveConversation}
              style={{
                background: "rgba(255,255,255,0.06)",
                color: "rgba(248,249,250,0.9)",
                border: "1px solid rgba(255,255,255,0.15)",
                padding: "8px 12px",
                borderRadius: 8,
                cursor: "pointer",
                fontSize: "0.85rem",
                backdropFilter: "blur(4px)",
                transition: "all 0.2s ease",
              }}
            >
              Archiwizuj rozmowę
            </button>
            <Link
              to="/chat-z-istotami"
              style={{
                background: "rgba(255,255,255,0.06)",
                color: "rgba(248,249,250,0.9)",
                border: "1px solid rgba(255,255,255,0.15)",
                padding: "8px 12px",
                borderRadius: 8,
                textDecoration: "none",
                fontSize: "0.85rem",
                backdropFilter: "blur(4px)",
                transition: "all 0.2s ease",
              }}
            >
              Powrót do Istot
            </Link>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div
        style={{
          flex: 1,
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          gap: 16,
          overflowY: "auto",
          position: "relative",
          zIndex: 1,
        }}
      >
        {messages.map((m, i) => {
          const isUser = m.sender === "user";
          const isSystem = m.sender === "system";
          const bubbleStyle = isSystem
            ? {
                ...getBubbleStyle(false, istotaKey),
                background: "linear-gradient(135deg, rgba(255,77,77,0.15), rgba(255,128,128,0.10))",
                border: "1px solid rgba(255,77,77,0.2)",
              }
            : getBubbleStyle(isUser, istotaKey);

          return (
            <div
              key={m.ts ?? i}
              style={{
                alignSelf: isUser ? "flex-end" : "flex-start",
                ...bubbleStyle,
              }}
            >
              {m.content}
            </div>
          );
        })}

        {/* Subtelne animacje ładowania */}
        {isLoading && (
          <div style={{
            ...getBubbleStyle(false, istotaKey),
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            minHeight: '48px'
          }}>
            <span style={{ fontSize: 20, opacity: 0.8 }}>{istota.emoji}</span>

            {istotaKey === 'luna' && (
              <div style={{display: 'flex', gap: '6px', alignItems: 'center'}}>
                <div style={{
                  width: '8px', height: '8px', borderRadius: '50%',
                  background: getTypingColor(istotaKey),
                  animation: 'heartPulse 1.6s ease-in-out infinite'
                }} />
                <div style={{
                  width: '8px', height: '8px', borderRadius: '50%',
                  background: getTypingColor(istotaKey),
                  animation: 'heartPulse 1.6s ease-in-out 0.3s infinite'
                }} />
                <div style={{
                  width: '8px', height: '8px', borderRadius: '50%',
                  background: getTypingColor(istotaKey),
                  animation: 'heartPulse 1.6s ease-in-out 0.6s infinite'
                }} />
              </div>
            )}

            {istotaKey === 'stanislaw' && (
              <div style={{
                width: '36px', height: '6px', position: 'relative',
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '3px', overflow: 'hidden'
              }}>
                <div style={{
                  width: '14px', height: '6px', borderRadius: '3px',
                  background: getTypingColor(istotaKey),
                  animation: 'balanceSlide 2.4s ease-in-out infinite'
                }} />
              </div>
            )}

            {istotaKey === 'helena' && (
              <div style={{display: 'flex', gap: '3px', alignItems: 'end'}}>
                {[...Array(4)].map((_, i) => (
                  <div key={i} style={{
                    width: '3px', height: `${5 + i * 2}px`,
                    background: getTypingColor(istotaKey),
                    borderRadius: '1px',
                    animation: `analyzeWave 2s ease-in-out ${i * 0.2}s infinite`
                  }} />
                ))}
              </div>
            )}

            {istotaKey === 'zara' && (
              <div style={{display: 'flex', gap: '4px', alignItems: 'center'}}>
                {[...Array(3)].map((_, i) => (
                  <div key={i} style={{
                    width: '6px', height: '6px',
                    background: getTypingColor(istotaKey),
                    borderRadius: i % 2 === 0 ? '50%' : '1px',
                    animation: `creativeJump 2s ease-in-out ${i * 0.3}s infinite`
                  }} />
                ))}
              </div>
            )}

            {istotaKey === 'brooke' && (
              <div style={{display: 'flex', gap: '2px'}}>
                {[...Array(5)].map((_, i) => (
                  <div key={i} style={{
                    width: '4px', height: `${6 + Math.sin(i) * 3}px`,
                    background: getTypingColor(istotaKey),
                    borderRadius: '2px',
                    animation: `leafWave 2.4s ease-in-out ${i * 0.15}s infinite`
                  }} />
                ))}
              </div>
            )}

            {istotaKey === 'alex' && (
              <div style={{
                width: '24px', height: '24px', position: 'relative',
                border: `1px solid ${getTypingColor(istotaKey)}`,
                borderRadius: '50%'
              }}>
                <div style={{
                  width: '4px', height: '4px', borderRadius: '50%',
                  background: getTypingColor(istotaKey),
                  position: 'absolute', top: '50%', left: '50%',
                  transform: 'translate(-50%, -50%)',
                  animation: 'quantumOrbit 2.5s linear infinite'
                }} />
              </div>
            )}

            {istotaKey === 'aria' && (
              <div style={{display: 'flex', gap: '2px', alignItems: 'center'}}>
                {[...Array(6)].map((_, i) => (
                  <div key={i} style={{
                    width: '2px', height: `${4 + Math.sin(i * 0.5) * 6}px`,
                    background: getTypingColor(istotaKey),
                    borderRadius: '1px',
                    animation: `soundWave 1.8s ease-in-out ${i * 0.1}s infinite`
                  }} />
                ))}
              </div>
            )}

            {istotaKey === 'melody' && (
              <div style={{display: 'flex', gap: '4px', alignItems: 'center'}}>
                {['♪', '♫'].map((note, i) => (
                  <span key={i} style={{
                    color: getTypingColor(istotaKey),
                    fontSize: '12px',
                    animation: `noteFloat 2s ease-in-out ${i * 0.4}s infinite`
                  }}>
                    {note}
                  </span>
                ))}
              </div>
            )}

            {istotaKey === 'serafina' && (
              <div style={{display: 'flex', gap: '1px'}}>
                {[...Array(6)].map((_, i) => (
                  <div key={i} style={{
                    width: '2px', height: '8px',
                    background: getTypingColor(istotaKey),
                    animation: `scanLine 2.4s linear ${i * 0.15}s infinite`
                  }} />
                ))}
              </div>
            )}

            {istotaKey === 'gabriel' && (
              <div style={{display: 'flex', gap: '3px', alignItems: 'center'}}>
                {['<', '>'].map((symbol, i) => (
                  <span key={i} style={{
                    color: getTypingColor(istotaKey),
                    fontSize: '10px', fontFamily: 'monospace',
                    animation: `codeFlicker 1.6s ease-in-out ${i * 0.3}s infinite`
                  }}>
                    {symbol}
                  </span>
                ))}
              </div>
            )}

            {/* Domyślna animacja dla pozostałych */}
            {!['luna', 'stanislaw', 'helena', 'zara', 'brooke', 'alex', 'aria', 'melody', 'serafina', 'gabriel'].includes(istotaKey) && (
              <span style={{
                fontWeight: 400,
                letterSpacing: 1,
                color: getTypingColor(istotaKey),
                animation: "typingDots 1.5s infinite ease-in-out",
              }}>
                • • •
              </span>
            )}
          </div>
        )}

        <div ref={chatEndRef} />

        {/* Historia rozmów */}
        {serverConversations.length > 0 && (
          <div
            style={{
              marginTop: 20,
              padding: 16,
              background: "rgba(255,255,255,0.03)",
              borderRadius: 12,
              backdropFilter: "blur(6px)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <h3 style={{
              margin: '0 0 12px 0',
              color: 'rgba(248,249,250,0.9)',
              fontSize: '1.1rem',
              fontWeight: '500'
            }}>
              📂 Historia z serwera:
            </h3>
            <ul style={{ margin: 0, paddingLeft: 20 }}>
              {serverConversations.map((line, idx) => (
                <li key={idx} style={{
                  fontSize: "0.9rem",
                  color: "rgba(248,249,250,0.7)",
                  marginBottom: '4px'
                }}>
                  {line}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Input */}
      <div
        style={{
          display: "flex",
          gap: 12,
          padding: 20,
          borderTop: "1px solid rgba(255,255,255,0.08)",
          position: "relative",
          zIndex: 2,
          background: "rgba(0,0,0,0.08)",
          backdropFilter: "blur(12px)",
        }}
      >
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={1}
          placeholder="Napisz wiadomość…"
          style={{
            flex: 1,
            background: "rgba(255,255,255,0.06)",
            color: "#f8f9fa",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: 14,
            padding: "14px 16px",
            resize: "none",
            outline: "none",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08) inset",
            fontSize: "1rem",
            fontFamily: "inherit",
            backdropFilter: "blur(4px)",
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              sendMessage();
            }
          }}
        />
        <button
          onClick={sendMessage}
          disabled={isLoading || !input.trim()}
          style={{
            background: `linear-gradient(135deg, ${accent}85, rgba(224,170,255,0.7))`,
            color: "#1a1a2e",
            border: "none",
            borderRadius: 14,
            padding: "14px 20px",
            cursor: isLoading || !input.trim() ? "not-allowed" : "pointer",
            boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
            fontSize: "1rem",
            fontWeight: "600",
            opacity: isLoading || !input.trim() ? 0.5 : 1,
            transition: "all 0.2s ease",
          }}
        >
          Wyślij
        </button>

        <button
          onClick={fetchConversations}
          style={{
            background: "rgba(255,255,255,0.06)",
            color: "rgba(248,249,250,0.9)",
            border: "1px solid rgba(255,255,255,0.15)",
            padding: "14px 18px",
            borderRadius: 14,
            cursor: "pointer",
            fontSize: "0.9rem",
            transition: "all 0.2s ease",
            backdropFilter: "blur(4px)",
          }}
        >
          📖 Pobierz rozmowy
        </button>
      </div>

      {/* Subtelne animacje CSS */}
      <style>
        {`
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
          }

          @keyframes typingDots {
            0%, 80%, 100% { opacity: 0.4; }
            40% { opacity: 0.8; }
          }

          @keyframes heartPulse {
            0%, 100% { transform: scale(1); opacity: 0.6; }
            50% { transform: scale(1.2); opacity: 0.9; }
          }

          @keyframes balanceSlide {
            0%, 100% { transform: translateX(0); }
            50% { transform: translateX(22px); }
          }

          @keyframes analyzeWave {
            0%, 100% { transform: scaleY(0.4); opacity: 0.5; }
            50% { transform: scaleY(1); opacity: 0.8; }
          }

          @keyframes creativeJump {
            0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.6; }
            50% { transform: translateY(-6px) rotate(180deg); opacity: 0.9; }
          }

          @keyframes leafWave {
            0%, 100% { transform: scaleY(0.5); opacity: 0.5; }
            50% { transform: scaleY(1.1); opacity: 0.8; }
          }

          @keyframes quantumOrbit {
            0% { transform: translate(-50%, -50%) rotate(0deg) translateX(6px) rotate(0deg); }
            100% { transform: translate(-50%, -50%) rotate(360deg) translateX(6px) rotate(-360deg); }
          }

          @keyframes soundWave {
            0%, 100% { transform: scaleY(0.3); opacity: 0.5; }
            50% { transform: scaleY(1.4); opacity: 0.8; }
          }

          @keyframes noteFloat {
            0%, 100% { transform: translateY(0); opacity: 0.6; }
            50% { transform: translateY(-4px); opacity: 0.9; }
          }

          @keyframes scanLine {
            0%, 90%, 100% { opacity: 0.3; transform: scaleY(0.4); }
            45% { opacity: 0.8; transform: scaleY(1); }
          }

          @keyframes codeFlicker {
            0%, 50%, 100% { opacity: 0.4; }
            25%, 75% { opacity: 0.8; }
          }
        `}
      </style>
    </div>
  );
}

export default ChatView;
