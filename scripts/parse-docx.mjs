import fs from 'fs';

const xml = fs.readFileSync('word/document.xml', 'utf8');

// Replace paragraphs and line breaks
let text = xml
  .replace(/<w:p[^>]*>/g, '\n\n')
  .replace(/<w:tab[^>]*\/>/g, '\t')
  .replace(/<w:br[^>]*\/>/g, '\n')
  .replace(/<[^>]+>/g, '')
  .replace(/&amp;/g, '&')
  .replace(/&lt;/g, '<')
  .replace(/&gt;/g, '>')
  .replace(/&quot;/g, '"')
  .replace(/&#39;/g, "'")
  .replace(/\n\s*\n\s*\n+/g, '\n\n')
  .trim();

fs.writeFileSync('portugal_guide.md', text, 'utf8');
console.log('Saved portugal_guide.md with', text.length, 'characters.');
