# Asian Superstore - React + Vite Website

Eine moderne, responsive Informations-Website für den Asian Superstore in Esslingen.

## 🌟 Features

- **Responsive Design** mit Tailwind CSS
- **React + Vite** für schnelle Performance
- **Admin Dashboard** mit Netlify Identity
- **Neon PostgreSQL** Datenbank-Integration
- **Netlify Functions** für serverlose CRUD-Operationen
- **SEO-optimiert** mit Meta-Tags und semantischem HTML
- **Barrierefrei** mit Alt-Texten und ARIA-Labels

## 📋 Voraussetzungen

- Node.js 18+ und npm/yarn
- Netlify Account
- Neon PostgreSQL Account

## 🚀 Installation

### 1. Projekt klonen

```bash
cd app
npm install
```

### 2. Umgebungsvariablen einrichten

Kopieren Sie `.env.example` zu `.env` und tragen Sie Ihre Credentials ein:

```bash
cp .env.example .env
```

Bearbeiten Sie `.env`:

```env
VITE_NEON_DATABASE_URL=postgresql://user:password@host.neon.tech/dbname?sslmode=require
```

### 3. Neon Datenbank einrichten

1. Erstellen Sie eine neue Neon Datenbank auf [neon.tech](https://neon.tech)
2. Führen Sie das SQL-Schema aus:

```bash
# Verbinden Sie sich mit Ihrer Neon Datenbank
psql "postgresql://user:password@host.neon.tech/dbname?sslmode=require"

# Führen Sie das Schema aus
\i database/schema.sql
```

Oder kopieren Sie den Inhalt von `database/schema.sql` in die Neon SQL Editor-Oberfläche.

### 4. Lokal entwickeln

```bash
npm run dev
```

Die Website läuft unter `http://localhost:3000`

### 5. Build für Produktion

```bash
npm run build
npm run preview
```

## 🚢 Deployment auf Netlify

### 1. Repository mit Netlify verbinden

1. Pushen Sie Ihr Projekt zu GitHub/GitLab/Bitbucket
2. Gehen Sie zu [netlify.com](https://netlify.com) und loggen Sie sich ein
3. Klicken Sie "New site from Git"
4. Wählen Sie Ihr Repository
5. Build-Einstellungen:
   - **Build Command:** `npm run build`
   - **Publish Directory:** `dist`
   - **Functions Directory:** `netlify/functions`

### 2. Umgebungsvariablen setzen

Gehen Sie zu Site Settings → Environment Variables und fügen Sie hinzu:

```
VITE_NEON_DATABASE_URL = postgresql://user:password@host.neon.tech/dbname?sslmode=require
```

### 3. Netlify Identity aktivieren

1. Gehen Sie zu Site Settings → Identity
2. Klicken Sie "Enable Identity"
3. Unter "Registration" wählen Sie "Invite only"
4. Unter "External providers" können Sie optional GitHub/Google aktivieren

### 4. Admin-Benutzer einladen

1. Gehen Sie zu Identity → Invite users
2. Geben Sie die E-Mail-Adresse für den Admin ein
3. Der Admin erhält eine E-Mail mit Registrierungslink

## 🔧 Admin Dashboard

### Zugang zum Admin-Panel

1. Navigieren Sie zu `https://ihre-domain.netlify.app/admin`
2. Klicken Sie "Mit Netlify Identity anmelden"
3. Verwenden Sie die eingeladene E-Mail-Adresse

### Funktionen

- **Kategorien verwalten:** Erstellen, bearbeiten, löschen von Produktkategorien
- **Angebote verwalten:** Wöchentliche Angebote mit Preisen und Gültigkeit
- **Echtzeit-Updates:** Alle Änderungen werden sofort in der Neon DB gespeichert

## 📁 Projektstruktur

```
app/
├── src/
│   ├── components/        # React-Komponenten
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── Button.jsx
│   │   ├── CategoryCard.jsx
│   │   ├── OfferCard.jsx
│   │   └── SectionHeader.jsx
│   ├── pages/            # Seitenkomponenten
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   ├── Products.jsx
│   │   ├── Offers.jsx
│   │   ├── Locations.jsx
│   │   ├── Contact.jsx
│   │   └── Admin.jsx
│   ├── context/          # React Context
│   │   └── AuthContext.jsx
│   ├── hooks/            # Custom Hooks
│   │   ├── useFetchCategories.js
│   │   └── useFetchOffers.js
│   ├── data/             # Platzhalter-Daten
│   │   ├── categories.json
│   │   └── offers.json
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── netlify/
│   └── functions/        # Serverless Functions
│       ├── getCategories.js
│       ├── getOffers.js
│       ├── createCategory.js
│       ├── updateCategory.js
│       ├── deleteCategory.js
│       ├── createOffer.js
│       ├── updateOffer.js
│       └── deleteOffer.js
├── database/
│   └── schema.sql        # Neon DB Schema
├── public/               # Statische Assets
├── package.json
├── vite.config.js
├── tailwind.config.js
├── netlify.toml
└── README.md
```

## 🎨 Design-Spezifikation

### Farbpalette

- **Primärgrün:** `#2E8B57`
- **Sekundärgrün:** `#8FD3A3`
- **Creme/Natur:** `#FFF8F0`
- **Warmes Beige:** `#E9DCC9`
- **Dunkles Anthrazit:** `#222222`
- **Akzentfarbe:** `#FFB64D`

### Typografie

- **Überschriften:** Poppins (Bold 700, Semibold 600)
- **Body:** Inter (Regular 400)
- **Zeilenhöhe:** 1.4-1.6

## 🔐 Sicherheit

- **Authentifizierung:** Netlify Identity mit JWT
- **API-Schutz:** Serverless Functions prüfen Benutzer-Auth
- **HTTPS:** Automatisch durch Netlify
- **Umgebungsvariablen:** Niemals im Frontend hardcoded
- **Database:** SSL-Verschlüsselung durch Neon

## 📡 API Endpoints

Alle Endpoints sind verfügbar unter `/.netlify/functions/`:

### Öffentlich (GET)
- `/getCategories` - Alle Kategorien abrufen
- `/getOffers` - Alle Angebote abrufen

### Geschützt (Authentifizierung erforderlich)
- `POST /createCategory` - Neue Kategorie erstellen
- `PUT /updateCategory` - Kategorie aktualisieren
- `DELETE /deleteCategory?id={id}` - Kategorie löschen
- `POST /createOffer` - Neues Angebot erstellen
- `PUT /updateOffer` - Angebot aktualisieren
- `DELETE /deleteOffer?id={id}` - Angebot löschen

## 🐛 Fehlerbehebung

### Datenbank-Verbindungsfehler

Wenn die Netlify Functions die Datenbank nicht erreichen, wird automatisch auf lokale JSON-Daten zurückgegriffen.

Prüfen Sie:
1. Ist `VITE_NEON_DATABASE_URL` korrekt gesetzt?
2. Ist die Neon-Datenbank online?
3. Sind die Firewall-Regeln korrekt?

### Admin-Login funktioniert nicht

1. Stellen Sie sicher, dass Netlify Identity aktiviert ist
2. Prüfen Sie, ob der Benutzer eingeladen wurde
3. Löschen Sie Browser-Cache und Cookies

### Build-Fehler

```bash
# Cache löschen
rm -rf node_modules package-lock.json
npm install
npm run build
```

## 📞 Support & Kontakt

Bei Fragen oder Problemen:
- E-Mail: info@asiansuperstore.de
- Telefon: +49 711 123456 (Kronenhof)
- Telefon: +49 711 654321 (Pliensaustraße)

## 📄 Lizenz

© 2025 Asian Superstore. Alle Rechte vorbehalten.

---

**Entwickelt mit ❤️ für Asian Superstore Esslingen**
