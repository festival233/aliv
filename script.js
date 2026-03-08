
document.querySelectorAll('.faqitem button').forEach(b=>b.addEventListener('click',()=>b.parentElement.classList.toggle('open')));
document.querySelectorAll('[data-filter-group]').forEach(g=>{
 const buttons=g.querySelectorAll('[data-filter]'); const target=document.querySelector(g.dataset.target); if(!target)return;
 const items=target.querySelectorAll('[data-category]');
 buttons.forEach(btn=>btn.addEventListener('click',()=>{buttons.forEach(x=>x.classList.remove('active'));btn.classList.add('active');const v=btn.dataset.filter;items.forEach(i=>{if(v==='all'||i.dataset.category.includes(v))i.classList.remove('hide');else i.classList.add('hide')})}))
});
document.getElementById('year')?.replaceChildren(document.createTextNode(new Date().getFullYear()));
