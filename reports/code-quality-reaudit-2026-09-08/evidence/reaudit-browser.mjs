import { chromium } from '@playwright/test';
import { writeFileSync } from 'node:fs';
const out='/Users/orhan/Developer/projects/portfolio/reports/code-quality-reaudit-2026-09-08/evidence/';
const origin='http://localhost:3318';
const browser=await chromium.launch({headless:true});
const results={date:new Date().toISOString(),noJS:[],consent:{},desktopMenu:{}};
async function newContext(opts={}){
 const context=await browser.newContext({viewport:{width:1280,height:900},...opts});
 await context.route('**/*',route=>new URL(route.request().url()).origin===origin?route.continue():route.fulfill({status:200,contentType:'application/javascript',body:'window.__auditThirdPartyLoaded=true;'}));
 return context;
}
try {
 const context=await newContext({javaScriptEnabled:false});
 const page=await context.newPage();
 for(const route of ['/fr','/en','/fr/articles','/en/articles/docker-dangling-images','/fr/competences','/fr/realisations/portfolio-professionnel','/fr/contact']){
  const response=await page.goto(origin+route,{waitUntil:'networkidle'});
  results.noJS.push({route,status:response.status(),...await page.evaluate(()=>({
    mainText:document.querySelector('main')?.innerText.slice(0,350),
    hiddenHeadings:[...document.querySelectorAll('main h1, main h2, main h3')].filter(e=>getComputedStyle(e).visibility==='hidden'||getComputedStyle(e).display==='none').map(e=>e.textContent),
    hiddenContainers:document.querySelectorAll('main [hidden]').length,
    h1Count:document.querySelectorAll('h1').length,
    form:document.querySelector('form')?{method:document.querySelector('form').method,action:document.querySelector('form').action}:null
  }))});
 }
 await page.locator('#name').fill('Audit Fictif');
 await page.locator('#email').fill('audit@example.invalid');
 await page.locator('#message').fill('Message synthetique audit uniquement');
 const requestPromise=page.waitForRequest(r=>r.isNavigationRequest()&&r.url().includes('/fr/contact?'));
 await page.locator('button[type=submit]').click();
 const request=await requestPromise;
 results.noJSForm={method:request.method(),url:request.url()};
 await context.close();
 const c=await newContext(); const p=await c.newPage();
 await p.goto(origin+'/fr');
 await p.getByRole('button',{name:'Accepter',exact:true}).click({timeout:6000});
 await p.waitForFunction(()=>window.__auditThirdPartyLoaded===true);
 results.consent.before=await p.evaluate(()=>JSON.parse(localStorage.getItem('cookie-consent')));
 await c.addInitScript(()=>{Storage.prototype.setItem=()=>{throw new DOMException('Quota exhausted','QuotaExceededError')}});
 await p.evaluate(()=>{Storage.prototype.setItem=()=>{throw new DOMException('Quota exhausted','QuotaExceededError')}});
 await p.getByRole('dialog').waitFor({state:'hidden'});
 await p.locator('footer').getByRole('button',{name:'Gérer les cookies',exact:true}).click();
 await p.getByRole('button',{name:'Refuser',exact:true}).click();
 await p.waitForLoadState('networkidle');
 await p.waitForFunction(()=>window.__auditThirdPartyLoaded===true);
 results.consent.after=await p.evaluate(()=>({stored:JSON.parse(localStorage.getItem('cookie-consent')),thirdPartyLoaded:window.__auditThirdPartyLoaded,scripts:[...document.scripts].filter(s=>s.src.includes('googletagmanager')).map(s=>s.src)}));
 await c.close();
 const m=await newContext(); const mp=await m.newPage();
 await mp.addInitScript(()=>localStorage.setItem('cookie-consent',JSON.stringify({necessary:true,analytics:false,version:2,decidedAt:Date.now()})));
 await mp.goto(origin+'/fr',{waitUntil:'networkidle'});
 const trigger=mp.locator('[data-desktop-navigation] button').first();
 await trigger.hover(); results.desktopMenu.afterHover=await trigger.getAttribute('aria-expanded');
 await trigger.click(); results.desktopMenu.afterFirstClick=await trigger.getAttribute('aria-expanded');
 await trigger.click(); results.desktopMenu.afterSecondClick=await trigger.getAttribute('aria-expanded');
 await m.close();
} catch(e){results.error={message:e.message,stack:e.stack};} finally {writeFileSync(out+'browser-probes.json',JSON.stringify(results,null,2));await browser.close();}
console.log(JSON.stringify(results,null,2));
