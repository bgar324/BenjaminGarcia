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

async function settle(page, path, selector) {
  await page.waitForFunction(({ path, selector }) =>
    location.pathname === path && document.querySelector(selector) &&
    !document.documentElement.classList.contains('is-changing'), { path, selector });
  // Firefox may expose the new main before its :has()-scoped styles are painted.
  await page.evaluate(() => new Promise(resolve =>
    requestAnimationFrame(() => requestAnimationFrame(resolve))));
}

async function enhancedPage(t, path = '/', options = {}) {
  const page = await pageFor(t, options);
  await page.goto(base + path);
  await page.waitForFunction(() => history.state?.source === 'swup');
  await page.evaluate(() => { window.originalDocument = document; });
  return page;
}

async function assertSameDocument(page) {
  assert.equal(await page.evaluate(() => window.originalDocument === document), true);
}

async function scrollToPosition(page, top) {
  await page.evaluate(async top => {
    await document.fonts.ready;
    scrollTo({ top, behavior: 'instant' });
    await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
  }, top);
  const position = await page.evaluate(() => scrollY);
  assert.ok(position > 0, 'The selected viewport must have scrollable content');
  return position;
}

async function assertScroll(page, expected) {
  await page.waitForFunction(expected => Math.abs(scrollY - expected) < 2, expected);
  await assertSameDocument(page);
}

test('home stays painted during a slow article fetch and both swaps retain the document', async t => {
  const page = await enhancedPage(t);
  await page.evaluate(() => { window.previousMain = document.querySelector('main'); });
  let release, requested;
  const gate = new Promise(resolve => { release = resolve; });
  const arrival = new Promise(resolve => { requested = resolve; });
  await page.route(base + '/blog/policyc', async route => {
    requested();
    await gate;
    await route.continue();
  });
  await page.locator('a[href="/blog/policyc"]').click();
  await arrival;
  try {
    assert.deepEqual(await page.evaluate(() => ({
      connected: window.previousMain.isConnected,
      same: document.querySelector('main') === window.previousMain,
      opacity: getComputedStyle(window.previousMain).opacity,
    })), { connected: true, same: true, opacity: '1' });
    assert.equal(await page.locator('.sheet').isVisible(), true);
    await assertSameDocument(page);
  } finally {
    release();
  }
  await settle(page, '/blog/policyc', '.article-page');
  await assertSameDocument(page);
  assert.equal(await page.evaluate(() => window.previousMain.isConnected), false);
  assert.equal(await page.locator('link[rel="canonical"]').getAttribute('href'),
    'https://www.bentgarcia.com/blog/policyc');
  assert.equal(await page.evaluate(() => document.activeElement.tagName), 'BODY');
  assert.equal(await page.locator('[data-chart="cost"]').count(), 1);
  await page.locator('label[for="policyc-chart-cost"]').click();
  assert.equal(await page.locator('#policyc-chart-cost').isChecked(), true);
  assert.equal(await page.locator('[data-chart="cost"]').isVisible(), true);
  await page.locator('.article-nav a[href="/"]').click();
  await settle(page, '/', '.sheet');
  await assertSameDocument(page);
  assert.equal(await page.locator('meta[property="article:published_time"]').count(), 0);
});

test('Snoopy and clock initialize on every same-document return from all reading routes', async t => {
  const page = await enhancedPage(t);
  let lastPose;
  async function checkHomepage() {
    await page.locator('.snoopy').waitFor({ state: 'visible' });
    const image = page.locator('.snoopy img');
    const initialPose = await image.getAttribute('src');
    if (lastPose) assert.notEqual(initialPose, lastPose);
    await page.locator('.snoopy').click();
    lastPose = await image.getAttribute('src');
    assert.notEqual(lastPose, initialPose);
    const clock = page.locator('.local-clock');
    assert.equal(await clock.isVisible(), true);
    const timestamp = Date.parse(await clock.getAttribute('datetime'));
    assert.ok(Number.isFinite(timestamp));
    assert.ok(Math.abs(Date.now() - timestamp) < 60_000);
    await assertSameDocument(page);
  }
  await checkHomepage();
  for (const path of ['/blog/policyc', '/projects', '/blog/annie', '/blog/logit', '/blog/policyc']) {
    await page.locator(`a[href="${path}"]:visible`).click();
    const selector = path === '/projects' ? '.projects-page' : '.article-page';
    await settle(page, path, selector);
    await assertSameDocument(page);
    if (path.startsWith('/blog/')) {
      assert.equal(await page.locator('.article-media-stage').count(), 1);
    }
    await page.locator('main a[href="/"]').click();
    await settle(page, '/', '.sheet');
    assert.equal(await page.locator('.article-media-stage').count(), 0);
    await checkHomepage();
  }
  await page.reload();
  await page.locator('.snoopy').waitFor({ state: 'visible' });
  assert.notEqual(await page.locator('.snoopy img').getAttribute('src'), lastPose);
});

