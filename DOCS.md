# Wanderlust Travel - Documentazione del Progetto

## Panoramica

**Wanderlust Travel** è un'applicazione mobile sviluppata in **React Native** con **Expo** che permette di esplorare destinazioni di viaggio con itinerari dettagliati giorno per giorno, informazioni pratiche, piatti tipici, frasario locale e molto altro.

L'app è pensata per viaggiatori italiani che vogliono pianificare i propri viaggi in modo completo e organizzato.

---

## Stack Tecnologico

| Tecnologia | Versione | Ruolo |
|---|---|---|
| React Native | 0.85.1 | Framework mobile cross-platform |
| Expo | ~56.0.0 | Toolchain e runtime |
| React | 19.2.0 | UI library |
| TypeScript | ~5.8.0 | Type safety |
| @expo/vector-icons | ^14.0.0 | Icone (Ionicons) |

---

## Struttura del Progetto

```
wanderlust-travel/
├── App.tsx                         # Entry point e navigazione
├── package.json                    # Dipendenze e script
├── tsconfig.json                   # Configurazione TypeScript
├── babel.config.js                 # Configurazione Babel
├── app.json                        # Configurazione Expo
│
└── src/
    ├── components/                 # Componenti riutilizzabili
    │   ├── FeaturedCard.tsx        # Card per destinazione in evidenza
    │   └── ImageViewer.tsx         # Visualizzatore galleria full-screen
    │
    ├── constants/                  # Costanti dell'app
    │   └── theme.ts               # Colori, spacing, font, border-radius
    │
    ├── data/                       # Dati statici delle destinazioni
    │   ├── destinations.ts         # Elenco destinazioni + itinerari
    │   ├── dishes.ts              # Piatti tipici per destinazione
    │   ├── phrases.ts            # Frasario (italiano → lingua locale)
    │   ├── timezones.ts          # Fusi orari rispetto all'Italia
    │   ├── links.ts              # Link utili (voli, alloggi, attività)
    │   └── checklists.ts         # Checklist pre-partenza
    │
    ├── screens/                   # Schermate dell'app
    │   ├── HomeScreen.tsx         # Home con ricerca, filtri, griglia
    │   ├── DestinationScreen.tsx  # Dettaglio destinazione
    │   └── ItineraryScreen.tsx    # Itinerario giornaliero
    │
    └── utils/                     # Utility
        └── storage.ts             # Hook useStorage (persistenza in-memory)
```

---

## Architettura dell'App

### Navigazione

L'app utilizza un sistema di navigazione custom basato su state management con `useState` (senza React Navigation):

```typescript
type Screen =
  | { name: 'Home' }
  | { name: 'Destination'; destinationId: string }
  | { name: 'Itinerary'; destinationId: string; days?: number };
```

Il flusso è: **Home → Destination → Itinerary**

### Stato Globale (AppContext)

L'app condivide lo stato tra le schermate tramite un oggetto `AppContext` passato via props:

```typescript
type AppContext = {
  favorites: string[];           // ID destinazioni preferite
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  notes: Record<string, string>; // Note personali per destinazione
  setNote: (id: string, text: string) => void;
  checklists: Record<string, boolean[]>; // Stato checklist
  toggleCheckItem: (destId: string, idx: number) => void;
  initChecklist: (destId: string, length: number) => void;
};
```

### Storage

Lo storage è implementato in-memory tramite un custom hook `useStorage<T>`:
- Persiste i dati durante la sessione dell'app
- Si resetta al riavvio
- Struttura predisposta per essere sostituita con AsyncStorage o MMKV in produzione

---

## Schermate

### 1. HomeScreen

La schermata principale offre:

- **Saluto personalizzato** ("Ciao, Davide!")
- **Barra di ricerca** per nome, paese o tagline
- **Filtro Preferiti** con conteggio
- **Sistema filtri** collassabile:
  - Per continente (Europa, Asia, Americhe, Africa/M.O., Isole)
  - Per budget (Budget ≤€60, Medio €60-120, Alto >€120)
  - Per tipo di viaggio (Mare, Cultura, Natura, Avventura, Cibo, Città)
- **Card in evidenza** (FeaturedCard) per la prima destinazione
- **Griglia destinazioni** con immagine, emoji, nome, paese e budget
- **Pulsante "Sorprendimi!"** per una destinazione random
- **Easter egg** ("App by Arca")

### 2. DestinationScreen

Pagina dettaglio con molteplici sezioni:

