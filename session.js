// session.js : à inclure sur toutes les pages

function showUserSession() {
  const header = document.querySelector('header');
  if (!header) return;

  if (document.getElementById('user-session-box')) return;

  const user = localStorage.getItem('user-login');
  if (user) {
    const box = document.createElement('div');
    box.id = 'user-session-box';
    box.style.position = 'absolute';
    box.style.top = '18px';
    box.style.right = '32px';
    box.style.zIndex = '99';
    box.style.display = 'flex';
    box.style.alignItems = 'center';
    box.style.gap = '1em';

    box.innerHTML = `
      <span style="background:#fffbe7; color:#e88600; font-weight:bold; padding:0.4em 1em; border-radius:18px; border:1.5px solid #ffcc70;">👤&nbsp;${user}</span>
      <button id="btn-logout" style="background:#ff5e62; color:#fff; border:none; border-radius:18px; padding:0.4em 1em; font-weight:bold; cursor:pointer;">Déconnexion</button>
    `;
    header.appendChild(box);

    document.getElementById('btn-logout').onclick = function() {
      localStorage.removeItem('user-login');
      location.reload();
    };
  }
}

window.addEventListener('DOMContentLoaded', showUserSession);