/* ==== THEME ==== */
const tBtn = document.getElementById('themeBtn');
if (localStorage.getItem('rofikTheme') === 'light') {
  document.body.classList.add('light');
  tBtn.textContent = '☀️';
}
tBtn.onclick = () => {
  document.body.classList.toggle('light');
  tBtn.textContent = document.body.classList.contains('light') ? '☀️' : '🌙';
  localStorage.setItem('rofikTheme', document.body.classList.contains('light') ? 'light' : 'dark');
};

/* ==== Card scroll anim ==== */
document.querySelectorAll('[data-obs]').forEach(card => {
  const io = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      card.classList.add('inview');
      io.disconnect();
    }
  }, { threshold: .2 });
  io.observe(card);
});

/* ==== Render bug list ==== */
const list = document.getElementById('bugContainer');
bugData.forEach((b, i) => {
  const div = document.createElement('div');
  div.className = 'bug';
  div.innerHTML = `<span>${b.title}</span>
                   <button onclick="copyBug(${i})">Copy</button>`;
  list.append(div);
});

/* ==== Copy ==== */
function copyBug(i) {
  navigator.clipboard.writeText(atob(bugData[i].funcB64))
    .then(() => alert('Copied!'))
    .catch(() => alert('Copy failed'));
}

/* ==== Navigation ==== */
const homePage = document.getElementById('homePage');
const funcPage = document.getElementById('funcPage');

function gotoBug() {
  homePage.style.display = 'none';
  funcPage.style.display = 'block';
  window.scrollTo({ top: 0, behavior: 'instant' });
}

function backHome() {
  funcPage.style.display = 'none';
  homePage.style.display = 'block';
  window.scrollTo({ top: 0, behavior: 'instant' });
}
