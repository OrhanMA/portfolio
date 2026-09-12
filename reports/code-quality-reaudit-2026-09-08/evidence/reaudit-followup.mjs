import { chromium } from '@playwright/test';
import { readFileSync, writeFileSync } from 'node:fs';
const out='/Users/orhan/Developer/projects/portfolio/reports/code-quality-reaudit-2026-09-08/evidence/';
const axe=readFileSync('/tmp/portfolio-reaudit-tools/node_modules/axe-core/axe.min.js','utf8');
const previous=JSON.parse(readFileSync(out+'accessibility.json','utf8'));
const browser=await chromium.launch();
const results=[];
try {
 for (const theme of ['light','dark']) {
  const context=await browser.newContext({viewport:{width:390,height:844},reducedMotion:'reduce'});
  await context.addInitScript(theme=>{localStorage.setItem('theme',theme);localStorage.setItem('cookie-consent',JSON.stringify({necessary:true,analytics:false,version:2,decidedAt:Date.now()}))},theme);
  const page=await context.newPage();
  for (const route of ['/fr','/en/articles/docker-dangling-images']) {
   await page.goto('http://localhost:3318'+route,{waitUntil:'networkidle'});
   await page.evaluate(axe);
   const targets=previous.find(r=>r.mobile&&r.url.endsWith(route)).violations.flatMap(v=>v.nodes.slice(0,2).map(n=>({id:v.id,selector:n.target[0]})));
   for (const target of targets) {
    const locator=page.locator(target.selector);
    await locator.scrollIntoViewIfNeeded();
    const geometry=await locator.evaluate(e=>{const r=e.getBoundingClientRect();const c=getComputedStyle(e);return {text:e.textContent.slice(0,80),width:r.width,height:r.height,top:r.top,color:c.color,background:c.backgroundColor,opacity:c.opacity,tabIndex:e.tabIndex,scrollWidth:e.scrollWidth,clientWidth:e.clientWidth}});
    const check=await page.evaluate(async selector=>{const r=await window.axe.run(document.querySelector(selector),{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa','wcag22aa']}});return r.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.failureSummary)}))},target.selector);
    results.push({theme,route,target,geometry,violations:check});
   }
  }
  await context.close();
 }
 const context=await browser.newContext({javaScriptEnabled:false});
 const page=await context.newPage();await page.goto('http://localhost:3318/fr/articles',{waitUntil:'networkidle'});
 results.push({noJSArticles:{articleLinks:await page.locator('main a[href*="/articles/"]').count(),main:await page.locator('main').innerText()}});
 await context.close();
}finally{await browser.close()}
writeFileSync(out+'followup.json',JSON.stringify(results,null,2));
console.log(JSON.stringify(results,null,2));
