import {chromium} from '@playwright/test';
import {writeFileSync} from 'node:fs';
const out='/Users/orhan/Developer/projects/portfolio/reports/code-quality-reaudit-2026-09-08/evidence/';
const origin='http://localhost:3318';
const browser=await chromium.launch();
const routes=['/fr','/fr/articles','/fr/realisations/portfolio-professionnel','/fr/competences'];
const results={date:new Date().toISOString(),browser:browser.version(),method:'Fresh context per route; cache cold; analytics rejected; mobile 390x844 DPR1; reduced motion; 150ms latency, 1.6Mbps down, 0.75Mbps up, CPU x4 for constrained profile. Laboratory sample, not Lighthouse or field CWV.',measurements:[]};
try{
for(const constrained of [false,true]){
 for(const route of routes){
  const context=await browser.newContext({viewport:{width:390,height:844},deviceScaleFactor:1,reducedMotion:'reduce'});
  const page=await context.newPage();
  await page.addInitScript(()=>{
   localStorage.setItem('cookie-consent',JSON.stringify({necessary:true,analytics:false,version:2,decidedAt:Date.now()}));
   window.__perf={lcp:0,longTasks:[]};
   new PerformanceObserver(list=>{for(const e of list.getEntries())window.__perf.lcp=e.startTime;}).observe({type:'largest-contentful-paint',buffered:true});
   new PerformanceObserver(list=>{for(const e of list.getEntries())window.__perf.longTasks.push({start:e.startTime,duration:e.duration});}).observe({type:'longtask',buffered:true});
  });
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  const cdp=await context.newCDPSession(page);
  await cdp.send('Network.enable');await cdp.send('Network.setCacheDisabled',{cacheDisabled:true});
  if(constrained){await cdp.send('Emulation.setCPUThrottlingRate',{rate:4});await cdp.send('Network.emulateNetworkConditions',{offline:false,latency:150,downloadThroughput:1600000/8,uploadThroughput:750000/8});}
  const response=await page.goto(origin+route,{waitUntil:'networkidle',timeout:60000});
  const data=await page.evaluate(()=>{
    const resources=performance.getEntriesByType('resource');
    const sum=(items,key)=>items.reduce((a,b)=>a+b[key],0);
    const group=items=>({count:items.length,encoded:sum(items,'encodedBodySize'),decoded:sum(items,'decodedBodySize')});
    const nav=performance.getEntriesByType('navigation')[0];
    return {js:group(resources.filter(e=>/\.js(?:\?|$)/.test(e.name))),css:group(resources.filter(e=>/\.css(?:\?|$)/.test(e.name))),fonts:group(resources.filter(e=>/\.woff2(?:\?|$)/.test(e.name))),images:group(resources.filter(e=>e.initiatorType==='img')),allResources:group(resources),document:{encoded:nav.encodedBodySize,decoded:nav.decodedBodySize,ttfb:nav.responseStart-nav.startTime},domElements:document.querySelectorAll('*').length,paint:performance.getEntriesByType('paint').map(e=>({name:e.name,start:e.startTime})),lcp:window.__perf.lcp,longTasks:window.__perf.longTasks,mainTextLength:document.querySelector('main').innerText.length};
  });
  results.measurements.push({route,profile:constrained?'constrained':'local',status:response.status(),errors,...data});
  writeFileSync(out+'performance.json',JSON.stringify(results,null,2));
  console.log(route,constrained?'constrained':'local',JSON.stringify({js:data.js.encoded,doc:data.document.encoded,lcp:data.lcp,longTasks:data.longTasks.length}));
  await context.close();
 }
}
}finally{await browser.close();}
