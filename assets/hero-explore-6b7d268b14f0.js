// Keep the existing site's links and translator; refine only the hero presentation.
const navLabels={es:'Las motos',en:'The bikes',de:'Die Motorräder',fr:'Les motos',it:'Le moto'};
const intro={
 es:['Convierte tu móvil en un verdadero inclinómetro.','Personaliza tu experiencia con las motos que más te gusten.'],
 en:['Turn your phone into an inclinometer.','Make it your own with your favourite bikes.'],
 de:['Verwandle dein Smartphone in einen Neigungsmesser.','Gestalte die App mit deinen Lieblingsmotorrädern.'],
 fr:['Transformez votre téléphone en inclinomètre.','Personnalisez votre expérience avec vos motos préférées.'],
 it:['Trasforma il tuo telefono in un inclinometro.','Personalizza la tua esperienza con le moto che preferisci.']};
function setup(){
 const button=document.querySelector('.hero-buttons a.secondary[href="#motos"]'),paragraph=document.querySelector('.hero-copy .intro');if(!button||!paragraph)return false;
 if(!button.classList.contains('hero-explore-button')){
  button.classList.add('hero-explore-button');
  const label=document.createElement('span');label.className='hero-explore-label';for(const node of [...button.childNodes])if(node.nodeType===Node.TEXT_NODE)label.append(node);const arrow=button.querySelector(':scope > span:last-child');if(arrow)button.insertBefore(label,arrow);else button.append(label);
  const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');svg.setAttribute('viewBox','0 0 54 34');svg.setAttribute('fill','none');svg.setAttribute('stroke','currentColor');svg.setAttribute('stroke-width','2');svg.setAttribute('stroke-linecap','round');svg.setAttribute('stroke-linejoin','round');svg.setAttribute('aria-hidden','true');svg.setAttribute('focusable','false');svg.classList.add('hero-explore-bike');
  const shapes=[['circle',{cx:11,cy:24,r:7}],['circle',{cx:43,cy:24,r:7}],['circle',{cx:11,cy:24,r:2,'stroke-width':1.5}],['circle',{cx:43,cy:24,r:2,'stroke-width':1.5}],['path',{d:'M11 24h14l8-9M35 7l8 17M32 5h5l2 3M5 14h12l5 4M5 10l9 2 4 3M6 18a10 10 0 0 1 12 0M36 17a11 11 0 0 1 12 0'}],['path',{d:'M18 14c4-8 11-8 17-3l-5 8H20z',fill:'currentColor','stroke-width':1}],['path',{d:'M21 20h7l-2 4h-6z',fill:'currentColor','stroke-width':1}],['path',{d:'M14 26l10 3h9','stroke-width':2.5}]];
  for(const [name,attributes] of shapes){const shape=document.createElementNS(svg.namespaceURI,name);for(const [key,value]of Object.entries(attributes))shape.setAttribute(key,String(value));svg.append(shape)}
  const original=button.querySelector('svg');if(original)original.replaceWith(svg);else button.prepend(svg);
 }
 if(!paragraph.querySelector('.hero-intro-lines')){
  // Retain the original text nodes for the site's translation bookkeeping.
  const original=document.createElement('span');original.hidden=true;original.className='hero-intro-original';while(paragraph.firstChild)original.append(paragraph.firstChild);
  const lines=document.createElement('span');lines.className='hero-intro-lines';lines.setAttribute('data-no-translate','');lines.append(document.createElement('span'),document.createElement('span'));paragraph.append(original,lines);
 }
 function update(){const locale=document.documentElement.lang,lines=paragraph.querySelector('.hero-intro-lines').children;const phrases=intro[locale]||intro.es;for(let i=0;i<2;i++)if(lines[i].textContent!==phrases[i])lines[i].textContent=phrases[i];const nav=document.querySelector('header nav a[href="#motos"]');if(nav&&nav.textContent!==navLabels[locale])nav.textContent=navLabels[locale]||navLabels.es}
 new MutationObserver(update).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});document.addEventListener('leanbike:languagechange',update);update();return true;
}
if(!setup()){const wait=new MutationObserver(()=>{if(setup())wait.disconnect()});wait.observe(document.body,{childList:true,subtree:true})}
