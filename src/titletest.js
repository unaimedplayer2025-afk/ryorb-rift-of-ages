// Title-theme test: 1st input only enables audio + starts the theme; 2nd starts play; theme fades/pauses in play; resumes on return to title; M mutes it.
const {chromium}=require('playwright');
const URL=process.argv[2]||'file:///workspace/time-portal/index.html';
(async()=>{const b=await chromium.launch({args:['--autoplay-policy=user-gesture-required']});const p=await b.newPage();const err=[];
p.on('pageerror',x=>err.push(x.message));p.on('console',m=>m.type()==='error'&&err.push(m.text()));
const st=()=>p.evaluate(()=>({mode:__game.mode,armed:titleArmed,unlocked:Snd.unlocked,src:Snd.title&&Snd.title.currentSrc.split('/').pop(),paused:Snd.title&&Snd.title.paused,t:Snd.title&&+Snd.title.currentTime.toFixed(2),vol:Snd.title&&+Snd.title.volume.toFixed(2),muted:Snd.muted}));
const r={};await p.goto(URL);await p.waitForTimeout(800);r.load=await st();
await p.keyboard.press('KeyQ');await p.waitForTimeout(1500);r.afterFirst=await st();
await p.keyboard.press('KeyQ');await p.waitForTimeout(300);r.afterSecond=await st();
await p.waitForTimeout(1200);r.inPlay=await st();
await p.evaluate(()=>{__game.G.lives=0;__game.P.hp=0;});
await p.evaluate(()=>{const G=__game.G;});
// force game over via the game's own path: keep killing until mode changes
for(let i=0;i<40&&(await p.evaluate(()=>__game.mode))==='play';i++){await p.evaluate(()=>{__game.P.y+=2000;});await p.waitForTimeout(200);}
r.over=await p.evaluate(()=>__game.mode);await p.waitForTimeout(1500);await p.keyboard.press('Enter');await p.waitForTimeout(1500);r.backOnTitle=await st();
await p.keyboard.press('KeyM');await p.waitForTimeout(200);r.mutedM=await st();
await p.keyboard.press('KeyM');await p.waitForTimeout(800);r.unmutedM=await st();
await p.click('#mute');await p.waitForTimeout(200);r.muteBtn=await st();
console.log(JSON.stringify(r,null,0).replace(/\},"/g,'},\n"'));
// touch: first tap must not skip the title
const c=await b.newContext({hasTouch:true,isMobile:true,viewport:{width:844,height:390}});const t=await c.newPage();t.on('pageerror',x=>err.push(x.message));
await t.goto(URL);await t.waitForTimeout(600);await t.tap('canvas');await t.waitForTimeout(600);const tap1=await t.evaluate(()=>({mode:__game.mode,armed:titleArmed,playing:!Snd.title.paused}));
await t.tap('canvas');await t.waitForTimeout(400);const tap2=await t.evaluate(()=>__game.mode);
console.log('touch',JSON.stringify({tap1,tap2}));console.log('ERR',JSON.stringify(err));await b.close();})();
