// Era-purity check: during a full ?demo run, every live enemy must belong to the current era; tallies types per era.
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:960,height:540}});const err=[];p.on('pageerror',x=>err.push(x.message));p.on('console',m=>m.type()==='error'&&err.push(m.text()));
await p.goto('file:///workspace/time-portal/index.html?demo');await p.waitForTimeout(500);
const r=await p.evaluate(async()=>{const seen={1985:{},2098:{}};let bad=[];let shot=null;
 for(let i=0;i<60*70;i++){__game.step();const G=__game.G;if(!G)continue;
  for(const e of G.enemies){seen[G.era][e.type]=(seen[G.era][e.type]||0)+1;if(e.era!==G.era)bad.push([G.t,G.era,e.type]);}
  if(__game.mode==='clear')break;}
 return {seen,bad:bad.slice(0,5),badN:bad.length,mode:__game.mode,portals:__game.G.portals};});
console.log(JSON.stringify(r));console.log('ERR',JSON.stringify(err));await b.close();})();
