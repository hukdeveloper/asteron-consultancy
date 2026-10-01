import fs from 'fs';

const html = fs.readFileSync('netlify-universities.html', 'utf8');

// Find the container
const gridStart = html.indexOf('grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3');
if (gridStart === -1) {
  console.log('Grid not found');
  process.exit(1);
}

const mainEnd = html.indexOf('</main>', gridStart);
const gridHtml = html.substring(gridStart, mainEnd);

// Split by '<div data-uni-card'
const parts = gridHtml.split('<div data-uni-card');
console.log('Total parts:', parts.length - 1);

const cards = [];
for (let i = 1; i < parts.length; i++) {
  const cardBlock = '<div data-uni-card' + parts[i];
  
  // Extract data-search
  const searchMatch = cardBlock.match(/data-search="([^"]*)"/);
  const search = searchMatch ? searchMatch[1] : '';

  // Extract university name
  const nameMatch = cardBlock.match(/<div class="font-bold text-\[#123a70\]">([^<]*)<\/div>/);
  const name = nameMatch ? nameMatch[1].trim() : '';

  if (!name) continue;

  // Extract Admission opens
  const opensMatch = cardBlock.match(/<span class="text-slate-400">Admission opens<\/span>\s*<span class="font-medium text-\[#123a70\]">([^<]*)<\/span>/);
  const admissionOpens = opensMatch ? opensMatch[1].trim() : null;

  // Extract Deadline
  const deadlineMatch = cardBlock.match(/<span class="text-slate-400">Deadline<\/span>\s*<span class="font-medium text-\[#123a70\]">([^<]*)<\/span>/);
  const deadline = deadlineMatch ? deadlineMatch[1].trim() : null;

  // Extract Admission fee
  const feeMatch = cardBlock.match(/<span class="text-slate-400">Admission fee<\/span>\s*<span class="font-medium text-\[#123a70\]">([^<]*)<\/span>/);
  const admissionFee = feeMatch ? feeMatch[1].trim() : null;

  // Extract CGPA
  const cgpaMatch = cardBlock.match(/<span class="text-slate-400">CGPA<\/span>\s*<span class="font-medium text-\[#123a70\]">([^<]*)<\/span>/);
  const cgpa = cgpaMatch ? cgpaMatch[1].trim() : null;

  // Extract English
  const engMatch = cardBlock.match(/<span class="text-slate-400">English<\/span>\s*<span class="font-medium text-\[#123a70\]">([^<]*)<\/span>/);
  const english = engMatch ? engMatch[1].trim() : null;

  // Extract Apply Link
  const applyMatch = cardBlock.match(/<a href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/);
  const applyUrl = applyMatch ? applyMatch[1].replace(/&amp;/g, '&') : '';
  const applyText = applyMatch ? applyMatch[2].trim() : 'Apply / Watch Tutorial →';

  cards.push({
    name,
    search,
    admissionOpens,
    deadline,
    admissionFee,
    cgpa,
    english,
    applyUrl,
    applyText
  });
}

console.log(`Parsed ${cards.length} cards from Netlify universities!`);
console.log('Sample card 1:', JSON.stringify(cards[0], null, 2));
console.log('Sample card 2:', JSON.stringify(cards[1], null, 2));
console.log('Sample card 3:', JSON.stringify(cards[2], null, 2));

fs.writeFileSync('data/netlify-parsed-universities.json', JSON.stringify(cards, null, 2), 'utf8');
console.log('Saved to data/netlify-parsed-universities.json');
