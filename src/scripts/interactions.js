import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let motionCtx;
let filterEvents;

function cleanupMotion() {
  filterEvents?.abort();
  filterEvents = undefined;
  motionCtx?.revert();
  motionCtx = undefined;
}

function initWorkFilters(reduceMotion, signal) {
  const grid = document.getElementById('work-grid');
  if (!grid) return;

  const buttons = [...document.querySelectorAll('.filter-button')];
  const cards = [...grid.querySelectorAll('.zigzag-card')];

  buttons.forEach((button) => {
    button.addEventListener(
      'click',
      () => {
        const category = button.dataset.filter;

        buttons.forEach((item) => {
          const selected = item === button;
          item.classList.toggle('is-active', selected);
          item.setAttribute('aria-pressed', String(selected));
        });

        const visibleCards = [];
        cards.forEach((card) => {
          const matches =
            category === 'all' ||
            card.dataset.category === category ||
            card.dataset.category === 'both';
          card.hidden = !matches;
          if (matches) visibleCards.push(card);
        });

        if (!reduceMotion && visibleCards.length) {
          gsap.fromTo(
            visibleCards,
            { autoAlpha: 0, y: 16 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.42,
              stagger: 0.08,
              ease: 'power2.out',
              overwrite: true,
              clearProps: 'opacity,visibility,transform',
            }
          );
        }

        ScrollTrigger.refresh();
      },
      { signal }
    );
  });
}

function initMotion() {
  cleanupMotion();

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  filterEvents = new AbortController();
  initWorkFilters(reduceMotion, filterEvents.signal);

  if (reduceMotion) return;

  motionCtx = gsap.context(() => {
    // 1. Hero Entry (420ms ease-out, 80ms stagger per design.md)
    const heroItems = gsap.utils.toArray('.bold-hero [data-reveal]');
    if (heroItems.length) {
      gsap.from(heroItems, {
        autoAlpha: 0,
        y: 16,
        duration: 0.42,
        stagger: 0.08,
        ease: 'power2.out',
        clearProps: 'opacity,visibility,transform',
      });
    }

    // 2. Scroll Reveals (Fade + translateY 16px -> 0 over 420ms ease-out)
    const revealItems = gsap.utils.toArray('[data-reveal]').filter(
      (el) => !el.closest('.bold-hero')
    );

    revealItems.forEach((el) => {
      const isCard = el.matches('.zigzag-card, .service-row-card, .case-gallery-item, .detail-card');
      const delay = isCard ? (Number(el.style.getPropertyValue('--card-index') || 0) % 2) * 0.08 : 0;

      gsap.from(el, {
        autoAlpha: 0,
        y: 16,
        duration: 0.42,
        delay,
        ease: 'power2.out',
        clearProps: 'opacity,visibility,transform',
        scrollTrigger: {
          trigger: el,
          start: 'top 90%',
          once: true,
        },
      });
    });
  }, document.querySelector('main') || document.body);
}

document.addEventListener('astro:page-load', initMotion);
document.addEventListener('astro:before-swap', cleanupMotion);
