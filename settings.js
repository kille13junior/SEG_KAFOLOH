// settings.js
// Garder l'existing settings.js mais ajouter au début :

// Utiliser la classe SettingsSync globale
const getSettings = () => settingsSync.settings;
const updateSettings = (newSettings) => settingsSync.saveSettings(newSettings);

// Bouton Paramètres (dans le header)
document.addEventListener('DOMContentLoaded', () => {
  const settingsBtn = document.getElementById('settings-btn');
  if (settingsBtn) {
    settingsBtn.addEventListener('click', openSettingsModal);
  }

  // Charger et appliquer les paramètres sauvegardés
  settingsSync.applySettings();
});

function openSettingsModal() {
  const modal = document.getElementById('settings-modal');
  if (!modal) {
    createSettingsModal();
    return;
  }
  modal.style.display = 'flex';
}

function createSettingsModal() {
  const modal = document.createElement('div');
  modal.id = 'settings-modal';
  modal.className = 'settings-modal';
  modal.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    backdrop-filter: blur(4px);
  `;

  const content = document.createElement('div');
  content.className = 'settings-content';
  content.style.cssText = `
    background: #fff;
    border-radius: 20px;
    padding: 2em;
    max-width: 500px;
    width: 90%;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
    animation: slideUp 0.3s ease-out;
  `;

  content.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5em;">
      <h2 style="margin: 0; color: #27ae60; font-size: 1.8em;">⚙️ Paramètres</h2>
      <button class="close-settings" style="background: none; border: none; font-size: 1.5em; cursor: pointer;">✕</button>
    </div>

    <!-- Langue -->
    <div style="margin-bottom: 1.5em;">
      <label style="display: block; font-weight: bold; color: #27ae60; margin-bottom: 0.8em;">🌐 Langue</label>
      <select id="language-select" style="width: 100%; padding: 0.8em; border: 2px solid #e8f5e9; border-radius: 8px; font-size: 1em;">
        <option value="fr">Français 🇫🇷</option>
        <option value="en">English 🇬🇧</option>
      </select>
    </div>

    <!-- Police -->
    <div style="margin-bottom: 1.5em;">
      <label style="display: block; font-weight: bold; color: #27ae60; margin-bottom: 0.8em;">🔤 Police</label>
      <select id="font-select" style="width: 100%; padding: 0.8em; border: 2px solid #e8f5e9; border-radius: 8px; font-size: 1em;">
        <option value="segoe">Segoe UI (Défaut)</option>
        <option value="georgia">Georgia (Classique)</option>
        <option value="courier">Courier (Monospace)</option>
        <option value="comic">Comic Sans (Ludique)</option>
      </select>
    </div>

    <!-- Taille de la police -->
    <div style="margin-bottom: 1.5em;">
      <label style="display: block; font-weight: bold; color: #27ae60; margin-bottom: 0.8em;">📏 Taille de la police</label>
      <select id="font-size-select" style="width: 100%; padding: 0.8em; border: 2px solid #e8f5e9; border-radius: 8px; font-size: 1em;">
        <option value="small">Petite (14px)</option>
        <option value="normal" selected>Normal (16px)</option>
        <option value="large">Grande (18px)</option>
        <option value="xlarge">Très grande (20px)</option>
      </select>
    </div>

    <!-- Thème -->
    <div style="margin-bottom: 1.5em;">
      <label style="display: block; font-weight: bold; color: #27ae60; margin-bottom: 0.8em;">🎨 Thème</label>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1em;">
        <button id="theme-light" class="theme-btn" style="padding: 0.8em; border: 2px solid #e8f5e9; border-radius: 8px; background: #fff; cursor: pointer; font-weight: bold; color: #27ae60;">
          ☀️ Clair
        </button>
        <button id="theme-dark" class="theme-btn" style="padding: 0.8em; border: 2px solid #e8f5e9; border-radius: 8px; background: #333; color: #fff; cursor: pointer; font-weight: bold;">
          🌙 Sombre
        </button>
      </div>
    </div>

    <button id="save-settings" style="width: 100%; padding: 1em; background: #27ae60; color: #fff; border: none; border-radius: 8px; font-weight: bold; font-size: 1.1em; cursor: pointer; margin-top: 1em;">
      ✅ Appliquer et fermer
    </button>
  `;

  modal.appendChild(content);
  document.body.appendChild(modal);

  // Charger les valeurs actuelles
  document.getElementById('language-select').value = settingsSync.getSetting('language');
  document.getElementById('font-select').value = settingsSync.getSetting('font');
  document.getElementById('font-size-select').value = settingsSync.getSetting('fontSize');

  const theme = settingsSync.getSetting('theme');
  const lightBtn = document.getElementById('theme-light');
  const darkBtn = document.getElementById('theme-dark');

  if (theme === 'dark') {
    darkBtn.style.borderColor = '#27ae60';
    darkBtn.style.background = '#222';
  } else {
    lightBtn.style.borderColor = '#27ae60';
  }

  // Événements
  document.querySelector('.close-settings').addEventListener('click', () => {
    modal.remove();
  });

  lightBtn.addEventListener('click', () => {
    lightBtn.style.borderColor = '#27ae60';
    darkBtn.style.borderColor = '#e8f5e9';
    darkBtn.style.background = '#333';
  });

  darkBtn.addEventListener('click', () => {
    darkBtn.style.borderColor = '#27ae60';
    lightBtn.style.borderColor = '#e8f5e9';
  });

  document.getElementById('save-settings').addEventListener('click', () => {
    const newSettings = {
      language: document.getElementById('language-select').value,
      font: document.getElementById('font-select').value,
      fontSize: document.getElementById('font-size-select').value,
      theme: document.getElementById('theme-dark').style.borderColor === 'rgb(39, 174, 96)' ? 'dark' : 'light'
    };

    updateSettings(newSettings);
    modal.remove();
    alert('✅ Paramètres appliqués et sauvegardés !');
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.remove();
  });
}
// Gestion des paramètres (Langue, Police, Thème)

