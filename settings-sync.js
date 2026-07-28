// settings-sync.js
// ============================================
// GESTION CENTRALISÉE DES PRÉFÉRENCES UTILISATEUR
// ============================================

class SettingsSync {
  constructor() {
    this.STORAGE_KEY = 'segkafoloh-user-prefs';
    this.DEFAULT_SETTINGS = {
      language: 'fr',
      font: 'segoe',
      theme: 'light',
      fontSize: 'normal'
    };
    this.loadSettings();
  }

  // Charger les paramètres depuis localStorage
  loadSettings() {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    this.settings = stored ? JSON.parse(stored) : { ...this.DEFAULT_SETTINGS };
    return this.settings;
  }

  // Sauvegarder les paramètres
  saveSettings(newSettings) {
    this.settings = { ...this.settings, ...newSettings };
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.settings));
    this.broadcastChanges();
    return this.settings;
  }

  // Obtenir un paramètre spécifique
  getSetting(key) {
    return this.settings[key] || this.DEFAULT_SETTINGS[key];
  }

  // Appliquer les paramètres au DOM
  applySettings(settings = this.settings) {
    this.applyLanguage(settings.language);
    this.applyFont(settings.font);
    this.applyTheme(settings.theme);
    this.applyFontSize(settings.fontSize);
    this.dispatchSettingsEvent('applied', settings);
  }

  // Appliquer la langue
  applyLanguage(lang) {
    document.documentElement.lang = lang;
    document.body.setAttribute('data-language', lang);
    this.updatePageText(lang);
    console.log(`✅ Langue appliquée : ${lang}`);
  }

  // Appliquer la police
  applyFont(font) {
    const fontMap = {
      segoe: "'Segoe UI', 'Roboto', Arial, sans-serif",
      georgia: "Georgia, serif",
      courier: "'Courier New', monospace",
      comic: "'Comic Sans MS', cursive"
    };

    const fontFamily = fontMap[font] || fontMap.segoe;
    document.documentElement.style.setProperty('--font-family', fontFamily);
    document.body.style.fontFamily = fontFamily;
    document.body.setAttribute('data-font', font);
    
    // Appliquer à tous les éléments texte
    document.querySelectorAll('*').forEach(el => {
      el.style.fontFamily = fontFamily;
    });

    console.log(`✅ Police appliquée : ${font}`);
  }

  // Appliquer le thème
  applyTheme(theme) {
    if (theme === 'dark') {
      document.body.classList.add('dark-theme');
      document.body.classList.remove('light-theme');
      this.applyDarkThemeStyles();
    } else {
      document.body.classList.add('light-theme');
      document.body.classList.remove('dark-theme');
      this.applyLightThemeStyles();
    }
    document.body.setAttribute('data-theme', theme);
    console.log(`✅ Thème appliqué : ${theme}`);
  }

  // Appliquer la taille de la police
  applyFontSize(size) {
    const sizeMap = {
      small: '14px',
      normal: '16px',
      large: '18px',
      xlarge: '20px'
    };

    const fontSize = sizeMap[size] || sizeMap.normal;
    document.documentElement.style.setProperty('--base-font-size', fontSize);
    document.body.style.fontSize = fontSize;
    document.body.setAttribute('data-font-size', size);

    // Appliquer à tous les éléments
    document.querySelectorAll('*').forEach(el => {
      const computed = window.getComputedStyle(el).fontSize;
      const currentSize = parseFloat(computed);
      const ratio = parseFloat(fontSize) / 16; // 16px est la base
      el.style.fontSize = (currentSize * ratio) + 'px';
    });

    console.log(`✅ Taille de police appliquée : ${size}`);
  }

  // Appliquer les styles du thème sombre
  applyDarkThemeStyles() {
    const darkStyle = document.getElementById('dark-theme-style') || document.createElement('style');
    darkStyle.id = 'dark-theme-style';
    darkStyle.textContent = `
      body.dark-theme {
        background: #1a1a1a !important;
        color: #e0e0e0 !important;
      }
      body.dark-theme header {
        background: #222 !important;
        color: #fff !important;
      }
      body.dark-theme nav a {
        color: #a0d995 !important;
      }
      body.dark-theme nav a:hover,
      body.dark-theme nav a.active {
        background: #27ae60 !important;
        color: #fff !important;
      }
      body.dark-theme main {
        background: #1a1a1a !important;
      }
      body.dark-theme .card,
      body.dark-theme .zone-card,
      body.dark-theme .module-card {
        background: #2a2a2a !important;
        color: #e0e0e0 !important;
        border-color: #444 !important;
      }
      body.dark-theme .zone-info-section,
      body.dark-theme .tips-section {
        background: #2a2a2a !important;
        color: #e0e0e0 !important;
      }
      body.dark-theme input,
      body.dark-theme select,
      body.dark-theme textarea {
        background: #333 !important;
        color: #e0e0e0 !important;
        border-color: #555 !important;
      }
      body.dark-theme input:focus,
      body.dark-theme select:focus,
      body.dark-theme textarea:focus {
        background: #3a3a3a !important;
        box-shadow: 0 0 0 3px rgba(39, 174, 96, 0.2) !important;
      }
      body.dark-theme footer {
        background: #111 !important;
        color: #e0e0e0 !important;
      }
    `;
    if (!document.getElementById('dark-theme-style')) {
      document.head.appendChild(darkStyle);
    }
  }

  // Appliquer les styles du thème clair (réinitialiser)
  applyLightThemeStyles() {
    const darkStyle = document.getElementById('dark-theme-style');
    if (darkStyle) {
      darkStyle.textContent = '';
    }
  }

  // Mettre à jour le texte de la page selon la langue
  updatePageText(lang) {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const translations = this.getTranslations();
      if (translations[lang] && translations[lang][key]) {
        el.textContent = translations[lang][key];
      }
    });
  }

  // Dictionnaire de traductions
  getTranslations() {
    return {
      fr: {
        accueil: '🏠 Accueil',
        cultures: '🌱 Cultures',
        irrigation: '💧 Irrigation',
        amendement: '🌾 Amendement',
        maladies: '🏥 Maladies',
        chatbot: '🤖 Chatbot',
        recommandation: '✨ Recommandation',
        connexion: '🔐 Connexion',
        seg_kafoloh: 'SEG-KAFOLOH',
        optimisez: 'Optimisez vos rendements agricoles',
        description_accueil: 'SEG-KAFOLOH vous aide à prendre les meilleures décisions pour votre exploitation.',
        decouvrez_cultures: 'Découvrez les cultures recommandées selon votre région.',
        calculez_irrigation: 'Calculez précisément la quantité d\'eau nécessaire.',
        ameliorer_plantation: 'Améliorez la production de votre plantation.',
        identifier_maladies: 'Identifiez les maladies de vos plantes.',
        posez_questions: 'Posez vos questions et recevez des réponses instantanées.',
        systeme_recommandation: 'Système de recommandation avec machine learning.',
        explorer: 'Explorer →',
        calculer: 'Calculer →',
        ameliorer: 'Améliorer →',
        diagnostiquer: 'Diagnostiquer →',
        discuter: '💬 Discuter →',
        recommander: 'Recommander →',
        citation: 'Une bonne décision agricole commence par une bonne information.',
        bienvenue: 'Bienvenue sur SEGKAFOLOH ! 🌾'
      },
      en: {
        accueil: '🏠 Home',
        cultures: '🌱 Crops',
        irrigation: '💧 Irrigation',
        amendement: '🌾 Amendment',
        maladies: '🏥 Diseases',
        chatbot: '🤖 Chatbot',
        recommandation: '✨ Recommendation',
        connexion: '🔐 Login',
        seg_kafoloh: 'SEG-KAFOLOH',
        optimisez: 'Optimize your agricultural yields',
        description_accueil: 'SEG-KAFOLOH helps you make the best decisions for your farm.',
        decouvrez_cultures: 'Discover recommended crops for your region.',
        calculez_irrigation: 'Calculate the precise amount of water needed.',
        ameliorer_plantation: 'Improve your plantation production.',
        identifier_maladies: 'Identify plant diseases.',
        posez_questions: 'Ask your questions and get instant answers.',
        systeme_recommandation: 'Recommendation system with machine learning.',
        explorer: 'Explore →',
        calculer: 'Calculate →',
        ameliorer: 'Improve →',
        diagnostiquer: 'Diagnose →',
        discuter: 'Chat →',
        recommander: 'Recommend →',
        citation: 'Good agricultural decision starts with good information.',
        bienvenue: 'Welcome to SEGKAFOLOH! 🌾'
      }
    };
  }

  // Émettre un événement de changement
  dispatchSettingsEvent(type, settings) {
    window.dispatchEvent(new CustomEvent('settingsChanged', {
      detail: { type, settings }
    }));
  }

  // Écouter les changements sur d'autres onglets/fenêtres
  broadcastChanges() {
    if (typeof BroadcastChannel !== 'undefined') {
      const channel = new BroadcastChannel('segkafoloh-settings');
      channel.postMessage({ type: 'settingsUpdated', settings: this.settings });
    }
  }

  // Recevoir les changements d'autres onglets
  listenForBroadcast() {
    if (typeof BroadcastChannel !== 'undefined') {
      const channel = new BroadcastChannel('segkafoloh-settings');
      channel.onmessage = (event) => {
        if (event.data.type === 'settingsUpdated') {
          console.log('📡 Changements reçus d\'un autre onglet');
          this.settings = event.data.settings;
          this.applySettings();
        }
      };
    }
  }
}

// Initialisation globale
const settingsSync = new SettingsSync();
settingsSync.listenForBroadcast();

// Appliquer les paramètres au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
  settingsSync.applySettings();
});

// Écouter les changements de paramètres
window.addEventListener('settingsChanged', (e) => {
  console.log('⚙️ Paramètres changés :', e.detail);
  settingsSync.applySettings(e.detail.settings);
});