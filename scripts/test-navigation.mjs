import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { createInterface } from 'node:readline';
import { fileURLToPath } from 'node:url';
import { after, before, test } from 'node:test';
import { chromium, firefox, webkit } from 'playwright';

let server, browser, base;
before(async () => {
  server = spawn('python3', ['scripts/serve.py', '--port', '0'], {
    cwd: fileURLToPath(new URL('../', import.meta.url)), stdio: ['ignore', 'pipe', 'ignore'],
  });
  base = await new Promise((resolve, reject) => {
    const lines = createInterface({ input: server.stdout });
    const timeout = setTimeout(() => reject(new Error('Preview did not start')), 10000);
    server.once('error', reject);
    lines.on('line', line => {
      const match = line.match(/http:\/\/127\.0\.0\.1:\d+/);
      if (match) { clearTimeout(timeout); lines.close(); resolve(match[0]); }
    });
  });
  const engine = process.env.BROWSER || 'chromium';
  browser = await ({ chromium, firefox, webkit })[engine].launch({
    headless: true,
    ...(engine === 'chromium' && process.env.CHROME_BIN ? { executablePath: process.env.CHROME_BIN } : {}),
  });
});
after(async () => { await browser?.close(); server?.kill(); });

async function pageFor(t, options = {}) {
  const context = await browser.newContext(options);
  t.after(() => context.close());
  return context.newPage();
}

test('returning from article and archive initializes homepage interactions', async t => {
  const page = await pageFor(t);
  await page.goto(base + '/');
  await page.locator('a[href="/blog/policyc"]').click();
  await page.locator('.article-page').waitFor();
  await page.locator('.article-footer a[href="/projects"]').click();
  await page.locator('.projects-page').waitFor();
  await page.locator('.projects-header a[href="/"]').click();
  await page.locator('.snoopy').waitFor({ state: 'visible' });
  const image = page.locator('.snoopy img');
  const first = await image.getAttribute('src');
  await page.locator('.snoopy').click();
  const second = await image.getAttribute('src');
  assert.notEqual(second, first);
  await page.reload();
  await page.locator('.snoopy').waitFor({ state: 'visible' });
  assert.notEqual(await image.getAttribute('src'), second);
});

test('archive remains visible during slow article fetch and history restores scroll', async t => {
  const page = await pageFor(t);
  await page.goto(base + '/projects');
  await page.waitForFunction(() => history.state?.source === 'swup');
  await page.locator('a[href="/blog/policyc"]').scrollIntoViewIfNeeded();
  const scroll = await page.evaluate(() => scrollY);
  await page.evaluate(() => { window.previousMain = document.querySelector('main'); });
  let release, requested;
  const gate = new Promise(resolve => { release = resolve; });
  const arrival = new Promise(resolve => { requested = resolve; });
  await page.route(base + '/blog/policyc', async route => {
    requested(); await gate; await route.continue();
  });
  await page.locator('a[href="/blog/policyc"]').click();
  await arrival;
  try {
    assert.equal(await page.evaluate(() => window.previousMain.isConnected), true);
    assert.equal(await page.locator('.projects-page').isVisible(), true);
  } finally { release(); }
  await page.locator('.article-page').waitFor();
  await page.locator('label[for="policyc-chart-cost"]').click();
  assert.equal(await page.locator('[data-chart="cost"]').isVisible(), true);
  await page.goBack();
  await page.locator('.projects-page').waitFor();
  await page.waitForFunction(expected => Math.abs(scrollY - expected) < 2, scroll);
});

test('homepage and reading routes remain usable without JavaScript', async t => {
  const page = await pageFor(t, { javaScriptEnabled: false });
  await page.goto(base + '/');
  assert.equal(await page.locator('.snoopy-static').isVisible(), true);
  await page.locator('a[href="/projects"]:visible').click();
  await page.locator('.projects-page').waitFor();
  await page.locator('a[href="/blog/annie"]').click();
  await page.locator('.article-page').waitFor();
  assert.equal(await page.locator('.article-body').isVisible(), true);
});

test('short desktop windows retain reading size and use the available width', async t => {
  const page = await pageFor(t, { viewport: { width: 1568, height: 984 } });
  await page.goto(base + '/');
  await page.evaluate(() => document.fonts.ready);
  const readingSize = await page.locator('.summary').first().evaluate(e => getComputedStyle(e).fontSize);
  for (const height of [769, 714]) {
    await page.setViewportSize({ width: 1568, height });
    assert.equal(await page.locator('.summary').first().evaluate(e => getComputedStyle(e).fontSize), readingSize);
    assert.ok(await page.locator('.sheet').evaluate(e => e.getBoundingClientRect().width >= innerWidth * .95));
    assert.ok(await page.evaluate(() => document.documentElement.scrollHeight <= innerHeight));
    assert.ok(await page.locator('footer').evaluate(e => e.getBoundingClientRect().bottom <= innerHeight));
  }
});