test('repeated mobile home, archive and long-article entries restore their own scroll', async t => {
  const page = await enhancedPage(t, '/', { viewport: { width: 390, height: 700 } });
  const firstHome = await scrollToPosition(page, 260);
  await page.locator('a[href="/blog/policyc"]').evaluate(link => link.click());
  await settle(page, '/blog/policyc', '.article-page');
  const article = await scrollToPosition(page, 800);
  await page.locator('.article-nav a[href="/"]').evaluate(link => link.click());
  await settle(page, '/', '.sheet');
  await assertScroll(page, firstHome);
  const secondHome = await scrollToPosition(page, 650);
  assert.notEqual(secondHome, firstHome);
  await page.locator('a[href="/projects"]').first().evaluate(link => link.click());
  await settle(page, '/projects', '.projects-page');
  const archive = await scrollToPosition(page, 550);
  await page.locator('a[href="/blog/annie"]').evaluate(link => link.click());
  await settle(page, '/blog/annie', '.article-page');
  const entries = [
    ['/projects', '.projects-page', archive],
    ['/', '.sheet', secondHome],
    ['/blog/policyc', '.article-page', article],
    ['/', '.sheet', firstHome],
  ];
  for (const [path, selector, position] of entries) {
    await page.goBack();
    await settle(page, path, selector);
    await assertScroll(page, position);
  }
  for (const [path, selector, position] of entries.slice(0, -1).reverse()) {
    await page.goForward();
    await settle(page, path, selector);
    await assertScroll(page, position);
  }
});

test('desktop article media mounts before history scroll restoration', async t => {
  const page = await enhancedPage(t, '/projects', { viewport: { width: 1440, height: 900 } });
  const archive = await scrollToPosition(page, 450);
  await page.locator('a[href="/blog/policyc"]').evaluate(link => link.click());
  await settle(page, '/blog/policyc', '.article-page');
  const article = await scrollToPosition(page, 1000);
  await page.locator('.article-nav a[href="/"]').click();
  await settle(page, '/', '.sheet');
  await page.goBack();
  await settle(page, '/blog/policyc', '.article-page');
  assert.equal(await page.locator('.article-page.has-side-media').count(), 1);
  assert.equal(await page.locator('.article-media-stage').count(), 1);
  assert.equal(await page.locator('[data-chart="cost"]').count(), 1);
  await assertScroll(page, article);
  await page.goBack();
  await settle(page, '/projects', '.projects-page');
  await assertScroll(page, archive);
});

test('a late article response cannot replace a newer destination', async t => {
  const page = await enhancedPage(t);
  let release, requested;
  const gate = new Promise(resolve => { release = resolve; });
  const arrival = new Promise(resolve => { requested = resolve; });
  await page.route(base + '/blog/policyc', async route => {
    requested();
    await gate;
    await route.continue();
  });
  await page.locator('a[href="/blog/policyc"]').click();
  await arrival;
  try {
    await page.locator('a[href="/blog/annie"]').click();
    await settle(page, '/blog/annie', '.article-page');
  } finally {
    release();
  }
  await page.waitForLoadState('networkidle');
  await settle(page, '/blog/annie', '.article-page');
  await assertSameDocument(page);
  assert.equal(await page.locator('link[rel="canonical"]').getAttribute('href'),
    'https://www.bentgarcia.com/blog/annie');
});

test('failed Back reloads the selected entry without losing Forward or leaving manual restoration', async t => {
  const page = await enhancedPage(t);
  await page.locator('a[href="/projects"]:visible').click();
  await settle(page, '/projects', '.projects-page');
  const historyLength = await page.evaluate(() => history.length);
  let failedRequests = 0;
  await page.route(base + '/', route => {
    if (route.request().isNavigationRequest()) return route.continue();
    failedRequests++;
    return route.fulfill({ status: 503, contentType: 'text/html', body: 'Unavailable' });
  });
  await page.route('**/static/navigation-vendor.js*', route => route.abort());
  await page.goBack();
  await settle(page, '/', '.sheet');
  await page.waitForLoadState('load');
  assert.equal(failedRequests, 1);
  assert.equal(await page.evaluate(() => window.originalDocument), undefined);
  assert.equal(await page.evaluate(() => history.length), historyLength);
  assert.equal(await page.evaluate(() => history.scrollRestoration), 'auto');
  await page.goForward();
  await settle(page, '/projects', '.projects-page');
});

test('same-page fragment links keep their document and hand scrolling back to the browser', async t => {
  const page = await enhancedPage(t, '/', { viewport: { width: 390, height: 700 } });
  await page.evaluate(() => {
    const link = document.createElement('a');
    link.href = '#experience-heading';
    document.querySelector('main').append(link);
    link.click();
    link.remove();
  });
  await page.waitForFunction(() => history.scrollRestoration === 'auto');
  await assertSameDocument(page);
  assert.equal(await page.evaluate(() => location.hash), '#experience-heading');
  await page.waitForFunction(() =>
    Math.abs(document.querySelector('#experience-heading').getBoundingClientRect().top) < 2);
  await page.locator('a[href="/blog/policyc"]').click();
  await settle(page, '/blog/policyc', '.article-page');
  assert.equal(await page.evaluate(() => window.originalDocument), undefined);
});

