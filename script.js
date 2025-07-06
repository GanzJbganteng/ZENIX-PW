/* ===== elemen global ===== */
const sidebar = document.querySelector(".sidebar");
const bugList = document.getElementById("bugList");
const pageTitle = document.getElementById("pageTitle");

/* ===== mapping judul custom ===== */
const pageTitles = {
  home     : "Home",
  endpoints: "Endpoints",
  bugfree  : "Func Bug",   // ✔ judul atas sesuai keinginanmu
  settings : "Settings",
  about    : "About"
};

/* ===== render daftar bug (kode tersembunyi) ===== */
bugData.forEach((b, i) => {
  const li  = document.createElement("li");
  const st  = document.createElement("strong");
  st.textContent = b.title;

  const pre = document.createElement("pre");
  pre.className = "bug-code";
  pre.textContent = "// hidden • click Copy";

  const btn = document.createElement("button");
  btn.className = "copyBtn";
  btn.dataset.i = i;
  btn.textContent = "Copy";

  li.append(st, pre, btn);
  bugList.append(li);
});

/* copy handler */
bugList.addEventListener("click", e => {
  if (!e.target.classList.contains("copyBtn")) return;
  const idx  = e.target.dataset.i;
  const code = atob(bugData[idx].funcB64);
  navigator.clipboard.writeText(code)
        .then(()=>toast("Copied!"))
        .catch(()=>toast("Copy failed", true));
});

/* ===== page navigation ===== */
document.querySelectorAll(".sidebar a").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    document.querySelectorAll(".sidebar a").forEach(l => l.classList.remove("active"));
    link.classList.add("active");

    const page = link.dataset.page;
    document.querySelectorAll(".page").forEach(p => p.classList.add("hidden"));
    document.getElementById(`${page}Section`).classList.remove("hidden");

    /* set judul atas pakai kamus */
    pageTitle.textContent = pageTitles[page] || "Page";

    if (window.innerWidth <= 640) sidebar.classList.remove("open");
  });
});

/* ===== theme toggle ===== */
document.getElementById("themeToggle").addEventListener("click", () => {
  document.body.classList.toggle("light");
  toast(document.body.classList.contains("light") ? "Light mode" : "Dark mode");
});

/* ===== demo fetch ===== */
document.getElementById("sendBtn")?.addEventListener("click", async () => {
  const t = document.getElementById("textInput").value.trim();
  if (!t) return toast("Input kosong!", true);
  toast("Sending…");
  try {
    const res = await fetch("https://api.example.com/ai?text=" + encodeURIComponent(t));
    document.getElementById("output").textContent =
      JSON.stringify(await res.json(), null, 2);
  } catch (err) {
    document.getElementById("output").textContent = "// ERROR: " + err.message;
    toast("Fetch gagal", true);
  }
});

/* ===== toast & hamburger ===== */
function toast(msg, err = false) {
  const wrap = document.getElementById("toastContainer");
  const d = document.createElement("div");
  d.className = "toast";
  if (err) d.style.borderLeftColor = "red";
  d.textContent = msg;
  wrap.append(d);
  setTimeout(() => { d.style.opacity = 0; setTimeout(() => wrap.removeChild(d), 500); }, 3000);
}
document.getElementById("menuBtn").addEventListener("click", () =>
  sidebar.classList.toggle("open")
);
