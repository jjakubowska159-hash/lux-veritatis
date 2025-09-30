# lux-veritatis – README (PL, prosto)

**Cel:** szybki start + bezpieczna konfiguracja (frontend + backend + GitHub OAuth).
**Wersja pliku:** 2025-09-29 13:50:18

---

## 0) Jak czytać ten plik
- **FAKT** – sprawdzone i pewne.
- **HIPOTEZA** – prawdopodobne, ale niepotwierdzone.
- **WYMAGA WERYFIKACJI** – musisz to sprawdzić u siebie.

---

## 1) Szybki start (kroki 1–2–3)

1) **Zainstaluj zależności (frontend)**  
   ```bash
   npm install
   ```

2) **Uruchom frontend** (FAKT: Create React App używa `npm start`)  
   ```bash
   npm start
   ```
   Otwórz przeglądarkę: `http://localhost:3000` (FAKT).

3) **Uruchom backend** (**FAKT: ścieżka i port**)  
   W osobnym terminalu:
   ```bash
   node src/backend/server.js
   ```
   Backend nasłuchuje na porcie **4000** (**FAKT**).

---

## 2) Wymagane środowisko
- **Node.js**: zalecane LTS (np. 20.x) (**HIPOTEZA** — jeśli masz inną wersję działającą, zaznacz jako FAKT).
- **NPM**: aktualna wersja (HIPOTEZA).
- System: Windows 10/11 – działa (FAKT: CRA wspiera).

---

## 3) Skrypty NPM (frontend)
- `npm start` – tryb deweloperski (FAKT).
- `npm run build` – build produkcyjny (FAKT).
- `npm test` – testy (FAKT).

Opcjonalnie dodaj skrót do backendu w **package.json** (**HIPOTEZA**):
```json
{
  "scripts": {
    "server": "node src/backend/server.js",
    "dev": "concurrently \"npm:start\" \"npm:server\""
  }
}
```
> Uwaga: wymaga instalacji `concurrently`:
```bash
npm i -D concurrently
```

---

## 4) Bezpieczeństwo i logowanie (GitHub OAuth)

### 4.1 Tokeny
- **FAKT:** nie trzymaj tokenów w **localStorage** (ryzyko XSS).
- **FAKT:** używaj **httpOnly Secure Cookie** + **SameSite=Lax/Strict** na backendzie.
- **FAKT:** tajne klucze trzymaj w **.env** na backendzie, nie w frontendzie.

### 4.2 Zmiany w backendzie (**HIPOTEZA/WERYFIKACJA**)
- Endpointy do wdrożenia (jeśli brak):
  - `POST /api/auth/login` – inicjuje OAuth (przekierowanie do GitHub).
  - `GET /api/auth/callback` – odbiera kod i ustawia cookie sesyjne.
  - `POST /api/auth/logout` – kasuje sesję (cookie).

- Przykładowe zmienne `.env` (**HIPOTEZA**):
  ```env
  GITHUB_CLIENT_ID=...
  GITHUB_CLIENT_SECRET=...
  SESSION_SECRET=zmien_mnie
  COOKIE_NAME=lux_session
  COOKIE_SECURE=true
  COOKIE_SAMESITE=Lax
  BACKEND_PORT=4000
  FRONTEND_ORIGIN=http://localhost:3000
  ```

- Po zalogowaniu front pobiera dane użytkownika przez **bezpieczne API**:
  - `GET /api/user` → zwraca `login`, `avatar_url`, itp. (**HIPOTEZA**).

### 4.3 Zmiany w frontendzie (**HIPOTEZA**)
- Zastąp odczyty z `localStorage` wywołaniem do `/api/user`.
- Dodaj przyciski: **Zaloguj** (link do `/api/auth/login`) i **Wyloguj** (POST `/api/auth/logout`).

---

## 5) Struktura projektu (**FAKT/HIPOTEZA**)
Aktualnie najważniejsze pliki:
```
/src
  /backend         ← backend (Node/Express)  (**FAKT**)
    server.js      (**FAKT**)
  App.js
  index.js
```
Jeśli masz dodatkowe foldery (`/components`, `/pages`) – uzupełnij (**HIPOTEZA**).

---

## 6) Deploy (**WYMAGA WERYFIKACJI**)
- Frontend: build → hosting statyczny (Netlify/Vercel/GitLab Pages).  
- Backend: VPS/Render/Fly.io/Heroku-konto. Ustaw `.env` i HTTPS.

Checklist deployu:
- [ ] HTTPS w backendzie / reverse proxy.
- [ ] CORS: `origin = FRONTEND_ORIGIN`, `credentials = true`.
- [ ] Cookie: `httpOnly`, `secure`, `sameSite`.
- [ ] Logowanie błędów bez wrażliwych danych.

---

## 7) UX: szybkie poprawki
- Dodaj w navbarze: **Zaloguj / Wyloguj** (FAKT: potrzebne do testów sesji).
- Dodaj **/profile** z danymi z `/api/user` (avatar + login).
- Dodaj **Loader** dla stanu „niezalogowany / loguję”.

---

## 8) Troubleshooting
- **Problem:** „Token znika po odświeżeniu.”  
  **Rozwiązanie (FAKT):** Używaj cookie sesyjnego httpOnly + `credentials: 'include'` w fetchu.
- **Problem:** CORS 401/403.  
  **Rozwiązanie:** Ustaw `Access-Control-Allow-Credentials: true` i właściwy `origin`.
- **Problem:** `render is not a function` (React 18).  
  **Rozwiązanie:** użyj `createRoot` w `index.js` (FAKT).

Przykład (FAKT, React 18):
```js
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const root = createRoot(document.getElementById('root'));
root.render(<App />);
```

---

## 9) Dalsze kroki (na dziś)
**Plan → checklista → 1-2-3**  
- [x] (1) **FAKT**: ścieżka backendu: `src/backend/server.js`.
- [x] (2) **FAKT**: port backendu: **4000**.
- [ ] (3) FRONT: dodać przyciski Loguj/Wyloguj + `/profile` (**HIPOTEZA**).
- [ ] (4) BACK: dodać `/api/user`, `/api/auth/logout`, cookie httpOnly (**HIPOTEZA**).

---

## 10) Styl współpracy (skrót)
- Mów do mnie „Yuga”. Prosty PL, bez żargonu.  
- Oznaczaj **FAKT/HIPOTEZA/WYMAGA WERYFIKACJI**.  
- Minimalne, gotowe patche. Jeśli fragment – podaj zakres linii.

---

## 11) Licencja
Internal / projekt prywatny (**HIPOTEZA**).