- **Hero image** con overlay, pulsante back e cuore preferiti
- **Info cards rapide** (budget/giorno, temperatura, durata volo)
- **Calcolatore budget** (soggiorno × giorni + volo = totale stimato)
- **Calendario "Quando andare"** con mesi consigliati evidenziati
- **Gallery fotografica** orizzontale con tap per full-screen
- **Piatti tipici** con badge "MUST TRY", descrizione e prezzo
- **Fuso orario** con offset dall'Italia
- **Frasario** (italiano → lingua locale + pronuncia)
- **Schema viaggio** (mappa mentale del trip)
- **Link utili** per prenotazioni
- **Checklist pre-partenza** con barra progresso
- **Precauzioni** e consigli
- **Abbigliamento** consigliato
- **Prenotazioni** necessarie
- **Info volo** dall'Italia
- **Note personali** (editabili)
- **Selettore giorni + CTA** per aprire l'itinerario

### 3. ItineraryScreen

Visualizzazione dell'itinerario giornaliero:

- **Header** con emoji, nome e durata
- **Tab giorni** orizzontale per navigare tra i giorni
- **Timeline** con attività in ordine cronologico:
  - Orario
  - Titolo e icona
  - Descrizione dettagliata
  - Costo stimato (badge verde)
- **Costo stimato giornata**
- **Gallery** della destinazione
- **Info rapide** (valuta, lingua, clima)

---

## Componenti

### FeaturedCard

Card grande per la destinazione in evidenza nella Home:
- Immagine full-bleed con overlay scuro
- Badge "In evidenza"
- Emoji bandiera, nome, tagline
- Meta info (budget/giorno, periodo migliore)

### ImageViewer

Visualizzatore immagini full-screen modale:
- Swipe orizzontale tra le immagini (FlatList paginata)
- Contatore "X / N"
- Indicatore dots con dot attivo evidenziato
- Pulsante chiusura
- Animazione fade in/out

---

## Dati

### Destinazioni (`destinations.ts`)

Ogni destinazione ha la seguente struttura:

```typescript
interface Destination {
  id: string;              // Identificatore unico
  name: string;            // Nome città/luogo
  country: string;         // Paese
  emoji: string;           // Emoji bandiera
  tagline: string;         // Descrizione breve
  image: string;           // URL immagine hero
  gallery: string[];       // URL gallery (5-7 immagini)
  bestPeriod: string;      // Periodo migliore (testo)
  bestMonths: number[];    // Mesi migliori (1-12)
  avgTemp: string;         // Temperatura media
  currency: string;        // Valuta + cambio
  language: string;        // Lingua parlata
  budgetPerDay: string;    // Budget giornaliero
  flightFromItaly: string; // Costo volo + durata
  precautions: string[];   // Consigli/avvertenze
  clothing: string[];      // Abbigliamento consigliato
  bookingsNeeded: string[];// Prenotazioni necessarie
  itinerary: DayItinerary[]; // Itinerario completo
}
```

**Destinazioni attualmente presenti (20+):**

| Destinazione | Paese | Continente |
|---|---|---|
| Tokyo | Giappone | Asia |
| Londra | Regno Unito | Europa |
| Bali | Indonesia | Asia |
| New York | Stati Uniti | Americhe |
| Islanda | Islanda | Europa |
| Parigi | Francia | Europa |
| Barcellona | Spagna | Europa |
| Amsterdam | Paesi Bassi | Europa |
| Praga | Repubblica Ceca | Europa |
| Lisbona | Portogallo | Europa |
| Santorini | Grecia | Europa |
| Vienna | Austria | Europa |
| Dubrovnik | Croazia | Europa |
| Marrakech | Marocco | Africa |
| Bangkok | Thailandia | Asia |
| Dubai | EAU | Africa/M.O. |
| Messico (CDMX) | Messico | Americhe |
| Città del Capo | Sudafrica | Africa |
| Giordania (Petra) | Giordania | Africa/M.O. |
| Peru (Machu Picchu) | Perù | Americhe |
| Maldive | Maldive | Isole |
| Zanzibar | Tanzania | Africa/Isole |
| Tanzania (Safari) | Tanzania | Africa |

### Piatti Tipici (`dishes.ts`)

```typescript
interface Dish {
  name: string;        // Nome del piatto
  description: string; // Descrizione e consigli
  price: string;       // Prezzo indicativo
  emoji: string;       // Emoji rappresentativa
  mustTry: boolean;    // Da provare assolutamente
}
```

Disponibili per: Tokyo, Londra, Bali, New York, Parigi, Barcellona, Amsterdam, Marrakech, Zanzibar, Tanzania, Islanda, Dubai.

### Frasario (`phrases.ts`)

```typescript
interface Phrase {
  italian: string;       // Frase in italiano
  local: string;         // Traduzione locale
  pronunciation: string; // Pronuncia approssimativa
}
```

Disponibile per: Tokyo, Parigi, Barcellona, Bangkok, Marrakech, Zanzibar, Lisbona, Praga.

### Fusi Orari (`timezones.ts`)

