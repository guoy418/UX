window.renderProductScope=(fig)=>{
const icons={report:'<rect x="28" y="10" width="64" height="76" rx="6"/><path d="M40 26h40M40 36h24M40 68V53m14 15V46m14 22V57m12 11V42"/>',trend:'<path d="M18 18v60h87M26 63l20-17 19 8 29-29"/><path d="M80 25h14v14"/>',budget:'<path d="M25 69a40 40 0 0 1 70 0M60 61l20-23M30 80h60"/><circle cx="60" cy="61" r="5"/>',visual:'<path d="M22 78V19M22 78h80M34 65h47M34 48h60M34 31h30"/>',alternative:'<rect x="18" y="24" width="34" height="49" rx="5"/><rect x="72" y="24" width="34" height="49" rx="5"/><path d="M26 38h18M80 38h18M56 50h12m-5-5 5 5-5 5M26 59h12M80 59h8"/>',personal:'<path d="M22 27h80M22 48h80M22 69h80"/><circle cx="43" cy="27" r="7"/><circle cx="82" cy="48" r="7"/><circle cx="55" cy="69" r="7"/>'};
const features=[
['report','智能消费洞察报告','整合一段时间或一次事件的消费，解释钱花在哪里、有哪些值得留意的变化。','重点深入设计'],
['trend','趋势分析','跟踪不同时间段的支出变化，帮助发现持续增加或变化明显的消费类别。','近期候选能力'],
['budget','个性化预算提示','结合财务状况与目标，提供日常预算安排的提示。','近期候选能力'],
['visual','消费数据可视化','用图表比较类别、观察趋势，让交易数据更容易理解。','重点深入设计'],
['alternative','更低成本的替代选择','针对经常购买或支出较多的项目，提供更便宜的替代选项。','近期候选能力'],
['personal','智能个性化支持','根据需要调整信息内容、表达语气和提醒频率，减少无关打扰。','近期候选能力']];
return `${window.renderScopeExplorer()}<div class="product-scope-intro"><h3>产品使用路径：从了解消费，到考虑下一步</h3><p>从查找交易，到理解消费、考虑下一步，再到核验与调整。以下按用户任务组织产品规划，说明各项能力如何一起发挥作用。</p></div><ol class="product-journey">${[['了解情况','我最近把钱花在哪里？','查询交易，获取智能消费洞察报告'],['发现变化','哪些支出值得留意？','通过可视化与趋势分析理解变化'],['考虑行动','接下来可以怎么安排？','查看预算提示或更低成本的替代选择'],['核验与调整','依据是什么？提醒适合我吗？','追溯交易，调整内容、语气与提醒频率']].map(([title,q,desc],i)=>`<li><span class="journey-step">${i+1}</span><h4>${title}</h4><p class="journey-question">${q}</p><p>${desc}</p></li>`).join('')}</ol><p class="scope-source">产品使用路径示意：根据项目功能规划整理，非真实用户行为轨迹或已验证的完整旅程图；用户可按需要进入任一环节。</p><div class="feature-examples-heading"><h3>代表性功能，一眼看懂</h3><p>以下六项候选能力，说明产品可以提供哪些帮助。</p></div><div class="scope-feature-grid">${features.map(([icon,title,desc,status])=>`<section class="scope-feature"><svg viewBox="0 0 124 96" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[icon]}</svg><h4>${title}</h4><p>${desc}</p></section>`).join('')}</div>`;
};

window.scopeGroups=[
['用户能力','帮助用户理解消费、规划支出并获得支持。',[
['消费洞察与规划','智能消费洞察报告','消费数据可视化','趋势分析','消费影响预测','生活事件预测','同类人群消费比较'],
['省钱与建议','个性化优惠','个性化预算提示','更低成本的替代选择','金融产品推荐','结合市场数据的建议','下一步行动建议'],
['使用支持','个性化追问建议','常见问题','多语言支持','语音交互','智能个性化支持','开放银行整合','经授权的 AI 代执行行动']]],
['技术支撑','让请求被正确理解，并连接所需的数据与服务。',[
['理解与分流','意图识别与功能匹配','模糊表达澄清','多问题识别','不相关请求分流'],
['连接与检测','API 集成','金融建议检测']]],
['交互设计','让帮助及时出现、依据可见，并保留用户控制权。',[
['主动与可控','主动推送','可调整的表达语气'],
['理解与追溯','洞察依据展示','交易追溯','趣味与功能性设计']]]];
window.renderScopeExplorer=()=>`<details class="scope-inventory" open><summary>完整产品边界一览</summary><div class="scope-explorer"><p>从用户功能、技术支撑与风险控制所需的交互设计三个层面查看候选范围。</p><div class="scope-switch" role="group" aria-label="候选范围分类">${window.scopeGroups.map((g,i)=>`<button type="button" data-scope-group="${i}" aria-pressed="${i===0}">${g[0]}</button>`).join('')}</div><div id="scope-explorer-panel"></div></div></details>`;
window.initScopeExplorer=()=>{const draw=i=>{const g=window.scopeGroups[i],p=document.querySelector('#scope-explorer-panel');p.innerHTML=`<p class="scope-group-description">${g[1]}</p><div class="scope-clusters">${g[2].map(group=>`<section><h4>${group[0]}</h4><ul>${group.slice(1).map(x=>`<li>${x}</li>`).join('')}</ul></section>`).join('')}</div>`;if(!matchMedia('(prefers-reduced-motion: reduce)').matches)p.animate([{opacity:.3,transform:'translateY(7px)'},{opacity:1,transform:'translateY(0)'}],{duration:240,easing:'ease-out'});};document.querySelectorAll('[data-scope-group]').forEach(b=>b.onclick=()=>{document.querySelectorAll('[data-scope-group]').forEach(x=>x.setAttribute('aria-pressed',x===b));draw(+b.dataset.scopeGroup);});draw(0);};
