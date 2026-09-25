const fs = require('fs');

async function main() {
  const res = await fetch('https://jananconsultants.com/');
  const html = await res.text();
  fs.writeFileSync('fetched-home.html', html, 'utf8');
  console.log('Saved fetched-home.html, length:', html.length);
  console.log('Contains /universities:', html.includes('/universities'));
  console.log('Contains jananMarquee:', html.includes('jananMarquee'));
  console.log('Contains it.svg:', html.includes('it.svg'));
  const m = html.match(/<nav[\s\S]*?<\/nav>/);
  console.log('Nav:', m ? m[0] : 'None');
}

main();