```typescript
interface TimezoneInfo {
  timezone: string;        // Sigla fuso orario
  offsetFromItaly: string; // Differenza oraria
  note: string;            // Esempio pratico
}
```

Copre tutte le 23 destinazioni con offset rispetto all'Italia.

### Link Utili (`links.ts`)

```typescript
interface UsefulLink {
  title: string;
  url: string;
  emoji: string;
  category: 'volo' | 'alloggio' | 'attivita' | 'trasporti' | 'info';
}
```

Link a risorse esterne (Booking, Skyscanner, biglietterie, guide) per 8 destinazioni.

### Checklist (`checklists.ts`)

- **10 item generici** validi per tutte le destinazioni (passaporto, volo, assicurazione, ecc.)
- **Item specifici** per ogni destinazione (es. Japan Rail Pass per Tokyo, ESTA per New York)

---

## Design System

### Tema (`theme.ts`)

L'app utilizza un tema **dark** con palette personalizzata:

```typescript
COLORS = {
  primary: '#FF6B35',       // Arancione (brand color)
  primaryDark: '#E55A2B',   // Arancione scuro
  secondary: '#004E89',     // Blu
  accent: '#FCBF49',        // Giallo/oro
  background: '#0F0F1A',    // Sfondo scuro
  surface: '#1A1A2E',       // Card/contenitori
  surfaceLight: '#25253A',  // Bordi/separatori
  card: '#16213E',          // Card alternative
  text: '#FFFFFF',          // Testo primario
  textSecondary: '#A0A0B8', // Testo secondario
  textMuted: '#6B6B80',     // Testo disabilitato
  success: '#4CAF50',       // Verde (successo/costi)
  warning: '#FF9800',       // Arancione (warning)
  danger: '#F44336',        // Rosso (errore)
}
```

### Spacing

Sistema a 6 livelli: `xs(4)`, `sm(8)`, `md(16)`, `lg(24)`, `xl(32)`, `xxl(48)`

### Border Radius

4 livelli: `sm(8)`, `md(12)`, `lg(16)`, `xl(24)`, `round(999)`

### Font

4 stili predefiniti: `regular(14)`, `medium(16)`, `large(20)`, `title(28)`, `hero(36)`

---

## Funzionalità Principali

| Funzionalità | Stato |
|---|---|
| Navigazione tra schermate | ✅ |
| Ricerca destinazioni | ✅ |
| Filtri (continente, budget, tipo) | ✅ |
| Preferiti (cuore) | ✅ |
| Destinazione random ("Sorprendimi!") | ✅ |
| Gallery fotografica con viewer | ✅ |
| Itinerario giorno per giorno | ✅ |
| Selettore durata viaggio | ✅ |
| Calcolatore budget | ✅ |
| Calendario "Quando andare" | ✅ |
| Piatti tipici con "Must Try" | ✅ |
| Fuso orario (offset dall'Italia) | ✅ |
| Frasario con pronuncia | ✅ |
| Link utili e prenotazioni | ✅ |
| Checklist pre-partenza con progress | ✅ |
| Note personali per destinazione | ✅ |
| Schema viaggio (mappa mentale) | ✅ |
| Info volo dall'Italia | ✅ |

---

## Script Disponibili

```bash
npm start         # Avvia Expo dev server
npm run ios       # Avvia su simulatore iOS
npm run android   # Avvia su emulatore Android
```

---

## Note di Sviluppo

### Persistenza
Attualmente lo storage è **in-memory** (hook `useStorage`). I dati persistono durante la sessione ma si resettano al riavvio dell'app. Per la produzione, si consiglia di integrare `@react-native-async-storage/async-storage` o `react-native-mmkv`.

### Navigazione
La navigazione è gestita manualmente via state. Per una struttura più scalabile, si può integrare `@react-navigation/native`.

### Immagini
Tutte le immagini provengono da **Unsplash** via URL (richiede connessione internet). Non sono presenti asset locali.

### Localizzazione
L'app è interamente in **italiano** e pensata per un pubblico italiano (fusi orari relativi all'Italia, budget in euro, voli dall'Italia).

---

## Possibili Miglioramenti Futuri

- [ ] Persistenza con AsyncStorage/MMKV
- [ ] React Navigation per navigazione stack
- [ ] Condivisione itinerario (share)
- [ ] Modalità offline con immagini cached
- [ ] Push notification per promemoria checklist
- [ ] Mappa interattiva delle destinazioni
- [ ] Dark/Light mode toggle
- [ ] Animazioni con Reanimated
- [ ] Integrazione API meteo in tempo reale
- [ ] Multi-lingua (EN/IT)
- [ ] Sezione "I miei viaggi" (storico)
- [ ] Export PDF dell'itinerario

---

## Autore

**App by Arca** (Davide Arca)

---

*Documentazione generata il 13 Giugno 2026*
