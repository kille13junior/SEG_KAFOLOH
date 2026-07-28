/**
 * ============================================
 *  GESTION DES UTILISATEURS (localStorage)
 * ============================================
 */

function getUsers() {
  return JSON.parse(localStorage.getItem('users') || '[]');
}

function setUsers(users) {
  localStorage.setItem('users', JSON.stringify(users));
}

/**
 * ============================================
 *  ÉLÉMENTS DU DOM
 * ============================================
 */
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const switchLink = document.getElementById('switch-link');
const formTitle = document.getElementById('form-title');
const authMsg = document.getElementById('auth-message');
const confirmationScreen = document.getElementById('confirmationScreen');

const btnLogin = document.getElementById('btn-login');
const btnRegister = document.getElementById('btn-register');
const confirmBtn = document.getElementById('confirmBtn');
const editBtn = document.getElementById('editBtn');

const avatarUploadZone = document.getElementById('avatar-upload-zone');
const avatarRegisterInput = document.getElementById('avatar-register');
const avatarPreview = document.getElementById('avatar-preview');

let tempUserData = null;
let avatarDataUrl = '';

/**
 * ============================================
 *  AFFICHAGE DES MESSAGES
 * ============================================
 */
function showMessage(msg, type = 'error') {
  authMsg.style.display = 'block';
  authMsg.textContent = msg;
  authMsg.className = `auth-message ${type === 'success' ? 'success' : 'error'}`;

  if (type === 'success') {
    setTimeout(() => {
      authMsg.style.display = 'none';
    }, 4000);
  }
}

/**
 * ============================================
 *  BASCULEMENT FORMULAIRES
 * ============================================
 */
function switchForms() {
  const isLogin = loginForm.style.display !== 'none';

  if (isLogin) {
    // Passer à l'inscription
    loginForm.style.display = 'none';
    registerForm.style.display = 'block';
    formTitle.innerHTML = '🌾 Inscription AgriSmart';
    switchLink.textContent = '✅ Déjà agriculteur ? Connecte-toi !';
  } else {
    // Passer à la connexion
    loginForm.style.display = 'block';
    registerForm.style.display = 'none';
    confirmationScreen.style.display = 'none';
    formTitle.innerHTML = '🌾 Connexion AgriSmart';
    switchLink.textContent = '➕ Pas encore de compte ? Inscris-toi !';
  }

  authMsg.style.display = 'none';
  loginForm.reset();
  registerForm.reset();
  avatarDataUrl = '';
  avatarPreview.innerHTML = '';
}

switchLink.addEventListener('click', switchForms);
switchLink.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') switchForms();
});

/**
 * ============================================
 *  GESTION AVATAR - UPLOAD ZONE
 * ============================================
 */

// Clic sur la zone
avatarUploadZone.addEventListener('click', () => {
  avatarRegisterInput.click();
});

// Drag & Drop
avatarUploadZone.addEventListener('dragover', (e) => {
  e.preventDefault();
  avatarUploadZone.style.borderColor = '#FF8C00';
  avatarUploadZone.style.background = 'linear-gradient(135deg, #fff, #fffbf0)';
});

avatarUploadZone.addEventListener('dragleave', () => {
  avatarUploadZone.style.borderColor = '#FFD700';
  avatarUploadZone.style.background = 'linear-gradient(135deg, #fffbf0, #fff9e6)';
});

avatarUploadZone.addEventListener('drop', (e) => {
  e.preventDefault();
  const files = e.dataTransfer.files;
  if (files.length > 0) {
    avatarRegisterInput.files = files;
    processAvatar(files[0]);
  }
});

// Sélection fichier
avatarRegisterInput.addEventListener('change', function (e) {
  const file = e.target.files[0];
  if (file) {
    processAvatar(file);
  }
});

/**
 * Traitement du fichier avatar
 */
