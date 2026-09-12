import {createVitest} from 'vitest/node';
import {writeFileSync} from 'node:fs';
const v=await createVitest('test',{watch:false,project:['unit'],coverage:{enabled:true}});
const out={node:process.version,root:v.config.coverage,projects:v.projects.map(p=>({name:p.name,coverage:p.config.coverage}))};
writeFileSync('reports/code-quality-reaudit-2026-09-08/evidence/resolved-coverage.json',JSON.stringify(out,null,2));
await v.close();
