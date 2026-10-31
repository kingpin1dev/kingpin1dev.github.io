'use strict';
// Buildless, offline demo. All coordinates are in the 1920 × 1080 stage.
const $ = selector => document.querySelector(selector);
const $$ = selector => [...document.querySelectorAll(selector)];

// Website embed: language, SVG category icons (Segoe Fluent Icons only exists on Windows) and stack
// names from the app (Grouping.cs; Turkish from Localization/tr.json).
const params0 = new URLSearchParams(location.search);
const LANG = params0.get('lang') === 'tr' ? 'tr' : 'en';
const EMBED = document.body.classList.contains('embed');
const TXT = {
  en: {items:n=>`${n} item${n===1?'':'s'}`, preview:'Preview', close:'Close', deckHint:'Scroll to move through the deck', quick:'Quick preview · Space to close',
       sunny:'Sunny', date:'10/30/2026', organized:'Organized', scattered:'Scattered', category:'Category icons', piles:'Piles', pack:'Icon pack',
       top:'Top', right:'Right', bottom:'Bottom', left:'Left', group:'Group by', kind:'File type', dateGroup:'Date', openAs:'Open as', deck:'Deck', wrap:'Wrap', scroll:'Scroll',
       wpBlue:'Blue bloom', wpDusk:'Dusk', wpLight:'Soft daylight', play:'▶ Play the story', pause:'Ⅱ Pause the story',
       names:{}},
  tr: {items:n=>`${n} öğe`, preview:'Önizle', close:'Kapat', deckHint:'Destede gezinmek için kaydırın', quick:'Hızlı önizleme · kapatmak için Boşluk',
       sunny:'Güneşli', date:'30.10.2026', organized:'Düzenli', scattered:'Dağınık', category:'Kategori ikonları', piles:'Yığın', pack:'İkon paketi',
       top:'Üst', right:'Sağ', bottom:'Alt', left:'Sol', group:'Grupla', kind:'Tür', dateGroup:'Tarih', openAs:'Açılış', deck:'Deste', wrap:'Sar', scroll:'Kaydır',
       wpBlue:'Mavi', wpDusk:'Alacakaranlık', wpLight:'Gün ışığı', play:'▶ Hikâyeyi oynat', pause:'Ⅱ Hikâyeyi duraklat',
       names:{Folders:'Klasörler',Games:'Oyunlar',Images:'Resimler','Text Documents':'Metin Belgeleri',Movies:'Videolar',Music:'Müzik',Other:'Diğer',Developer:'Kod',
              Today:'Bugün',Yesterday:'Dün','Previous 7 Days':'Son 7 Gün','Previous 30 Days':'Son 30 Gün'}}
}[LANG];
const tname = n => TXT.names[n] || n;
const ICON = {
  folder:'M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z',
  gamepad:'M6 11h4M8 9v4M15 12h.01M18 10h.01M17.32 5H6.68a4 4 0 0 0-3.98 3.59C2.6 9.42 2 14.46 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.41-1.41A2 2 0 0 1 9.83 16h4.34a2 2 0 0 1 1.41.59L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.55-.6-6.58-.69-7.26A4 4 0 0 0 17.32 5z',
  image:'M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2ZM9 11a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM21 15l-3.09-3.09a2 2 0 0 0-2.82 0L6 21',
  note:'M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7ZM14 2v4a2 2 0 0 0 2 2h4M10 9H8M16 13H8M16 17H8',
  video:'M16 13l5.22 3.48a.5.5 0 0 0 .78-.42V7.87a.5.5 0 0 0-.75-.43L16 10.5M4 6h10a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z',
  music:'M9 18V5l12-2v13M6 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM18 19a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z',
  file:'M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7ZM14 2v4a2 2 0 0 0 2 2h4',
  braces:'M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2 2 2 0 0 1 2 2v5c0 1.1.9 2 2 2h1M16 21h1a2 2 0 0 0 2-2v-5c0-1.1.9-2 2-2a2 2 0 0 1-2-2V5a2 2 0 0 0-2-2h-1',
  calendar:'M8 2v4M16 2v4M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zM3 10h18'
};
const svgIcon = k => `<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${ICON[k]}"/></svg>`;
const packs = ['Fluent','Glass','Light','Circle','Gradient','Minimal','Outline','Neon','Pastel','Dark','Duotone','Glossy','Mono','Leaf','Drop','Sharp','Ring','Sunset','Ocean','Aurora','Frosted','Midnight','Clay','Retro','ColorGlyph'];
const categories = [
  {id:'folders',title:'Folders',color:'#3b82f6',glyph:'folder',names:['Projects','Moodboards','Personal','Resources']},
  {id:'games',title:'Games',color:'#84cc16',glyph:'gamepad',names:['Minecraft.lnk','Stardew Valley.lnk','Hades.lnk']},
  {id:'images',title:'Images',color:'#22c55e',glyph:'image',names:['Alpine morning.jpg','Coastline.png','Northern lights.jpg','Brand study.fig','Evening light.jpg','Blue hour.png','Forest walk.jpg','Textures.psd','Quiet lake.jpg','Sunday.png','Architecture.jpg','Spring garden.jpg']},
  {id:'documents',title:'Text Documents',color:'#2b579a',glyph:'note',names:['Project brief.docx','Reading list.txt','Meeting notes.docx','Ideas.md','Research.pdf','Invoice.pdf']},
  {id:'videos',title:'Movies',color:'#a855f7',glyph:'video',names:['Weekend.mp4','Launch edit.prproj','Showreel.mov','Sunrise.mp4']},
  {id:'music',title:'Music',color:'#ec4899',glyph:'music',names:['Daydream.mp3','Soft focus.wav','Night drive.flac','Studio session.als']},
  {id:'archives',title:'Other',color:'#a16207',glyph:'file',names:['Brand assets.zip','Project backup.7z','Textures.zip']},
  {id:'code',title:'Developer',color:'#64748b',glyph:'braces',names:['index.html','styles.css','app.js','LunaDock.sln']}
];
const files = categories.flatMap((c,ci) => c.names.map((name,i)=>({id:`${c.id}-${i}`,name,kind:c.id,color:c.color,ci,index:i,date:(i+ci)%4})));
const dateGroups = ['Today','Yesterday','Previous 7 Days','Previous 30 Days'].map((title,i)=>({id:`date-${i}`,title,color:['#3b82f6','#6366f1','#8b5cf6','#a855f7'][i],glyph:'calendar'}));
const state = {organized:true,style:'category',pack:'Fluent',edge:'top',group:'kind',overflow:'deck',wallpaper:'blue',open:null,deck:0,selected:null,playing:false,loop:false,time:0,story:false};
let frame = 0, lastStamp = 0, lastScene = '', clickTimers = [];
const stage = $('#stage');
const esc = text => text.replace(/[&<>"']/g, char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
function fileArt(file) {
  const color = file.color, n = file.index;
  if (file.kind === 'images') {
    const skies=['#8bc3ce','#e4b396','#455e9b','#89b6d6','#b0b8cf'];
    return `<span class="file-art"><svg viewBox="0 0 58 66" aria-hidden="true"><rect x="2" y="7" width="54" height="49" rx="3" fill="#f5f7fc"/><path fill="${skies[n%5]}" d="M6 11h46v39H6z"/><circle cx="40" cy="21" r="6" fill="#fff3cf"/><path d="m6 49 15-25 11 17 7-10 13 18Z" fill="${n%2?'#304d51':'#355b6d'}"/><path d="m14 36 7-12 7 11-7-3Z" fill="#f0f7f4"/><path d="M6 50h46v2H6z" fill="#cbd9e3"/></svg></span>`;
  }
  if (file.kind === 'folders') return '<span class="file-art"><svg viewBox="0 0 58 66" aria-hidden="true"><path d="M3 16q0-4 4-4h16l6 6h22q4 0 4 4v30H3Z" fill="#e7a63d"/><path d="M3 25h52v27q0 3-4 3H7q-4 0-4-4Z" fill="#f7cb68"/><path d="M3 25h52v7H3z" fill="#ffdb81"/></svg></span>';
  const symbols={games:'✦',documents:'≡',videos:'▶',music:'♫',archives:'⋮',code:'‹/›'};
  const mark = file.kind === 'documents' && file.name.endsWith('.pdf') ? 'PDF' : symbols[file.kind] || '≡';
  return `<span class="file-art"><svg viewBox="0 0 58 66" aria-hidden="true"><path d="M11 3h25l12 12v46H11Z" fill="#eef3fa"/><path d="M36 3v13h12" fill="#bdcede"/><rect x="5" y="25" width="35" height="29" rx="4" fill="${color}"/><text x="22.5" y="45" text-anchor="middle" font-family="Segoe UI,sans-serif" font-size="${mark==='PDF'?11:21}" font-weight="600" fill="white">${mark}</text><path d="M16 58h27" stroke="#bfccdb" stroke-width="2"/></svg></span>`;
}
function groups() {return state.group === 'date' ? dateGroups : categories;}
function members(group) {return files.filter(f=>state.group === 'date' ? `date-${f.date}`===group.id : f.kind===group.id);}
function position(index) {
  const horizontal = state.edge==='top'||state.edge==='bottom';
  if(horizontal) return {x:70+index*114,y:state.edge==='top'?48:870};
  return {x:state.edge==='left'?40:1784,y:55+index*112};
}
function groupFor(file) {return state.group==='date'?`date-${file.date}`:file.kind;}
function stackHTML(group,index,preview=false) {
  const list = members(group), examples = list.slice(0,3);
  const pos = position(index);
  return `<button class="stack${state.open===group.id?' active':''}" ${preview?'tabindex="-1"':`data-stack="${group.id}" aria-expanded="${state.open===group.id}" aria-label="${esc(tname(group.title))}, ${TXT.items(list.length)}"`} style="--color:${group.color};transform:translate(${pos.x}px,${pos.y}px);opacity:${state.organized?1:0};pointer-events:${state.organized?'auto':'none'}"><span class="stack-icon"><span class="glyph">${svgIcon(group.glyph)}</span><span class="pile">${examples.map(fileArt).join('')}</span></span><span class="stack-title">${esc(tname(group.title))}</span><span class="stack-count">${TXT.items(list.length)}</span></button>`;
}
function renderStacks() {
  $('#stacks').innerHTML=groups().map((g,i)=>stackHTML(g,i)).join('');
  $('#pack-preview').dataset.pack=state.pack;
  $('#pack-preview').innerHTML=categories.slice(1,6).map((g,i)=>stackHTML(g,i,true)).join('');
  $$('#pack-preview .stack').forEach(el=>el.style.opacity='1');
}
function renderFiles() {
  $('#files').innerHTML=files.map((file,i)=>`<button class="desktop-file" data-file="${file.id}" tabindex="${state.organized?-1:0}" aria-label="${TXT.preview} ${esc(file.name)}" style="transform:translate(${scatterPosition(i).x}px,${scatterPosition(i).y}px)">${fileArt(file)}<span>${esc(file.name)}</span></button>`).join('');
  moveFiles();
}
function scatterPosition(i) {return {x:42+(i%12)*151+((i*7)%21),y:40+Math.floor(i/12)*175+((i*13)%37)};}
function moveFiles() {
  $$('.desktop-file').forEach((el,i)=>{
    const file=files[i], index=groups().findIndex(g=>g.id===groupFor(file));
    const pos=state.organized?position(index):scatterPosition(i);
    el.style.transform=`translate(${pos.x}px,${pos.y}px) scale(${state.organized?.45:1})`;
    el.style.opacity=state.organized?'0':'1';el.style.pointerEvents=state.organized?'none':'auto';el.tabIndex=state.organized?-1:0;
    el.style.transitionDelay=state.organized?`${(i%7)*35}ms`:`${(i%5)*20}ms`;
  });
}
function syncControls() {
  stage.classList.toggle('scattered',!state.organized);
  stage.dataset.style=state.style;stage.dataset.pack=state.pack;stage.dataset.edge=state.edge;stage.dataset.wallpaper=state.wallpaper;
  $('#pack').value=state.pack;$('#group').value=state.group;$('#overflow').value=state.overflow;
  $$('button[data-style]').forEach(b=>b.classList.toggle('selected',b.dataset.style===state.style));
  $$('button[data-edge]').forEach(b=>b.classList.toggle('selected',b.dataset.edge===state.edge));
  $$('button[data-wallpaper]').forEach(b=>b.classList.toggle('selected',b.dataset.wallpaper===state.wallpaper));
  $('[data-action=organize]').classList.toggle('selected',state.organized);
  $('[data-action=scatter]').classList.toggle('selected',!state.organized);
}
function update(options={}) {
  Object.assign(state,options);syncControls();
  // Keep stack elements for position transitions when their grouping is unchanged.
  const existing=$$('#stacks .stack');
  if(existing.length!==groups().length||existing[0]?.dataset.stack!==groups()[0].id)renderStacks();
  else existing.forEach((el,i)=>{const p=position(i);el.style.transform=`translate(${p.x}px,${p.y}px)`;el.style.opacity=state.organized?'1':'0';el.style.pointerEvents=state.organized?'auto':'none';el.classList.toggle('active',state.open===el.dataset.stack);el.setAttribute('aria-expanded',String(state.open===el.dataset.stack));});
  $('#pack-preview').dataset.pack=state.pack;moveFiles();renderPanel();
}
function openStack(id) {
  if(!state.organized)return;
  state.open=state.open===id?null:id;state.deck=0;state.selected=null;update();
}
// Direct translation of DeckPanel.Compute: 7 px card spacing, four-card depth.
function computeDeck(count,tile,length,offset) {
  if(!count||tile<=0)return {cards:[],band:0,maxOffset:0};
  if(count*tile<=length+.5)return {cards:Array.from({length:count},(_,i)=>({position:i*tile,depth:0})),band:0,maxOffset:0};
  const band=Math.min(28,Math.max(0,(length-tile)/2));
  const maxOffset=Math.max(0,count*tile+band-length);
  offset=Math.max(0,Math.min(offset,maxOffset));
  const start=band*Math.min(1,offset/tile),end=length-band*Math.min(1,(maxOffset-offset)/tile);
  const cards=Array.from({length:count},(_,i)=>{
    const x=start+i*tile-offset;
    if(x<start-.01){const depth=(start-x)/tile;return {position:Math.max(0,start-7*depth),depth:-depth};}
    if(x+tile>end+.01){const depth=(x+tile-end)/tile;return {position:Math.min(length-tile,end-tile+7*depth),depth};}
    return {position:x,depth:0};
  });
  return {cards,band,maxOffset};
}
let panelKey='',deckOffset=0,deckTarget=0,deckFrame=0,deckStamp=0,panelGeometry=null;
function renderPanel() {
  const panel=$('#panel'),group=groups().find(g=>g.id===state.open);
  stage.classList.toggle('stack-open',Boolean(group&&state.organized));
  if(!group||!state.organized){
    if(!panel.hidden&&panel.animate){
      panel.animate([{opacity:1,transform:'scale(1)'},{opacity:0,transform:'scale(.85)'}],{duration:120,easing:'cubic-bezier(.32,0,.67,0)'});
      // Keep the closing visual independent of the next stack's live elements.
      const ghost=panel.cloneNode(true);ghost.removeAttribute('id');ghost.setAttribute('aria-hidden','true');ghost.style.pointerEvents='none';stage.appendChild(ghost);
      const animation=ghost.animate([{opacity:1,transform:'scale(1)'},{opacity:0,transform:'scale(.85)'}],{duration:120,easing:'cubic-bezier(.32,0,.67,0)',fill:'forwards'});
      animation.onfinish=()=>ghost.remove();
    }
    panel.hidden=true;panelKey='';cancelAnimationFrame(deckFrame);return;
  }
  const list=members(group),pos=position(groups().indexOf(group));
  // Auto opens opposite the dock edge. Up/down panels are single columns.
  const vertical=state.edge==='top'||state.edge==='bottom',reversed=state.edge==='bottom'||state.edge==='right';
  const tileW=104,tileH=126,screenW=1920,screenH=1026,edge=4;
  const availableW=state.edge==='left'?screenW-pos.x-96-edge:state.edge==='right'?pos.x-edge:screenW-2*edge;
  const availableH=state.edge==='top'?screenH-pos.y-118-edge:state.edge==='bottom'?pos.y-edge:screenH-2*edge;
  let width,height,rows=1,cols=1;
  if(state.overflow==='wrap'){
    if(vertical){rows=Math.min(list.length,Math.max(1,Math.floor(availableH/tileH)));cols=Math.ceil(list.length/rows);}
    else{cols=Math.min(list.length,Math.max(1,Math.floor(availableW/tileW)));rows=Math.ceil(list.length/cols);}
    width=Math.min(cols*tileW,screenW-8);height=Math.min(rows*tileH,screenH-8);
  }else{
    width=vertical?tileW:Math.min(list.length*tileW,Math.max(tileW,availableW));
    height=vertical?Math.min(list.length*tileH,Math.max(tileH,availableH)):tileH;
  }
  let x=state.edge==='left'?pos.x+96:state.edge==='right'?pos.x-width:pos.x;
  let y=state.edge==='top'?pos.y+118:state.edge==='bottom'?pos.y-height:pos.y;
  x=Math.max(edge,Math.min(x,screenW-width-edge));y=Math.max(edge,Math.min(y,screenH-height-edge));
  const key=[group.id,state.edge,state.overflow,state.group].join(':');
  const opening=key!==panelKey||panel.hidden;
  panel.hidden=false;
  panel.style.cssText=`width:${width}px;height:${height}px;left:${x}px;top:${y}px;transform-origin:${Math.max(0,Math.min(1,(pos.x+48-x)/width))*100}% ${Math.max(0,Math.min(1,(pos.y+59-y)/height))*100}%`;
  const area=$('#panel-files');area.style.height=`${height}px`;
  const tile=vertical?tileH:tileW,length=vertical?height:width;
  panelGeometry={vertical,reversed,tile,length,rows,cols,width,height,list};
  const maxOffset=state.overflow==='deck'?computeDeck(list.length,tile,length,0).maxOffset:Math.max(0,list.length*tile-length);
  deckTarget=Math.max(0,Math.min(state.deck*tile,maxOffset));state.deck=deckTarget/tile;
  if(opening){
    panelKey=key;deckOffset=deckTarget;cancelAnimationFrame(deckFrame);
    area.innerHTML=list.map(f=>`<button class="panel-file" data-preview="${f.id}" aria-label="${TXT.preview} ${esc(f.name)}">${fileArt(f)}<span>${esc(f.name)}</span></button>`).join('');
    if(panel.animate)panel.animate([{opacity:0,transform:'scale(.85)'},{opacity:1,transform:'scale(1)'}],{duration:180,easing:'cubic-bezier(.215,.61,.355,1)'});
  }else if(!state.playing&&state.story){deckOffset=deckTarget;}
  drawDeck();
  if(Math.abs(deckOffset-deckTarget)>.3)startDeckSpring();
}
function drawDeck(){
  if(!panelGeometry)return;
  const {vertical,reversed,tile,length,rows,cols,width,height,list}=panelGeometry;
  const layout=computeDeck(list.length,tile,length,deckOffset);
  $$('#panel-files .panel-file').forEach((el,i)=>{
    let x=0,y=0,depth=0;
    if(state.overflow==='wrap'){
      x=(vertical?Math.floor(i/rows):i%cols)*104;
      y=(vertical?i%rows:Math.floor(i/cols))*126;
      if(reversed){if(vertical)y=height-126-y;else x=width-104-x;}
    }else{
      const card=layout.cards[i];depth=state.overflow==='deck'?card.depth:0;
      let along=state.overflow==='deck'?card.position:i*tile-deckOffset;
      if(reversed)along=length-tile-along;
      if(vertical)y=along;else x=along;
    }
    const d=Math.abs(depth),scale=1-.07*Math.min(d,4);
    const opacity=d<=4?1-.15*d:Math.max(0,.4-(d-4));
    let origin=depth<0?0:depth>0?1:.5;if(reversed)origin=1-origin;
    el.style.transform=`translate(${x}px,${y}px) scale(${scale})`;
    el.style.transformOrigin=vertical?`50% ${origin*100}%`:`${origin*100}% 50%`;
    el.style.opacity=opacity;el.style.zIndex=1000-Math.round(d*10);
    el.style.pointerEvents=opacity>.05?'auto':'none';el.tabIndex=opacity>.05?0:-1;
    el.dataset.depth=depth;el.dataset.index=i;
    el.classList.toggle('selected',state.selected===list[i].id);
  });
}
function startDeckSpring(){
  cancelAnimationFrame(deckFrame);deckStamp=0;
  function step(now){
    const frames=deckStamp?Math.max(.25,Math.min(4,(now-deckStamp)/16.67)):1;deckStamp=now;
    deckOffset+=(deckTarget-deckOffset)*(1-Math.pow(.8,frames));
    if(Math.abs(deckTarget-deckOffset)<.3){deckOffset=deckTarget;drawDeck();return;}
    drawDeck();deckFrame=requestAnimationFrame(step);
  }
  deckFrame=requestAnimationFrame(step);
}
function bringCardIntoView(index){
  const {tile,length,list}=panelGeometry;
  const band=computeDeck(list.length,tile,length,deckTarget).band,start=index*tile;
  if(start<deckTarget)state.deck=start/tile;
  else if(start+tile+2*band-length>deckTarget)state.deck=(start+tile+2*band-length)/tile;
  renderPanel();
}
function preview(id) {
  const file=files.find(f=>f.id===id);if(!file)return;
  state.selected=id;$('#preview-art').innerHTML=fileArt(file);$('#preview-name').textContent=file.name;$('#quicklook').hidden=false;
}
function closePreview() {$('#quicklook').hidden=true;}
function manual() {pause();state.story=false;lastScene='';$('#fake-cursor').style.opacity=0;const c=storyText('intro');setCopy(c[0],c[1],c[2]);}
function setCopy(kicker,title,body,hidden=false) {
  $('#story-copy').classList.toggle('hidden',hidden);
  $('.story-kicker').textContent=kicker;$('#story-copy h2').textContent=title;$('#story-copy p').textContent=body;
}
const scenes = [
 {at:0,id:'clutter',organized:false,style:'pile',pack:'Fluent',edge:'top',open:null,kicker:'A FAMILIAR DESKTOP',title:'A lot going on.',body:'Files. Folders. A few too many “final” versions.',hide:true},
 {at:3,id:'clutter-copy',organized:false,style:'pile',pack:'Fluent',edge:'top',open:null,kicker:'A FAMILIAR DESKTOP',title:'A lot going on.',body:'Let’s make a little room.',hide:false},
 {at:7,id:'organize',organized:true,style:'pile',pack:'Fluent',edge:'top',open:null,kicker:'MEET LUNADOCK',title:'Clutter, collected.',body:'Your desktop files. Automatically organized.',hide:false},
 {at:11,id:'category',organized:true,style:'category',pack:'Fluent',edge:'top',open:null,kicker:'A PLACE FOR EVERYTHING',title:'Find your focus.',body:'Images, documents, music. Each in its own stack.',hide:false},
 {at:14,id:'open',organized:true,style:'category',pack:'Fluent',edge:'top',open:'images',deck:0,kicker:'ONE CLICK AWAY',title:'Open. Find. Flow.',body:'Your files are right where you need them.',hide:false,cursor:'images'},
 {at:18,id:'deck',organized:true,style:'category',pack:'Fluent',edge:'top',open:'images',deck:5,kicker:'KEEP THINGS MOVING',title:'More files. Less space.',body:'Scroll through a beautifully simple deck.',hide:false,cursor:'deck'},
 {at:21,id:'preview',organized:true,style:'category',pack:'Fluent',edge:'top',open:'images',deck:5,kicker:'TAKE A CLOSER LOOK',title:'Just a quick look.',body:'Preview what you need. Stay in your flow.',hide:true,preview:'images-5'},
 {at:24,id:'glass',organized:true,style:'category',pack:'Glass',edge:'top',open:null,kicker:'MAKE IT YOURS',title:'A look for every mood.',body:'Choose from 25 icon packs.',hide:false},
 {at:27,id:'pastel',organized:true,style:'category',pack:'Pastel',edge:'top',open:null,kicker:'MAKE IT YOURS',title:'Soft. Bright. Yours.',body:'The same desktop. A different personality.',hide:false},
 {at:30,id:'aurora',organized:true,style:'category',pack:'Aurora',edge:'top',open:null,kicker:'MAKE IT YOURS',title:'A little more color.',body:'Find a style that feels at home.',hide:false},
 {at:34,id:'right',organized:true,style:'category',pack:'Fluent',edge:'right',open:null,kicker:'YOUR SPACE, YOUR WAY',title:'Pick your side.',body:'Top, bottom, left or right. Make room for your work.',hide:false},
 {at:37,id:'bottom',organized:true,style:'category',pack:'Fluent',edge:'bottom',open:null,kicker:'YOUR SPACE, YOUR WAY',title:'A calmer desktop.',body:'Everything within reach. Nothing in the way.',hide:false},
 {at:40,id:'outro',organized:true,style:'category',pack:'Fluent',edge:'bottom',open:null,kicker:'LUNADOCK FOR WINDOWS',title:'Room to breathe.',body:'Available on the Microsoft Store.',hide:false}
];

const STORY_TR = {
  intro:['LUNADOCK İLE TANIŞIN','Nefes alacak alan.','Her şey yerli yerinde. Her şey elinizin altında.'],
  clutter:['TANIDIK BİR MASAÜSTÜ','Ortalık biraz karışık.','Dosyalar. Klasörler. Birkaç tane fazla “son hali”.'],
  'clutter-copy':['TANIDIK BİR MASAÜSTÜ','Ortalık biraz karışık.','Biraz yer açalım.'],
  organize:['LUNADOCK İLE TANIŞIN','Dağınıklık toplandı.','Masaüstü dosyalarınız kendiliğinden düzenlenir.'],
  category:['HER ŞEYİN BİR YERİ VAR','Odağınızı bulun.','Resimler, belgeler, müzik. Her biri kendi yığınında.'],
  open:['BİR TIK UZAĞINIZDA','Aç. Bul. Devam et.','Dosyalarınız tam ihtiyaç duyduğunuz yerde.'],
  deck:['AKIŞ HİÇ DURMASIN','Daha çok dosya. Daha az yer.','Sade bir destede kaydırarak gezinin.'],
  preview:['YAKINDAN BAKIN','Hızlı bir bakış yeter.','İhtiyacınız olanı önizleyin, akışınızdan çıkmayın.'],
  glass:['SİZE GÖRE','Her ruh haline bir görünüm.','25 ikon paketinden birini seçin.'],
  pastel:['SİZE GÖRE','Yumuşak. Parlak. Sizin.','Aynı masaüstü, farklı bir karakter.'],
  aurora:['SİZE GÖRE','Biraz daha renk.','Kendinizi evinizde hissettiren tarzı bulun.'],
  right:['SİZİN ALANINIZ, SİZİN DÜZENİNİZ','Tarafınızı seçin.','Üst, alt, sol ya da sağ. İşinize yer açın.'],
  bottom:['SİZİN ALANINIZ, SİZİN DÜZENİNİZ','Daha sakin bir masaüstü.','Her şey elinizin altında. Hiçbir şey yolunuzda değil.'],
  outro:['WINDOWS İÇİN LUNADOCK','Nefes alacak alan.','Microsoft Store’da.']
};
function storyText(id){
  if(LANG==='tr'&&STORY_TR[id])return STORY_TR[id];
  if(id==='intro')return ['MEET LUNADOCK','Room to breathe.','Everything in its place. Everything within reach.'];
  const sc=scenes.find(x=>x.id===id);return [sc.kicker,sc.title,sc.body];
}
function seek(time,force=false) {
  state.time=Math.max(0,Math.min(42,Number(time)));state.story=true;
  const scene=scenes.filter(s=>s.at<=state.time).at(-1);
  if(scene.id!==lastScene||force){
    lastScene=scene.id;closePreview();
    update({organized:scene.organized,style:scene.style,pack:scene.pack,edge:scene.edge,open:scene.open,deck:scene.deck||0,group:'kind',overflow:'deck',wallpaper:'blue'});
    {const c=storyText(scene.id);setCopy(c[0],c[1],c[2],scene.hide);}
    if(scene.preview)preview(scene.preview);
    const cursor=$('#fake-cursor');cursor.style.opacity=scene.cursor?'1':'0';
    if(scene.cursor){
      const p=position(2);cursor.style.transform=`translate(${p.x+52}px,${scene.cursor==='deck'?p.y+430:p.y+40}px)`;
      cursor.classList.remove('click');clickTimers.forEach(clearTimeout);clickTimers=[];
      if(state.playing)clickTimers.push(setTimeout(()=>cursor.classList.add('click'),850));
    }
  }
  $('#timeline').value=state.time;$('#time').textContent=`00:${Math.floor(state.time).toString().padStart(2,'0')}`;
  const chapters=[0,7,14,24,34];const active=chapters.findLastIndex(t=>t<=state.time);
  $$('[data-time]').forEach((b,i)=>b.classList.toggle('active',i===active));
}
function tick(stamp) {
  if(!state.playing)return;
  if(lastStamp)seek(state.time+(stamp-lastStamp)/1000);
  lastStamp=stamp;
  if(state.time>=42){if(state.loop){lastScene='';seek(0);}else{pause();return;}}
  frame=requestAnimationFrame(tick);
}
function play() {
  if(state.playing){pause();return;}
  if(!state.story||state.time>=42){lastScene='';state.time=0;}
  state.playing=true;seek(state.time,true);lastStamp=0;$('#toggle-play').textContent='Ⅱ';$('#toggle-play').setAttribute('aria-label','Pause story');$('#play').innerHTML=EMBED?TXT.pause:'Ⅱ Pause the story <span>42 sec</span>';frame=requestAnimationFrame(tick);
}
function pause() {state.playing=false;cancelAnimationFrame(frame);lastStamp=0;clickTimers.forEach(clearTimeout);$('#toggle-play').textContent='▶';$('#toggle-play').setAttribute('aria-label','Play story');$('#play').innerHTML=EMBED?TXT.play:'▶ Play the story <span>42 sec</span>';}
function reset() {manual();closePreview();state.time=0;$('#timeline').value=0;$('#time').textContent='00:00';$$('[data-time]').forEach(b=>b.classList.remove('active'));update({organized:true,style:'category',pack:'Fluent',edge:'top',group:'kind',overflow:'deck',wallpaper:'blue',open:null,deck:0});}
function capture(on) {document.body.classList.toggle('capture',on??!document.body.classList.contains('capture'));resize();}
// ResizeObserver keeps the desktop geometry identical at every preview size.
function resize(){stage.style.transform=`scale(${$('.stage-shell').clientWidth/1920})`;}
$('#pack').innerHTML=packs.map(p=>`<option>${p}</option>`).join('');
$('#pack').addEventListener('change',e=>{manual();update({pack:e.target.value});});
$('#group').addEventListener('change',e=>{manual();update({group:e.target.value,open:null,deck:0});});
$('#overflow').addEventListener('change',e=>{manual();update({overflow:e.target.value,deck:0});});
$$('[data-action]').forEach(b=>b.addEventListener('click',()=>{manual();update({organized:b.dataset.action==='organize',open:null});}));
$$('button[data-style]').forEach(b=>b.addEventListener('click',()=>{manual();update({style:b.dataset.style});}));
$$('button[data-edge]').forEach(b=>b.addEventListener('click',()=>{manual();update({edge:b.dataset.edge,open:null});}));
$$('button[data-wallpaper]').forEach(b=>b.addEventListener('click',()=>{manual();update({wallpaper:b.dataset.wallpaper});}));
$('#stacks').addEventListener('click',e=>{const b=e.target.closest('[data-stack]');if(b){manual();openStack(b.dataset.stack);}});
$('#files').addEventListener('click',e=>{const b=e.target.closest('[data-file]');if(b){manual();preview(b.dataset.file);}});
$('#panel-files').addEventListener('click',e=>{const b=e.target.closest('[data-preview]');if(b){manual();if(state.overflow==='deck'&&Math.abs(Number(b.dataset.depth))>.01){bringCardIntoView(Number(b.dataset.index));}else preview(b.dataset.preview);}});
$('#panel').addEventListener('wheel',e=>{if(state.overflow==='wrap')return;e.preventDefault();manual();state.deck+=Math.sign(e.deltaY||e.deltaX)*(state.edge==='bottom'&&state.overflow==='deck'?-1:1);renderPanel();},{passive:false});
$('#close-panel').addEventListener('click',()=>{manual();update({open:null});});$('#close-preview').addEventListener('click',()=>{manual();closePreview();});
stage.addEventListener('click',e=>{if(e.target===stage||e.target.closest('.wallpaper')){manual();closePreview();update({open:null});}});
$('#capture').addEventListener('click',()=>capture());$('#play').addEventListener('click',play);$('#toggle-play').addEventListener('click',play);
$('#restart').addEventListener('click',()=>{pause();lastScene='';seek(0,true);});$('#reset').addEventListener('click',reset);
$('#timeline').addEventListener('input',e=>{pause();seek(e.target.value);});
$('#loop').addEventListener('click',()=>{state.loop=!state.loop;$('#loop').setAttribute('aria-pressed',state.loop);});
$$('[data-time]').forEach(b=>b.addEventListener('click',()=>{pause();seek(b.dataset.time,true);}));
document.addEventListener('keydown',e=>{
  if(['INPUT','SELECT','TEXTAREA'].includes(e.target.tagName)||e.target.isContentEditable)return;
  if(e.key==='Escape'){closePreview();update({open:null});capture(false);}
  if(e.key.toLowerCase()==='f')capture();
  if(e.key.toLowerCase()==='p'){e.preventDefault();play();}
  if(e.key.toLowerCase()==='r'){pause();lastScene='';seek(0,true);}
  if(e.code==='Space'){e.preventDefault();if(!$('#quicklook').hidden)closePreview();else if(state.open){const g=groups().find(g=>g.id===state.open);preview(state.selected||members(g)[state.deck].id);}}
});
new ResizeObserver(resize).observe($('.stage-shell'));
renderStacks();renderFiles();syncControls();resize();
// Public capture API for a future frame renderer. No desktop input is required.
window.LunaDockDemo=Object.freeze({duration:42,computeDeck,seek:time=>{pause();seek(time,true);},play,pause,reset,set:options=>{manual();update(options);},capture,getState:()=>({...state}),scenes:scenes.map(({at,id})=>({at,id}))});
const params=new URLSearchParams(location.search);
if(params.get('capture')==='1')capture(true);
if(params.has('t'))seek(Number(params.get('t'))||0,true);
if(params.get('autoplay')==='1')play();

if(EMBED){
  document.documentElement.lang=LANG;
  $$('[data-i18n]').forEach(el=>{el.textContent=TXT[el.dataset.i18n];});
  $$('[data-i18n-label]').forEach(el=>{el.setAttribute('aria-label',TXT[el.dataset.i18nLabel]);el.title=TXT[el.dataset.i18nLabel];});
  $('#play').innerHTML=TXT.play;
  {const c=storyText('intro');setCopy(c[0],c[1],c[2]);}
  if(params.get('autoplay')!=='0'){state.loop=true;play();}
}
