(function() {
  const themes = [
    {id: null,        name: 'Cinema'},
    {id: 'notte',     name: 'Notte'},
    {id: 'carbone',   name: 'Carbone'},
    {id: 'foresta',   name: 'Foresta'},
    {id: 'prugna',    name: 'Prugna'},
    {id: 'carta',     name: 'Carta'},
    {id: 'giorno',    name: 'Giorno'}
  ];
  
  // Applica immediatamente il tema per evitare sfarfallii
  let currentThemeId = null;
  try {
    currentThemeId = localStorage.getItem('g9-theme');
  } catch(e) {}
  
  let ti = themes.findIndex(t => t.id === currentThemeId);
  if (ti === -1) ti = 0;
  const theme = themes[ti];
  if (theme.id) document.documentElement.setAttribute('data-theme', theme.id);

  window.addEventListener('DOMContentLoaded', () => {
    if (theme.id) document.body.setAttribute('data-theme', theme.id);
    const nameEl = document.querySelector('#themeBtn .lbl-name');
    if (nameEl) nameEl.textContent = theme.name;
    const btn = document.getElementById('themeBtn');
    
    if (btn) {
      btn.addEventListener('click', () => {
        ti = (ti + 1) % themes.length;
        const t = themes[ti];
        if (t.id) {
          document.body.setAttribute('data-theme', t.id);
          document.documentElement.setAttribute('data-theme', t.id);
        } else {
          document.body.removeAttribute('data-theme');
          document.documentElement.removeAttribute('data-theme');
        }
        try {
          localStorage.setItem('g9-theme', t.id);
        } catch(e) {}
        if (nameEl) nameEl.textContent = t.name;
      });
    }

    // Highlight menu link based on current path
    const navLinks = document.querySelectorAll('.global-nav a');
    const path = window.location.pathname;
    const filename = path.split('/').pop() || 'index.html';
    
    navLinks.forEach(a => {
      const href = a.getAttribute('href');
      a.classList.remove('active');
      if (href === filename || (filename === '' && href === 'index.html')) {
        a.classList.add('active');
      }
    });
  });
})();