class SettingsManager {
  constructor() {
    this.defaultSettings = {
      language: 'fr',
      font: 'segoe',
      theme: 'light'
    };
    
    this.translations = {
      fr: {
        parametres: 'Paramètres',
        langue: 'Langue',
        police: 'Police',
        theme: 'Thème',
        fermer: 'Fermer',
        appliquer: 'Appliquer',
        francais: 'Français',
        anglais: 'Anglais',
        senoufo: 'Sénoufo',
        baule: 'Baulé',
        malinke: 'Malinkè',
        segoe: 'Segoe UI (Défaut)',
        georgia: 'Georgia',
        arial: 'Arial',
        comicsans: 'Comic Sans MS',
        clair: 'Clair',
        sombre: 'Sombre',
        nature: 'Nature 🌿',
        ocean: 'Océan 🌊',
        coucher: 'Coucher de Soleil 🌅',
        minimaliste: 'Minimaliste ⚪',
        cyberpunk: 'Cyberpunk 🔮',
        reglages_appliques: 'Paramètres appliqués avec succès!',
        accueil: 'Accueil',
        cultures: 'Cultures',
        irrigation: 'Irrigation',
        amendement: 'Amendement',
        maladies: 'Maladies',
        chatbot: 'Chatbot',
        recommandation: 'Recommandation de culture',
        connexion: 'Connexion',
        optimisez: 'Optimisez vos rendements agricoles',
        description_accueil: 'SEG-KAFOLOH vous aide à prendre les meilleures décisions pour votre exploitation grâce à des outils intelligents et adaptés à votre climat.',
        decouvrez_cultures: 'Découvrez les cultures recommandées selon votre région et votre climat.',
        calculez_irrigation: 'Calculez précisément la quantité d\'eau nécessaire pour vos cultures.',
        ameliorer_plantation: 'Améliorer la production de votre plantation avec des techniques d\'amélioration.',
        identifier_maladies: 'Identifiez les maladies de vos plantes et obtenez des solutions.',
        posez_questions: 'Posez vos questions et recevez des réponses automatiques instantanées.',
        systeme_recommandation: 'Système de recommandation de culture avec le machine learning.',
        explorer: 'Explorer →',
        calculer: 'Calculer →',
        ameliorer: 'Améliorer →',
        diagnostiquer: 'Diagnostiquer →',
        discuter: 'Discuter →',
        recommander: 'Recommander →',
        bienvenue: 'Bienvenue sur SEGKAFOLOH ! 🌾',
        citation: 'Une bonne décision agricole commence par une bonne information.',
        seg_kafoloh: 'SEG-KAFOLOH'
      },
      en: {
        parametres: 'Settings',
        langue: 'Language',
        police: 'Font',
        theme: 'Theme',
        fermer: 'Close',
        appliquer: 'Apply',
        francais: 'French',
        anglais: 'English',
        senoufo: 'Senoufo',
        baule: 'Baule',
        malinke: 'Malinke',
        segoe: 'Segoe UI (Default)',
        georgia: 'Georgia',
        arial: 'Arial',
        comicsans: 'Comic Sans MS',
        clair: 'Light',
        sombre: 'Dark',
        nature: 'Nature 🌿',
        ocean: 'Ocean 🌊',
        coucher: 'Sunset 🌅',
        minimaliste: 'Minimalist ⚪',
        cyberpunk: 'Cyberpunk 🔮',
        reglages_appliques: 'Settings applied successfully!',
        accueil: 'Home',
        cultures: 'Cultures',
        irrigation: 'Irrigation',
        amendement: 'Amendment',
        maladies: 'Diseases',
        chatbot: 'Chatbot',
        recommandation: 'Culture Recommendation',
        connexion: 'Login',
        optimisez: 'Optimize your agricultural yields',
        description_accueil: 'SEG-KAFOLOH helps you make the best decisions for your farm with intelligent tools adapted to your climate.',
        decouvrez_cultures: 'Discover recommended crops according to your region and climate.',
        calculez_irrigation: 'Accurately calculate the amount of water needed for your crops.',
        ameliorer_plantation: 'Improve your plantation production with improvement techniques.',
        identifier_maladies: 'Identify plant diseases and get solutions.',
        posez_questions: 'Ask your questions and receive instant automatic answers.',
        systeme_recommandation: 'Crop recommendation system with machine learning.',
        explorer: 'Explore →',
        calculer: 'Calculate →',
        ameliorer: 'Improve →',
        diagnostiquer: 'Diagnose →',
        discuter: 'Chat →',
        recommander: 'Recommend →',
        bienvenue: 'Welcome to SEGKAFOLOH! 🌾',
        citation: 'Good agricultural decisions begin with good information.',
        seg_kafoloh: 'SEG-KAFOLOH'
      },
      senoufo: {
        parametres: 'Sènèkɛ̈rɛ̈',
        langue: 'Kan',
        police: 'Fɔ̈nti',
        theme: 'Tàtà',
        fermer: 'Kunu',
        appliquer: 'Fini',
        francais: 'Faransɛ',
        anglais: 'Engɛlɛ',
        senoufo: 'Senufo',
        baule: 'Bawule',
        malinke: 'Maninka',
        segoe: 'Segoe UI (Ŋìna)',
        georgia: 'Georgia',
        arial: 'Arial',
        comicsans: 'Comic Sans MS',
        clair: 'Fiɲɛ',
        sombre: 'Tilɛ',
        nature: 'Wili 🌿',
        ocean: 'Ngɛ 🌊',
        coucher: 'Tàa fà 🌅',
        minimaliste: 'Tɔ̈gɔ̈ kɛ̈tɛ̈ ⚪',
        cyberpunk: 'Cyberpunk 🔮',
        reglages_appliques: 'Sènèkɛ̈rɛ̈ fini kɔ!',
        accueil: 'Ɔ̈wɛ',
        cultures: 'Kuluuru',
        irrigation: 'Sumaña',
        amendement: 'Fàñɛ',
        maladies: 'Naakɛ',
        chatbot: 'Sɛŋalɛ bɔ',
        recommandation: 'Kuluuru sènèkɛ̈rɛ̈',
        connexion: 'Sɛ̈ni',
        optimisez: 'Kuluuru fànyɛ sanni kɔ',
        description_accueil: 'SEG-KAFOLOH ka taa ka tɛ sènèkɛ̈rɛ̈ ma la fɔ ka maa kuluuru kɔn.',
        decouvrez_cultures: 'Kuluuru kɔn sanni kɔ ta a kafu.',
        calculez_irrigation: 'Sumaña tɔ̈gɔ̈ sanni kɔ ka maa kuluuru kɔn.',
        ameliorer_plantation: 'Fànyɛ kuluuru ma fɔ̈ ka tɛ fàñɛ.',
        identifier_maladies: 'Naakɛ tɔ̈gɔ̈ sanni kɔ ka tɛ fànyɛ.',
        posez_questions: 'Sɛŋalɛ sanni kɔ ka jɔ sɛŋalɛ kɔn.',
        systeme_recommandation: 'Kuluuru sènèkɛ̈rɛ̈ ka tɛ machine learning.',
        explorer: 'Tɔ̈gɔ̈ →',
        calculer: 'Sanni →',
        ameliorer: 'Fàñɛ →',
        diagnostiquer: 'Naakɛ →',
        discuter: 'Sɛŋalɛ →',
        recommander: 'Sènèkɛ̈rɛ̈ →',
        bienvenue: 'Àa-mà! SEG-KAFOLOH kɔn 🌾',
        citation: 'Sènèkɛ̈rɛ̈ kuluuru ma taa ka tɛ sanni kɔ.',
        seg_kafoloh: 'SEG-KAFOLOH'
      },
      baule: {
        parametres: 'Paramɛ̀trɛ',
        langue: 'Kɔ',
        police: 'Fɔ̃ti',
        theme: 'Tatà',
        fermer: 'Kunu',
        appliquer: 'Wɛ',
        francais: 'Faransè',
        anglais: 'Angulè',
        senoufo: 'Senufu',
        baule: 'Baule',
        malinke: 'Maninka',
        segoe: 'Segoe UI (Gbagu)',
        georgia: 'Georgia',
        arial: 'Arial',
        comicsans: 'Comic Sans MS',
        clair: 'Fɛ',
        sombre: 'Gɛli',
        nature: 'Wili 🌿',
        ocean: 'Ngɛ 🌊',
        coucher: 'Tàa fà 🌅',
        minimaliste: 'Tɔgɔ kɛtɛ ⚪',
        cyberpunk: 'Cyberpunk 🔮',
        reglages_appliques: 'Paramɛ̀trɛ wɛ bien!',
        accueil: 'Mɛ̃',
        cultures: 'Kuluuru',
        irrigation: 'Sumaña',
        amendement: 'Fàñɛ',
        maladies: 'Naakɛ',
        chatbot: 'Kpawu sɛŋalɛ',
        recommandation: 'Kuluuru gbanyinɛ',
        connexion: 'Sɛ̃ni',
        optimisez: 'Kuluuru sɛ gbanyinɛ',
        description_accueil: 'SEG-KAFOLOH ka taa ka wɛ paramɛ̀trɛ ma la fɔ ka maa kuluuru kɔn.',
        decouvrez_cultures: 'Kuluuru kɔn wɛ sanni kɔ ta a kafu.',
        calculez_irrigation: 'Sumaña tɔgɔ wɛ sanni kɔ ka maa kuluuru kɔn.',
        ameliorer_plantation: 'Kuluuru sɛ fànyinɛ wɛ ka tɛ fàñɛ.',
        identifier_maladies: 'Naakɛ tɔgɔ wɛ sanni kɔ ka tɛ fànyɛ.',
        posez_questions: 'Sɛŋalɛ sanni kɔ ka jɔ sɛŋalɛ kɔn.',
        systeme_recommandation: 'Kuluuru gbanyinɛ ka tɛ machine learning.',
        explorer: 'Tɔgɔ →',
        calculer: 'Sanni →',
        ameliorer: 'Fàñɛ →',
        diagnostiquer: 'Naakɛ →',
        discuter: 'Sɛŋalɛ →',
        recommander: 'Gbanyinɛ →',
        bienvenue: 'Àa-mà! SEG-KAFOLOH kɔn 🌾',
        citation: 'Gbanyinɛ kuluuru ma taa ka tɛ sanni kɔ.',
        seg_kafoloh: 'SEG-KAFOLOH'
      },
      malinke: {
        parametres: 'Paramɛtirɛ',
        langue: 'Kan',
        police: 'Fɔ̃ti',
        theme: 'Tàta',
        fermer: 'Kunun',
        appliquer: 'Kara',
        francais: 'Faransi',
        anglais: 'Angilɛ',
        senoufo: 'Senufu',
        baule: 'Bawulɛ',
        malinke: 'Maninka',
        segoe: 'Segoe UI (Jɔnna)',
        georgia: 'Georgia',
        arial: 'Arial',
        comicsans: 'Comic Sans MS',
        clair: 'Fɛ',
        sombre: 'Gɛli',
        nature: 'Wili 🌿',
        ocean: 'Ngɛ 🌊',
        coucher: 'Tàa fà 🌅',
        minimaliste: 'Tɔgɔ kɛtɛ ⚪',
        cyberpunk: 'Cyberpunk 🔮',
        reglages_appliques: 'Paramɛtirɛ kara n\'a fɔ!',
        accueil: 'Mɛ̃',
        cultures: 'Kuluuru',
        irrigation: 'Sumaña',
        amendement: 'Fàñɛ',
        maladies: 'Naakɛ',
        chatbot: 'Sɛŋalɛ kɔnɔ',
        recommandation: 'Kuluuru gbanyinɛ',
        connexion: 'Sɛ̃ni',
        optimisez: 'Kuluuru sɛ gbanyinɛ',
        description_accueil: 'SEG-KAFOLOH ka taa ka kara paramɛtirɛ ma la fɔ ka maa kuluuru kɔn.',
        decouvrez_cultures: 'Kuluuru kɔn kara sanni kɔ ta a kafu.',
        calculez_irrigation: 'Sumaña tɔgɔ kara sanni kɔ ka maa kuluuru kɔn.',
        ameliorer_plantation: 'Kuluuru sɛ fànyinɛ kara ka tɛ fàñɛ.',
        identifier_maladies: 'Naakɛ tɔgɔ kara sanni kɔ ka tɛ fànyɛ.',
        posez_questions: 'Sɛŋalɛ sanni kɔ ka jɔ sɛŋalɛ kɔn.',
        systeme_recommandation: 'Kuluuru gbanyinɛ ka tɛ machine learning.',
        explorer: 'Tɔgɔ →',
        calculer: 'Sanni →',
        ameliorer: 'Fàñɛ →',
        diagnostiquer: 'Naakɛ →',
        discuter: 'Sɛŋalɛ →',
        recommander: 'Gbanyinɛ →',
        bienvenue: 'Àa-mà! SEG-KAFOLOH kɔn 🌾',
        citation: 'Gbanyinɛ kuluuru ma taa ka tɛ sanni kɔ.',
        seg_kafoloh: 'SEG-KAFOLOH'
      }
    };
    
    this.settings = this.loadSettings();
    this.applySettings();
  }

