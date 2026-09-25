import fs from 'fs';

const html = fs.readFileSync('site-live/study/italy/guide/universities.html', 'utf8');

// Find all data-uni-card blocks
const parts = html.split('<div data-uni-card');
console.log('Total card parts found:', parts.length - 1);

const universities = [];

for (let i = 1; i < parts.length; i++) {
  const part = parts[i];
  const nameMatch = part.match(/class="font-bold text-\[#123a70\]">([^<]+)<\/div>/);
  if (!nameMatch || !nameMatch[1].trim()) continue;
  const name = nameMatch[1].trim();

  const searchMatch = part.match(/data-search="([^"]*)"/);
  const search = searchMatch ? searchMatch[1] : name.toLowerCase();

  const feeMatch = part.match(/Admission fee<\/span><span class="font-medium text-\[#123a70\]">([^<]+)<\/span>/);
  const fee = feeMatch ? feeMatch[1].trim() : 'No Fee';

  const cgpaMatch = part.match(/CGPA<\/span><span class="font-medium text-\[#123a70\]">([^<]+)<\/span>/);
  const cgpa = cgpaMatch ? cgpaMatch[1].trim() : 'No CGPA Requirement';

  const englishMatch = part.match(/English<\/span><span class="font-medium text-\[#123a70\]">([^<]+)<\/span>/);
  const english = englishMatch ? englishMatch[1].trim() : 'English Proficiency Accepted';

  const applyMatch = part.match(/href="([^"]+)"[^>]*>Apply/);
  const applyUrl = applyMatch ? applyMatch[1] : '';

  universities.push({ name, search, fee, cgpa, english, applyUrl });
}

console.log('Successfully parsed universities:', universities.length);
fs.writeFileSync('scripts/parsed-universities.json', JSON.stringify(universities, null, 2), 'utf8');
console.log('Saved to scripts/parsed-universities.json');
