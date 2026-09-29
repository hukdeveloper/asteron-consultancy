import fs from 'fs';

// Load base items
const items = JSON.parse(fs.readFileSync('data/italy-directory.json', 'utf8'));

const cityMap = {
  1: { city: "L'Aquila", region: "Abruzzo" },
  2: { city: "Chieti-Pescara", region: "Abruzzo" },
  3: { city: "Teramo", region: "Abruzzo" },
  4: { city: "Potenza", region: "Basilicata" },
  5: { city: "Catanzaro", region: "Calabria" },
  6: { city: "Rende (Cosenza)", region: "Calabria" },
  7: { city: "Reggio Calabria", region: "Calabria" },
  8: { city: "Naples", region: "Campania" },
  9: { city: "Naples", region: "Campania" },
  10: { city: "Naples", region: "Campania" },
  11: { city: "Benevento", region: "Campania" },
  12: { city: "Caserta", region: "Campania" },
  13: { city: "Salerno", region: "Campania" },
  14: { city: "Bologna", region: "Emilia-Romagna" },
  15: { city: "Ferrara", region: "Emilia-Romagna" },
  16: { city: "Modena and Reggio Emilia", region: "Emilia-Romagna" },
  17: { city: "Parma", region: "Emilia-Romagna" },
  18: { city: "Trieste", region: "Friuli-Venezia Giulia" },
  19: { city: "Udine", region: "Friuli-Venezia Giulia" },
  20: { city: "Rome", region: "Lazio" },
  21: { city: "Rome", region: "Lazio" },
  22: { city: "Rome", region: "Lazio" },
  23: { city: "Rome", region: "Lazio" },
  24: { city: "Cassino", region: "Lazio" },
  25: { city: "Viterbo", region: "Lazio" },
  26: { city: "Genoa", region: "Liguria" },
  27: { city: "Milan", region: "Lombardy" },
  28: { city: "Milan", region: "Lombardy" },
  29: { city: "Milan", region: "Lombardy" },
  30: { city: "Bergamo", region: "Lombardy" },
  31: { city: "Brescia", region: "Lombardy" },
  32: { city: "Pavia", region: "Lombardy" },
  33: { city: "Varese and Como", region: "Lombardy" },
  34: { city: "Ancona", region: "Marche" },
  35: { city: "Camerino", region: "Marche" },
  36: { city: "Macerata", region: "Marche" },
  37: { city: "Urbino", region: "Marche" },
  38: { city: "Campobasso", region: "Molise" },
  39: { city: "Turin", region: "Piedmont" },
  40: { city: "Turin", region: "Piedmont" },
  41: { city: "Vercelli and Novara", region: "Piedmont" },
  42: { city: "Bari", region: "Apulia" },
  43: { city: "Bari", region: "Apulia" },
  44: { city: "Foggia", region: "Apulia" },
  45: { city: "Lecce", region: "Apulia" },
  46: { city: "Cagliari", region: "Sardinia" },
  47: { city: "Sassari", region: "Sardinia" },
  48: { city: "Palermo", region: "Sicily" },
  49: { city: "Catania", region: "Sicily" },
  50: { city: "Messina", region: "Sicily" },
  51: { city: "Florence", region: "Tuscany" },
  52: { city: "Pisa", region: "Tuscany" },
  53: { city: "Siena", region: "Tuscany" },
  54: { city: "Siena", region: "Tuscany" },
  55: { city: "Trento", region: "Trentino" },
  56: { city: "Perugia", region: "Umbria" },
  57: { city: "Perugia", region: "Umbria" },
  58: { city: "Venice", region: "Veneto" },
  59: { city: "Venice", region: "Veneto" },
  60: { city: "Padua", region: "Veneto" },
  61: { city: "Verona", region: "Veneto" },
  62: { city: "Milan", region: "Lombardy" },
  63: { city: "Rome", region: "Lazio" },
  64: { city: "Milan and Rome", region: "Lombardy" },
  65: { city: "Milan", region: "Lombardy" },
  66: { city: "Milan", region: "Lombardy" },
  67: { city: "Milan", region: "Lombardy" },
  68: { city: "Castellanza", region: "Lombardy" },
  69: { city: "Pollenzo", region: "Piedmont" },
  70: { city: "Bolzano", region: "South Tyrol" },
  71: { city: "Rome", region: "Lazio" },
  72: { city: "Rome", region: "Lazio" },
  73: { city: "Rome", region: "Lazio" },
  74: { city: "Rome", region: "Lazio" },
  75: { city: "Rome", region: "Lazio" },
  76: { city: "Rome", region: "Lazio" },
  77: { city: "Naples", region: "Campania" },
  78: { city: "Benevento", region: "Campania" },
  79: { city: "Naples", region: "Campania" },
  80: { city: "Chieti", region: "Abruzzo" },
  81: { city: "Casamassima", region: "Apulia" },
  82: { city: "Reggio Calabria", region: "Calabria" },
  83: { city: "Enna", region: "Sicily" }
};

