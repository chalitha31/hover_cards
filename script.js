
// --- Theme Switcher (replaces tweakpane) ---
(function() {
  // Create a simple dropdown for theme selection
  const themeSelect = document.createElement('select');
  themeSelect.style.position = 'fixed';
  themeSelect.style.top = '1rem';
  themeSelect.style.right = '1rem';
  themeSelect.style.zIndex = 1000;
  [
    { label: 'System', value: 'system' },
    { label: 'Light', value: 'light' },
    { label: 'Dark', value: 'dark' }
  ].forEach(opt => {
    const option = document.createElement('option');
    option.value = opt.value;
    option.textContent = opt.label;
    themeSelect.appendChild(option);
  });
  document.body.appendChild(themeSelect);

  // Set initial theme
  function setTheme(theme) {
    if (theme === 'system') {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', theme);
    }
  }
  themeSelect.addEventListener('change', function() {
    setTheme(this.value);
  });
  setTheme('system');
})();

// --- Card Animation Logic (unchanged) ---
const list = document.querySelector('ul');
const items = list.querySelectorAll('li');

function setIndex(event) {
  const closest = event.target.closest('li');
  if (closest) {
    const index = Array.from(items).indexOf(closest);
    const cols = Array.from({ length: list.children.length })
      .map((_, i) => {
        items[i].dataset.active = (index === i).toString();
        return index === i ? '10fr' : '1fr';
      })
      .join(' ');
    list.style.setProperty('grid-template-columns', cols);
  }
}

list.addEventListener('focus', setIndex, true);
list.addEventListener('click', setIndex);
list.addEventListener('pointermove', setIndex);

function resync() {
  const w = Math.max(...Array.from(items).map(i => i.offsetWidth));
  list.style.setProperty('--article-width', w);
}
window.addEventListener('resize', resync);
resync();
