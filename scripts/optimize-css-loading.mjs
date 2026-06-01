import { promises as fs } from 'node:fs';
import path from 'node:path';

const DIST_DIR = path.resolve(process.cwd(), 'dist');

async function walkHtmlFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const targetPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        return walkHtmlFiles(targetPath);
      }

      if (entry.isFile() && targetPath.endsWith('.html')) {
        return [targetPath];
      }

      return [];
    }),
  );

  return files.flat();
}

function optimizeStylesheetLinks(html) {
  return html.replace(/<link\b[^>]*>/gi, (tag) => {
    if (!/rel=["']stylesheet["']/i.test(tag)) {
      return tag;
    }

    const hrefMatch = tag.match(/href=["']([^"']+\.css[^"']*)["']/i);
    if (!hrefMatch) {
      return tag;
    }

    const href = hrefMatch[1];
    const hasCrossOrigin = /\scrossorigin(?:=["'][^"']*["'])?/i.test(tag);
    const crossOriginAttr = hasCrossOrigin ? ' crossorigin' : '';

    return `<link rel="preload" as="style" href="${href}"${crossOriginAttr} onload="this.onload=null;this.rel='stylesheet'">
      <noscript><link rel="stylesheet" href="${href}"${crossOriginAttr}></noscript>`;
  });
}

async function run() {
  const htmlFiles = await walkHtmlFiles(DIST_DIR);
  let modifiedCount = 0;

  for (const filePath of htmlFiles) {
    const html = await fs.readFile(filePath, 'utf8');
    const optimizedHtml = optimizeStylesheetLinks(html);

    if (optimizedHtml !== html) {
      await fs.writeFile(filePath, optimizedHtml, 'utf8');
      modifiedCount += 1;
    }
  }

  console.log(`Optimized stylesheet loading in ${modifiedCount} HTML files.`);
}

run().catch((error) => {
  console.error('Failed to optimize stylesheet loading.', error);
  process.exit(1);
});