function processAvatar(file) {
  // Vérifier la taille
  if (file.size > 5 * 1024 * 1024) {
    showMessage('❌ Image trop grande (max 5 MB)');
    avatarRegisterInput.value = '';
    avatarDataUrl = '';
    return;
  }

  // Vérifier le type
  if (!file.type.startsWith('image/')) {
    showMessage('❌ Veuillez sélectionner une image');
    avatarRegisterInput.value = '';
    avatarDataUrl = '';
    return;
  }

  const reader = new FileReader();

  reader.onload = function (ev) {
    avatarDataUrl = ev.target.result;

    // Afficher la preview
    avatarPreview.innerHTML = `
      <img src="${avatarDataUrl}" alt="Aperçu de l'avatar" title="Votre avatar">
      <div class="avatar-success">✅ Avatar chargé</div>
    `;

    // Scroll vers le bas pour voir le bouton
    setTimeout(() => {
      btnRegister.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 300);

    showMessage('✅ Avatar téléchargé avec succès !', 'success');
  };

  reader.onerror = function () {
    showMessage('❌ Erreur lors de la lecture du fichier');
    avatarRegisterInput.value = '';
    avatarDataUrl = '';
  };

  reader.readAsDataURL(file);
}

/**
 * ============================================
 *  CONNEXION
 * ============================================
 */
loginForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const username = document.getElementById('username-login').value.trim().toLowerCase();
  const pwd = document.getElementById('password-login').value;

  if (!username || !pwd) {
    showMessage('❌ Veuillez remplir tous les champs');
    return;
  }

  // Ajouter animation de chargement
  btnLogin.classList.add('btn-loading');
  btnLogin.disabled = true;

  // Simulation d'un délai réseau
  setTimeout(() => {
    const users = getUsers();
    const user = users.find((u) => u.username === username && u.password === pwd);

    btnLogin.classList.remove('btn-loading');
    btnLogin.disabled = false;

    if (user) {
      if (user.banned) {
        showMessage('🚫 Ce compte est banni');
        return;
      }

      // Sauvegarder la session
      localStorage.setItem('user-login', username);
      localStorage.setItem('user-role', 'agriculteur');
      localStorage.setItem('user-avatar', user.avatar || '');
      localStorage.setItem('user-nom', user.nom);
      localStorage.setItem('user-prenom', user.prenom);
      localStorage.setItem('user-fullname', `${user.prenom} ${user.nom}`);

      showMessage('✅ Connexion réussie !', 'success');

      setTimeout(() => {
        window.location.href = 'Agriculture.html';
      }, 800);
    } else {
      showMessage('❌ Nom d\'utilisateur ou mot de passe incorrect');
    }
  }, 600);
});

/**
 * ============================================
 *  INSCRIPTION - VALIDATION ET SOUMISSION
 * ============================================
 */
registerForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const nom = document.getElementById('nom-register').value.trim().toUpperCase();
  const prenom =
    document.getElementById('prenom-register').value.trim().charAt(0).toUpperCase() +
    document.getElementById('prenom-register').value.trim().slice(1).toLowerCase();
  const pwd = document.getElementById('password-register').value;
  const pwd2 = document.getElementById('password-register2').value;

  // Validation
  if (!nom || !prenom || !pwd || !pwd2) {
    showMessage('❌ Veuillez remplir tous les champs');
    return;
  }

  if (nom.length < 2) {
    showMessage('❌ Le nom doit avoir au moins 2 caractères');
    return;
  }

  if (prenom.length < 2) {
    showMessage('❌ Le prénom doit avoir au moins 2 caractères');
    return;
  }

  if (pwd.length < 6) {
    showMessage('❌ Le mot de passe doit avoir au moins 6 caractères');
    return;
  }

  if (pwd !== pwd2) {
    showMessage('❌ Les mots de passe ne correspondent pas');
    return;
  }

  const username = `${prenom.toLowerCase()}_${nom.toLowerCase()}`.replace(/\s/g, '_');

  let users = getUsers();

  if (users.find((u) => u.username === username)) {
    showMessage(`❌ Le nom d'utilisateur "${username}" existe déjà`);
    return;
  }

  // Animation de chargement
  btnRegister.classList.add('btn-loading');
  btnRegister.disabled = true;

  setTimeout(() => {
    const avatar = avatarDataUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${prenom}${nom}`;

    // Données temporaires
    tempUserData = {
      username,
      nom,
      prenom,
      password: pwd,
      avatar,
      role: 'agriculteur',
      banned: false,
      createdAt: new Date().toISOString(),
    };

    btnRegister.classList.remove('btn-loading');
    btnRegister.disabled = false;

    // Afficher l'écran de confirmation
    showConfirmationScreen();
  }, 600);
});

/**
 * ============================================
 *  AFFICHAGE ÉCRAN CONFIRMATION
 * ============================================
 */
function showConfirmationScreen() {
  if (!tempUserData) return;

  // Masquer les autres éléments
  loginForm.style.display = 'none';
  registerForm.style.display = 'none';
  switchLink.style.display = 'none';
  authMsg.style.display = 'none';
  formTitle.style.display = 'none';

  // Afficher la confirmation
  confirmationScreen.style.display = 'block';

  // Remplir les infos
  document.getElementById('confirmation-name').textContent = `${tempUserData.prenom} ${tempUserData.nom}`;
  document.getElementById('confirmation-username').textContent = tempUserData.username;

  // Avatar
  const avatarContainer = document.getElementById('confirmation-avatar');
  if (tempUserData.avatar.startsWith('data:')) {
    avatarContainer.innerHTML = `<img src="${tempUserData.avatar}" alt="Avatar">`;
  } else {
    avatarContainer.innerHTML = `<div style="font-size: 2.5em; font-weight: bold;">${tempUserData.prenom[0]}${tempUserData.nom[0]}</div>`;
  }
}

/**
 * ============================================
 *  BOUTON CONFIRMER - INSCRIPTION AUTO
 * ============================================
 */
confirmBtn.addEventListener('click', () => {
  if (!tempUserData) return;

  confirmBtn.classList.add('btn-loading');
  confirmBtn.disabled = true;

  setTimeout(() => {
    // Ajouter l'utilisateur à la base
    let users = getUsers();
    users.push(tempUserData);
    setUsers(users);

    // Connexion automatique
    localStorage.setItem('user-login', tempUserData.username);
    localStorage.setItem('user-role', 'agriculteur');
    localStorage.setItem('user-avatar', tempUserData.avatar);
    localStorage.setItem('user-nom', tempUserData.nom);
    localStorage.setItem('user-prenom', tempUserData.prenom);
    localStorage.setItem('user-fullname', `${tempUserData.prenom} ${tempUserData.nom}`);

    confirmBtn.innerHTML = '<span>✅ Inscription confirmée!</span>';

    setTimeout(() => {
      window.location.href = 'Agriculture.html';
    }, 1200);
  }, 600);
});

/**
 * ============================================
 *  BOUTON MODIFIER
 * ============================================
 */
editBtn.addEventListener('click', () => {
  tempUserData = null;
  avatarDataUrl = '';

  confirmationScreen.style.display = 'none';
  registerForm.style.display = 'block';
  switchLink.style.display = 'block';
  formTitle.style.display = 'block';
  formTitle.innerHTML = '🌾 Inscription AgriSmart';

  registerForm.reset();
  avatarPreview.innerHTML = '';
  avatarRegisterInput.value = '';

  authMsg.style.display = 'none';
});

/**
 * ============================================
 *  INITIALISATION
 * ============================================
 */
document.addEventListener('DOMContentLoaded', () => {
  const userLogin = localStorage.getItem('user-login');

  if (userLogin) {
    setTimeout(() => {
      window.location.href = 'Agriculture.html';
    }, 300);
  }

  // Focus sur le premier input
  document.getElementById('username-login').focus();

  console.log('✅ Page de connexion SEGKAFOLOH chargée');
});

/**
 * ============================================
 *  ENTRÉE CLAVIER (ENTER)
 * ============================================
 */
document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    if (loginForm.style.display !== 'none' && loginForm.offsetHeight > 0) {
      loginForm.dispatchEvent(new Event('submit'));
    } else if (registerForm.style.display !== 'none' && registerForm.offsetHeight > 0) {
      registerForm.dispatchEvent(new Event('submit'));
    }
  }
});