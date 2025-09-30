import React, { useEffect, useState } from 'react';

export default function HealthBadge() {
  const [status, setStatus] = useState('checking');

  useEffect(() => {
    let alive = true;
    fetch('http://localhost:4000/health')
      .then(r => (r.ok ? r.json() : Promise.reject()))
      .then(() => { if (alive) setStatus('ok'); })
      .catch(() => { if (alive) setStatus('down'); });
    return () => { alive = false; };
  }, []);

  const color = status === 'ok' ? '#16a34a' : status === 'down' ? '#dc2626' : '#6b7280';
  const label = status === 'ok' ? 'backend: OK' : status === 'down' ? 'backend: BRAK' : 'backend: sprawdzam…';

  return (
    <span style={{
      display:'inline-block',
      padding:'4px 8px',
      borderRadius:999,
      fontSize:12,
      backgroundColor:'#111827',
      color:'#fff',
      border:`1px solid ${color}`
    }}>
      ● <span style={{ color }}>{label}</span>
    </span>
  );
}