const scholarshipRegionMap = {
  91: { region: "National", coverage: "All Italy Portals" },
  92: { region: "Piedmont", coverage: "Turin & Piedmont" },
  93: { region: "Valle d’Aosta", coverage: "Aosta Valley" },
  94: { region: "Liguria", coverage: "Genoa & Liguria" },
  95: { region: "Lombardy", coverage: "Milan, Pavia & Lombardy" },
  96: { region: "South Tyrol", coverage: "Bolzano / Bozen" },
  97: { region: "Trentino", coverage: "Trento & Region" },
  98: { region: "Friuli Venezia Giulia", coverage: "Trieste & Udine" },
  99: { region: "Veneto", coverage: "Padua" },
  100: { region: "Veneto", coverage: "Venice (Ca' Foscari / IUAV)" },
  101: { region: "Veneto", coverage: "Verona" },
  102: { region: "Emilia-Romagna", coverage: "Bologna, Parma, Modena" },
  103: { region: "Tuscany", coverage: "Pisa, Florence, Siena" },
  104: { region: "Marche", coverage: "Ancona, Urbino, Macerata" },
  105: { region: "Umbria", coverage: "Perugia & Umbria" },
  106: { region: "Lazio", coverage: "Rome (Sapienza, Tor Vergata)" },
  107: { region: "Abruzzo", coverage: "L’Aquila" },
  108: { region: "Abruzzo", coverage: "Chieti-Pescara" },
  109: { region: "Abruzzo", coverage: "Teramo" },
  110: { region: "Campania", coverage: "Naples, Salerno, Vanvitelli" },
  111: { region: "Molise", coverage: "Campobasso & Molise" },
  112: { region: "Apulia", coverage: "Bari, Foggia, Salento" },
  113: { region: "Basilicata", coverage: "Potenza & Matera" },
  114: { region: "Sardinia", coverage: "Cagliari" },
  115: { region: "Sardinia", coverage: "Sassari" },
  116: { region: "Sicily", coverage: "Catania" },
  117: { region: "Sicily", coverage: "Palermo" },
  118: { region: "Sicily", coverage: "Enna" },
  119: { region: "Sicily", coverage: "Messina" },
  120: { region: "National", coverage: "Regional Right to Study" },
  121: { region: "National", coverage: "University Institutional Benefits" },
  122: { region: "National / MUR", coverage: "Italian Ministry of University & Research" }
};

for (const item of items) {
  if (cityMap[item.id]) {
    item.city = cityMap[item.id].city;
    item.region = cityMap[item.id].region;
  } else if (item.category === 'online_university') {
    item.city = 'Distance Learning';
    item.region = 'Italy-wide / Remote';
  } else if (item.category === 'regional_scholarship') {
    const sInfo = scholarshipRegionMap[item.id] || { region: "Italy", coverage: "Regional Grant" };
    item.city = sInfo.coverage;
    item.region = sInfo.region;
  }
}

fs.writeFileSync('data/italy-directory.json', JSON.stringify(items, null, 2), 'utf8');
console.log('Successfully enriched all 122 items in data/italy-directory.json!');
