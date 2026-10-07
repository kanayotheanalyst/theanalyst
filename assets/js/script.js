(function(){
var d=portfolioData,$=function(s){return document.querySelector(s)};
function esc(s){var e=document.createElement("div");e.textContent=s;return e.innerHTML}
function list(a){return "<ul>"+a.map(function(x){return "<li>"+esc(x)+"</li>"}).join("")+"</ul>"}
document.querySelectorAll("[data-bind]").forEach(function(n){var k=n.dataset.bind;n.textContent=k==="initials"?d.name.split(" ").map(function(w){return w[0]}).join(""):d[k]});
document.querySelectorAll("[data-bind-href]").forEach(function(n){n.href=d[n.dataset.bindHref]});
$("#yrs").textContent=d.years;$("#yr").textContent=new Date().getFullYear();
if(d.about)$("#about-long").textContent=d.about;
$("#c-mail").href="mailto:"+d.email;$("#c-mail").textContent=d.email;$("#c-tel").href="tel:"+d.phone;$("#c-tel").textContent=d.phone;$("#c-loc").textContent=d.location;
$("#timeline").innerHTML=d.experience.map(function(j){return '<article class="job"><h3>'+esc(j.role)+'</h3><p class="meta">'+esc(j.company)+" · "+esc(j.location)+" · "+esc(j.dates)+'</p><p>'+esc(j.summary)+'</p>'+list(j.achievements)+'<p><strong>Impact:</strong> '+esc(j.impact)+'</p><p class="tools-line">'+esc(j.tools)+'</p></article>'}).join("");
$("#skillgrid").innerHTML=Object.keys(d.skills).map(function(k){return '<div class="card"><h3>'+esc(k)+'</h3><ul class="chips">'+d.skills[k].map(function(s){return "<li>"+esc(s)+"</li>"}).join("")+"</ul></div>"}).join("");
$("#projectgrid").innerHTML=d.projects.map(function(p,i){return '<article class="card proj reveal"><div class="img"><img src="'+p.image+'" alt="" loading="lazy" onerror="this.remove()"><span>Add project image</span></div><div class="body"><p class="cat">'+esc(p.category)+'</p><h3>'+esc(p.name)+'</h3><p class="muted">'+esc(p.short)+'</p><p class="tools-line muted">'+esc(p.tools)+'</p><ul class="chips">'+p.skills.map(function(s){return "<li>"+esc(s)+"</li>"}).join("")+'</ul><button class="btn small" data-i="'+i+'">View Case Study</button></div></article>'}).join("");
var dlg=$("#case");
$("#projectgrid").addEventListener("click",function(e){var b=e.target.closest("button[data-i]");if(!b)return;var p=d.projects[b.dataset.i];
$("#case-body").innerHTML='<button class="close" aria-label="Close">✕</button><p class="muted">'+esc(p.category)+'</p><h2 id="case-title">'+esc(p.name)+'</h2><h3>Business Problem</h3><p>'+esc(p.problem)+'</p><h3>Objective</h3><p>'+esc(p.objective)+'</p><h3>Approach</h3><p>'+esc(p.approach)+'</p><h3>Analysis</h3>'+list(p.analysis)+'<h3>Findings</h3>'+list(p.findings)+'<h3>Recommendations</h3>'+list(p.recommendations)+'<h3>Outcome</h3><p>'+esc(p.outcome)+'</p><h3>Business Impact</h3><p>'+esc(p.impact)+'</p>'+(p.doc?'<p><a class="btn small" href="'+p.doc+'" target="_blank" rel="noopener">View supporting document</a></p>':"");
dlg.showModal()});
dlg.addEventListener("click",function(e){if(e.target===dlg||e.target.classList.contains("close"))dlg.close()});
var mb=$("#burger"),mn=$("#menu");mb.onclick=function(){var o=mn.classList.toggle("open");mb.setAttribute("aria-expanded",o)};
mn.addEventListener("click",function(e){if(e.target.tagName==="A"){mn.classList.remove("open");mb.setAttribute("aria-expanded",false)}});
$("#theme").onclick=function(){var r=document.documentElement,cur=r.dataset.theme||(matchMedia("(prefers-color-scheme:dark)").matches?"dark":"light"),n=cur==="dark"?"light":"dark";r.dataset.theme=n;try{localStorage.setItem("theme",n)}catch(e){}};
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}})},{threshold:.08});
document.querySelectorAll(".reveal").forEach(function(n){io.observe(n)});
var f=$("#form"),st=$("#status");f.action=d.formspreeEndpoint;
f.addEventListener("submit",function(e){e.preventDefault();var ok=true;
f.querySelectorAll("[required]").forEach(function(i){var bad=!i.value.trim()||(i.type==="email"&&!/^\S+@\S+\.\S+$/.test(i.value));i.setAttribute("aria-invalid",bad);if(bad)ok=false});
if(!ok){st.textContent="Please complete all fields with a valid email.";return}
var b=f.querySelector("button");b.disabled=true;st.textContent="Sending…";
fetch(f.action,{method:"POST",body:new FormData(f),headers:{Accept:"application/json"}}).then(function(r){if(!r.ok)throw 0;f.reset();st.textContent="Thank you! Your message has been sent."}).catch(function(){st.textContent="Sorry, something went wrong. Please email me directly."}).finally(function(){b.disabled=false})});
})();