test('external and non-résumé PDF URLs use native navigation even without a new-tab target', async t => {
  for (const [path, selector] of [['/', 'a[href="https://ucla.edu"]'], ['/blog/policyc', '.article-meta a[href="/policyc.pdf"]']]) {
    const page = await enhancedPage(t, path);
    const link = page.locator(selector);
    const destination = await link.evaluate(link => link.href);
    let navigationRequest;
    // Fulfill locally so this tests routing rather than a remote site or PDF viewer.
    await page.route(destination, route => {
      navigationRequest = route.request().isNavigationRequest();
      return route.fulfill({ contentType: 'text/html', body: '<main id="native-destination"></main>' });
    });
    await link.evaluate(link => link.removeAttribute('target'));
    await link.click();
    await page.locator('#native-destination').waitFor({ state: 'attached' });
    assert.equal(navigationRequest, true);
    assert.equal(await page.evaluate(() => window.originalDocument), undefined);
  }
});

test('all routes return home in the same document, including 404', async t => {
  for (const [path, selector] of [
    ['/', '.sheet'], ['/projects', '.projects-page'], ['/blog/annie', '.article-page'],
    ['/blog/logit', '.article-page'], ['/blog/policyc', '.article-page'], ['/404', '.not-found'],
  ]) {
    const page = await enhancedPage(t, path);
    await settle(page, path, selector);
    if (path !== '/') {
      await page.locator('main a[href="/"]').click();
      await settle(page, '/', '.sheet');
      await assertSameDocument(page);
      assert.equal(await page.locator('.snoopy').isVisible(), true);
      if (path === '/404') {
        await page.evaluate(() => {
          const link = document.createElement('a');
          link.href = '/404';
          document.querySelector('main').append(link);
          link.click();
        });
        await settle(page, '/404', '.not-found');
        await assertSameDocument(page);
        await page.goBack();
        await settle(page, '/', '.sheet');
        await assertSameDocument(page);
      }
    }
  }
});

test('homepage, archive, articles and 404 remain usable without JavaScript', async t => {
  const page = await pageFor(t, { javaScriptEnabled: false });
  await page.goto(base + '/');
  assert.equal(await page.locator('.snoopy-static').isVisible(), true);
  await page.locator('a[href="/projects"]:visible').click();
  await page.locator('.projects-page').waitFor();
  for (const path of ['/blog/annie', '/blog/logit', '/blog/policyc']) {
    await page.locator(`a[href="${path}"]:visible`).click();
    await page.locator('.article-page').waitFor();
    assert.equal(await page.locator('.article-body').isVisible(), true);
    assert.equal(await page.locator('.article-media-stage').count(), 0);
    assert.equal(await page.locator('.article-body figure:not(.article-chart-panel)').first().isVisible(), true);
    if (path === '/blog/policyc') {
      await page.locator('label[for="policyc-chart-cost"]').click();
      assert.equal(await page.locator('[data-chart="cost"]').isVisible(), true);
    }
    await page.locator('main a[href="/"]').click();
    await page.locator('.sheet').waitFor();
  }
  await page.goto(base + '/404');
  await page.locator('.not-found a[href="/"]').click();
  await page.locator('.sheet').waitFor();
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

test('résumé overlay renders the PDF and traps focus until Escape restores the trigger', async t => {
  const page = await enhancedPage(t);
  const trigger = page.locator('a[href="/resume.pdf"]:visible');
  await trigger.click();
  await page.locator('.resume-paper[aria-busy="false"]').waitFor();
  assert.equal(await page.locator('.resume-pdf-page canvas').count(), 1);
  assert.match(await page.locator('.resume-text-layer').innerText(), /Benjamin Garcia/);
  await page.locator('.resume-close').focus();
  for (const key of ['Tab', 'Tab', 'Tab', 'Shift+Tab', 'Shift+Tab', 'Shift+Tab']) {
    await page.keyboard.press(key);
    assert.equal(await page.evaluate(() => document.querySelector('.resume-dialog').contains(document.activeElement)), true);
  }
  await assertSameDocument(page);
  await page.keyboard.press('Escape');
  await page.waitForFunction(() => !document.querySelector('.resume-dialog').open);
  assert.equal(await trigger.evaluate(e => document.activeElement === e), true);
  assert.equal(await page.evaluate(() => document.documentElement.classList.contains('resume-is-open')), false);
});

test('history navigation closes the résumé overlay and releases scroll locking', async t => {
  const page = await enhancedPage(t, '/projects');
  await page.locator('.projects-header a[href="/"]').click();
  await settle(page, '/', '.sheet');
  await page.locator('a[href="/resume.pdf"]:visible').click();
  await page.locator('.resume-dialog[open]').waitFor();
  await page.goBack();
  await settle(page, '/projects', '.projects-page');
  assert.equal(await page.locator('.resume-dialog').evaluate(e => e.open), false);
  assert.equal(await page.evaluate(() => document.documentElement.classList.contains('resume-is-open')), false);
  await assertSameDocument(page);
});
