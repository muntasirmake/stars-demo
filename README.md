# STARS × MTB — Demo Export

A fully self-contained interactive demo. No backend, no build step, no API keys.  
All state is stored in `localStorage` and shared across browser tabs in real time.

---

## Quick start

```bash
cd stars-mtb-demo
npm install
npm run dev
```

Then open **http://localhost:3000** in your browser.

The launcher page links to all three demo screens. Open each in a separate tab for the best experience.

---

## File structure

```
infinity-mtb-demo/
├── index.html                  ← Launcher (start here)
├── package.json
├── infinity.css                ← Shared design system styles
│
├── admin.html                  ← STARS Admin Console (login + full app)
├── simulator.html              ← Internal simulator controls
│
├── mobile/
│   ├── app.html                ← Customer mobile app (MTB Neo)
│   └── ios-frame.jsx           ← iOS device frame component
│
└── console/
    ├── icons.jsx               ← Icon set
    ├── data.jsx                ← Campaign + KPI seed data
    ├── views.jsx               ← Dashboard + campaign table
    ├── pages.jsx               ← Campaigns, Rules, Budget modal
    ├── builder.jsx             ← Campaign Builder (modal)
    ├── builder-page.jsx        ← Campaign Builder (full-page, 6-step)
    ├── analytics.jsx           ← Analytics & Liability page
    ├── rewards-catalogue.jsx   ← Rewards Catalogue page
    ├── segments.jsx            ← Customer Segments page
    ├── tier-management.jsx     ← Tier Management page
    ├── rules-engine.jsx        ← Rules Engine page
    └── integrations-page.jsx   ← Integrations page
```

---

## Demo credentials

| Field    | Value                                      |
|----------|--------------------------------------------|
| Email    | kaiser@mutualtrustbank.com                 |
| Password | MTBdemo@2026                               |

---

## Full demo flow

| Step | Action | Where |
|------|--------|-------|
| 1 | Sign in with demo credentials | Admin Console |
| 2 | Open Campaign Builder → name it **"Bill Pay Bonus"** → Send for Approval | Admin Console → Campaign Builder |
| 3 | Wait 5 seconds — campaign auto-approves and goes Live | Admin Console (notification bell) |
| 4 | Mission card appears for the customer | MTB Neo Mobile → Home / Earn |
| 5 | Click **Simulate Bill Payment** | Demo Simulator |
| 6 | Balance updates +500 STARS, event log fires in console analytics | MTB Neo Mobile + Admin Console |
| 7 | Click **Reset All Demo State** to restart | Demo Simulator |

---

## How to reset before presenting

Open the **Demo Simulator** tab and click **Reset All Demo State**.  
This clears all `localStorage` keys and returns every tab to its initial state instantly.

---

## Technical notes

- **Framework:** React 18 loaded from CDN, transpiled in-browser by Babel standalone. No build required.
- **State:** 100% `localStorage`. Tabs sync via the `storage` event + a 1.5s polling interval.
- **Fonts:** Hanken Grotesk + JetBrains Mono loaded from Google Fonts. Requires internet for fonts (layout works offline, fonts fall back to system-ui).
- **No server-side code.** Any static file server works (`http-server`, `serve`, Python's `http.server`, VS Code Live Server, etc.).

### Key localStorage keys

| Key | Description |
|-----|-------------|
| `demo_loggedIn` | `"true"` when signed in |
| `demo_billbonus_status` | `"pending"` or `"live"` |
| `demo_billbonus_done` | `"true"` when bill payment simulated |
| `mtb_voucher` | `"true"` when voucher redeemed |
| `mtb_tab` | Last active mobile tab |
| `demo_reset` | Broadcast key — triggers reset across tabs |

---

## Running without npm

If you don't have Node.js, open the files directly **only if your browser allows local file access with scripts** (most do not, due to CORS). For reliable local use, use any static server:

```bash
# Python 3
python3 -m http.server 3000

# Then open: http://localhost:3000
```

---

*Internal demo only. Not connected to production MTB systems.*
