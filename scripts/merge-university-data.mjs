import fs from 'fs';

const netlifyUnis = JSON.parse(fs.readFileSync('data/netlify-parsed-universities.json', 'utf8'));
const italyItems = JSON.parse(fs.readFileSync('data/italy-directory.json', 'utf8'));

const aliases = {
  'polytechnic university of milan': 'politecnico di milano',
  'sapienza university of rome': 'sapienza university of rome *',
  'university of laquila': 'university of l&#x27;aquila',
  'polytechnic university of marche': 'marche polytechnic university (first call)',
  'ca foscari university of venice': 'ca&#x27; foscari university of venice',
  'university of rome tor vergata': 'university of tor vergata',
  'polytechnic university of bari': 'polytechnic university of bari',
  'polytechnic university of turin': 'polytechnic university of turin',
};

// Helper to normalize names for matching
function clean(str) {
  return (str || '')
    .toLowerCase()
    .replace(/&#x27;|&amp;|['’ʼ\s\-_.,()]/g, '');
}

const merged = italyItems
  .filter(i => ['public_university', 'private_university', 'online_university'].includes(i.category))
  .map(u => {
    const rawClean = clean(u.name);
    const aliasTarget = aliases[u.name.toLowerCase()] || aliases[clean(u.name)];
    
    let match = null;
    if (aliasTarget) {
      match = netlifyUnis.find(nu => clean(nu.name) === clean(aliasTarget));
    }
    if (!match) {
      match = netlifyUnis.find(nu => clean(nu.name) === rawClean);
    }
    if (!match) {
      match = netlifyUnis.find(nu => clean(nu.name).includes(rawClean) || rawClean.includes(clean(nu.name)));
    }

    const categoryLabel = u.category === 'public_university' 
      ? '🏛️ Public University' 
      : u.category === 'private_university' 
        ? '⭐ Private University' 
        : '🌐 Online University';

    const defaultOpens = u.category === 'public_university' ? 'Nov 2026 – Feb 2027' : 'Rolling / Open 2027';
    const defaultDeadline = u.category === 'public_university' ? 'May – Jun 2027' : 'Ongoing / Rolling';
    const defaultFee = u.category === 'public_university' ? '€30 – €50' : '€50 – €100';
    const defaultCgpa = u.category === 'public_university' ? 'Min 2.5 / 60% or Equivalent' : 'NO STRICT CGPA REQUIREMENT';
    const defaultEng = 'English Proficiency Certificate (MOI) / IELTS';
    const defaultDegrees = u.category === 'online_university' ? "Bachelor's & Master's" : "Bachelor's, Master's, PhD";

    return {
      id: u.id,
      name: u.name,
      category: u.category,
      categoryLabel,
      city: u.city,
      region: u.region,
      url: u.url,
      admissionOpens: (match && match.admissionOpens) ? match.admissionOpens : defaultOpens,
      deadline: (match && match.deadline) ? match.deadline : (u.category === 'public_university' ? 'May 2027' : 'Rolling'),
      admissionFee: (match && match.admissionFee) ? match.admissionFee : defaultFee,
      cgpa: (match && match.cgpa) ? match.cgpa : defaultCgpa,
      english: (match && match.english) ? match.english : defaultEng,
      degrees: defaultDegrees,
      applyUrl: (match && match.applyUrl) ? match.applyUrl : u.url,
      applyText: 'Apply / Watch Tutorial →',
      isNetlifyMatch: !!match
    };
  });

console.log(`Merged ${merged.length} universities.`);
console.log('Netlify matches count:', merged.filter(m => m.isNetlifyMatch).length);
console.log('Sample Public (with Netlify data):', JSON.stringify(merged[1], null, 2));
console.log('Sample Private:', JSON.stringify(merged[65], null, 2));
console.log('Sample Online:', JSON.stringify(merged[85], null, 2));

fs.writeFileSync('data/unified-universities.json', JSON.stringify(merged, null, 2), 'utf8');
console.log('Saved data/unified-universities.json');
