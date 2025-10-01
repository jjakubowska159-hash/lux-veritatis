// ESM server.js – zgodny z "type": "module"
import express from 'express';
import fs from 'node:fs';
import cors from 'cors';
import path from 'node:path';
import axios from 'axios';
import dotenv from 'dotenv';
import { fileURLToPath } from 'node:url';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';

// ===== PAMIĘĆ SERWERA (live dane) =====
const records = [];
// notatnik: [{ts, userId, istota, tresc}, ...]
function addRecord(userId, istota, tresc) {
  records.push({ ts: new Date(), userId, istota, tresc });
}

function getTopWords(limit = 5) {
  const freq = {};
  records.forEach(r => {
    (r.tresc.toLowerCase().match(/\b(\w{4,})\b/g) || []).forEach(w => {
      freq[w] = (freq[w]||0)+1;
    });
  });
  return Object.entries(freq)
               .sort((a,b)=>b[1]-a[1])
               .slice(0,limit)
               .map(([w])=>w);
}

function getIstotaPopularity(topN = 6) {
  const map = {};
  records.forEach(r => { map[r.istota] = (map[r.istota]||0)+1; });
  const total = records.length || 1;
  return Object.entries(map)
               .sort((a,b)=>b[1]-a[1])
               .slice(0,topN)
               .map(([k,v]) => ({istota:k, procent:Math.round(v/total*100)}));
}

function getHourlyActivity() {
  const hrs = Array(24).fill(0);
  records.forEach(r => { hrs[new Date(r.ts).getHours()]++; });
  return hrs;
}


dotenv.config();

const app = express();

// __dirname w ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- CORS: dopuszczamy tylko zdefiniowany frontend (albo wszystko na czas dev) ---
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || '*';
app.use(cors({
  origin: FRONTEND_ORIGIN === '*' ? true : FRONTEND_ORIGIN,
  credentials: true
}));

// bezpieczne nagłówki + rate-limit
app.use(helmet());
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 60,
  standardHeaders: true,
  legacyHeaders: false
});
app.use('/api', limiter);

app.use(express.json());

// --- Tryb serwisowy (ON/OFF) ---
let maintenance = process.env.MAINTENANCE === '1';
app.use((req, res, next) => {
  if (maintenance && !req.path.startsWith('/health')) {
    return res.status(503).json({ status: 'down', reason: 'maintenance' });
  }
  next();
});

// 🔎 Strona główna
app.get('/', (_req, res) => {
  res.send('✅ Backend Express działa poprawnie!');
});

// 🩺 Healthcheck
app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

// 📝 Zapis rozmów
app.post('/zapiszRozmowe', (req, res) => {
  const { istota, tresc } = req.body;
  if (!istota || !tresc) {
    return res.status(400).json({ status: 'BŁĄD', error: 'Brak danych' });
  }
  const linia = `[${new Date().toISOString()}] ${istota}: ${tresc}\n`;
  const plik = path.join(__dirname, 'rozmowy.log');
  try {
    fs.appendFileSync(plik, linia, 'utf8');
    res.json({ status: 'OK', saved: linia });
  } catch (err) {
    console.error('❌ Błąd zapisu:', err);
    res.status(500).json({ status: 'BŁĄD', error: 'Nie udało się zapisać.' });
  }
});

// 📖 Odczyt rozmów – tylko z kluczem
const ROZMOWY_KEY = process.env.ROZMOWY_KEY || 'temp-123-change-me';
app.get('/rozmowy', (req, res) => {
  if (req.headers['x-klucz'] !== ROZMOWY_KEY) {
    return res.status(401).json({ error: 'Brak klucza' });
  }
  const plik = path.join(__dirname, 'rozmowy.log');
  try {
    if (!fs.existsSync(plik)) return res.json({ status: 'OK', rozmowy: [] });
    const dane = fs.readFileSync(plik, 'utf8');
    const rozmowy = dane.split('\n').filter(l => l.trim() !== '');
    res.json({ status: 'OK', rozmowy });
  } catch (err) {
    console.error('❌ Błąd odczytu:', err);
    res.status(500).json({ status: 'BŁĄD', error: 'Nie udało się odczytać.' });
  }
});

