# Supermarkt V2

**Moderne Supermarkt-Website mit React, Vite, Tailwind CSS und Netlify CMS**

## Features
- Home, Über Uns, Produkte, Wöchentliche Angebote, Standorte, Kontakt
- Komponenten: Navbar, Footer, CategoryCard, OfferCard, SectionHeader, Buttons, Formulare
- Daten in `src/data/categories.json` und `src/data/offers.json`
- Netlify CMS für globale Änderungen (`/admin`), optional lokales Admin-Panel (`/admin-local`)
- Responsive, mobile-first, modernes UI (kein reines Schwarz-Weiß)
- Barrierefrei: Alt-Texte, Lazy-Loading für Bilder
- Deployment auf Netlify oder GitHub Pages

## Lokale Entwicklung
```bash
npm install
npm run dev
```

## Build für Produktion
```bash
npm run build
npm run preview
```

## Deployment
- **Netlify:**
	1. Repository auf GitHub pushen
	2. In Netlify importieren (Build Command: `npm run build`, Publish Directory: `dist`)
	3. Netlify Identity & Git Gateway für CMS aktivieren
- **GitHub Pages:**
	1. Optional: Adapter wie `vite-plugin-gh-pages` nutzen

## Netlify CMS (Admin)
- Zugang: `/admin` (nach Netlify-Deployment)
- Konfiguration: `static/admin/config.yml`
- Medien: `public/images/uploads`

## Lokales Admin-Panel (Fallback)
- Zugang: `/admin-local`
- Einfaches Login (Demo), JSON Import/Export

## Design
- Farbpalette, Typografie und Layout gemäß `instructions.txt`
- Tailwind CSS (`tailwind.config.js`)

## Codequalität
- Modular, sauber, kommentiert
- Komponenten im Ordner `src/components`
- Seiten im Ordner `src/pages`
- Daten im Ordner `src/data`

## Barrierefreiheit
- Alle Bilder mit `alt`-Text und `loading="lazy"`

---

**Viel Erfolg beim Deployment!**
