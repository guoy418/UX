window.caseSections=[
['context','项目概览', [['research-start','已有产品与研究起点','.starting-point'],['research-questions','研究问题','.question-map'],['research-process','研究方法与流程','.research-process']]],
['position','产品如何定位',[['market-evidence','竞品与市场方向','竞品：从被动回答，走向主动支持'],['user-evidence','用户需求与 AI 顾虑','用户：需求与信任，要同时回应'],['segments','用户分群','.persona-figure'],['target-decision','目标人群取舍','#target-decision'],['personalized-support','个性化支持','.personalization-detail']]],
['scope','产品边界在哪',[['task-journey','用户任务路径','.product-scope-intro'],['feature-examples','六项代表性功能','.feature-examples-heading'],['capability-boundaries','范围与能力限制','.scope-boundaries'],['scope-evidence','边界的研究依据','.scope-evidence']]],
['priority','先发展什么',[['priority-method','功能评估方法','#priority .needs'],['priority-results','评分与重点功能','.score-panel'],['development-route','近期与长期路线','.roadmap']]],
['design','功能如何设计',[['design-interviews','14 场功能设计访谈','.design-method'],['report-design','智能消费洞察报告','.design-stories'],['chart-design','消费数据可视化','.visualization-reasoning'],['next-validation','后续验证','.validation-next']]]
];
window.initCaseNavigation=()=>{
 const aside=document.querySelector('.case-layout aside');
 for(const [, , children] of window.caseSections)for(const [id,,target] of children){const el=/^[.#]/.test(target)?document.querySelector(target):[...document.querySelectorAll('h3')].find(h=>h.textContent===target);if(el){el.id=id;el.classList.add('toc-target');}}
 aside.classList.add('case-toc');
 aside.innerHTML=`<button class="toc-mobile-toggle" aria-expanded="false" aria-controls="case-toc-panel"><span>章节目录</span><strong id="toc-current">项目概览</strong><span aria-hidden="true">⌄</span></button><div id="case-toc-panel"><p class="toc-caption">阅读目录</p><nav aria-label="项目章节">${window.caseSections.map(([id,title,children],i)=>`<div class="toc-group" data-chapter="${id}"><div class="toc-main"><a href="#${id}"><span>${i===0?'概览':String(i).padStart(2,'0')}</span>${title}</a><button class="toc-expand" aria-label="${title}的小节" aria-expanded="${i===0}" aria-controls="toc-${id}"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="m5 3 5 5-5 5"/></svg></button></div><ul id="toc-${id}" ${i===0?'':'hidden'}>${children.map(([anchor,label])=>`<li><a href="#${anchor}">${label}</a></li>`).join('')}</ul></div>`).join('')}</nav><a class="aside-return" href="/UX/#projects">← 返回项目列表</a></div>`;
 const mobile=aside.querySelector('.toc-mobile-toggle');
 const close=()=>{mobile.setAttribute('aria-expanded','false');aside.classList.remove('toc-mobile-open');};
 mobile.onclick=()=>{const open=mobile.getAttribute('aria-expanded')!=='true';mobile.setAttribute('aria-expanded',String(open));aside.classList.toggle('toc-mobile-open',open);};
 aside.addEventListener('keydown',e=>{if(e.key==='Escape'){close();mobile.focus();}});
 const setOpen=(group,open)=>{group.querySelector('.toc-expand').setAttribute('aria-expanded',String(open));group.querySelector('ul').hidden=!open;};
 aside.querySelectorAll('.toc-expand').forEach(b=>b.onclick=()=>setOpen(b.closest('.toc-group'),b.getAttribute('aria-expanded')!=='true'));
 aside.querySelectorAll('a').forEach(a=>a.addEventListener('click',e=>{
 if(a.getAttribute('href').startsWith('#')){const target=document.getElementById(a.hash.slice(1));if(target){e.preventDefault();close();const offset=document.querySelector('header').getBoundingClientRect().height+(matchMedia('(max-width:720px)').matches?64:24);history.replaceState(null,'',a.hash);window.scrollTo({top:window.scrollY+target.getBoundingClientRect().top-offset,behavior:'instant'});update();return;}}close();}));
 let lastChapter=null,queued=false;
 const update=()=>{queued=false;const threshold=document.querySelector('header').getBoundingClientRect().height+(matchMedia('(max-width:720px)').matches?73:38);let chapter=window.caseSections[0];for(const entry of window.caseSections){if(document.getElementById(entry[0]).getBoundingClientRect().top<=threshold)chapter=entry;}
 if(chapter[0]!==lastChapter&&!aside.matches(':hover')&&!aside.contains(document.activeElement)){aside.querySelectorAll('.toc-group').forEach(g=>setOpen(g,g.dataset.chapter===chapter[0]));lastChapter=chapter[0];}
 let active=chapter[0];for(const [id] of chapter[2]){if(document.getElementById(id)?.getBoundingClientRect().top<=threshold)active=id;}
 aside.querySelectorAll('nav a').forEach(a=>{const selected=a.hash==='#'+active;a.classList.toggle('active',selected);if(selected)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});
 aside.querySelectorAll('.toc-group').forEach(g=>g.classList.toggle('current-chapter',g.dataset.chapter===chapter[0]));
 document.getElementById('toc-current').textContent=chapter[1];};
 window.addEventListener('scroll',()=>{if(!queued){queued=true;requestAnimationFrame(update);}},{passive:true});window.addEventListener('resize',update);update();
 if(location.hash){const target=document.getElementById(decodeURIComponent(location.hash.slice(1)));if(target){let userMoved=false;const cancel=()=>{userMoved=true;};for(const event of ['wheel','touchstart','keydown'])window.addEventListener(event,cancel,{once:true,passive:true});const images=[...document.querySelectorAll('main img[src]')].filter(img=>img.compareDocumentPosition(target)&Node.DOCUMENT_POSITION_FOLLOWING);Promise.all(images.map(img=>{img.loading='eager';return img.decode().catch(()=>{});})).then(()=>requestAnimationFrame(()=>{if(!userMoved){target.scrollIntoView({behavior:'instant'});update();}for(const event of ['wheel','touchstart','keydown'])window.removeEventListener(event,cancel);}));}}
};
