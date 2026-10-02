import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { createInterface } from "node:readline";
import { fileURLToPath } from "node:url";
import { after, before, test } from "node:test";
import { chromium, firefox, webkit } from "playwright";

let server;
let browser;
let base;

before(async () => {
  server = spawn("python3", ["scripts/serve.py", "--port", "0"], {
    cwd: fileURLToPath(new URL("../", import.meta.url)),
    stdio: ["ignore", "pipe", "ignore"],
  });
  base = await new Promise((resolve, reject) => {
    const lines = createInterface({ input: server.stdout });
    const timeout = setTimeout(() => reject(new Error("Preview did not start")), 10000);
    server.once("error", reject);
    server.once("exit", code => reject(new Error(`Preview exited: ${code}`)));
    lines.on("line", line => {
      const match = line.match(/http:\/\/127\.0\.0\.1:\d+/);
      if (match) {
        clearTimeout(timeout);
        lines.close();
        resolve(match[0]);
      }
    });
  });
  const engine = process.env.BROWSER || "chromium";
  browser = await ({ chromium, firefox, webkit })[engine].launch({
    headless: true,
    ...(engine === "chromium" && process.env.CHROME_BIN
      ? { executablePath: process.env.CHROME_BIN } : {}),
  });
});

after(async () => {
  await browser?.close();
  server?.kill();
});

const settle = (page, path, heading) => page.waitForFunction(({ path, heading }) =>
  location.pathname === path && document.querySelector("h1")?.textContent.includes(heading) &&
  !document.documentElement.classList.contains("is-changing"), { path, heading });

async function homepage(t) {
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
  t.after(() => context.close());
  const page = await context.newPage();
  await page.goto(base + "/");
  await page.waitForFunction(() => history.state?.source === "swup");
  return page;
}

test("the old page stays painted during a slow fetch and the document survives the swap", async t => {
  const page = await homepage(t);
  await page.evaluate(() => {
    window.marker = "original-document";
    window.previousMain = document.querySelector("main");
  });
  let release;
  let requested;
  const gate = new Promise(resolve => { release = resolve; });
  const arrival = new Promise(resolve => { requested = resolve; });
  await page.route(base + "/blog/policyc", async route => {
    requested();
    await gate;
    await route.continue();
  });
  await page.locator('a[href="/blog/policyc"]').click();
  await arrival;
  try {
    assert.deepEqual(await page.evaluate(() => ({
      connected: window.previousMain.isConnected,
      same: document.querySelector("main") === window.previousMain,
      opacity: getComputedStyle(window.previousMain).opacity,
    })), { connected: true, same: true, opacity: "1" });
  } finally {
    release();
  }
  await settle(page, "/blog/policyc", "Building PolicyC");
  assert.equal(await page.evaluate(() => window.marker), "original-document");
  assert.equal(await page.locator('link[rel="canonical"]').getAttribute("href"),
    "https://www.bentgarcia.com/blog/policyc");
  assert.equal(await page.evaluate(() => document.activeElement.tagName), "BODY");
  await page.locator('a[href="/"]').click();
  await settle(page, "/", "I build software");
  assert.equal(await page.locator('meta[property="article:published_time"]').count(), 0);
});

test("failed Back reloads the selected page without losing Forward or leaving manual restoration", async t => {
  const page = await homepage(t);
  await page.locator('a[href="/projects"]').click();
  await settle(page, "/projects", "All Projects");
  const historyLength = await page.evaluate(() => history.length);
  let failedRequests = 0;
  await page.route(base + "/", route => {
    if (route.request().isNavigationRequest()) return route.continue();
    failedRequests++;
    return route.fulfill({ status: 503, contentType: "text/html", body: "Unavailable" });
  });
  await page.route("**/static/navigation-vendor.js*", route => route.abort());
  await page.goBack();
  await settle(page, "/", "I build software");
  await page.waitForLoadState("load");
  assert.equal(failedRequests, 1);
  assert.equal(await page.evaluate(() => history.length), historyLength);
  assert.equal(await page.evaluate(() => history.scrollRestoration), "auto");
  await page.goForward();
  await settle(page, "/projects", "All Projects");
});

test("repeated history entries restore their own scroll positions", async t => {
  const page = await homepage(t);
  await page.locator('a[href="/blog/policyc"]').scrollIntoViewIfNeeded();
  const firstHome = await page.evaluate(() => scrollY);
  await page.locator('a[href="/blog/policyc"]').click();
  await settle(page, "/blog/policyc", "Building PolicyC");
  await page.evaluate(() => scrollTo({ top: 800, behavior: "instant" }));
  await page.evaluate(() => document.querySelector('a[href="/"]').click());
  await settle(page, "/", "I build software");
  assert.equal(await page.evaluate(() => scrollY), firstHome);
  await page.evaluate(() => scrollTo({ top: 1600, behavior: "instant" }));
  await page.evaluate(() => document.querySelector('a[href="/projects"]').click());
  await settle(page, "/projects", "All Projects");
  await page.goBack();
  await settle(page, "/", "I build software");
  assert.equal(await page.evaluate(() => scrollY), 1600);
  await page.goBack();
  await settle(page, "/blog/policyc", "Building PolicyC");
  assert.equal(await page.evaluate(() => scrollY), 800);
  await page.goBack();
  await settle(page, "/", "I build software");
  assert.equal(await page.evaluate(() => scrollY), firstHome);
});

test("a late response cannot replace a more recent destination", async t => {
  const page = await homepage(t);
  let release;
  let requested;
  const gate = new Promise(resolve => { release = resolve; });
  const arrival = new Promise(resolve => { requested = resolve; });
  await page.route(base + "/blog/policyc", async route => {
    requested();
    await gate;
    await route.continue();
  });
  await page.locator('a[href="/blog/policyc"]').click();
  await arrival;
  try {
    await page.locator('a[href="/blog/annie"]').click();
    await settle(page, "/blog/annie", "Building Annie");
  } finally {
    release();
  }
  await page.waitForLoadState("networkidle");
  assert.equal(new URL(page.url()).pathname, "/blog/annie");
  assert.match(await page.locator("h1").textContent(), /Building Annie/);
});

test("same-page fragments keep their document and relinquish enhancement", async t => {
  const page = await homepage(t);
  await page.evaluate(() => {
    window.fragmentMarker = "original-document";
    location.hash = "experience-heading";
  });
  await page.waitForFunction(() => history.scrollRestoration === "auto");
  assert.equal(await page.evaluate(() => window.fragmentMarker), "original-document");
  assert.equal(await page.evaluate(() => location.hash), "#experience-heading");
  assert.ok(Math.abs(await page.locator("#experience-heading")
    .evaluate(element => element.getBoundingClientRect().top)) < 2);
  await page.locator('a[href="/blog/policyc"]').click();
  await page.waitForURL(base + "/blog/policyc");
  await settle(page, "/blog/policyc", "Building PolicyC");
  assert.equal(await page.evaluate(() => window.fragmentMarker), undefined);
});
