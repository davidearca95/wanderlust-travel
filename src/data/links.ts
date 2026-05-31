export interface UsefulLink {
  title: string;
  url: string;
  emoji: string;
  category: 'volo' | 'alloggio' | 'attivita' | 'trasporti' | 'info';
}

export const links: Record<string, UsefulLink[]> = {
  tokyo: [
    { title: 'Japan Rail Pass', url: 'https://japanrailpass.net', emoji: '🚂', category: 'trasporti' },
    { title: 'TeamLab Planets', url: 'https://www.teamlab.art', emoji: '🎨', category: 'attivita' },
    { title: 'Booking.com Tokyo', url: 'https://www.booking.com/city/jp/tokyo.html', emoji: '🏨', category: 'alloggio' },
    { title: 'Skyscanner Voli', url: 'https://www.skyscanner.it/voli-per/tyoa/tokyo.html', emoji: '✈️', category: 'volo' },
    { title: 'Japan Guide', url: 'https://www.japan-guide.com', emoji: '📖', category: 'info' },
  ],
  london: [
    { title: 'Musical West End', url: 'https://www.londontheatre.co.uk', emoji: '🎭', category: 'attivita' },
    { title: 'London Pass', url: 'https://www.londonpass.com', emoji: '🎫', category: 'attivita' },
    { title: 'Booking.com London', url: 'https://www.booking.com/city/gb/london.html', emoji: '🏨', category: 'alloggio' },
    { title: 'Skyscanner Voli', url: 'https://www.skyscanner.it/voli-per/lond/londra.html', emoji: '✈️', category: 'volo' },
    { title: 'Visit London', url: 'https://www.visitlondon.com', emoji: '📖', category: 'info' },
  ],
  bali: [
    { title: 'Grab (taxi app)', url: 'https://www.grab.com', emoji: '🚗', category: 'trasporti' },
    { title: 'Booking.com Bali', url: 'https://www.booking.com/region/id/bali.html', emoji: '🏨', category: 'alloggio' },
    { title: 'Skyscanner Voli', url: 'https://www.skyscanner.it/voli-per/dpsa/bali.html', emoji: '✈️', category: 'volo' },
    { title: 'GetYourGuide Bali', url: 'https://www.getyourguide.it/bali-l347/', emoji: '🎫', category: 'attivita' },
  ],
  paris: [
    { title: 'Tour Eiffel Biglietti', url: 'https://www.toureiffel.paris/it', emoji: '🗼', category: 'attivita' },
    { title: 'Louvre Biglietti', url: 'https://www.louvre.fr/en/visit/tickets', emoji: '🖼️', category: 'attivita' },
    { title: 'Booking.com Paris', url: 'https://www.booking.com/city/fr/paris.html', emoji: '🏨', category: 'alloggio' },
    { title: 'Skyscanner Voli', url: 'https://www.skyscanner.it/voli-per/pari/parigi.html', emoji: '✈️', category: 'volo' },
    { title: 'Paris Info', url: 'https://www.parisinfo.com', emoji: '📖', category: 'info' },
  ],
  barcelona: [
    { title: 'Sagrada Familia', url: 'https://sagradafamilia.org/en/tickets', emoji: '⛪', category: 'attivita' },
    { title: 'Park Güell', url: 'https://parkguell.barcelona', emoji: '🦎', category: 'attivita' },
    { title: 'Booking.com Barcelona', url: 'https://www.booking.com/city/es/barcelona.html', emoji: '🏨', category: 'alloggio' },
    { title: 'Skyscanner Voli', url: 'https://www.skyscanner.it/voli-per/bcna/barcellona.html', emoji: '✈️', category: 'volo' },
  ],
  amsterdam: [
    { title: 'Van Gogh Museum', url: 'https://www.vangoghmuseum.nl/en/tickets', emoji: '🎨', category: 'attivita' },
    { title: 'Anne Frank House', url: 'https://www.annefrank.org/en/tickets', emoji: '📖', category: 'attivita' },
    { title: 'Booking.com Amsterdam', url: 'https://www.booking.com/city/nl/amsterdam.html', emoji: '🏨', category: 'alloggio' },
    { title: 'Skyscanner Voli', url: 'https://www.skyscanner.it/voli-per/ams/amsterdam.html', emoji: '✈️', category: 'volo' },
  ],
  zanzibar: [
    { title: 'E-Visa Tanzania', url: 'https://www.immigration.go.tz/evisa', emoji: '📋', category: 'info' },
    { title: 'Booking.com Zanzibar', url: 'https://www.booking.com/region/tz/zanzibar.html', emoji: '🏨', category: 'alloggio' },
    { title: 'Skyscanner Voli', url: 'https://www.skyscanner.it/voli-per/znza/zanzibar.html', emoji: '✈️', category: 'volo' },
    { title: 'GetYourGuide Zanzibar', url: 'https://www.getyourguide.it/zanzibar-l1058/', emoji: '🎫', category: 'attivita' },
  ],
  tanzania: [
    { title: 'E-Visa Tanzania', url: 'https://www.immigration.go.tz/evisa', emoji: '📋', category: 'info' },
    { title: 'SafariBookings.com', url: 'https://www.safaribookings.com/tanzania', emoji: '🦁', category: 'attivita' },
    { title: 'Skyscanner Voli', url: 'https://www.skyscanner.it/voli-per/dara/arusha.html', emoji: '✈️', category: 'volo' },
  ],
};
