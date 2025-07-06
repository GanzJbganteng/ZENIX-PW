/* ---- theme toggle ---- */
const btn = document.getElementById('themeBtn');
if (localStorage.getItem('rofikTheme') === 'light') {
  document.body.classList.add('light'); btn.textContent = '☀️';
}
btn.onclick = () => {
  document.body.classList.toggle('light');
  btn.textContent = document.body.classList.contains('light') ? '☀️' : '🌙';
  localStorage.setItem('rofikTheme', document.body.classList.contains('light') ? 'light' : 'dark');
};

/* ---- muncul saat discroll ---- */
document.querySelectorAll('[data-obs]').forEach(card => {
  const io = new IntersectionObserver(e => {
    if (e[0].isIntersecting) { card.classList.add('inview'); io.disconnect(); }
  }, { threshold: .2 });
  io.observe(card);
});

/* ---- render bug list ---- */
const cont = document.getElementById('bugContainer');
bugData.forEach((b, i) => {
  const div = document.createElement('div');
  div.className = 'bug';
  div.innerHTML = `<span>${b.title}</span>
                   <button onclick="copyBug(${i})">Copy</button>`;
  cont.append(div);
});

/* ---- copy func ---- */
function copyBug(i) {
  navigator.clipboard.writeText(atob(bugData[i].funcB64))
    .then(() => alert('Copied!'))
    .catch(() => alert('Copy failed'));
}

/* ---- scroll ke section ---- */
function gotoBug() {
  const sec = document.getElementById('funcBugSection');
  sec.classList.remove('hidden');
  window.scrollTo({ top: sec.offsetTop, behavior: 'smooth' });
}