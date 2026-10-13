// MaC Foundation — shared behavior
document.addEventListener('DOMContentLoaded', () => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  // mobile nav
  const btn = $('.menu-btn'), nav = $('nav.links');
  if (btn && nav) {
    btn.addEventListener('click', () => nav.classList.toggle('open'));
    $$('a', nav).forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));
  }

  // active nav link
  const path = location.pathname.split('/').pop() || 'index.html';
  $$('nav.links a').forEach(a => a.getAttribute('href') === path && a.classList.add('active'));

  // scroll reveal
  const items = $$('.reveal');
  if ('IntersectionObserver' in window && items.length) {
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    }), { threshold: 0.12 });
    items.forEach(el => io.observe(el));
  } else items.forEach(el => el.classList.add('in'));

  // progress bar, header shadow, back-to-top
  const bar = document.createElement('div'); bar.className = 'progress'; document.body.prepend(bar);
  const top = document.createElement('button'); top.className = 'to-top'; top.setAttribute('aria-label', 'Back to top'); top.textContent = '↑';
  top.onclick = () => scrollTo({ top: 0 }); document.body.append(top);
  const header = $('header.site');
  const onScroll = () => {
    const h = document.documentElement, max = h.scrollHeight - h.clientHeight;
    bar.style.width = (max > 0 ? (scrollY / max) * 100 : 0) + '%';
    header && header.classList.toggle('scrolled', scrollY > 20);
    top.classList.toggle('show', scrollY > 600);
  };
  addEventListener('scroll', onScroll, { passive: true }); onScroll();

  // hero spotlight follows the pointer
  const hero = $('.hero');
  if (hero) hero.addEventListener('pointermove', e => {
    const r = hero.getBoundingClientRect();
    hero.style.setProperty('--mx', (e.clientX - r.left) + 'px');
    hero.style.setProperty('--my', (e.clientY - r.top) + 'px');
  });

  // pillar explorer (tabs, arrow-key support)
  const tabs = $$('.tab');
  if (tabs.length) {
    const panel = $('.tabpanel');
    const show = t => {
      tabs.forEach(x => x.setAttribute('aria-selected', x === t));
      panel.innerHTML = `<h3>${t.dataset.title}</h3><p>${t.dataset.text}</p><div class="tags">${t.dataset.tags.split('|').map(s => `<span>${s}</span>`).join('')}</div>`;
    };
    tabs.forEach((t, i) => {
      t.onclick = () => show(t);
      t.onkeydown = e => {
        const d = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key];
        if (d) { e.preventDefault(); const n = tabs[(i + d + tabs.length) % tabs.length]; n.focus(); show(n); }
      };
    });
    show(tabs[0]);
  }

  // skill chips reveal a description
  const chips = $$('.chip[data-desc]');
  if (chips.length) {
    const out = $('.chip-out');
    chips.forEach(c => c.onclick = () => {
      const on = c.getAttribute('aria-pressed') === 'true';
      chips.forEach(x => x.setAttribute('aria-pressed', 'false'));
      if (on) { out.innerHTML = 'Select a skill to see what you will practise.'; return; }
      c.setAttribute('aria-pressed', 'true');
      out.innerHTML = `<b>${c.textContent}</b>${c.dataset.desc}`;
    });
  }

  // about-page stepper
  const steps = $$('.timeline .item');
  if (steps.length) {
    const tl = $('.timeline'), fill = document.createElement('span'); fill.className = 'fill'; tl.prepend(fill);
    const set = i => {
      steps.forEach((s, j) => { s.classList.toggle('active', j === i); s.classList.toggle('done', j < i); });
      fill.style.height = (steps[i].offsetTop + 30) + 'px';
    };
    steps.forEach((s, i) => { s.tabIndex = 0; s.onclick = () => set(i); s.onkeydown = e => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), set(i)); });
    set(0);
  }

  // skill filter (get involved)
  const q = $('#skill-filter');
  if (q) {
    const cards = $$('.grid .card'), count = $('.filter .count');
    q.oninput = () => {
      const v = q.value.trim().toLowerCase(); let n = 0;
      cards.forEach(c => { const m = c.textContent.toLowerCase().includes(v); c.classList.toggle('hidden', !m); n += m; });
      count.textContent = n + (n === 1 ? ' skill' : ' skills');
    };
  }

  // copy-to-clipboard
  $$('[data-copy]').forEach(b => b.onclick = async () => {
    try { await navigator.clipboard.writeText(b.dataset.copy); } catch (e) {}
    let t = $('.toast'); if (!t) { t = document.createElement('div'); t.className = 'toast'; t.setAttribute('role', 'status'); document.body.append(t); }
    t.textContent = 'Email address copied'; t.classList.add('show'); setTimeout(() => t.classList.remove('show'), 1800);
  });
});
