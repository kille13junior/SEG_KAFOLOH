// Gestion de la modal des paramètres

class SettingsModal {
  constructor() {
    this.createModalHTML();
    this.attachEventListeners();
  }

  createModalHTML() {
    const modalHTML = `
      <div id="settings-modal" class="settings-modal">
        <div class="settings-modal-content">
          <div class="settings-modal-header">
            <h2 data-i18n="parametres">Paramètres</h2>
            <button class="settings-close-btn" id="settings-close-btn">✕</button>
          </div>

          <div class="settings-modal-body">
            <!-- Langue -->
            <div class="settings-group">
              <label data-i18n="langue">Langue</label>
              <select id="language-select" class="settings-select">
                <option value="fr" data-i18n="francais">Français</option>
                <option value="en" data-i18n="anglais">English</option>
                <option value="senoufo" data-i18n="senoufo">Sénoufo</option>
                <option value="baule" data-i18n="baule">Baulé</option>
                <option value="malinke" data-i18n="malinke">Malinkè</option>
              </select>
            </div>

            <!-- Police -->
            <div class="settings-group">
              <label data-i18n="police">Police</label>
              <select id="font-select" class="settings-select">
                <option value="segoe" data-i18n="segoe">Segoe UI (Défaut)</option>
                <option value="georgia" data-i18n="georgia">Georgia</option>
                <option value="arial" data-i18n="arial">Arial</option>
                <option value="comicsans" data-i18n="comicsans">Comic Sans MS</option>
              </select>
            </div>

            <!-- Thème -->
            <div class="settings-group">
              <label data-i18n="theme">Thème</label>
              <select id="theme-select" class="settings-select">
                <option value="light" data-i18n="clair">Clair</option>
                <option value="dark" data-i18n="sombre">Sombre</option>
                <option value="nature" data-i18n="nature">Nature 🌿</option>
                <option value="ocean" data-i18n="ocean">Océan 🌊</option>
                <option value="coucher" data-i18n="coucher">Coucher de Soleil 🌅</option>
                <option value="minimaliste" data-i18n="minimaliste">Minimaliste ⚪</option>
                <option value="cyberpunk" data-i18n="cyberpunk">Cyberpunk 🔮</option>
              </select>
            </div>
          </div>

          <div class="settings-modal-footer">
            <button id="settings-apply-btn" class="btn-apply" data-i18n="appliquer">Appliquer</button>
            <button id="settings-close-btn-2" class="btn-close" data-i18n="fermer">Fermer</button>
          </div>
        </div>
      </div>

      <button id="settings-btn" class="settings-btn" title="Paramètres">
        ⚙️
      </button>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);
  }

  attachEventListeners() {
    const settingsBtn = document.getElementById('settings-btn');
    const modal = document.getElementById('settings-modal');
    const closeBtn = document.getElementById('settings-close-btn');
    const closeBtnFooter = document.getElementById('settings-close-btn-2');
    const applyBtn = document.getElementById('settings-apply-btn');
    const languageSelect = document.getElementById('language-select');
    const fontSelect = document.getElementById('font-select');
    const themeSelect = document.getElementById('theme-select');

    // Charger les paramètres actuels
    languageSelect.value = settingsManager.settings.language;
    fontSelect.value = settingsManager.settings.font;
    themeSelect.value = settingsManager.settings.theme;

    // Ouvrir la modal
    settingsBtn.addEventListener('click', () => {
      modal.classList.add('show');
      this.updateSelectLabels();
    });

    // Fermer la modal
    const closeModal = () => {
      modal.classList.remove('show');
    };

    closeBtn.addEventListener('click', closeModal);
    closeBtnFooter.addEventListener('click', closeModal);

    // Appliquer les paramètres
    applyBtn.addEventListener('click', () => {
      const newLanguage = languageSelect.value;
      const newFont = fontSelect.value;
      const newTheme = themeSelect.value;

      settingsManager.changeSetting('language', newLanguage);
      settingsManager.changeSetting('font', newFont);
      settingsManager.changeSetting('theme', newTheme);

      this.updateSelectLabels();
      this.showNotification();
    });

    // Fermer la modal en cliquant en dehors
    window.addEventListener('click', (event) => {
      if (event.target === modal) {
        closeModal();
      }
    });
  }

  updateSelectLabels() {
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.getAttribute('data-i18n');
      element.textContent = settingsManager.t(key);
    });
  }

  showNotification() {
    const notification = document.createElement('div');
    notification.className = 'notification-toast';
    notification.textContent = settingsManager.t('reglages_appliques');
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.classList.add('show');
    }, 100);

    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => {
        notification.remove();
      }, 300);
    }, 3000);
  }
}

// Initialiser la modal des paramètres
document.addEventListener('DOMContentLoaded', () => {
  new SettingsModal();
});
