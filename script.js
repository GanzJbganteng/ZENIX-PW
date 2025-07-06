/* ==========================================
   Zenix RGP – Main Script
   - Safe load (DOMContentLoaded)
   - Sidebar navigation stable
   - Func Bug render once
   - TikTok downloader demo
   ========================================== */
document.addEventListener("DOMContentLoaded", () => {
  /* ---- THEME ---- */
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

  /* ---- NAVIGATION ---- */
  const pages = {
    home:        document.getElementById("homeSection"),
    func:        document.getElementById("funcSection"),
    downloader:  document.getElementById("downloaderSection"),
    about:       document.getElementById("aboutSection")
  };

  function showPage(key) {
    Object.values(pages).forEach(sec => sec.classList.add("hidden"));
    (pages[key] || pages.home).classList.remove("hidden");
    window.scrollTo({ top: 0 });
    if (key === "func") renderBugs();
  }

  document.querySelectorAll(".sidebar a").forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const page = link.dataset.page;
      document
        .querySelectorAll(".sidebar a")
        .forEach(a => a.classList.toggle("active", a === link));
      showPage(page);
    });
  });

  /* ---- FUNC BUG RENDER ---- */
  let bugsRendered = false;
  function renderBugs() {
    if (bugsRendered) return;
    if (typeof bugData === "undefined") {
      toast("⚠️ bugData belum ada", true);
      return;
    }
    const wrap = document.getElementById("bugContainer");
    bugData.forEach((b, i) => {
      const div = document.createElement("div");
      div.className = "bug";
      div.innerHTML = <span>${b.title}</span>
                       <button onclick="copyBug(${i})">Copy</button>;
      wrap.appendChild(div);
    });
    bugsRendered = true;
  }

  window.copyBug = i => {
    navigator.clipboard
      .writeText(atob(bugData[i].funcB64))
      .then(() => toast("✅ Copied!"))
      .catch(() => toast("❌ Copy gagal", true));
  };

  /* ---- TikTok downloader demo ---- */
  window.dlTikTok = async () => {
    const urlInp = document.getElementById("tiktokUrl");
    const out    = document.getElementById("tiktokResult");
    const url    = urlInp.value.trim();
    if (!url) return toast("Masukkan URL!", true);

    out.textContent = "Mengambil…";
    try {
      const api = https://r.jina.ai/http://api.tikmate.app/api/lookup?url=${encodeURIComponent(
        url
      )};
      const res  = await fetch(api);
      const data = await res.json();
      if (!data.token) throw new Error("Invalid link");
      const mp4 = https://tikmate.app/download/${data.token}/${data.id}.mp4;
      out.innerHTML = <a href="${mp4}" target="_blank">Download MP4</a>;
      toast("Berhasil!");
    } catch (err) {
      out.textContent = "Gagal mengambil.";
      toast("❌ Error mengambil video", true);
    }
  };

  /* ---- TOAST ---- */
  function toast(msg, err = false) {
    const box = document.getElementById("toastContainer");
    const div = document.createElement("div");
    div.className = "toast";
    if (err) div.style.borderLeftColor = "red";
    div.textContent = msg;
    box.appendChild(div);
    setTimeout(() => {
      div.style.opacity = 0;
      setTimeout(() => box.removeChild(div), 500);
    }, 2500);
  }

  /* ---- INIT: show home by default ---- */
  showPage("home");
});