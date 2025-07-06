document.addEventListener("DOMContentLoaded",()=>{
  /* theme toggle */
  const themeBtn=themeToggle;
  if(localStorage.getItem("zenTheme")==="light"){
    document.body.classList.add("light");themeBtn.textContent="☀️";}
  themeBtn.onclick=()=>{
    const light=document.body.classList.toggle("light");
    themeBtn.textContent=light?"☀️":"🌙";
    localStorage.setItem("zenTheme",light?"light":"dark");
  };

  /* sidebar toggle */
  menuBtn.onclick=()=>{
    side.classList.toggle("closed");
    document.body.classList.toggle("sidebar-closed");
  };

  /* navigation */
  const pages={home:homeSection,func:funcSection,downloader:downloaderSection,about:aboutSection};
  function show(key){
    Object.values(pages).forEach(p=>p.classList.add("hidden"));
    (pages[key]||pages.home).classList.remove("hidden");
    window.scrollTo({top:0}); if(key==="func")renderBugs();
  }
  document.querySelectorAll(".sidebar a").forEach(a=>{
    a.onclick=e=>{
      e.preventDefault();
      document.querySelectorAll(".sidebar a").forEach(x=>x.classList.toggle("active",x===a));
      show(a.dataset.page);
      side.classList.add("closed");document.body.classList.add("sidebar-closed");
    };
  });

  /* func bug render */
  let rendered=false;
  function renderBugs(){
    if(rendered||typeof bugData==="undefined")return;
    bugData.forEach((b,i)=>{
      bugContainer.insertAdjacentHTML("beforeend",
        <div class="bug"><span>${b.title}</span><button onclick="cp(${i})">Copy</button></div>);
    });
    rendered=true;
  }
  window.cp=i=>navigator.clipboard.writeText(atob(bugData[i].funcB64))
    .then(()=>toast("✅ Copied")).catch(()=>toast("Copy failed",true));

  /* TikTok downloader demo */
  window.dlTikTok=async()=>{
    const url=tiktokUrl.value.trim();
    if(!url)return toast("Masukkan URL!",true);
    tiktokResult.textContent="Mengambil…";
    try{
      const r=await fetch(https://r.jina.ai/http://api.tikmate.app/api/lookup?url=${encodeURIComponent(url)});
      const d=await r.json(); if(!d.token) throw 0;
      const link=https://tikmate.app/download/${d.token}/${d.id}.mp4;
      tiktokResult.innerHTML=<a href="${link}" target="_blank">Download MP4</a>;
      toast("Berhasil!");
    }catch{tiktokResult.textContent="Gagal.";toast("❌ Error",true);}
  };

  function toast(msg,err=false){
    const div=document.createElement("div");div.className="toast";if(err)div.style.borderLeftColor="red";div.textContent=msg;
    toastContainer.appendChild(div);
    setTimeout(()=>{div.style.opacity=0;setTimeout(()=>div.remove(),500)},2500);
  }

  show("home");
});