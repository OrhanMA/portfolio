import {chromium} from '@playwright/test';
import {readFileSync,writeFileSync} from 'node:fs';
const origin='http://localhost:3318';const out='/Users/orhan/Developer/projects/portfolio/reports/code-quality-reaudit-2026-09-08/evidence/';
const axe=readFileSync('/tmp/portfolio-reaudit-tools/node_modules/axe-core/axe.min.js','utf8');
const browser=await chromium.launch();const results=[];
const routes=['/fr','/fr/contact','/fr/competences','/fr/articles','/en/articles/docker-dangling-images','/fr/realisations/portfolio-professionnel','/fr/a-propos','/fr/parcours/1up-fullstack-developer','/fr/projects'];
try{
 for(const mobile of [false,true]){
 const context=await browser.newContext({viewport:mobile?{width:390,height:844}:{width:1280,height:900},reducedMotion:'reduce'});
 await context.addInitScript(()=>{localStorage.setItem('cookie-consent',JSON.stringify({necessary:true,analytics:false,version:2,decidedAt:Date.now()}));localStorage.setItem('theme','light')});
 const page=await context.newPage();let errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text())});
 async function check(state){
  await page.evaluate(axe);
  const result=await page.evaluate(async()=>{
   const a=await window.axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa','wcag22aa']}});
   return {violations:a.violations.map(v=>({id:v.id,impact:v.impact,help:v.help,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))})),incomplete:a.incomplete.map(v=>({id:v.id,nodes:v.nodes.length})),overflow:document.documentElement.scrollWidth>innerWidth};
  });results.push({url:page.url(),mobile,state,errors:[...errors],...result});errors=[];writeFileSync(out+'accessibility.json',JSON.stringify(results,null,2));
 }
 for(const route of routes){await page.goto(origin+route,{waitUntil:'networkidle'});await check('initial');}
 await page.goto(origin+'/fr/contact',{waitUntil:'networkidle'});await page.locator('button[type=submit]').click();await check('validation errors');
 await page.locator('footer').getByRole('button',{name:'Gérer les cookies',exact:true}).click();await page.getByRole('dialog').waitFor({state:'visible'});await check('expanded consent');
 await page.getByRole('button',{name:'Refuser',exact:true}).click();await page.getByRole('dialog').waitFor({state:'hidden'});
 if(mobile){await page.getByRole('button',{name:'Ouvrir le menu'}).click().catch(()=>page.locator('button[aria-controls="mobile-navigation-panel"]').click());await check('mobile menu');}
 await context.close();
 }
}finally{await browser.close();}
console.log(JSON.stringify(results.map(r=>({url:r.url,mobile:r.mobile,state:r.state,violations:r.violations.map(v=>v.id),overflow:r.overflow,errors:r.errors})),null,2));
