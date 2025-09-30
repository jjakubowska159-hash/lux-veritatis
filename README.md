lux-veritatis – README (PL, prosto)

Cel: React + Express dla „Collective Garden”: czaty-persony, pipeline treści, backupy/eksporty.
Jak czytać:

FAKT – sprawdzone; tak działa teraz.

HIPOTEZA – prawdopodobne, ale nie potwierdzone u Ciebie.

WYMAGA WERYFIKACJI – zrób to lokalnie i oznacz jako FAKT.

1) Szybki start (Windows / PowerShell)

Zainstaluj:

npm install


Backend (Express):

node .\src\backend\server.js


FAKT: domyślny port 4000 (z .env klucz BACKEND_PORT, albo 4000 gdy brak).

Test: http://localhost:4000/health → powinno zwrócić {"status":"ok"}.

Frontend (CRA):

npm start


Otwórz: http://localhost:3000.

2) Środowisko i sekrety

Utwórz .env (lokalnie, nie commituj; jest w .gitignore):

BACKEND_PORT=4000
GITHUB_CLIENT_ID=WKLEJ_TUTAJ
GITHUB_CLIENT_SECRET=WKLEJ_TUTAJ


FAKT: repo zawiera szablon .env.example – możesz go kopiować do .env.

FAKT: nie commituj prawdziwych kluczy (są ignorowane).

HIPOTEZA: docelowo tokeny w httpOnly Secure Cookie (dziś endpoint zwraca access_token w JSON – dobre tylko do testów).

3) Co jest w backendzie (FAKT)

Plik: src/backend/server.js (Express + dotenv + cors)
Endpointy:

GET / → „Backend Express działa poprawnie!”

GET /health → { status: 'ok' }

POST /zapiszRozmowe → dopisuje do src/backend/rozmowy.log (FAKT: plik nie jest już śledzony przez Git)

GET /rozmowy → zwraca log rozmów

POST /auth/github → wymiana code → access_token (testowe; WYMAGA WERYFIKACJI pod kątem przejścia na cookie)

Konfiguracja portu:

const PORT = Number(process.env.BACKEND_PORT) || 4000;
app.listen(PORT, () => console.log(`✅ Serwer działa na http://localhost:${PORT}`));

4) Co jest w froncie (FAKT)

CRA (React 18).

HealthBadge – szybki wskaźnik połączenia z backendem:

plik: src/components/HealthBadge.jsx

ping: GET http://localhost:4000/health

Widoki/komponenty (przykładowe): HomePage.js, Dashboard.js, czaty (ChatZ*, BaseChatComponent.js), itp.

5) Skrypty (package.json)

npm start – dev server (frontend)

npm run build – build produkcyjny

npm test – testy

(HIPOTEZA: jeśli chcesz skrót do backendu, dodaj w package.json):

{
  "scripts": {
    "server": "node src/backend/server.js",
    "dev": "concurrently \"npm:start\" \"npm:server\""
  }
}


Potrzeba: npm i -D concurrently.

6) Struktura (skrót, FAKT)
/public
/src
  /backend
    server.js
    server-test.js
  /components
    HealthBadge.jsx
  App.js
  index.js
  ...


(FAKT: przeniesiony plik → src/ChatZAlex.js, było src/src/ChatZAlex.js)

7) Git i bezpieczeństwo (FAKT)

.gitignore ignoruje: .env*, logi, notatki lokalne itp.

Nie commituj sekretów (API keys, tokeny).

Jeśli log trafił do repo:

git rm --cached src/backend/rozmowy.log
git commit -m "chore: stop tracking rozmowy.log"
git push

8) Troubleshooting (krótko)

Port zajęty 4000 → zamknij proces:

netstat -ano | findstr :4000
taskkill /PID <PID> /F


CORS 401/403 → upewnij się, że backend ma cors() i frontend pyta http://localhost:4000.

Non-fast-forward przy pushu →

git fetch origin
git pull --rebase origin main
git push

9) Roadmap (kolejne kroki)

/api/user (bezpieczny profil z GitHuba) + httpOnly cookie zamiast zwrotu tokena w JSON.

UI: Zaloguj / Wyloguj (front) + /api/auth/logout (backend).

Deploy: konfiguracja .env, CORS, HTTPS, reverse proxy.

10) Styl pracy (stałe)

PL, krótko i prosto.

Oznaczaj: FAKT / HIPOTEZA / WYMAGA WERYFIKACJI.

Minimalne, gotowe „ready-to-paste” patche.

Licencja

Internal / projekt prywatny (WYMAGA WERYFIKACJI).

DODATEK: jeśli GitHub pokazuje zielony „Compare & pull request”

To tylko propozycja PR-a. Klikaj tylko, gdy chcesz scalić gałęzie przez PR (np. main → maya/production). Nie jest wymagane do pracy lokalnej.
