export interface TimezoneInfo {
  timezone: string;
  offsetFromItaly: string;
  note: string;
}

export const timezones: Record<string, TimezoneInfo> = {
  tokyo: { timezone: 'JST', offsetFromItaly: '+8h', note: 'Italia 12:00 → Tokyo 20:00' },
  london: { timezone: 'GMT/BST', offsetFromItaly: '-1h', note: 'Italia 12:00 → Londra 11:00' },
  bali: { timezone: 'WITA', offsetFromItaly: '+7h', note: 'Italia 12:00 → Bali 19:00' },
  newyork: { timezone: 'EST/EDT', offsetFromItaly: '-6h', note: 'Italia 12:00 → NYC 06:00' },
  iceland: { timezone: 'GMT', offsetFromItaly: '-1h', note: 'Islanda NON cambia ora' },
  paris: { timezone: 'CET', offsetFromItaly: '0h', note: 'Stessa ora dell\'Italia!' },
  barcelona: { timezone: 'CET', offsetFromItaly: '0h', note: 'Stessa ora, ma cenano alle 22' },
  amsterdam: { timezone: 'CET', offsetFromItaly: '0h', note: 'Stessa ora dell\'Italia' },
  prague: { timezone: 'CET', offsetFromItaly: '0h', note: 'Stessa ora dell\'Italia' },
  lisbon: { timezone: 'WET', offsetFromItaly: '-1h', note: 'Italia 12:00 → Lisbona 11:00' },
  santorini: { timezone: 'EET', offsetFromItaly: '+1h', note: 'Italia 12:00 → Grecia 13:00' },
  vienna: { timezone: 'CET', offsetFromItaly: '0h', note: 'Stessa ora dell\'Italia' },
  dubrovnik: { timezone: 'CET', offsetFromItaly: '0h', note: 'Stessa ora dell\'Italia' },
  marrakech: { timezone: 'GMT+1', offsetFromItaly: '0h', note: 'Marocco: GMT+1 tutto l\'anno' },
  bangkok: { timezone: 'ICT', offsetFromItaly: '+6h', note: 'Italia 12:00 → Bangkok 18:00' },
  dubai: { timezone: 'GST', offsetFromItaly: '+3h', note: 'Italia 12:00 → Dubai 15:00' },
  mexico: { timezone: 'CST', offsetFromItaly: '-7h', note: 'Italia 12:00 → CDMX 05:00' },
  capetown: { timezone: 'SAST', offsetFromItaly: '+1h', note: 'Quasi stessa ora!' },
  jordan: { timezone: 'AST', offsetFromItaly: '+2h', note: 'Italia 12:00 → Amman 14:00' },
  peru: { timezone: 'PET', offsetFromItaly: '-6h', note: 'Italia 12:00 → Lima 06:00' },
  maldives: { timezone: 'MVT', offsetFromItaly: '+4h', note: 'Italia 12:00 → Maldive 16:00' },
  zanzibar: { timezone: 'EAT', offsetFromItaly: '+2h', note: 'Italia 12:00 → Zanzibar 14:00' },
  tanzania: { timezone: 'EAT', offsetFromItaly: '+2h', note: 'Italia 12:00 → Tanzania 14:00' },
};
