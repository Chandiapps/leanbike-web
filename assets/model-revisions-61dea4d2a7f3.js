// Additive catalogue enhancement. Data belongs to each package's latest public revision.
const supported=['es','en','de','fr','it'];
const copy={
 es:{title:'Tu moto sigue mejorando.',intro:'Las motos con el distintivo de revisión han sido actualizadas, pulsa en la imagen para ver las mejoras.',changes:'Mejoras de esta revisión',language:'Idioma'},
 en:{title:'Your bike keeps getting better.',intro:'Bikes with a revision badge have been updated. Click the image to see the improvements.',changes:'What changed in this revision',language:'Language'},
 de:{title:'Dein Motorrad wird noch besser.',intro:'Motorräder mit einem Revisionshinweis wurden aktualisiert. Klicke auf das Bild, um die Verbesserungen zu sehen.',changes:'Verbesserungen dieser Revision',language:'Sprache'},
 fr:{title:'Votre moto continue de s’améliorer.',intro:'Les motos portant un badge de révision ont été mises à jour. Cliquez sur l’image pour découvrir les améliorations.',changes:'Améliorations de cette révision',language:'Langue'},
 it:{title:'La tua moto continua a migliorare.',intro:'Le moto con il badge di revisione sono state aggiornate. Premi sull’immagine per vedere i miglioramenti.',changes:'Miglioramenti di questa revisione',language:'Lingua'}};
const language=()=>supported.includes(document.documentElement.lang)?document.documentElement.lang:'es';
const text=(el,value)=>{if(el&&el.textContent!==value)el.textContent=value};
export function revisionNumber(row){const n=row?.publicRevision?.number;return Number.isInteger(n)&&n>=1?n:1}
export function revisionNote(row,locale){return revisionNumber(row)>1&&typeof row.publicRevision.notes?.[locale]==='string'?row.publicRevision.notes[locale]:''}
function start(rows){
 const catalog=document.querySelector('#catalog'),dialog=document.querySelector('#bike-preview');if(!catalog||!dialog)return false;
 let active=null,queued=false;
 const sameImage=(row,url)=>new URL(row.thumbnail,document.baseURI).href===url;
 const forButton=button=>{const url=button.dataset.preview||button.querySelector('img')?.src;const name=button.dataset.name;return rows.find(r=>sameImage(r,url)&&(!name||name===`${r.brand} ${r.model}`))||rows.find(r=>sameImage(r,url))};
 const surface=dialog.querySelector('.preview-surface');
 const block=document.createElement('div');block.className='model-revision-notes';block.setAttribute('data-no-translate','');block.hidden=true;
 const kicker=document.createElement('p');kicker.className='model-revision-kicker';const description=document.createElement('p');description.className='model-revision-description';block.append(kicker,description);
 const name=dialog.querySelector('.preview-name');if(name)name.after(block);else surface?.append(block);
 function update(){
  queued=false;const locale=language(),t=copy[locale];
  const heading=document.querySelector('#motos .section-heading h2');text(heading,t.title);const intro=heading?.parentElement?.querySelector('p:not(.eyebrow)');text(intro,t.intro);heading?.classList.add('revision-catalog-heading');intro?.classList.add('revision-catalog-intro');
  for(const button of catalog.querySelectorAll('.bike-image[data-preview]')){const row=forButton(button),number=revisionNumber(row);let badge=button.querySelector('.public-revision-badge');if(number>1){if(!badge){badge=document.createElement('span');badge.className='public-revision-badge';badge.setAttribute('data-no-translate','');button.append(badge)}text(badge,`Rev. ${number}`)}else badge?.remove()}
  if(dialog.open){const img=dialog.querySelector('img');if(img?.src&&(!active||!sameImage(active,img.src)))active=rows.find(r=>sameImage(r,img.src))||null}
  const note=revisionNote(active,locale);block.hidden=!note;if(note){text(kicker,t.changes);text(description,note)}
 }
 function schedule(){if(!queued){queued=true;requestAnimationFrame(update)}}
 catalog.addEventListener('click',event=>{const button=event.target.closest('.bike-image[data-preview]');if(button){active=forButton(button);schedule()}},true);
 new MutationObserver(schedule).observe(catalog,{childList:true,subtree:true});
 new MutationObserver(schedule).observe(dialog,{attributes:true,attributeFilter:['open']});
 new MutationObserver(schedule).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
 document.addEventListener('leanbike:languagechange',schedule);update();return true;
}
if(typeof document!=='undefined'){
 fetch(new URL('../data/catalog.json',import.meta.url),{cache:'no-store'}).then(r=>{if(!r.ok)throw Error('catalogue');return r.json()}).then(rows=>{if(start(rows))return;const wait=new MutationObserver(()=>{if(start(rows))wait.disconnect()});wait.observe(document.body,{childList:true,subtree:true})}).catch(()=>{/* Keep the existing catalogue usable if metadata cannot load. */});
}
