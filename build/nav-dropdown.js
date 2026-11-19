// Header dropdown cards (desktop, 1024px and up). system.js keeps the phone sheet; this adds, per menu item:
// open on hover after 150ms, on click (a first click opens, a click on an open item follows its link) and on
// keyboard focus; close on mouse leave, Escape (focus goes back to the word) and a click outside. aria-expanded
// on the word, ArrowDown/Up/Home/End inside the role="menu" list. The look and the 150ms fade are in site.css.
const nav = document.querySelector('.nav');
const desk = matchMedia('(min-width: 1024px)');
const items = nav ? [...nav.querySelectorAll('.nav__item')].filter(i => i.querySelector('.nav__menu')) : [];

if (items.length) {
  nav.setAttribute('data-dd', '');
  let suppress = false;
  const linkOf = i => i.querySelector('.nav__link');
  const linksOf = i => [...i.querySelectorAll('.nav__menu a')];
  const isOpen = i => i.classList.contains('is-dd-open');

  const set = (item, on) => {
    if (on) items.forEach(o => o !== item && set(o, false));
    clearTimeout(item._t);
    if (on && !isOpen(item)) {
      // a card near the right edge opens right-aligned to its word instead of running off the screen
      item.classList.remove('dd-right');
      const r = item.querySelector('.nav__menu').getBoundingClientRect();
      if (r.right > innerWidth - 16) item.classList.add('dd-right');
    }
    item.classList.toggle('is-dd-open', on);
    if (desk.matches) linkOf(item).setAttribute('aria-expanded', String(on));
  };
  const closeAll = () => items.forEach(i => isOpen(i) && set(i, false));

  const aria = () => items.forEach(i => {
    const l = linkOf(i), m = i.querySelector('.nav__menu');
    if (desk.matches) { l.setAttribute('aria-haspopup', 'menu'); l.setAttribute('aria-controls', m.id); l.setAttribute('aria-expanded', String(isOpen(i))); }
    else { closeAll(); ['aria-haspopup', 'aria-controls', 'aria-expanded'].forEach(a => l.removeAttribute(a)); }
  });
  aria();
  desk.addEventListener('change', aria);

  items.forEach(item => {
    const link = linkOf(item);
    item.addEventListener('mouseenter', () => { if (!desk.matches) return; clearTimeout(item._t); item._t = setTimeout(() => set(item, true), 150); });
    item.addEventListener('mouseleave', () => { if (!desk.matches) return; clearTimeout(item._t); if (!item.contains(document.activeElement) || !document.activeElement.matches(':focus-visible')) set(item, false); });
    link.addEventListener('click', e => { if (!desk.matches || isOpen(item)) return; e.preventDefault(); set(item, true); });
    item.addEventListener('focusin', e => { if (!desk.matches || suppress) return; if (e.target.matches(':focus-visible') || e.target !== link) set(item, true); });
    item.addEventListener('focusout', e => { if (desk.matches && !item.contains(e.relatedTarget)) set(item, false); });
    item.addEventListener('keydown', e => {
      if (!desk.matches) return;
      const links = linksOf(item), at = links.indexOf(document.activeElement);
      const go = n => { e.preventDefault(); set(item, true); links[(n + links.length) % links.length].focus(); };
      if (e.key === 'Escape' && isOpen(item)) {
        e.stopPropagation(); e.preventDefault(); set(item, false);
        suppress = true; link.focus(); suppress = false;
      } else if (e.key === 'ArrowDown') go(at + 1);
      else if (e.key === 'ArrowUp') go(at < 0 ? -1 : at - 1);
      else if (e.key === 'Home' && at >= 0) go(0);
      else if (e.key === 'End' && at >= 0) go(-1);
    });
  });

  document.addEventListener('keydown', e => { if (e.key === 'Escape' && desk.matches) closeAll(); });
  document.addEventListener('pointerdown', e => { if (desk.matches) items.forEach(i => isOpen(i) && !i.contains(e.target) && set(i, false)); }, true);
}