// 🔐 OAuth GitHub – zamiana code -> access_token
app.post('/auth/github', async (req, res) => {
  const { code } = req.body;
  if (!code) return res.status(400).json({ error: 'Brak kodu autoryzacji' });

  const client_id = process.env.GITHUB_CLIENT_ID || '';
  const client_secret = process.env.GITHUB_CLIENT_SECRET || '';
  if (!client_id || !client_secret) {
    return res.status(500).json({ error: 'Brak GITHUB_CLIENT_ID / GITHUB_CLIENT_SECRET w .env' });
  }

  try {
    const tokenResponse = await axios.post(
      'https://github.com/login/oauth/access_token',
      { client_id, client_secret, code },
      { headers: { Accept: 'application/json' } }
    );
    const access_token = tokenResponse.data.access_token;
    if (!access_token) return res.status(401).json({ error: 'Brak tokena w odpowiedzi' });
    res.json({ access_token });
  } catch (err) {
    console.error('❌ Błąd autoryzacji GitHub:', err.message);
    res.status(500).json({ error: 'Błąd podczas autoryzacji GitHub' });
  }
});

// 🛠️ Admin ON/OFF (wymaga X-Admin-Token: <ADMIN_TOKEN> w nagłówku)
app.post('/admin/maintenance', (req, res) => {
  const adminToken = process.env.ADMIN_TOKEN;
  if (!adminToken) return res.status(501).json({ error: 'ADMIN_TOKEN nie skonfigurowany na serwerze' });

  const token = req.headers['x-admin-token'];
  if (token !== adminToken) return res.status(401).json({ error: 'unauthorized' });

  const { on } = req.body; // true/false
  maintenance = !!on;
  res.json({ maintenance });
});

/* ===== NOWE ENDPOINTY DLA APLIKACJI (statystyki) ===== */
// 1) Najczęstsze słowa z pytań
app.get('/api/top-words', (_req, res) => {
  const freq = {};
  records.forEach(r => {
    const words = r.tresc.toLowerCase().match(/\b(\w{4,})\b/g) || [];
    words.forEach(w => { freq[w] = (freq[w]||0)+1; });
  });
  const top = Object.entries(freq)
                    .sort((a,b)=>b[1]-a[1])
                    .slice(0,5)
                    .map(([w])=>w);
  res.json(top);
});

// 2) Popularność Istot (procent)
app.get('/api/popular-istoty', (_req, res) => {
  const map = {};
  records.forEach(r => { map[r.istota] = (map[r.istota]||0)+1; });
  const total = records.length || 1;
  const sorted = Object.entries(map)
                       .sort((a,b)=>b[1]-a[1])
                       .slice(0,6)
                       .map(([k,v]) => ({istota:k, procent:Math.round(v/total*100)}));
  res.json(sorted);
});

// 3) Aktywność 24-godzinna (liczba rozmów w każdej godzinie)
app.get('/api/hourly-activity', (_req, res) => {
  const hours = Array(24).fill(0);
  records.forEach(r => { hours[new Date(r.ts).getHours()]++; });
  res.json(hours);
});

/* ===== LIVE-ROZMOWA: dodaj + zwróć świeże liczniki ===== */
app.post('/api/live-add', (req, res) => {
  const { istota, tresc } = req.body;
  if (!istota || !tresc) return res.status(400).json({ error: 'brak danych' });

  addRecord('anonim', istota, tresc);        // dopisz do notatnika

  // zwróć natychmiast nowe agregacje
  res.json({
    topWords:       getTopWords(5),
    popularIstoty:  getIstotaPopularity(6),
    hourlyActivity: getHourlyActivity()
});
/* ===================================================== */

// 🚀 Start serwera (Render: PORT; lokalnie: BACKEND_PORT lub 4000)
const PORT = Number(process.env.PORT) || Number(process.env.BACKEND_PORT) || 4000;
app.listen(PORT, () => {
  console.log(`✅ Backend działa na porcie ${PORT}`);
});
