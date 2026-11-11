import { chromium } from 'playwright';
const browser = await chromium.launch({ headless: true, ...(process.env.CHROME_BIN ? { executablePath: process.env.CHROME_BIN } : {}) });
try {
 const page = await browser.newPage({ viewport: { width:1200, height:630 }, deviceScaleFactor:1 });
 await page.setContent(`<html><style>*{box-sizing:border-box}body{margin:0;padding:52px 65px;background:#f7f6f2;color:#303930;font-family:Georgia,serif}.top{display:flex;justify-content:space-between;align-items:center;font:14px Arial,sans-serif;color:#72796f}.mark{font:42px Georgia,serif;color:#aa4e2e;letter-spacing:-4px}h1{font-size:72px;font-weight:400;letter-spacing:-3.5px;line-height:1.09;max-width:1050px;margin:55px 0 45px}em{color:#aa4e2e}.bottom{border-top:1px solid #dcded5;padding-top:24px;font:14px Arial,sans-serif;display:flex;justify-content:space-between;color:#72796f}</style><div class="top"><span class="mark">bg.</span><span>SOFTWARE ENGINEER · LOS ANGELES</span></div><h1>Benjamin Garcia is a software engineer who builds whatever he's <em>curious about.</em></h1><div class="bottom"><span>Selected work, research & explorations.</span><span>bentgarcia.com</span></div></html>`);
 await page.screenshot({path:'static/og-portfolio.png'});
} finally { await browser.close(); }
