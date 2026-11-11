import assert from 'node:assert/strict';
import { test, before, after } from 'node:test';
import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
let browser, server;
const base='http://127.0.0.1:8794';
before(async()=>{
 server=spawn('python3',['scripts/serve.py','--port','8794']);
 await new Promise(resolve=>server.stdout.once('data',resolve));
 browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_BIN});
});
after(async()=>{await browser?.close();server?.kill();});
test('gallery is responsive, media resolves, and all routes retain readable content',async()=>{
 const context=await browser.newContext(); const page=await context.newPage();
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 for(const width of [1440,1024,768,390,320]){
  await page.setViewportSize({width,height:1000});await page.goto(base);await page.evaluate(()=>document.fonts.ready);
  await page.waitForTimeout(1100);
  assert.equal(await page.locator('h1').innerText(),"Benjamin Garcia is a software engineer who builds whatever he's curious about.");
  assert.equal(await page.locator('.work-item').count(),6);
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`overflow at ${width}`);
  if(process.env.GALLERY_SCREENSHOTS && (width===1440||width===390)) {
   await page.locator('img[loading="lazy"]').evaluateAll(images=>images.forEach(image=>image.loading='eager'));
   await page.evaluate(()=>Promise.all([...document.images].map(image=>image.decode().catch(()=>{}))));
   await page.screenshot({path:`${process.env.GALLERY_SCREENSHOTS}/gallery-${width}.png`,fullPage:true});
   await page.screenshot({path:`${process.env.GALLERY_SCREENSHOTS}/hero-${width}.png`});
  }
 }
 const urls=await page.locator('.work-visual img, .work-visual video').evaluateAll(nodes=>nodes.map(n=>n.getAttribute('poster')||n.getAttribute('src')));
 for(const url of urls){const response=await context.request.get(base+url);assert.equal(response.status(),200,url);}
 await page.locator('a[href="/blog/annie"]').click();await page.waitForURL('**/blog/annie');
 await page.locator('a[href="/"]').click();await page.waitForURL(base+'/');
 await page.locator('.motion-toggle').first().waitFor({state:'visible'});
 assert.equal(errors.length,0,errors.join('\n'));
 await context.close();
});
test('motion respects reduced motion, manual controls, and leaving the viewport',async()=>{
 const context=await browser.newContext({reducedMotion:'reduce'});const page=await context.newPage();await page.goto(base);
 const video=page.locator('video').first();await video.scrollIntoViewIfNeeded();await page.waitForTimeout(250);
 assert.equal(await video.getAttribute('src'),null);
 await page.locator('.motion-toggle').first().click();
 await page.waitForFunction(()=>!document.querySelector('video').paused);
 await page.locator('.motion-toggle').first().click();assert.equal(await video.evaluate(v=>v.paused),true);
 await page.locator('.motion-toggle').first().click();await page.waitForFunction(()=>!document.querySelector('video').paused);
 await page.locator('.portfolio-footer').scrollIntoViewIfNeeded();await page.waitForTimeout(250);assert.equal(await video.evaluate(v=>v.paused),true);
 await context.close();
});
test('without JavaScript the gallery shows posters and every project is reachable',async()=>{
 const context=await browser.newContext({javaScriptEnabled:false});const page=await context.newPage();await page.goto(base);
 assert.equal(await page.locator('video[poster]').count(),4);
 assert.equal(await page.locator('.motion-toggle:visible').count(),0);
 await page.locator('a[href="/blog/policyc"]').click();await page.waitForURL('**/blog/policyc');
 assert.match(await page.locator('h1').innerText(),/PolicyC/);await context.close();
});
