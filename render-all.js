const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer-core');

const CHROME_PATH =
  process.env.CHROME_PATH ||
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const variants = [
  'Reinis_Allis_CV_Variant_D_HTMLPolished',
  'Reinis_Allis_CV_Variant_E_Dark',
  'Reinis_Allis_CV_Variant_F_Editorial',
  'Reinis_Allis_CV_Variant_G_Bold',
  'Reinis_Allis_CV_Variant_H_Pastel',
  'Reinis_Allis_CV_Variant_I_Classic',
  'Reinis_Allis_CV_Variant_J_Neon',
];

async function renderVariant(browser, name) {
  const htmlPath = path.resolve(__dirname, `${name}.html`);
  const pdfPath = path.resolve(__dirname, `${name}.pdf`);

  const html = fs.readFileSync(htmlPath, 'utf8');
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'networkidle0' });
  await page.pdf({
    path: pdfPath,
    format: 'A4',
    printBackground: true,
    margin: { top: '0', right: '0', bottom: '0', left: '0' },
  });
  await page.close();
  console.log(`Created ${pdfPath}`);
}

async function main() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  for (const name of variants) {
    await renderVariant(browser, name);
  }

  await browser.close();
  console.log('All done.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
