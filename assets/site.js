
(()=>{'use strict';
const toggle=document.querySelector('.menu-toggle'),nav=document.getElementById('mobile-nav');
function setMenu(open){nav.hidden=!open;toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Закрыть меню':'Открыть меню');}
toggle.addEventListener('click',()=>setMenu(toggle.getAttribute('aria-expanded')!=='true'));
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>setMenu(false)));
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!nav.hidden){setMenu(false);toggle.focus();}});
window.matchMedia('(min-width:901px)').addEventListener('change',e=>{if(e.matches)setMenu(false);});
document.querySelectorAll('.message-form').forEach(form=>{
 const card=form.closest('.request-card'),result=card.querySelector('.message-result'),preview=result.querySelector('.message-preview'),error=form.querySelector('.field-error'),wa=result.querySelector('.wa-send'),status=result.querySelector('.copy-status');
 let message='';
 form.addEventListener('submit',e=>{
  e.preventDefault();error.hidden=true;
  const invalid=Array.from(form.elements).find(el=>el.willValidate&&!el.checkValidity());
  if(invalid){error.textContent='Заполните поле «'+invalid.closest('label').childNodes[0].textContent.trim()+'».';error.hidden=false;invalid.focus();return;}
  const lines=['Здравствуйте! Обращаюсь с сайта LatAvto54.','Услуга: '+(new FormData(form).get('service')||form.dataset.service)];
  form.querySelectorAll('input,textarea').forEach(el=>{const v=el.value.trim();if(v){const label=el.closest('label').childNodes[0].textContent.trim();lines.push(label+': '+v);}});
  message=lines.join('\n');preview.textContent=message;wa.href='https://wa.me/79231319005?text='+encodeURIComponent(message);form.hidden=true;result.hidden=false;wa.focus();
 });
 result.querySelector('.edit-message').addEventListener('click',()=>{result.hidden=true;form.hidden=false;status.textContent='';form.querySelector('input,select,textarea').focus();});
 result.querySelector('.copy-message').addEventListener('click',async()=>{try{await navigator.clipboard.writeText(message);status.textContent='Текст скопирован.';}catch{status.textContent='Не удалось скопировать автоматически. Выделите текст сообщения и скопируйте его вручную.';}});
});})();
