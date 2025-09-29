// server.js
const express = require('express');
const fs = require('fs');
const cors = require('cors');
const path = require('path');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

// 🔎 Endpoint testowy
app.get('/', (req, res) => {
  res.send('✅ Backend Express działa poprawnie!');
});

// 📝 Endpoint do zapisywania rozmów
app.post('/zapiszRozmowe', (req, res) => {
  console.log("📩 Otrzymano request:", req.body);

  const { istota, tresc } = req.body;

  if (!istota || !tresc) {
    return res.status(400).json({ status: "BŁĄD", error: "Brak danych" });
  }

  const linia = `[${new Date().toISOString()}] ${istota}: ${tresc}\n`;
  const plik = path.join(__dirname, 'rozmowy.log'); // zapis w backend/

  try {
    fs.appendFileSync(plik, linia, 'utf8');
    console.log("💾 Zapisano:", linia.trim());
    res.json({ status: "OK", saved: linia });
  } catch (err) {
    console.error("❌ Błąd zapisu:", err);
    res.status(500).json({ status: "BŁĄD", error: "Nie udało się zapisać." });
  }
});

// 📖 Endpoint do pobierania rozmów
app.get('/rozmowy', (req, res) => {
  const plik = path.join(__dirname, 'rozmowy.log');

  try {
    if (!fs.existsSync(plik)) {
      return res.json({ status: "OK", rozmowy: [] });
    }

    const dane = fs.readFileSync(plik, 'utf8');
    const rozmowy = dane.split('\n').filter(linia => linia.trim() !== '');
    res.json({ status: "OK", rozmowy });
  } catch (err) {
    console.error("❌ Błąd odczytu:", err);
    res.status(500).json({ status: "BŁĄD", error: "Nie udało się odczytać." });
  }
});

// 🔐 OAuth GitHub – odbieranie code → zamiana na token
app.post('/auth/github', async (req, res) => {
  const { code } = req.body;

  if (!code) {
    return res.status(400).json({ error: 'Brak kodu autoryzacji' });
  }

  // 👉 ZASTĄP tymi danymi z GitHuba:
  const client_id = 'Ov23li2QM5vmZmbcWeeR';
  const client_secret = '9eb494ee4ad090fc0ca9cb8d607d05e139e25bfe';

  try {
    const tokenResponse = await axios.post(
      'https://github.com/login/oauth/access_token',
      {
        client_id,
        client_secret,
        code
      },
      {
        headers: { Accept: 'application/json' }
      }
    );

    const access_token = tokenResponse.data.access_token;

    if (!access_token) {
      return res.status(401).json({ error: 'Brak tokena w odpowiedzi' });
    }

    console.log("🔐 Access Token:", access_token);
    res.json({ access_token });
  } catch (err) {
    console.error("❌ Błąd żądania do GitHuba:", err.message);
    res.status(500).json({ error: 'Błąd podczas autoryzacji GitHub' });
  }
});

// 🚀 Start serwera
app.listen(4000, () => {
  console.log("✅ Serwer działa na http://localhost:4000");
});
