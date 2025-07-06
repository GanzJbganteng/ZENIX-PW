/* Zenix RGP – Main Script */
document.addEventListener("DOMContentLoaded", () => {

  /* === THEME === */
  const themeBtn = document.getElementById("themeToggle");
  if (localStorage.getItem("zenTheme") === "light") {
    document.body.classList.add("light");
    themeBtn.textContent = "☀️";
  }
  themeBtn.onclick = () => {
    const light = document.body.classList.toggle("light");
    themeBtn.textContent = light ? "☀️" : "🌙";
    localStorage.setItem("zenTheme", light ? "light" : "dark");
  };

  /* === SIDEBAR TOGGLE === */
  const side   = document.getElementById("side");
  const menuBtn= document.getElementById("menuBtn");
  menuBtn.onclick = () => {
    side.classList.toggle("closed");
    document.body.classList.toggle("sidebar-closed");
  };

  /* === NAVIGATION === */
  const pages = {
    home:       document.getElementById("homeSection"),
    func:       document.getElementById("funcSection"),
    downloader: document.getElementById("downloaderSection"),
    about:      document.getElementById("aboutSection")
  };
  function showPage(key){
    Object.values(pages).forEach(p=>p.classList.add("hidden"));
    (pages[key]||pages.home).classList.remove("hidden");
    window.scrollTo({top:0});
    if(key==="func") renderBugs();
  }
  document.querySelectorAll(".sidebar a").forEach(link=>{
    link.addEventListener("click",e=>{
      e.preventDefault();
      const key = link.dataset.page;
      document.querySelectorAll(".sidebar a").forEach(a=>a.classList.toggle("active",a===link));
      showPage(key);
      // auto hide sidebar on mobile
      side.classList.add("closed");
      document.body.classList.add("sidebar-closed");
    });
  });

  /* === FUNC BUG === */
  let rendered = false;
  function renderBugs(){
    if(rendered) return;
    if(typeof bugData==="undefined"){ toast("bugData undefined",true); return; }
    const wrap=document.getElementById("bugContainer");
    bugData.forEach((b,i)=>{
      const div=document.createElement("div");
      div.className="bug";
      div.innerHTML=<span>${b.title}</span><button onclick="copyBug(${i})">Copy</button>;
      wrap.appendChild(div);
    });
    rendered=true;
  }
  window.copyBug = i=>{
    navigator.clipboard.writeText(atob(bugData[i].funcB64))
      .then(()=>toast("✅ Copied"))
      .catch(()=>toast("Copy failed",true));
  };

  /* === TikTok Downloader (demo) === */
  window.dlTikTok = async ()=>{
    const url=document.getElementById("tiktokUrl").value.trim();
    const out=document.getElementById("tiktokResult");
    if(!url){ toast("Masukkan URL!",true); return; }
    out.textContent="Mengambil…";
    try{
      const api=https://r.jina.ai/http://api.tikmate.app/api/lookup?url=${encodeURIComponent(url)};
      const res=await fetch(api); const data=await res.json();
      if(!data.token) throw new Error("invalid");
      const mp4=https://tikmate.app/download/${data.token}/${data.id}.mp4;
      out.innerHTML=<a href="${mp4}" target="_blank">Download MP4</a>;
      toast("Berhasil!");
    }catch{
      out.textContent="Gagal mengambil.";
      toast("❌ Error",true);
    }
  };

  /* === TOAST === */
  function toast(msg,err=false){
    const box=document.getElementById("toastContainer");
    const div=document.createElement("div");
    div.className="toast"; if(err) div.style.borderLeftColor="red";
    div.textContent=msg; box.appendChild(div);
    setTimeout(()=>{div.style.opacity=0;setTimeout(()=>box.removeChild(div),500)},2500);
  }

  /* init */
  showPage("home");
});