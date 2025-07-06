/* Zenix RGP – Script Aman */
document.addEventListener("DOMContentLoaded", () => {

  /* ========== THEME ========== */
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

  /* ========== SIDEBAR TOGGLE ========== */
  const side    = document.getElementById("side");
  const menuBtn = document.getElementById("menuBtn");
  menuBtn.onclick = () => {
    side.classList.toggle("closed");
    document.body.classList.toggle("sidebar-closed");
  };

  /* ========== NAVIGATION PAGES ========== */
  const pages = {
    home:       document.getElementById("homeSection"),
    func:       document.getElementById("funcSection"),
    downloader: document.getElementById("downloaderSection"),
    about:      document.getElementById("aboutSection")
  };

  function show(pageKey) {
    Object.values(pages).forEach(p => p.classList.add("hidden"));
    pages[pageKey].classList.remove("hidden");
    window.scrollTo({ top: 0 });
    if (pageKey === "func") renderBugs();
  }

  /* — link menu — */
  document.querySelectorAll(".sidebar a").forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      document.querySelectorAll(".sidebar a")
              .forEach(a => a.classList.toggle("active", a === link));
      show(link.dataset.page);
      side.classList.add("closed");
      document.body.classList.add("sidebar-closed");
    });
  });

  /* ========== FUNC BUG ========== */
  let bugsRendered = false;
  function renderBugs() {
    if (bugsRendered || typeof bugData === "undefined") return;
    const wrap = document.getElementById("bugContainer");
    bugData.forEach((b, i) => {
      wrap.insertAdjacentHTML(
        "beforeend",
        <div class="bug">
           <span>${b.title}</span>
           <button onclick="copyBug(${i})">Copy</button>
         </div>
      );
    });
    bugsRendered = true;
  }
  window.copyBug = i =>
    navigator.clipboard
      .writeText(atob(bugData[i].funcB64))
      .then(() => toast("✅ Copied!"))
      .catch(() => toast("Copy failed", true));

  /* ========== TikTok downloader demo ========== */
  window.dlTikTok = async () => {
    const url = document.getElementById("tiktokUrl").value.trim();
    const out = document.getElementById("tiktokResult");
    if (!url) return toast("Masukkan URL!", true);

    out.textContent = "Mengambil…";
    try {
      const api = https://r.jina.ai/http://api.tikmate.app/api/lookup?url=${encodeURIComponent(url)};
      const res = await fetch(api);
      const data = await res.json();
      if (!data.token) throw 0;
      const mp4 = https://tikmate.app/download/${data.token}/${data.id}.mp4;
      out.innerHTML = <a href="${mp4}" target="_blank">Download MP4</a>;
      toast("Berhasil!");
    } catch {
      out.textContent = "Gagal.";
      toast("❌ Error", true);
    }
  };

  /* ========== TOAST ========== */
  function toast(msg, err = false) {
    const box = document.getElementById("toastContainer");
    const d   = document.createElement("div");
    d.className = "toast";
    if (err) d.style.borderLeftColor = "red";
    d.textContent = msg;
    box.appendChild(d);
    setTimeout(() => { d.style.opacity = 0; setTimeout(() => d.remove(), 500); }, 2500);
  }

  /* init show home */
  show("home");
});