export interface Dish {
  name: string;
  description: string;
  price: string;
  emoji: string;
  mustTry: boolean;
}

export const dishes: Record<string, Dish[]> = {
  tokyo: [
    { name: 'Ramen', description: 'Brodo ricco con noodle, chashu, uovo. Ogni quartiere ha il suo stile', price: '€8-12', emoji: '🍜', mustTry: true },
    { name: 'Sushi Omakase', description: 'Lo chef sceglie per te. Pesce freschissimo del mercato', price: '€40-100', emoji: '🍣', mustTry: true },
    { name: 'Yakitori', description: 'Spiedini di pollo alla griglia. Ogni parte, dalla pelle al cuore', price: '€10-20', emoji: '🍢', mustTry: false },
    { name: 'Tonkatsu', description: 'Cotoletta di maiale impanata con cavolo e salsa speciale', price: '€12-18', emoji: '🐷', mustTry: true },
    { name: 'Matcha Dessert', description: 'Gelato, mochi, tiramisu al tè verde. Ovunque e sempre buono', price: '€3-8', emoji: '🍵', mustTry: false },
    { name: 'Okonomiyaki', description: 'Pancake salato con cavolo, maiale, salse. Lo cucini tu!', price: '€8-14', emoji: '🥞', mustTry: false },
  ],
  london: [
    { name: 'Fish & Chips', description: 'Merluzzo in pastella con patatone e mushy peas. Classico!', price: '£10-15', emoji: '🐟', mustTry: true },
    { name: 'Sunday Roast', description: 'Arrosto con Yorkshire pudding, patate e gravy. La domenica!', price: '£15-25', emoji: '🥩', mustTry: true },
    { name: 'Full English Breakfast', description: 'Uova, bacon, sausage, beans, toast, pomodoro. Energia per tutto il giorno', price: '£8-15', emoji: '🍳', mustTry: true },
    { name: 'Afternoon Tea', description: 'Scones, finger sandwich, dolcini con tè. Esperienza british', price: '£25-60', emoji: '🫖', mustTry: false },
    { name: 'Pie & Mash', description: 'Torta salata di carne con purè. Comfort food londinese', price: '£8-12', emoji: '🥧', mustTry: false },
    { name: 'Curry (Brick Lane)', description: 'Il miglior curry fuori dall\'India. Chicken tikka masala nato qui!', price: '£10-18', emoji: '🍛', mustTry: true },
  ],
  bali: [
    { name: 'Nasi Goreng', description: 'Riso fritto con uovo, pollo, verdure e krupuk. IL piatto indonesiano', price: '€2-4', emoji: '🍛', mustTry: true },
    { name: 'Babi Guling', description: 'Maiale arrosto intero balinese con spezie. Croccantissimo', price: '€3-8', emoji: '🐷', mustTry: true },
    { name: 'Satay', description: 'Spiedini di pollo con salsa di arachidi. Street food perfetto', price: '€1-3', emoji: '🍢', mustTry: true },
    { name: 'Smoothie Bowl', description: 'Açaí, pitaya, mango bowl con granola. Colazione dei sogni', price: '€3-6', emoji: '🥣', mustTry: false },
    { name: 'Mie Goreng', description: 'Noodle fritti saltati con verdure e uovo fritto sopra', price: '€2-4', emoji: '🍜', mustTry: false },
    { name: 'Lawar', description: 'Insalata balinese con cocco, spezie e carne macinata. Autentico', price: '€2-3', emoji: '🥗', mustTry: false },
  ],
  newyork: [
    { name: 'Pizza Slice', description: 'Fetta enorme piegata a metà. Da Joe\'s o Di Fara. $1-3!', price: '$1-4', emoji: '🍕', mustTry: true },
    { name: 'Bagel', description: 'Con cream cheese, lox (salmone), everything seasoning', price: '$4-8', emoji: '🥯', mustTry: true },
    { name: 'Pastrami Sandwich', description: 'Da Katz\'s Deli. Montagna di pastrami tagliato a mano', price: '$22-28', emoji: '🥪', mustTry: true },
    { name: 'Cheesecake', description: 'New York style: densa, cremosa, con base di biscotto', price: '$8-12', emoji: '🍰', mustTry: false },
    { name: 'Chopped Cheese', description: 'Il panino dei bodega. Carne, formaggio fuso, insalata', price: '$6-9', emoji: '🧀', mustTry: false },
    { name: 'Ramen (East Village)', description: 'NYC ha i migliori ramen fuori dal Giappone. Ippudo o Totto', price: '$16-22', emoji: '🍜', mustTry: false },
  ],
  paris: [
    { name: 'Croissant au beurre', description: 'Sfogliato, dorato, burrosissimo. La colazione perfetta', price: '€1.50-3', emoji: '🥐', mustTry: true },
    { name: 'Steak-frites', description: 'Entrecôte con patatine e salsa béarnaise. Bistrot classico', price: '€18-30', emoji: '🥩', mustTry: true },
    { name: 'Croque-Monsieur', description: 'Toast con prosciutto, gruyère e besciamella. Comfort food', price: '€8-14', emoji: '🧀', mustTry: true },
    { name: 'Macaron', description: 'Da Ladurée o Pierre Hermé. Leggeri, colorati, divini', price: '€2-3 l\'uno', emoji: '🍬', mustTry: true },
    { name: 'Escargot', description: 'Lumache al burro, aglio e prezzemolo. Più buone di quanto pensi!', price: '€12-18', emoji: '🐌', mustTry: false },
    { name: 'Confit de Canard', description: 'Anatra cotta nel suo grasso. Croccante fuori, tenera dentro', price: '€18-25', emoji: '🦆', mustTry: false },
  ],
  barcelona: [
    { name: 'Patatas Bravas', description: 'Patatone con salsa piccante e alioli. Ogni bar ha la sua versione', price: '€4-7', emoji: '🥔', mustTry: true },
    { name: 'Jamón Ibérico', description: 'Prosciutto iberico tagliato al coltello. Maiale nutrito a ghiande', price: '€8-20', emoji: '🥩', mustTry: true },
    { name: 'Paella', description: 'Riso allo zafferano con frutti di mare. NON ordinarla sulle Ramblas!', price: '€12-22', emoji: '🥘', mustTry: true },
    { name: 'Churros con Chocolate', description: 'Fritti e zuccherati, intinti nel cioccolato denso. Da La Pallaresa', price: '€4-6', emoji: '🍩', mustTry: false },
    { name: 'Pintxos', description: 'Mini bocconcini su pane con stecchino. Bar crawl basco-catalano', price: '€2-4 l\'uno', emoji: '🍢', mustTry: true },
    { name: 'Crema Catalana', description: 'Come la crème brûlée ma con cannella e limone. Dolce locale', price: '€5-8', emoji: '🍮', mustTry: false },
  ],
  amsterdam: [
    { name: 'Stroopwafel', description: 'Due cialde sottili con sciroppo di caramello. Caldo al mercato!', price: '€2-4', emoji: '🧇', mustTry: true },
    { name: 'Bitterballen', description: 'Crocchette di ragù fritte con senape. Perfette con la birra', price: '€5-8', emoji: '🟤', mustTry: true },
    { name: 'Haring (Aringa)', description: 'Aringa cruda con cipolla e cetriolini. Il fast food olandese', price: '€4-6', emoji: '🐟', mustTry: true },
    { name: 'Rijsttafel', description: '12-20 piatti indonesiani in miniatura. Eredità coloniale deliziosa', price: '€25-40', emoji: '🍛', mustTry: false },
    { name: 'Poffertjes', description: 'Mini pancake soffici con burro e zucchero a velo', price: '€5-8', emoji: '🥞', mustTry: false },
    { name: 'Kaassoufflé', description: 'Gouda fritto in pastella. Snack da late night perfetto', price: '€3-5', emoji: '🧀', mustTry: false },
  ],
  marrakech: [
    { name: 'Tajine', description: 'Stufato cotto nel coccio conico. Pollo, limone, olive. Profumatissimo', price: '€5-12', emoji: '🍲', mustTry: true },
    { name: 'Couscous del Venerdì', description: 'Piatto nazionale. Semola con 7 verdure e carne. Solo il venerdì!', price: '€5-10', emoji: '🥘', mustTry: true },
    { name: 'Pastilla', description: 'Torta croccante con piccione, mandorle e cannella. Dolce-salato', price: '€5-8', emoji: '🥧', mustTry: true },
    { name: 'Tè alla Menta', description: 'Versato dall\'alto con teatralità. Dolcissimo e rinfrescante', price: '€1-2', emoji: '🍵', mustTry: true },
    { name: 'Harira', description: 'Zuppa di ceci, lenticchie e pomodoro. Si mangia al tramonto', price: '€2-4', emoji: '🥣', mustTry: false },
    { name: 'Msemen', description: 'Crêpe sfogliata marocchina con miele o formaggio. Colazione', price: '€0.50-1', emoji: '🫓', mustTry: false },
  ],
  zanzibar: [
    { name: 'Pizza di Zanzibar', description: 'Crêpe farcita con carne, uovo e verdure. Street food unico!', price: '€1-3', emoji: '🫓', mustTry: true },
    { name: 'Pesce alla griglia', description: 'Appena pescato, grigliato con lime e spezie sulla spiaggia', price: '€5-15', emoji: '🐟', mustTry: true },
    { name: 'Pilau Rice', description: 'Riso speziato con cardamomo, chiodi garofano e cannella', price: '€2-4', emoji: '🍚', mustTry: true },
    { name: 'Urojo Soup', description: 'Zuppa acida con frittelle, patate e chutney. Tipica di Stone Town', price: '€1-2', emoji: '🥣', mustTry: false },
    { name: 'Succo di canna da zucchero', description: 'Spremuto al momento per strada. Rinfrescante e dolce', price: '€0.50', emoji: '🥤', mustTry: false },
    { name: 'Mandazi', description: 'Ciambelle fritte swahili con cocco. Colazione perfetta', price: '€0.30', emoji: '🍩', mustTry: false },
  ],
  tanzania: [
    { name: 'Nyama Choma', description: 'Carne alla brace. Il piatto sociale dell\'Africa orientale', price: '€5-15', emoji: '🥩', mustTry: true },
    { name: 'Ugali con Sukuma', description: 'Polenta bianca con verdure. Il piatto quotidiano tanzaniano', price: '€2-4', emoji: '🍽️', mustTry: true },
    { name: 'Chipsi Mayai', description: 'Omelette con patatine fritte dentro. Fast food locale', price: '€1-3', emoji: '🍳', mustTry: false },
    { name: 'Mishkaki', description: 'Spiedini di carne marinati alle spezie. BBQ tanzaniano', price: '€2-5', emoji: '🍢', mustTry: true },
    { name: 'Caffè Tanzaniano', description: 'Dalle pendici del Kilimanjaro. Tra i migliori al mondo', price: '€1-2', emoji: '☕', mustTry: false },
    { name: 'Chapati', description: 'Pane piatto cotto sulla piastra. Accompagna tutto', price: '€0.30', emoji: '🫓', mustTry: false },
  ],
  iceland: [
    { name: 'Hot Dog Islandese', description: 'Da Bæjarins Beztu. Agnello + ketchup dolce + senape + remoulade', price: '€4', emoji: '🌭', mustTry: true },
    { name: 'Plokkfiskur', description: 'Stufato di pesce con patate e panna. Comfort food vichingo', price: '€12-18', emoji: '🐟', mustTry: false },
    { name: 'Skyr', description: 'Yogurt islandese densissimo. Con mirtilli selvatici = paradiso', price: '€3-5', emoji: '🥛', mustTry: true },
    { name: 'Lamb Soup', description: 'Zuppa di agnello con verdure. Ti scalda dopo un trekking', price: '€10-15', emoji: '🍲', mustTry: true },
    { name: 'Hákarl (per coraggiosi)', description: 'Squalo fermentato. Puzza terribilmente ma è tradizione', price: '€5-8', emoji: '🦈', mustTry: false },
    { name: 'Brennivín', description: 'Acquavite di patate "morte nera". Shot al bar dopo cena', price: '€6-10', emoji: '🥃', mustTry: false },
  ],
  dubai: [
    { name: 'Shawarma', description: 'Il miglior shawarma del mondo. Carne rotante, tahina, pickles', price: '€3-5', emoji: '🌯', mustTry: true },
    { name: 'Al Machboos', description: 'Riso speziato con carne o pesce. Piatto nazionale emiratino', price: '€8-15', emoji: '🍚', mustTry: true },
    { name: 'Knafeh', description: 'Dolce di pasta fillo, formaggio e sciroppo. Caldo e filante', price: '€3-6', emoji: '🍮', mustTry: true },
    { name: 'Camel Burger', description: 'Hamburger di cammello! Magro e saporito. Da provare almeno una volta', price: '€8-12', emoji: '🐪', mustTry: false },
    { name: 'Luqaimat', description: 'Palline fritte con sciroppo di datteri. Dolcetti tradizionali', price: '€3-5', emoji: '🍩', mustTry: false },
    { name: 'Arabic Coffee + Dates', description: 'Caffè al cardamomo con datteri. Il benvenuto arabo', price: '€2-5', emoji: '☕', mustTry: true },
  ],
};
