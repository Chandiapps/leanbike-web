// Keep the existing site's links and translator; refine only the hero presentation.
const navLabels={es:'Las motos',en:'The bikes',de:'Die Motorräder',fr:'Les motos',it:'Le moto'};
const buttonLabels={es:'MOTOS',en:'BIKES',de:'MOTORRÄDER',fr:'MOTOS',it:'MOTO'};
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
  const label=document.createElement('span');label.className='hero-explore-label';label.setAttribute('data-no-translate','');for(const node of [...button.childNodes])if(node.nodeType===Node.TEXT_NODE)label.append(node);const arrow=button.querySelector(':scope > span:last-child');if(arrow)button.insertBefore(label,arrow);else button.append(label);
  const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');svg.setAttribute('viewBox','0 12 122 70');svg.setAttribute('fill','none');svg.setAttribute('stroke','currentColor');svg.setAttribute('stroke-width','2');svg.setAttribute('stroke-linecap','round');svg.setAttribute('stroke-linejoin','round');svg.setAttribute('aria-hidden','true');svg.setAttribute('focusable','false');svg.classList.add('hero-explore-bike');
  // Touring silhouette without mirror stalks: tank, fairing, seat and cast wheels.
  const shapes=[['circle',{cx:26,cy:61,r:16,'stroke-width':6}],['circle',{cx:97,cy:61,r:16,'stroke-width':6}],['circle',{cx:26,cy:61,r:4,fill:'currentColor',stroke:'none'}],['circle',{cx:97,cy:61,r:4,fill:'currentColor',stroke:'none'}],['path',{d:'M88 36 97 61','stroke-width':3.5}],['path',{d:'M13 31 35 33 48 39 59 39 52 45 32 40Z M8 44Q23 32 41 44L36 47Q22 40 10 49Z M82 50Q96 39 110 50Q95 45 87 54Z',fill:'currentColor',stroke:'none'}],['path',{d:'M43 34C49 23 63 22 74 30L82 23 79 15C88 18 94 26 95 36L88 39 89 44 82 49 75 63 55 63 43 51 32 44 53 49 64 39ZM85 27 92 33 87 33Z M50 32Q57 26 66 32L70 37 61 41Z',fill:'currentColor','fill-rule':'evenodd',stroke:'none'}],['path',{d:'M25 60 57 64 72 62M18 51 42 61 55 62','stroke-width':4}],['path',{d:'M49 44 59 47 66 44 61 58 53 58Z',fill:'currentColor',stroke:'none'}],['ellipse',{cx:62,cy:80,rx:58,ry:1.3,fill:'currentColor',stroke:'none',opacity:.4}]];
  for(const [name,attributes] of shapes){const shape=document.createElementNS(svg.namespaceURI,name);for(const [key,value]of Object.entries(attributes))shape.setAttribute(key,String(value));svg.append(shape)}
  const original=button.querySelector('svg');if(original)original.replaceWith(svg);else button.prepend(svg);
 }
 if(!paragraph.querySelector('.hero-intro-lines')){
  // Retain the original text nodes for the site's translation bookkeeping.
  const original=document.createElement('span');original.hidden=true;original.className='hero-intro-original';while(paragraph.firstChild)original.append(paragraph.firstChild);
  const lines=document.createElement('span');lines.className='hero-intro-lines';lines.setAttribute('data-no-translate','');lines.append(document.createElement('span'),document.createElement('span'));paragraph.append(original,lines);
 }
 function update(){const locale=document.documentElement.lang,lines=paragraph.querySelector('.hero-intro-lines').children;const phrases=intro[locale]||intro.es;for(let i=0;i<2;i++)if(lines[i].textContent!==phrases[i])lines[i].textContent=phrases[i];const nav=document.querySelector('header nav a[href="#motos"]');if(nav&&nav.textContent!==navLabels[locale])nav.textContent=navLabels[locale]||navLabels.es;const label=button.querySelector('.hero-explore-label');if(label.textContent!==buttonLabels[locale])label.textContent=buttonLabels[locale]||buttonLabels.es}
 new MutationObserver(update).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});document.addEventListener('leanbike:languagechange',update);update();return true;
}
if(!setup()){const wait=new MutationObserver(()=>{if(setup())wait.disconnect()});wait.observe(document.body,{childList:true,subtree:true})}
