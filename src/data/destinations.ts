export interface DayItinerary {
  day: number;
  title: string;
  activities: Activity[];
}

export interface Activity {
  time: string;
  title: string;
  description: string;
  cost?: string;
  tip?: string;
  icon: string;
}

export interface Destination {
  id: string;
  name: string;
  country: string;
  emoji: string;
  tagline: string;
  image: string;
  gallery: string[];
  bestPeriod: string;
  bestMonths: number[];
  avgTemp: string;
  currency: string;
  language: string;
  budgetPerDay: string;
  flightFromItaly: string;
  precautions: string[];
  clothing: string[];
  bookingsNeeded: string[];
  itinerary: DayItinerary[];
}


export const destinations: Destination[] = [
  {
    id: 'tokyo',
    name: 'Tokyo',
    country: 'Giappone',
    emoji: '🇯🇵',
    tagline: 'Tradizione e futuro si incontrano',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?w=800&q=80',
      'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800&q=80',
      'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80',
      'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&q=80',
    ],
    bestPeriod: 'Ottobre - Novembre / Marzo - Maggio',
    bestMonths: [3, 4, 5, 10, 11],
    avgTemp: '15-22°C in primavera/autunno',
    currency: 'Yen (¥) - ~1€ = 160¥',
    language: 'Giapponese',
    budgetPerDay: '€80-150/giorno (medio)',
    flightFromItaly: '€500-900 A/R | 12-14h con scalo',
    precautions: [
      'Porta contanti - molti posti non accettano carte',
      'Rispetta le regole della metro (silenzio, fila)',
      'Togliti le scarpe entrando nelle case e templi',
      'Non dare mance - è considerato scortese',
    ],
    clothing: [
      'Scarpe comode per camminare molto',
      'Strati leggeri in primavera/autunno',
      'Ombrello pieghevole sempre nello zaino',
      'Outfit sobri per i templi (spalle coperte)',
    ],
    bookingsNeeded: [
      'Japan Rail Pass (acquista prima di partire)',
      'TeamLab Borderless (prenota online settimane prima)',
      'Ristoranti sushi top (prenotazione 1 mese prima)',
      'Volo interno se vai a Kyoto/Osaka',
    ],

    itinerary: [
      {
        day: 1,
        title: 'Arrivo & Shinjuku',
        activities: [
          { time: '14:00', title: 'Arrivo Narita/Haneda', description: 'Attiva il Japan Rail Pass e prendi il Narita Express per il centro', cost: 'JR Pass incluso', icon: '✈️' },
          { time: '16:00', title: 'Check-in Hotel', description: 'Zona Shinjuku - comoda per metro e vita notturna', cost: '€80-120/notte', icon: '🏨' },
          { time: '18:00', title: 'Omoide Yokocho', description: 'Vicoli con izakaya minuscoli. Prova yakitori e birra alla spina', cost: '€15-25', icon: '🍻' },
          { time: '20:00', title: 'Robot Restaurant o Golden Gai', description: 'Esplora i micro-bar del Golden Gai (5-6 posti a sedere ciascuno)', cost: '€10-30', icon: '🌃' },
        ],
      },
      {
        day: 2,
        title: 'Asakusa & Akihabara',
        activities: [
          { time: '07:00', title: 'Tempio Senso-ji', description: 'Vai presto per evitare la folla. Il tempio più antico di Tokyo', cost: 'Gratuito', icon: '⛩️' },
          { time: '09:00', title: 'Nakamise-dori', description: 'Via dello shopping tradizionale. Compra snack e souvenir', cost: '€10-20', icon: '🛍️' },
          { time: '11:00', title: 'Tokyo Skytree', description: 'Vista panoramica a 450m. Prenota online per saltare la fila', cost: '€15-25', icon: '🗼' },
          { time: '13:00', title: 'Pranzo Ramen', description: 'Prova un ramen-ya locale. Consiglio: Fuunji a Shinjuku', cost: '€8-12', icon: '🍜' },
          { time: '15:00', title: 'Akihabara', description: 'Quartiere otaku/tech. Negozi di elettronica, manga, arcade', cost: '€0-50', icon: '🎮' },
          { time: '19:00', title: 'Cena Izakaya', description: 'Cena tradizionale con piatti da condividere e sake', cost: '€20-35', icon: '🍶' },
        ],
      },
      {
        day: 3,
        title: 'Shibuya & Harajuku',
        activities: [
          { time: '09:00', title: 'Meiji Jingu', description: 'Santuario shintoista immerso nella foresta. Pace assoluta', cost: 'Gratuito', icon: '🌲' },
          { time: '11:00', title: 'Takeshita Street', description: 'La via più pazza di Tokyo. Moda, crepes, kawaii culture', cost: '€10-30', icon: '🌈' },
          { time: '13:00', title: 'Pranzo Conveyor Belt Sushi', description: 'Sushi rotante - divertente e ottimo rapporto qualità/prezzo', cost: '€12-20', icon: '🍣' },
          { time: '15:00', title: 'Shibuya Crossing', description: 'L incrocio più famoso del mondo. Foto dal Starbucks sopra', cost: 'Gratuito', icon: '🚶' },
          { time: '17:00', title: 'Shibuya Sky', description: 'Rooftop con vista a 360° sulla città al tramonto', cost: '€15', icon: '🌅' },
          { time: '19:30', title: 'Cena Yakiniku', description: 'Barbecue giapponese - cucini la carne wagyu al tavolo', cost: '€30-50', icon: '🥩' },
        ],
      },
    ],
  },

  {
    id: 'london',
    name: 'Londra',
    country: 'Regno Unito',
    emoji: '🇬🇧',
    tagline: 'Eleganza, storia e multiculturalità',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1529655683826-aba9b3e77383?w=800&q=80',
      'https://images.unsplash.com/photo-1486299267070-83823f5448dd?w=800&q=80',
      'https://images.unsplash.com/photo-1520986606214-8b456906c813?w=800&q=80',
      'https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=800&q=80',
    ],
    bestPeriod: 'Maggio - Settembre',
    bestMonths: [5, 6, 7, 8, 9],
    avgTemp: '14-23°C in estate',
    currency: 'Sterlina (£) - ~1€ = 0.86£',
    language: 'Inglese',
    budgetPerDay: '€100-180/giorno (medio)',
    flightFromItaly: '€40-150 A/R | 2.5h diretto',
    precautions: [
      'Guida a sinistra - attenzione attraversando',
      'Oyster Card o contactless per i trasporti',
      'Musei principali gratuiti ma donazione gradita',
      'Prenota attrazioni top online per risparmiare',
    ],
    clothing: [
      'Giacca impermeabile SEMPRE',
      'Strati - il meteo cambia in 30 minuti',
      'Scarpe waterproof comode',
      'Elegante casual per ristoranti/teatri',
    ],
    bookingsNeeded: [
      'London Eye (prenota online, -20%)',
      'Musical West End (mesi prima per i migliori)',
      'Tower of London (slot mattutino)',
      'Camden Market non serve prenotazione',
    ],
    itinerary: [
      {
        day: 1,
        title: 'Westminster & South Bank',
        activities: [
          { time: '09:00', title: 'Big Ben & Westminster', description: 'Inizia dal Parlamento e attraversa il ponte', cost: 'Gratuito', icon: '🏛️' },
          { time: '10:30', title: 'London Eye', description: 'Vista spettacolare sulla città. 30 min di giro', cost: '£30', icon: '🎡' },
          { time: '12:00', title: 'Borough Market', description: 'Il mercato del cibo più famoso. Prova scotch eggs e pad thai', cost: '£10-20', icon: '🥘' },
          { time: '14:00', title: 'Tate Modern', description: 'Arte contemporanea gratuita in una ex-centrale elettrica', cost: 'Gratuito', icon: '🎨' },
          { time: '16:00', title: 'St Paul Cathedral', description: 'Sali sulla cupola per una vista incredibile', cost: '£21', icon: '⛪' },
          { time: '19:00', title: 'Cena a Soho', description: 'Quartiere vivace con cucine da tutto il mondo', cost: '£20-40', icon: '🍽️' },
        ],
      },
      {
        day: 2,
        title: 'Royal London & Shopping',
        activities: [
          { time: '09:00', title: 'Buckingham Palace', description: 'Cambio della guardia (lun/mer/ven/dom alle 11)', cost: 'Gratuito', icon: '👑' },
          { time: '11:30', title: 'Hyde Park', description: 'Passeggiata nel parco reale, Speaker Corner', cost: 'Gratuito', icon: '🌳' },
          { time: '13:00', title: 'Harrods & Knightsbridge', description: 'Il department store più famoso del mondo', cost: 'Window shopping!', icon: '🛍️' },
          { time: '15:00', title: 'British Museum', description: 'Stele di Rosetta, mummie, Partenone. Immenso e gratuito', cost: 'Gratuito', icon: '🏺' },
          { time: '18:00', title: 'Covent Garden', description: 'Street performer, boutique e atmosfera magica', cost: 'Gratuito', icon: '🎭' },
          { time: '20:00', title: 'Musical West End', description: 'The Phantom, Wicked, Hamilton...esperienza imperdibile', cost: '£40-150', icon: '🎵' },
        ],
      },
    ],
  },

  {
    id: 'bali',
    name: 'Bali',
    country: 'Indonesia',
    emoji: '🇮🇩',
    tagline: 'Spiritualità, natura e avventura',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=800&q=80',
      'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=800&q=80',
      'https://images.unsplash.com/photo-1573790387438-4da905039392?w=800&q=80',
      'https://images.unsplash.com/photo-1501179691627-eeaa65ea017c?w=800&q=80',
    ],
    bestPeriod: 'Aprile - Ottobre (stagione secca)',
    bestMonths: [4, 5, 6, 7, 8, 9, 10],
    avgTemp: '27-30°C tutto l\'anno',
    currency: 'Rupia indonesiana (IDR) - ~1€ = 17.000 IDR',
    language: 'Indonesiano (inglese turistico diffuso)',
    budgetPerDay: '€40-80/giorno (medio)',
    flightFromItaly: '€400-700 A/R | 14-18h con scalo',
    precautions: [
      'Bevi solo acqua in bottiglia sigillata',
      'Crema solare alta SPF - sole equatoriale forte',
      'Noleggia scooter solo con esperienza (traffico caotico)',
      'Rispetta i templi (sarong obbligatorio)',
      'Attenzione alle scimmie - rubano occhiali e cellulari',
    ],
    clothing: [
      'Vestiti leggeri e traspiranti',
      'Sarong per i templi (o compralo lì a €2)',
      'Costume da bagno + copricostume',
      'Scarpe da trekking per le risaie',
      'Sandali comodi per il quotidiano',
    ],
    bookingsNeeded: [
      'Swing di Ubud (prenota per evitare 2h di coda)',
      'Snorkeling a Nusa Penida (barca del mattino)',
      'Villa con piscina privata (prenota 2+ settimane prima)',
      'Lezione di cucina balinese',
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrivo & Seminyak',
        activities: [
          { time: '10:00', title: 'Arrivo Ngurah Rai', description: 'Prendi un Grab (Uber locale) per la villa', cost: '€5-10', icon: '✈️' },
          { time: '12:00', title: 'Check-in Villa', description: 'Villa con piscina a Seminyak. Relax e ambientamento', cost: '€40-80/notte', icon: '🏡' },
          { time: '15:00', title: 'Spiaggia di Seminyak', description: 'Rilassati, surfa se vuoi, goditi i beach club', cost: '€0-20', icon: '🏖️' },
          { time: '18:00', title: 'Tramonto a Potato Head', description: 'Beach club iconico. Cocktail al tramonto', cost: '€15-25', icon: '🌅' },
          { time: '20:00', title: 'Cena a La Plancha', description: 'Beanbag sulla spiaggia, pesce alla griglia', cost: '€10-20', icon: '🐟' },
        ],
      },
      {
        day: 2,
        title: 'Ubud - Cultura & Natura',
        activities: [
          { time: '06:00', title: 'Tegallalang Rice Terrace', description: 'Le risaie a terrazza più instagrammate. Vai alle 6 per la luce', cost: '€2 ingresso', icon: '🌾' },
          { time: '09:00', title: 'Monkey Forest', description: 'Santuario con centinaia di macachi. Tieni tutto in tasca!', cost: '€4', icon: '🐒' },
          { time: '11:00', title: 'Ubud Market', description: 'Artigianato locale. Contratta! Parti dal 30% del prezzo', cost: '€10-30', icon: '🛍️' },
          { time: '13:00', title: 'Pranzo Warung', description: 'Ristorante locale. Nasi Goreng autentico per €2-3', cost: '€3-5', icon: '🍛' },
          { time: '15:00', title: 'Tirta Empul', description: 'Tempio dell acqua sacra. Puoi fare la purificazione', cost: '€3', icon: '⛩️' },
          { time: '19:00', title: 'Spettacolo Kecak', description: 'Danza del fuoco tradizionale balinese. Magico!', cost: '€8', icon: '🔥' },
        ],
      },
    ],
  },

  {
    id: 'newyork',
    name: 'New York',
    country: 'Stati Uniti',
    emoji: '🇺🇸',
    tagline: 'La città che non dorme mai',
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1534430480872-3498386e7856?w=800&q=80',
      'https://images.unsplash.com/photo-1522083165195-3424ed129620?w=800&q=80',
      'https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?w=800&q=80',
      'https://images.unsplash.com/photo-1518235506717-e1ed3306a89b?w=800&q=80',
    ],
    bestPeriod: 'Aprile - Giugno / Settembre - Novembre',
    bestMonths: [4, 5, 6, 9, 10, 11],
    avgTemp: '10-25°C in primavera/autunno',
    currency: 'Dollaro ($) - ~1€ = 1.08$',
    language: 'Inglese',
    budgetPerDay: '€150-250/giorno (medio-alto)',
    flightFromItaly: '€300-600 A/R | 9h diretto',
    precautions: [
      'ESTA obbligatorio (richiedi 72h prima minimo)',
      'Mance obbligatorie: 18-20% al ristorante',
      'Metro sicura ma attenzione di notte',
      'Assicurazione sanitaria FONDAMENTALE',
    ],
    clothing: [
      'Sneakers comodissime (camminerai 15-20km/giorno)',
      'Smart casual per ristoranti e rooftop bar',
      'Giacca leggera per aria condizionata ovunque',
      'In autunno: strati e sciarpa leggera',
    ],
    bookingsNeeded: [
      'Statua della Libertà (Crown access: mesi prima)',
      'Musical Broadway (prenota 2-4 settimane prima)',
      'Top of the Rock o Edge (prenota sunset slot)',
      'Ristoranti trendy: prenotazione su Resy/OpenTable',
    ],
    itinerary: [
      {
        day: 1,
        title: 'Manhattan Icons',
        activities: [
          { time: '08:00', title: 'Central Park', description: 'Passeggiata mattutina. Bethesda Fountain e Bow Bridge', cost: 'Gratuito', icon: '🌳' },
          { time: '10:00', title: 'MET Museum', description: 'Uno dei musei più grandi del mondo. Focus su 2-3 sezioni', cost: '$30', icon: '🖼️' },
          { time: '13:00', title: 'Pranzo Upper East Side', description: 'Deli classico - pastrami sandwich da Katz (o simili)', cost: '$15-25', icon: '🥪' },
          { time: '14:30', title: 'Fifth Avenue', description: 'Shopping e architettura da Tiffany a Apple Store', cost: 'Window shopping', icon: '🏙️' },
          { time: '17:00', title: 'Top of the Rock', description: 'Vista su Central Park + Empire State. Meglio al tramonto', cost: '$40', icon: '🌆' },
          { time: '19:30', title: 'Times Square & Broadway', description: 'Musical + cena pre-teatro nel Theater District', cost: '$80-200', icon: '🎭' },
        ],
      },
      {
        day: 2,
        title: 'Downtown & Brooklyn',
        activities: [
          { time: '08:00', title: 'Statua della Libertà', description: 'Ferry da Battery Park. Prenota il pedestal access', cost: '$24', icon: '🗽' },
          { time: '11:00', title: 'Wall Street & 9/11 Memorial', description: 'Il memoriale è gratuito e toccante. Museo opzionale', cost: 'Gratuito/museo $26', icon: '🏦' },
          { time: '13:00', title: 'Chinatown & Little Italy', description: 'Dim sum a Chinatown, cannolo da Ferrara a Little Italy', cost: '$15-25', icon: '🥟' },
          { time: '15:00', title: 'Brooklyn Bridge', description: 'Attraversalo a piedi (30 min). Vista iconica dello skyline', cost: 'Gratuito', icon: '🌉' },
          { time: '16:30', title: 'DUMBO', description: 'Foto spot più instagrammato di NY. Gelato da Ample Hills', cost: '$5-10', icon: '📸' },
          { time: '19:00', title: 'Cena a Williamsburg', description: 'Quartiere hipster. Pizza da Roberta o tacos da Los Tacos', cost: '$20-40', icon: '🍕' },
        ],
      },
    ],
  },

  {
    id: 'iceland',
    name: 'Islanda',
    country: 'Islanda',
    emoji: '🇮🇸',
    tagline: 'Terra di ghiaccio, fuoco e aurora boreale',
    image: 'https://images.unsplash.com/photo-1504829857797-ddff29c27927?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1520769945061-0a448c463865?w=800&q=80',
      'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=800&q=80',
      'https://images.unsplash.com/photo-1476610182048-b716b8518aae?w=800&q=80',
      'https://images.unsplash.com/photo-1494783367193-149034c05e8f?w=800&q=80',
    ],
    bestPeriod: 'Giugno - Agosto (natura) / Settembre - Marzo (aurora)',
    bestMonths: [6, 7, 8, 9, 10],
    avgTemp: '5-15°C in estate, -5-5°C in inverno',
    currency: 'Corona islandese (ISK) - ~1€ = 150 ISK',
    language: 'Islandese (inglese parlato ovunque)',
    budgetPerDay: '€120-200/giorno (alto)',
    flightFromItaly: '€150-400 A/R | 4-5h con scalo',
    precautions: [
      'Meteo imprevedibile - controlla vedur.is ogni mattina',
      'Non guidare fuoristrada - multe salatissime',
      'Vento fortissimo - attenzione alle portiere auto',
      'Niente zanzare! Ma il vento compensa',
      'Acqua del rubinetto potabile e buonissima',
    ],
    clothing: [
      'Sistema a strati: base termica + pile + guscio',
      'Giacca antivento e impermeabile ESSENZIALE',
      'Scarpe da trekking impermeabili',
      'Berretto, guanti e scaldacollo',
      'Costume da bagno per hot springs',
    ],
    bookingsNeeded: [
      'Blue Lagoon (prenota 2+ settimane prima - sold out!)',
      'Auto 4x4 per sterrate e guadi',
      'Whale watching da Husavik',
      'Ice cave tour (solo inverno, prenota 1 mese prima)',
    ],
    itinerary: [
      {
        day: 1,
        title: 'Reykjavik & Golden Circle',
        activities: [
          { time: '08:00', title: 'Hallgrimskirkja', description: 'Chiesa iconica. Sali sulla torre per la vista', cost: '€10', icon: '⛪' },
          { time: '09:30', title: 'Partenza Golden Circle', description: 'Noleggia 4x4 e parti per il circuito più famoso', cost: '€60-80/giorno auto', icon: '🚗' },
          { time: '11:00', title: 'Þingvellir', description: 'Dove le placche tettoniche si dividono. Patrimonio UNESCO', cost: 'Gratuito', icon: '🏔️' },
          { time: '13:00', title: 'Geysir', description: 'Geyser Strokkur erutta ogni 5-8 minuti. Spettacolare!', cost: 'Gratuito', icon: '💨' },
          { time: '15:00', title: 'Gullfoss', description: 'Cascata possente a due livelli. Sentirai il rombo', cost: 'Gratuito', icon: '💧' },
          { time: '18:00', title: 'Secret Lagoon', description: 'Hot spring naturale meno turistica della Blue Lagoon', cost: '€25', icon: '♨️' },
        ],
      },
      {
        day: 2,
        title: 'Costa Sud',
        activities: [
          { time: '08:00', title: 'Seljalandsfoss', description: 'Cascata dove puoi camminare DIETRO il getto d acqua', cost: 'Gratuito', icon: '💧' },
          { time: '10:00', title: 'Skogafoss', description: 'Cascata enorme. Sali i 370 scalini per la vista dall alto', cost: 'Gratuito', icon: '🌊' },
          { time: '12:00', title: 'Aereo DC-3 abbandonato', description: 'Relitto sulla spiaggia nera. 4km a piedi (o shuttle €8)', cost: 'Gratuito', icon: '✈️' },
          { time: '14:00', title: 'Reynisfjara', description: 'Spiaggia di sabbia nera con colonne basaltiche. NON voltare le spalle al mare!', cost: 'Gratuito', icon: '🖤' },
          { time: '16:00', title: 'Vik', description: 'Villaggio pittoresco. Rifornisci e prendi un hot dog islandese', cost: '€5', icon: '🏘️' },
          { time: '20:00', title: 'Caccia all\'Aurora', description: 'Se sei in settembre-marzo, cerca cieli limpidi lontano dalle luci', cost: 'Gratuito', icon: '🌌' },
        ],
      },
    ],
  },

  {
    id: 'marrakech',
    name: 'Marrakech',
    country: 'Marocco',
    emoji: '🇲🇦',
    tagline: 'Colori, spezie e magia della medina',
    image: 'https://images.unsplash.com/photo-1597212618440-806262de4f6b?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?w=800&q=80',
      'https://images.unsplash.com/photo-1548018560-c7196e49ceb1?w=800&q=80',
      'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=800&q=80',
      'https://images.unsplash.com/photo-1517821099606-cef63a9bcda6?w=800&q=80',
    ],
    bestPeriod: 'Marzo - Maggio / Ottobre - Novembre',
    bestMonths: [3, 4, 5, 10, 11],
    avgTemp: '20-28°C in primavera/autunno',
    currency: 'Dirham (MAD) - ~1€ = 11 MAD',
    language: 'Arabo/Francese (francese molto utile)',
    budgetPerDay: '€50-100/giorno (budget-medio)',
    flightFromItaly: '€30-100 A/R | 3h diretto',
    precautions: [
      'Contratta SEMPRE - il primo prezzo è 3-5x il reale',
      'Non seguire "guide" spontanee nella medina',
      'Bevi solo acqua in bottiglia',
      'Le donne: copri spalle e ginocchia nella medina',
      'Porta cash - carte poco accettate nei souk',
    ],
    clothing: [
      'Vestiti leggeri ma che coprano spalle e ginocchia',
      'Scarpe chiuse comode per la medina (acciottolato)',
      'Cappello e occhiali da sole',
      'Sciarpa leggera (polvere e sole)',
      'Sera: giacca leggera (nel deserto fa freddo)',
    ],
    bookingsNeeded: [
      'Riad (casa tradizionale) - prenota il tuo preferito',
      'Escursione deserto Merzouga (2-3 giorni, prenota prima)',
      'Hammam tradizionale (basta presentarsi)',
      'Lezione di cucina marocchina',
    ],
    itinerary: [
      {
        day: 1,
        title: 'Medina & Souk',
        activities: [
          { time: '09:00', title: 'Jemaa el-Fna', description: 'La piazza principale. Di mattina è tranquilla - succo d arancia €1', cost: '€1-3', icon: '🏛️' },
          { time: '10:00', title: 'Souk della Medina', description: 'Labirinto di botteghe: pelle, spezie, tappeti, lampade', cost: '€0-50 shopping', icon: '🛍️' },
          { time: '12:30', title: 'Pranzo Rooftop', description: 'Tajine con vista sui tetti dalla terrazza di un riad', cost: '€5-10', icon: '🍲' },
          { time: '14:00', title: 'Bahia Palace', description: 'Palazzo del XIX secolo con mosaici e giardini incredibili', cost: '€7', icon: '🏰' },
          { time: '16:00', title: 'Jardin Majorelle', description: 'Giardino blu di Yves Saint Laurent. Imperdibile per le foto', cost: '€12', icon: '🌴' },
          { time: '19:00', title: 'Cena in piazza', description: 'Bancarelle a Jemaa el-Fna. Prova pastilla e harira', cost: '€5-10', icon: '🥘' },
        ],
      },
      {
        day: 2,
        title: 'Hammam & Artigianato',
        activities: [
          { time: '09:00', title: 'Hammam Tradizionale', description: 'Scrub + bagno di vapore. Esperienza rilassante unica', cost: '€15-30', icon: '♨️' },
          { time: '11:00', title: 'Museo di Marrakech', description: 'Architettura stupenda, fontane e mostre d arte', cost: '€5', icon: '🏺' },
          { time: '13:00', title: 'Pranzo Tanneries', description: 'Vicino alle concerie (naso forte!) - cucina locale autentica', cost: '€5-8', icon: '🍽️' },
          { time: '15:00', title: 'Lezione di Cucina', description: 'Impara a fare couscous, tajine e pastilla', cost: '€25-40', icon: '👨‍🍳' },
          { time: '18:00', title: 'Tè alla menta sul rooftop', description: 'Rilassati guardando il tramonto sulla medina', cost: '€2-3', icon: '🍵' },
          { time: '20:00', title: 'Cena Riad', description: 'Cena nel tuo riad con musica tradizionale', cost: '€15-25', icon: '🌙' },
        ],
      },
    ],
  },
];
