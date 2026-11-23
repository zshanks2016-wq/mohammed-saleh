// شريط التنقل عند التمرير
const nav = document.getElementById('nav');
addEventListener('scroll', () => nav.classList.toggle('scrolled', scrollY > 30));

// قائمة الجوال
const burger = document.getElementById('burger'), links = document.getElementById('links');
burger.addEventListener('click', () => { burger.classList.toggle('open'); links.classList.toggle('open'); });
links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => { burger.classList.remove('open'); links.classList.remove('open'); }));

// تأثير الكتابة
const words = ['مصمم جرافيك', 'مصمم كليشيهات أكياس', 'مسوّق رقمي', 'صانع هويات بصرية'];
const typed = document.getElementById('typed');
let w = 0, c = 0, del = false;
(function type() {
  const word = words[w];
  typed.textContent = word.slice(0, c);
  if (!del && c < word.length) c++;
  else if (del && c > 0) c--;
  else { del = !del; if (!del) w = (w + 1) % words.length; return setTimeout(type, del ? 1600 : 300); }
  setTimeout(type, del ? 45 : 95);
})();

// الظهور عند التمرير + العدادات
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add('in');
  const t = e.target; setTimeout(() => t.style.transitionDelay = '0ms', 1300);
    e.target.querySelectorAll('[data-count]').forEach(countUp);
    io.unobserve(e.target);
  });
}, { threshold: .15 });
document.querySelectorAll('.reveal').forEach((el, i) => { el.style.transitionDelay = (i % 4) * 90 + 'ms'; io.observe(el); });

function countUp(el) {
  const end = +el.dataset.count, start = performance.now(), dur = 1800;
  (function tick(t) {
    const p = Math.min((t - start) / dur, 1);
    el.textContent = Math.floor(end * (1 - Math.pow(1 - p, 3)));
    if (p < 1) requestAnimationFrame(tick);
  })(start);
}

// إضاءة تتبع الماوس
const glow = document.querySelector('.cursor-glow');
addEventListener('pointermove', e => { glow.style.left = e.clientX + 'px'; glow.style.top = e.clientY + 'px'; });
document.querySelectorAll('.skill-card').forEach(card => card.addEventListener('pointermove', e => {
  const r = card.getBoundingClientRect();
  card.style.setProperty('--x', (e.clientX - r.left) + 'px');
  card.style.setProperty('--y', (e.clientY - r.top) + 'px');
}));

document.getElementById('year').textContent = new Date().getFullYear();
