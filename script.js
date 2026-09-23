(() => {
  const root = document.documentElement;
  const themeToggle = document.getElementById('themeToggle');
  const menuToggle = document.getElementById('menuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const moreButton = document.getElementById('moreButton');

  const savedTheme = localStorage.getItem('central-theme');
  const preferredDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (savedTheme === 'dark' || (!savedTheme && preferredDark)) root.dataset.theme = 'dark';

  function syncThemeButton() {
    const dark = root.dataset.theme === 'dark';
    themeToggle.textContent = dark ? '☀' : '☾';
    themeToggle.setAttribute('aria-label', dark ? 'Ativar tema claro' : 'Ativar tema escuro');
  }
  syncThemeButton();

  themeToggle.addEventListener('click', () => {
    const dark = root.dataset.theme === 'dark';
    if (dark) delete root.dataset.theme; else root.dataset.theme = 'dark';
    localStorage.setItem('central-theme', dark ? 'light' : 'dark');
    syncThemeButton();
  });

  function setMenu(open) {
    mobileMenu.hidden = !open;
    menuToggle?.setAttribute('aria-expanded', String(open));
  }
  menuToggle?.addEventListener('click', () => setMenu(!mobileMenu.hidden));
  moreButton?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => setMenu(true), 350);
  });
  mobileMenu?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));

  const now = new Date();
  const dateLong = new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'long' }).format(now);
  document.getElementById('todayLabel').textContent = dateLong;
  document.getElementById('dayNumber').textContent = String(now.getDate()).padStart(2, '0');
  document.getElementById('dayMonth').textContent = new Intl.DateTimeFormat('pt-BR', { month: 'short' }).format(now).replace('.', '').toUpperCase();

  const storageKey = 'central-last-notebook';
  const continueTitle = document.getElementById('continueTitle');
  const continueText = document.getElementById('continueText');
  const continueIcon = document.getElementById('continueIcon');
  const continueLink = document.getElementById('continueLink');

  function renderLastNotebook(data) {
    if (!data?.name || !data?.url) return;
    continueTitle.textContent = data.name;
    continueText.textContent = 'Último acesso registrado neste aparelho.';
    continueIcon.textContent = data.icon || '📚';
    continueLink.href = data.url;
    continueLink.target = '_blank';
    continueLink.rel = 'noreferrer';
    continueLink.textContent = 'Continuar →';
    continueLink.classList.remove('disabled');
    continueLink.removeAttribute('aria-disabled');
  }

  try {
    const last = JSON.parse(localStorage.getItem(storageKey) || 'null');
    renderLastNotebook(last);
  } catch (_) {}

  document.querySelectorAll('.notebook-card').forEach(card => {
    const link = card.querySelector('.notebook-link');
    link.addEventListener('click', () => {
      const data = { name: card.dataset.name, url: card.dataset.url, icon: card.dataset.icon, at: Date.now() };
      localStorage.setItem(storageKey, JSON.stringify(data));
      renderLastNotebook(data);
    });
  });

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => navigator.serviceWorker.register('/sw.js').catch(() => {}));
  }
})();
