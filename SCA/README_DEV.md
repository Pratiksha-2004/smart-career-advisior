Development quickstart

1) Create `.env.local` from the example (optional)
   - Copy `.env.local.example` to `.env.local` and fill values if you want persistent local env vars.

2) Start dev servers automatically
   - From PowerShell run (in repo root):
     .\dev_start.ps1

   - This opens two new PowerShell windows: one runs Django backend and the other runs the frontend Vite server.

3) Test Google Sign-In
   - Open the frontend URL (usually http://localhost:5173).
   - Click the Google sign-in button and watch both browser console and the backend window for logs.

Notes & troubleshooting
- Make sure the Google OAuth client includes your frontend origin in "Authorized JavaScript origins" (for example http://localhost:5173).
- If you see "The given origin is not allowed for the given client ID.", add the exact origin shown in your browser address bar to the OAuth client in Google Cloud Console.
- If you see postMessage/COOP errors, check that you are not adding strict Cross-Origin-Opener-Policy/Cross-Origin-Embedder-Policy headers in dev. Remove those for testing.
- Keep secrets out of version control. Do not commit `.env.local` if it contains your client secret.
