const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer-core');

async function main() {
  const inputArg = process.argv[2] || 'Reinis_Allis_CV_Variant_D_HTMLPolished.html';
  const outputArg = process.argv[3] || 'Reinis_Allis_CV_Variant_D_HTMLPolished.pdf';

  const input = path.resolve(__dirname, inputArg);
  const output = path.resolve(__dirname, outputArg);
  const snapOutput = `/home/gjord/snap/chromium/common/${path.basename(outputArg, '.pdf')}.pdf`;

  const html = fs.readFileSync(input, 'utf8');

  const browser = await puppeteer.launch({
    executablePath: process.env.CHROME_PATH || '/usr/bin/chromium-browser',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'networkidle0' });
  await page.pdf({
    path: snapOutput,
    format: 'A4',
    printBackground: true,
    margin: { top: '0', right: '0', bottom: '0', left: '0' },
  });

  await browser.close();

  fs.copyFileSync(snapOutput, output);
  console.log(`Created ${output}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
