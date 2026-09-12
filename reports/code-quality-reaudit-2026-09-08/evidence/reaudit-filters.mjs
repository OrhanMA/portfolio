import {chromium} from '@playwright/test';
import {writeFileSync} from 'node:fs';
const browser=await chromium.launch();const results=[];
try{
 for(let i=0;i<3;i++){
 const context=await browser.newContext({reducedMotion:'reduce'});
 await context.addInitScript(()=>localStorage.setItem('cookie-consent',JSON.stringify({necessary:true,analytics:false,version:2,decidedAt:Date.now()})));
 const page=await context.newPage();await page.goto('http://localhost:3318/fr/articles',{waitUntil:'networkidle'});
 await page.route('**/fr/articles?**',async route=>{await new Promise(r=>setTimeout(r,600));await route.continue()});
 const input=page.locator('input[type=search]');
 await input.fill('odoo');await input.fill('');
 await page.waitForTimeout(1800);
 results.push({attempt:i,url:page.url(),input:await input.inputValue(),titles:await page.locator('main h2').allTextContents()});await context.close();
 }
}finally{await browser.close()}
writeFileSync('/Users/orhan/Developer/projects/portfolio/reports/code-quality-reaudit-2026-09-08/evidence/filter-race.json',JSON.stringify(results,null,2));console.log(JSON.stringify(results,null,2));
