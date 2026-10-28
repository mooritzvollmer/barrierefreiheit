import './src/guide.css'

const $=s=>document.querySelector(s),dialog=$('#settings-dialog')
$('#openModal').hidden=false
$('.faq-toolbar').hidden=false
$('#openModal').addEventListener('click',()=>dialog.showModal())
for(const[id,className]of [['darkMode','dark-mode'],['easyLanguage','easy-language'],['largeText','large-text']])$('#'+id).addEventListener('change',event=>{document.body.classList.toggle(className,event.target.checked)})
dialog.addEventListener('close',()=>$('#openModal').focus())
dialog.addEventListener('click',event=>{if(event.target!==dialog)return;const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close()})

const demoButtons=[...document.querySelectorAll('[data-demo]')]
$('#start-demo').addEventListener('click',()=>demoButtons[0].focus())
for(const button of demoButtons){button.addEventListener('focus',()=>{$('#demo-status').textContent='Fokus auf „'+button.dataset.demo+'“. Mit Tab weiter, mit Enter aktivieren.'});button.addEventListener('click',()=>{$('#demo-status').textContent='„'+button.dataset.demo+'“ wurde aktiviert.'})}

const details=[...document.querySelectorAll('.faq-list details')],search=$('#faq-search'),expand=$('#expand-faq'),normalize=text=>text.toLocaleLowerCase('de').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replaceAll('ß','ss')
const index=new Map(details.map(item=>[item,normalize(item.textContent)]));let beforeSearch=null
function visibleDetails(){return details.filter(item=>!item.hidden)}
function updateExpand(){const visible=visibleDetails(),allOpen=visible.length>0&&visible.every(item=>item.open);expand.disabled=visible.length===0;expand.textContent=allOpen?'Alle schließen':'Alle aufklappen';expand.setAttribute('aria-expanded',String(allOpen))}
function filterQuestions(){const query=normalize(search.value.trim()).slice(0,120);if(query&&!beforeSearch)beforeSearch=new Map(details.map(item=>[item,item.open]));for(const item of details){item.hidden=query!==''&&!index.get(item).includes(query);if(query&&!item.hidden)item.open=true;else if(!query&&beforeSearch)item.open=beforeSearch.get(item)}if(!query)beforeSearch=null;const count=visibleDetails().length;$('#faq-status').textContent=count===0?'Keine passende Frage gefunden.':count+' '+(count===1?'Frage':'Fragen');$('#faq-empty').hidden=count>0;$('#clear-search').hidden=!query;updateExpand()}
search.addEventListener('input',filterQuestions)
$('#clear-search').addEventListener('click',()=>{search.value='';filterQuestions();search.focus()})
expand.addEventListener('click',()=>{const visible=visibleDetails(),open=!visible.every(item=>item.open);for(const item of visible)item.open=open;updateExpand()})
for(const item of details)item.addEventListener('toggle',updateExpand)

const links=[...document.querySelectorAll('.contents a')],chapters=[...document.querySelectorAll('.chapter')]
function setCurrent(id){for(const link of links){if(link.hash==='#'+id)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current')}}
if('IntersectionObserver' in window){const positions=new Map();const observer=new IntersectionObserver(entries=>{for(const entry of entries)positions.set(entry.target.id,entry.isIntersecting);const first=chapters.find(item=>positions.get(item.id));if(first)setCurrent(first.id)},{rootMargin:'-5% 0px -55% 0px',threshold:0});chapters.forEach(item=>observer.observe(item))}
function revealHash(){let id;try{id=decodeURIComponent(location.hash.slice(1))}catch{return}const aliases={'verständlich':'verstaendlich','first':'frage-bfsg','panelFirst':'frage-bfsg','products-panel':'frage-angebote','services-panel':'frage-angebote','scope-panel':'frage-kleinstunternehmen','enforcement-panel':'recht'};const target=document.getElementById(aliases[id]||id);if(!target)return;if(target.tagName==='DETAILS')target.open=true;if(aliases[id])target.scrollIntoView({behavior:'auto',block:'start'})}
window.addEventListener('hashchange',revealHash);revealHash()
