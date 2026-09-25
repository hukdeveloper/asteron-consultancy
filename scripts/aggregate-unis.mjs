import fs from 'fs';
import path from 'path';

const unis = new Map();

// 1. From scholarships directory
const schDir = 'site-live/study/italy/scholarships';
for (const entry of fs.readdirSync(schDir, { withFileTypes: true })) {
  if (entry.isFile() && entry.name.endsWith('.html') && entry.name !== 'index.html') {
    const content = fs.readFileSync(path.join(schDir, entry.name), 'utf8');
    const titleMatch = content.match(/<h1[^>]*>([^<]+)<\/h1>/);
    if (titleMatch) {
      const name = titleMatch[1].trim();
      const slug = entry.name.replace('.html', '');
      unis.set(name, {
        name,
        slug,
        scholarshipUrl: `/study/italy/scholarships/${slug}`,
        applyUrl: `https://wa.me/923700171997?text=Hi%20Janan%20Consultancy%2C%20I%20would%20like%20to%20apply%20to%20${encodeURIComponent(name)}.`
      });
    }
  }
}

// 2. From bachelors programs
const bachelorsPath = 'site-live/study/italy/admissions/bachelors-programs/index.html';
if (fs.existsSync(bachelorsPath)) {
  const content = fs.readFileSync(bachelorsPath, 'utf8');
  const cardRegex = /<a href="([^"]+)"[^>]*class="[^"]*rounded-full bg-\[#123a70\][^"]*"[^>]*>Apply Portal ↗<\/a>\s*<span class="font-bold text-\[#123a70\][^"]*">([^<]+)<\/span>\s*<span class="text-xs text-slate-500[^"]*">([^<]+)<\/span>/g;
  let match;
  while ((match = cardRegex.exec(content)) !== null) {
    const applyUrl = match[1];
    const name = match[2].trim();
    const city = match[3].trim();
    if (unis.has(name)) {
      const obj = unis.get(name);
      obj.applyUrl = applyUrl;
      obj.city = city;
    } else {
      unis.set(name, {
        name,
        city,
        applyUrl,
        scholarshipUrl: `/study/italy/scholarships`
      });
    }
  }
}

// 3. Known cities map for prominent universities
const cityMap = {
  "Politecnico di Milano": "Milan, Italy",
  "University of Bologna": "Bologna, Italy",
  "Sapienza University of Rome": "Rome, Italy",
  "University of Padua": "Padua, Italy",
  "University of Milan": "Milan, Italy",
  "Politecnico di Torino": "Turin, Italy",
  "Ca' Foscari University of Venice": "Venice, Italy",
  "University of Pisa": "Pisa, Italy",
  "University of Florence": "Florence, Italy",
  "University of Genoa": "Genoa, Italy",
  "University of Naples Federico II": "Naples, Italy",
  "University of Trento": "Trento, Italy",
  "University of Pavia": "Pavia, Italy",
  "University of Siena": "Siena, Italy",
  "University of Verona": "Verona, Italy",
  "University of Bergamo": "Bergamo, Italy",
  "University of Brescia": "Brescia, Italy",
  "University of Ferrara": "Ferrara, Italy",
  "University of Trieste": "Trieste, Italy",
  "Marche Polytechnic University": "Ancona, Italy",
  "Polytechnic University of Bari": "Bari, Italy",
  "University of Bari Aldo Moro": "Bari, Italy",
  "University of Calabria": "Rende, Italy",
  "University of Camerino": "Camerino, Italy",
  "University of Campania Luigi Vanvitelli": "Caserta, Italy",
  "University of Cassino": "Cassino, Italy",
  "University of Catania": "Catania, Italy",
  "University of Eastern Piedmont": "Vercelli, Italy",
  "University of Foggia": "Foggia, Italy",
  "University of Messina": "Messina, Italy",
  "University of Palermo": "Palermo, Italy",
  "University of Perugia": "Perugia, Italy",
  "University of Salento": "Lecce, Italy",
  "University of Salerno": "Fisciano, Italy",
  "University of Sassari": "Sassari, Italy",
  "University of Teramo": "Teramo, Italy",
  "University of Tuscia": "Viterbo, Italy",
  "University of Udine": "Udine, Italy",
  "University of Urbino": "Urbino, Italy",
  "University of Bozen-Bolzano": "Bolzano, Italy",
  "University of Rome Tor Vergata": "Rome, Italy",
  "Roma Tre University": "Rome, Italy",
  "Foro Italico University of Rome": "Rome, Italy",
  "D'Annunzio University Chieti and Pescara": "Chieti, Italy",
  "University of Insubria": "Varese, Italy",
  "University of L'Aquila": "L'Aquila, Italy",
  "University of Macerata": "Macerata, Italy",
  "University of Milano-Bicocca": "Milan, Italy",
  "University of Modena and Reggio Emilia": "Modena, Italy",
  "University of Naples Parthenope": "Naples, Italy",
  "University of Parma": "Parma, Italy"
};

const fullList = [];
for (const [name, data] of unis.entries()) {
  const city = data.city || cityMap[name] || "Italy";
  fullList.push({
    name,
    city,
    applyUrl: data.applyUrl,
    scholarshipUrl: data.scholarshipUrl || "/study/italy/scholarships",
    fee: ["Politecnico di Milano", "University of Bologna", "University of Milan", "University of Turin"].includes(name) ? "€30 - €50" : "No Fee / €0 - €20",
    english: "English Proficiency Accepted / IELTS Optional",
    scholarship: "DSU / Regional Scholarship (€8,500/yr)"
  });
}

console.log('Total aggregated universities:', fullList.length);
fs.writeFileSync('scripts/complete-universities.json', JSON.stringify(fullList, null, 2), 'utf8');
