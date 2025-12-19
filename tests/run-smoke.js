const puppeteer = require('puppeteer');

async function run() {
  const url = process.env.TEST_URL || 'http://localhost:8000/';
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  try {
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });

    // Check main logo
    const logo = await page.$('img.logo-img');
    if (!logo) throw new Error('logo image not found');

    // Check crypto panel exists
    const crypto = await page.$('#crypto-panel');
    if (!crypto) throw new Error('crypto panel not found');

    // Check game iframe is present
    const iframe = await page.$('#game-iframe');
    if (!iframe) throw new Error('game iframe not found');

    // Basic content checks
    const title = await page.title();
    if (!title || title.length === 0) throw new Error('page title missing');

    console.log('Smoke checks passed');
    await browser.close();
    process.exit(0);
  } catch (err) {
    console.error('Smoke test failed:', err);
    await browser.close();
    process.exit(2);
  }
}

run();
