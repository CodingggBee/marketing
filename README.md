# Marketing Site

Local development:

1. Install dependencies

```bash
npm install
```

2. Run the server

```bash
npm start
# or for development with auto-reload if installed
npm run dev
```

3. Open the site

Visit http://localhost:3000 in your browser.

API endpoints:

- `GET /api/services`
- `GET /api/portfolio`
- `GET /api/team`
- `GET /api/testimonials`
- `GET /api/stats`
- `POST /api/contact` — body: `{ name, email, company?, service?, message }`

Notes:

- Contact submissions are appended to `data/contacts.json`. That file is gitignored.
- Static files are served from the project root (open `index.html`).
