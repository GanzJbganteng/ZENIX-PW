/* ====== Theme toggle ====== */
const themeBtn = document.getElementById('themeToggle');
if (localStorage.getItem('zenTheme') === 'light') { document.body.classList.add('light'); }
themeBtn.onclick = () => {
  document.body.classList.toggle('light');
  localStorage.setItem('zenTheme', document.body.classList.contains('light') ? 'light' : 'dark');
};

/* ====== Sidebar navigation ====== */
document.querySelectorAll('.sidebar a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    document.querySelectorAll('.sidebar a').forEach(a => a.classList.remove('active'));
    link.classList.add('active');
    const page = link.dataset.page;
    document.querySelectorAll('.page').forEach(sec => sec.classList.add('hidden'));
    document.getElementById(${page}Section).classList.remove('hidden');
    window.scrollTo({ top: 0 });
    if (page === 'func') renderBugs();
  });
});

/* ====== Render Func Bug list (once) ====== */
let bugsRendered = false;
function renderBugs() {
  if (bugsRendered) return;
  const wrap = document.getElementById('bugContainer');
  bugData.forEach((b, i) => {
    const div = document.createElement('div');
    div.className = 'bug';
    div.innerHTML = <span>${b.title}</span>
                     <button onclick="copyBug(${i})">Copy</button>;
    wrap.appendChild(div);
  });
  bugsRendered = true;
}
window.copyBug = function (i) {
  navigator.clipboard.writeText(atob(bugData[i].funcB64))
    .then(() => toast('Copied!'))
    .catch(() => toast('Copy failed', true));
};

/* ====== Downloader TikTok (DEMO) ====== */
window.dlTikTok = async () => {
  const url = document.getElementById('tiktokUrl').value.trim();
  const out = document.getElementById('tiktokResult');
  if (!url) { toast('URL kosong!', true); return; }
  out.textContent = 'Fetching…';
  try {
    /* Contoh pakai API publik Tikmate (mungkin butuh CORS proxy) */
    const res = await fetch(https://r.jina.ai/http://api.tikmate.app/api/lookup?url=${encodeURIComponent(url)});
    const data = await res.json();
    if (!data.video || !data.token) throw new Error('invalid link');
    const mp4 = https://tikmate.app/download/${data.token}/${data.id}.mp4;
    out.innerHTML = <a href="${mp4}" target="_blank">Download MP4</a>;
    toast('Link siap!');
  } catch (err) {
    out.textContent = 'Gagal. API mungkin diblokir.';
    toast('Download gagal', true);
  }
};

/* ====== Toast helper ====== */
function toast(msg, err = false) {
  const wrap = document.getElementById('toastContainer');
  const div = document.createElement('div');
  div.className = 'toast';
  if (err) div.style.borderLeftColor = 'red';
  div.textContent = msg;
  wrap.appendChild(div);
  setTimeout(() => { div.style.opacity = 0; setTimeout(() => wrap.removeChild(div), 500); }, 2500);
}