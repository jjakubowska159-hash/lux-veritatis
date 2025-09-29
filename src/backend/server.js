const express = require('express');
const fs = require('fs');
const cors = require('cors');
const path = require('path');

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

// 🚀 Start serwera
app.listen(4000, () => {
  console.log("✅ Serwer działa na http://localhost:4000");
});
