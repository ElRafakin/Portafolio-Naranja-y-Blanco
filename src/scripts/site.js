function initNavigation() {
  const button = document.querySelector('.nav-toggle');
  const nav = document.getElementById('primary-nav');
  if (!button || !nav) return;
  button.addEventListener('click', () => {
    const isOpen = button.getAttribute('aria-expanded') === 'true';
    button.setAttribute('aria-expanded', String(!isOpen));
    nav.classList.toggle('is-open', !isOpen);
  });
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    button.setAttribute('aria-expanded', 'false');
    nav.classList.remove('is-open');
  }));
}
document.addEventListener('astro:page-load', initNavigation);