  loadSettings() {
    const saved = localStorage.getItem('appSettings');
    return saved ? JSON.parse(saved) : this.defaultSettings;
  }

  saveSettings() {
    localStorage.setItem('appSettings', JSON.stringify(this.settings));
  }

  t(key) {
    const lang = this.settings.language;
    return this.translations[lang]?.[key] || this.translations['fr']?.[key] || key;
  }

  applySettings() {
    this.applyLanguage();
    this.applyFont();
    this.applyTheme();
    this.updatePageContent();
  }

  applyLanguage() {
    document.documentElement.lang = this.settings.language;
    document.body.setAttribute('data-lang', this.settings.language);
  }

  applyFont() {
    const fonts = {
      segoe: "'Segoe UI', 'Roboto', Arial, sans-serif",
      georgia: "'Georgia', serif",
      arial: "'Arial', sans-serif",
      comicsans: "'Comic Sans MS', cursive"
    };
    
    document.documentElement.style.setProperty(
      '--font-family',
      fonts[this.settings.font] || fonts.segoe
    );
    document.body.style.fontFamily = fonts[this.settings.font] || fonts.segoe;
  }

  applyTheme() {
    // Supprimer tous les thèmes existants
    document.body.classList.remove('theme-light', 'theme-dark', 'theme-nature', 'theme-ocean', 'theme-coucher', 'theme-minimaliste', 'theme-cyberpunk');
    
    // Ajouter le nouveau thème
    document.body.classList.add(`theme-${this.settings.theme}`);
  }

  updatePageContent() {
    // Mettre à jour les éléments avec data-i18n
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.getAttribute('data-i18n');
      element.textContent = this.t(key);
    });

    // Mettre à jour les attributs title avec data-i18n-title
    document.querySelectorAll('[data-i18n-title]').forEach(element => {
      const key = element.getAttribute('data-i18n-title');
      element.title = this.t(key);
    });
  }

  changeSetting(key, value) {
    this.settings[key] = value;
    this.saveSettings();
    this.applySettings();
  }
}

const settingsManager = new SettingsManager();

document.addEventListener('DOMContentLoaded', () => {
  settingsManager.applySettings();
});
