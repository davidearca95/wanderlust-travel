// Default checklist items per destination
// Generic items + destination-specific ones

const GENERIC_ITEMS = [
  'Passaporto (valido 6+ mesi)',
  'Biglietto aereo prenotato',
  'Assicurazione viaggio',
  'Alloggio prenotato',
  'Carta di credito/debito abilitata estero',
  'Contanti in valuta locale',
  'Fotocopia documenti (email a te stesso)',
  'Caricatore universale',
  'Farmaci personali',
  'Scarpe comode',
];

const DESTINATION_ITEMS: Record<string, string[]> = {
  tokyo: ['Japan Rail Pass acquistato', 'Pocket WiFi prenotato', 'TeamLab prenotato', 'Scarpe facili da togliere'],
  london: ['Oyster Card o contactless', 'Musical prenotato', 'London Eye prenotato', 'Ombrello!'],
  bali: ['Sarong per templi', 'Crema solare SPF50', 'Repellente zanzare', 'Patente internazionale (scooter)'],
  newyork: ['ESTA approvato', 'Adapter USA (tipo A/B)', 'Musical Broadway prenotato', 'Scarpe comodissime'],
  paris: ['Tour Eiffel prenotata', 'Louvre prenotato', 'Adattatore presa (tipo E)', 'Frasario francese base'],
  barcelona: ['Sagrada Familia prenotata', 'Park Güell prenotato', 'Crema solare', 'Zaino antifurto'],
  amsterdam: ['Van Gogh Museum prenotato', 'Casa Anna Frank prenotata', 'Giacca antivento', 'Scarpe waterproof'],
  iceland: ['Auto 4x4 prenotata', 'Blue Lagoon prenotata', 'Vestiti termici', 'App vedur.is (meteo)'],
  marrakech: ['Riad prenotato', 'Contanti (molti!)', 'Scarpe chiuse comode', 'Sciarpa per sole/polvere'],
  zanzibar: ['Antimalarica (consultare medico)', 'Visto Tanzania', 'Repellente forte', 'Scarpe da scoglio'],
  tanzania: ['Visto e-visa', 'Antimalarica', 'Binocolo', 'Safari operator confermato', 'Vaccino febbre gialla'],
  dubai: ['Vestiti modesti per moschee', 'Crema solare forte', 'Burj Khalifa prenotato', 'App Careem/Uber'],
  bangkok: ['Vestiti per templi (spalle coperte)', 'Grab app installata', 'Crema solare SPF50', 'Marsupio antifurto'],
  maldives: ['Crema solare reef-safe', 'Transfer resort confermato', 'Maschera snorkeling', 'Assicurazione sub'],
  jordan: ['Jordan Pass acquistato', 'Scarpe trekking Petra', 'Acqua (tanta!)', 'Torcia per Petra by Night'],
  peru: ['Biglietto Machu Picchu', 'Pillole altitudine (soroche)', 'Treno prenotato', 'Crema solare SPF50'],
  capetown: ['Adapter Sudafrica (tipo M)', 'Table Mountain prenotata', 'Giacca antivento', 'Uber app'],
  mexico: ['Adapter USA/Messico', 'Uber/Didi app', 'Museo Frida prenotato', 'Pillole stomaco (precauzione)'],
  lisbon: ['Scarpe antiscivolo (ciottoli!)', 'Crema solare', 'Lisboa Card (opzionale)', 'Sintra day trip pianificato'],
  santorini: ['Hotel con vista caldera', 'Catamarano prenotato', 'Crema solare forte', 'Scarpe per scalinate'],
  vienna: ['Vienna Card', 'Opera/concerto prenotato', 'Abito elegante per opera', 'Adapter tipo C/F'],
  prague: ['Corona ceca (NON cambiare in strada!)', 'Castello prenotato', 'Bolt/Uber app', 'Scarpe per ciottoli'],
  dubrovnik: ['Mura prenotate (slot mattino)', 'Crema solare', 'Scarpe antiscivolo (marmo)', 'Costume da bagno'],
};

export function getChecklistForDestination(id: string): string[] {
  const specific = DESTINATION_ITEMS[id] || [];
  return [...GENERIC_ITEMS, ...specific];
}
