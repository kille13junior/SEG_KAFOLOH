function getCurrentUser() {
  return localStorage.getItem('user-login') || "Anonyme";
}

function showUserSession() {
  const user = getCurrentUser();
  const userSession = document.getElementById('user-session');
  if (user) userSession.textContent = '👤 ' + user;
  else userSession.innerHTML = '<a href="login.html" style="color:#27ae60;">🔐 Connexion</a>';
}

showUserSession();

// Base de données cultures
const irrigationDatabase = {
  cacao: {
    name: "🍫 Cacao",
    emoji: "🍫",
    type: "Plantation (pérenne)",
    etpMax: 5.5,
    kc: 0.85,
    rootDepth: 1.2,
    drySeasonMultiplier: 1.3,
    rainSeasonMultiplier: 0.5,
    tips: [
      "💧 Arroser régulièrement quand pas de pluie",
      "🌳 Garder l'ombrage des arbres",
      "⚠️ Éviter trop d'eau (maladies)",
      "📅 Augmenter en saison sèche"
    ],
    schedule: [
      { period: "🌧️ Saison pluie", irrigation: "Arroser 1-2 fois/semaine seulement" },
      { period: "☀️ Saison sèche", irrigation: "Arroser 3 fois/semaine obligatoire" }
    ]
  },
  
  cafe: {
    name: "☕ Café",
    emoji: "☕",
    type: "Plantation (pérenne)",
    etpMax: 4.8,
    kc: 0.75,
    rootDepth: 1.5,
    drySeasonMultiplier: 1.2,
    rainSeasonMultiplier: 0.4,
    tips: [
      "💧 Sol toujours humide mais pas mouillé",
      "🌡️ Températures fraîches = moins d'eau",
      "🚰 Arroser au pied (pas les feuilles)",
      "📊 Plus d'eau en floraison"
    ],
    schedule: [
      { period: "🌧️ Saison pluie", irrigation: "Arroser 1 fois/semaine ou pas" },
      { period: "☀️ Saison sèche", irrigation: "Arroser 2-3 fois/semaine" }
    ]
  },

  riz: {
    name: "🍚 Riz",
    emoji: "🍚",
    type: "Annuelle (saison)",
    etpMax: 6.5,
    kc: 1.1,
    rootDepth: 0.6,
    drySeasonMultiplier: 1.5,
    rainSeasonMultiplier: 0.3,
    tips: [
      "🌊 TRÈS IMPORTANT: garder eau constamment (5-10cm)",
      "💦 Sol toujours détrempé = normal pour riz",
      "⚠️ Attention aux maladies si eau stagnante",
      "🚰 Drainage avant récolte"
    ],
    schedule: [
      { period: "🌧️ Saison pluie", irrigation: "L'eau de pluie suffit généralement" },
      { period: "☀️ Saison sèche", irrigation: "OBLIGATOIRE! Eau tous les jours" }
    ]
  },

  mais: {
    name: "🌽 Maïs",
    emoji: "🌽",
    type: "Annuelle (saison)",
    etpMax: 5.8,
    kc: 1.0,
    rootDepth: 1.0,
    drySeasonMultiplier: 1.4,
    rainSeasonMultiplier: 0.5,
    tips: [
      "🌽 TRÈS IMPORTANT en juillet-août (floraison)",
      "💧 Besoin énorme d'eau pendant épiaison",
      "⚠️ Manque eau = récolte réduite de moitié!",
      "📅 Augmenter arrosage en juillet-août"
    ],
    schedule: [
      { period: "🌧️ Saison pluie", irrigation: "Pluies suffisent généralement" },
      { period: "☀️ Saison sèche", irrigation: "Arroser 2-3 fois/semaine MINIMUM" }
    ]
  },

  coton: {
    name: "🧵 Coton",
    emoji: "🧵",
    type: "Annuelle (saison)",
    etpMax: 6.2,
    kc: 0.65,
    rootDepth: 1.5,
    drySeasonMultiplier: 0.8,
    rainSeasonMultiplier: 0.2,
    tips: [
      "🏜️ Résiste bien à la sécheresse",
      "💧 Peu besoin d'eau comparé à autres",
      "⚠️ Trop d'eau = moins de fibre, plus maladies",
      "✅ Zone soudanienne idéale"
    ],
    schedule: [
      { period: "🌧️ Saison pluie", irrigation: "Pas besoin d'arroser généralement" },
      { period: "☀️ Saison sèche", irrigation: "Arroser 1-2 fois/semaine seulement" }
    ]
  },

  arachide: {
    name: "🥒 Arachide",
    emoji: "🥒",
    type: "Annuelle (saison)",
    etpMax: 4.9,
    kc: 0.85,
    rootDepth: 0.8,
    drySeasonMultiplier: 1.2,
    rainSeasonMultiplier: 0.4,
    tips: [
      "🌱 Résistante mais irrigation améliore beaucoup",
      "💧 Critique en floraison-fructification",
      "🔍 Sol bien drainé obligatoire",
      "📊 +30% rendement avec eau régulière"
    ],
    schedule: [
      { period: "🌧️ Saison pluie", irrigation: "Pluies généralement suffisent" },
      { period: "☀️ Saison sèche", irrigation: "Arroser 2 fois/semaine" }
    ]
  },

  igname: {
    name: "🥔 Igname",
    emoji: "🥔",
    type: "Annuelle (saison)",
    etpMax: 5.0,
    kc: 0.95,
    rootDepth: 0.9,
    drySeasonMultiplier: 1.3,
    rainSeasonMultiplier: 0.5,
    tips: [
      "💧 TRÈS IMPORTANT juillet-septembre (croissance tubercules)",
      "🌱 Manque eau = petits tubercules fibreux",
      "🌳 Tuteurer + arroser = excellent rendement",
      "📊 Eau = succès pour igname"
    ],
    schedule: [
      { period: "🌧️ Saison pluie", irrigation: "Arroser 1-2 fois/semaine" },
      { period: "☀️ Saison sèche", irrigation: "Arroser 3 fois/semaine OBLIGATOIRE" }
    ]
  },

  manioc: {
    name: "🌱 Manioc",
    emoji: "🌱",
    type: "Pérenne (longue)",
    etpMax: 4.5,
    kc: 0.60,
    rootDepth: 1.2,
    drySeasonMultiplier: 0.6,
    rainSeasonMultiplier: 0.3,
    tips: [
      "🏜️ TRÈS résistant sécheresse",
      "💧 Peu irrigation nécessaire",
      "⚠️ Trop d'eau = tubercules pourris",
      "✅ Culture sûre en cas sécheresse"
    ],
    schedule: [
      { period: "🌧️ Saison pluie", irrigation: "Peu ou pas d'arrosage" },
      { period: "☀️ Saison sèche", irrigation: "Arroser 1 fois/semaine seulement" }
    ]
  },

  banane: {
    name: "🍌 Banane",
    emoji: "🍌",
    type: "Plantation (pérenne)",
    etpMax: 6.5,
    kc: 1.0,
    rootDepth: 0.7,
    drySeasonMultiplier: 1.3,
    rainSeasonMultiplier: 0.6,
    tips: [
      "💧 BESOIN CONSTANT d'eau toute l'année",
      "🌊 Humidité toujours élevée",
      "⚠️ Feuilles brûlent si manque eau",
      "📊 Production continue = arrosage continu"
    ],
    schedule: [
      { period: "🌧️ Saison pluie", irrigation: "Arroser 1-2 fois/semaine" },
      { period: "☀️ Saison sèche", irrigation: "Arroser 3 fois/semaine OBLIGATOIRE" }
    ]
  },

  ananas: {
    name: "🍍 Ananas",
    emoji: "🍍",
    type: "Plantation (1-2 ans)",
    etpMax: 5.2,
    kc: 0.90,
    rootDepth: 0.6,
    drySeasonMultiplier: 1.4,
    rainSeasonMultiplier: 0.5,
    tips: [
      "💧 Arrosage régulier important",
      "🌊 Préfère humidité constante",
      "⚠️ Drainage excellent obligatoire",
      "🔥 Sensible sécheresse = fruits petits"
    ],
    schedule: [
      { period: "🌧️ Saison pluie", irrigation: "Arroser 1-2 fois/semaine" },
      { period: "☀️ Saison sèche", irrigation: "Arroser 3 fois/semaine" }
    ]
  },

  tomate: {
    name: "🍅 Tomate",
    emoji: "🍅",
    type: "Annuelle (3-4 mois)",
    etpMax: 5.5,
    kc: 0.95,
    rootDepth: 0.7,
    drySeasonMultiplier: 1.3,
    rainSeasonMultiplier: 0.5,
    tips: [
      "💧 Arrosage régulier TOUS LES JOURS en saison sèche",
      "⚠️ JAMAIS mouiller les feuilles (maladies)",
      "🌡️ Eau tiède (pas froide) idéale",
      "📊 Plusieurs récoltes/an = eau constante"
    ],
    schedule: [
      { period: "🌧️ Saison pluie", irrigation: "Arroser 2 fois/semaine" },
      { period: "☀️ Saison sèche", irrigation: "Arroser TOUS LES JOURS ou 2x/jour" }
    ]
  },

  plantain: {
    name: "🍌 Plantain",
    emoji: "🍌",
    type: "Plantation (pérenne)",
    etpMax: 6.3,
    kc: 0.98,
    rootDepth: 0.7,
    drySeasonMultiplier: 1.3,
    rainSeasonMultiplier: 0.6,
    tips: [
      "💧 Besoin constant d'eau",
      "🌊 Très exigeant en humidité",
      "🔥 Feuilles brûlent rapidement sans eau",
      "📊 Irrigation = clé du succès"
    ],
    schedule: [
      { period: "🌧️ Saison pluie", irrigation: "Arroser 1-2 fois/semaine" },
      { period: "☀️ Saison sèche", irrigation: "Arroser 3 fois/semaine" }
    ]
  },

  avocat: {
    name: "🥑 Avocat",
    emoji: "🥑",
    type: "Plantation (pérenne)",
    etpMax: 5.1,
    kc: 0.80,
    rootDepth: 1.0,
    drySeasonMultiplier: 1.2,
    rainSeasonMultiplier: 0.5,
    tips: [
      "💧 Arrosage régulier en saison sèche",
      "🌳 Altitude = moins besoin eau",
      "⚠️ Racines superficielles = arrosage prudent",
      "🔄 Plus d'eau en floraison"
    ],
    schedule: [
      { period: "🌧️ Saison pluie", irrigation: "Arroser 1 fois/semaine" },
      { period: "☀️ Saison sèche", irrigation: "Arroser 2-3 fois/semaine" }
    ]
  },

  soja: {
    name: "🌱 Soja",
    emoji: "🌱",
    type: "Annuelle (saison)",
    etpMax: 5.0,
    kc: 0.85,
    rootDepth: 1.2,
    drySeasonMultiplier: 1.1,
    rainSeasonMultiplier: 0.4,
    tips: [
      "💧 Modérément exigeant",
      "🌱 Légumineuse = bon pour sol",
      "⚠️ Critique en floraison",
      "✅ Enracinement profond = résistant"
    ],
    schedule: [
      { period: "🌧️ Saison pluie", irrigation: "Pluies généralement suffisent" },
      { period: "☀️ Saison sèche", irrigation: "Arroser 2 fois/semaine" }
    ]
  },

  gombo: {
    name: "💚 Gombo",
    emoji: "💚",
    type: "Annuelle (saison)",
    etpMax: 5.3,
    kc: 0.90,
    rootDepth: 0.8,
    drySeasonMultiplier: 1.2,
    rainSeasonMultiplier: 0.4,
    tips: [
      "💧 Aime la chaleur avec eau",
      "⚠️ Récolte continue = irrigation continue",
      "🌞 Tolère bien température élevée",
      "✅ Sol bien drainé obligatoire"
    ],
    schedule: [
      { period: "🌧️ Saison pluie", irrigation: "Arroser 1-2 fois/semaine" },
      { period: "☀️ Saison sèche", irrigation: "Arroser 2-3 fois/semaine" }
    ]
  },

  niebe: {
    name: "🫘 Niébé",
    emoji: "🫘",
    type: "Annuelle (saison)",
    etpMax: 4.8,
    kc: 0.80,
    rootDepth: 1.3,
    drySeasonMultiplier: 1.1,
    rainSeasonMultiplier: 0.4,
    tips: [
      "💧 Résistant sécheresse",
      "🌱 Légumineuse = enrichit le sol",
      "⚠️ Besoin eau accru en floraison",
      "✅ Enracinement profond bon"
    ],
    schedule: [
      { period: "🌧️ Saison pluie", irrigation: "Pluies généralement suffisent" },
      { period: "☀️ Saison sèche", irrigation: "Arroser 1-2 fois/semaine" }
    ]
  },

  mil: {
    name: "🌾 Mil/Sorgho",
    emoji: "🌾",
    type: "Annuelle (saison)",
    etpMax: 5.5,
    kc: 0.70,
    rootDepth: 1.4,
    drySeasonMultiplier: 0.7,
    rainSeasonMultiplier: 0.2,
    tips: [
      "🏜️ TRÈS résistant sécheresse",
      "💧 Très peu irrigation nécessaire",
      "✅ Culture sûre zone soudanienne",
      "📊 Rendement bon même sans eau"
    ],
    schedule: [
      { period: "🌧️ Saison pluie", irrigation: "Pas besoin d'arrosage" },
      { period: "☀️ Saison sèche", irrigation: "Arroser 1 fois/semaine seulement" }
    ]
  }
};

// Remplir le select
function populateCultures() {
  const select = document.getElementById('culture-select');
  Object.entries(irrigationDatabase).forEach(function(entry) {
    const key = entry[0];
    const crop = entry[1];
    const option = document.createElement('option');
    option.value = key;
    option.textContent = crop.name;
    select.appendChild(option);
  });
}

populateCultures();

// Calcul simple basé sur saison
function calculateSimpleMode(cultureKey, surface, season) {
  const culture = irrigationDatabase[cultureKey];
  const unitSelect = document.getElementById('unit-select');
  const surfaceM2 = unitSelect.value === 'ha' ? surface * 10000 : surface;
  
  let baseWaterPerDay = culture.etpMax * culture.kc;
  
  if (season === 'dry') {
    baseWaterPerDay *= culture.drySeasonMultiplier;
  } else {
    baseWaterPerDay *= culture.rainSeasonMultiplier;
  }
  
  const dailyWater = baseWaterPerDay * surfaceM2;
  
  return {
    method: season === 'dry' ? '☀️ MODE SAISON SÈCHE' : '🌧️ MODE SAISON PLUIE',
    dailyWater: dailyWater.toFixed(0),
    weeklyWater: (dailyWater * 7).toFixed(0),
    monthlyWater: (dailyWater * 30).toFixed(0)
  };
}

// Calcul avancé
function calculateAdvancedMode(cultureKey, surface) {
  const culture = irrigationDatabase[cultureKey];
  const unitSelect = document.getElementById('unit-select');
  const surfaceM2 = unitSelect.value === 'ha' ? surface * 10000 : surface;
  
  const temp = parseFloat(document.getElementById('temp-input').value);
  const humidity = parseFloat(document.getElementById('humidity-input').value);
  const rainfall = parseFloat(document.getElementById('rainfall-input').value);
  const wind = parseFloat(document.getElementById('wind-input').value);
  
  let etp = culture.etpMax * (temp / 25);
  etp = etp * (humidity / 100) * 0.85;
  etp = etp * (1 + wind * 0.05);
  
  const monthlyNeeds = etp * culture.kc * 30;
  const deficit = Math.max(0, monthlyNeeds - rainfall);
  const monthlyWater = (deficit / 1000) * surfaceM2 * 1000;
  
  return {
    method: '🧮 MODE AVANCÉ (Précis)',
    dailyWater: (monthlyWater / 30).toFixed(0),
    weeklyWater: (monthlyWater / 4.33).toFixed(0),
    monthlyWater: monthlyWater.toFixed(0)
  };
}

// Afficher la culture
function displayIrrigation(cultureKey) {
  const culture = irrigationDatabase[cultureKey];
  if (!culture) return;

  document.getElementById('no-selection').style.display = 'none';
  document.getElementById('irrigation-display').style.display = 'block';
  document.getElementById('calculation-result').style.display = 'none';

  document.getElementById('culture-name').textContent = culture.name;
  document.getElementById('culture-type').textContent = culture.type;
  document.getElementById('culture-icon').textContent = culture.emoji;

  const tipsDiv = document.getElementById('irrigation-tips');
  tipsDiv.innerHTML = '';
  culture.tips.forEach(function(tip) {
    const div = document.createElement('div');
    div.className = 'tip-item';
    div.style.fontSize = '1.05em';
    div.textContent = tip;
    tipsDiv.appendChild(div);
  });

  const calendarDiv = document.getElementById('irrigation-calendar');
  calendarDiv.innerHTML = '<div class="calendar-grid">';
  culture.schedule.forEach(function(s) {
    calendarDiv.innerHTML += '<div class="season-item"><div class="season-month" style="font-size:1.3em;">' + s.period + '</div><div class="season-activity">' + s.irrigation + '</div></div>';
  });
  calendarDiv.innerHTML += '</div>';

  document.getElementById('surface-input').value = '';
  document.getElementById('result-text').innerHTML = '';
}

// Gestion des modes
document.querySelectorAll('input[name="calculation-mode"]').forEach(function(radio) {
  radio.addEventListener('change', function() {
    const simpleParams = document.getElementById('simple-params');
    const advancedParams = document.getElementById('advanced-params');
    
    if (this.value === 'simple') {
      simpleParams.style.display = 'block';
      advancedParams.style.display = 'none';
    } else {
      simpleParams.style.display = 'none';
      advancedParams.style.display = 'block';
    }
  });
});

// Gestion sélection saison
document.querySelectorAll('.season-btn').forEach(function(btn) {
  btn.addEventListener('click', function() {
    document.querySelectorAll('.season-btn').forEach(function(b) {
      b.style.opacity = '0.6';
      b.style.background = 'rgba(39, 174, 96, 0.1)';
      b.style.color = '#27ae60';
    });
    this.style.opacity = '1';
    this.style.background = '#27ae60';
    this.style.color = '#fff';
  });
});

// BOUTON CALCULER
document.getElementById('calc-btn').addEventListener('click', function() {
  const cultureKey = document.getElementById('culture-select').value;
  const surface = parseFloat(document.getElementById('surface-input').value);
  const mode = document.querySelector('input[name="calculation-mode"]:checked').value;
  
  if (!cultureKey) {
    alert('👆 Choisissez une culture d\'abord!');
    return;
  }
  
  if (!surface || isNaN(surface) || surface <= 0) {
    alert('📏 Entrez une surface valide (m² ou hectares)');
    return;
  }
  
  const culture = irrigationDatabase[cultureKey];
  let result;
  
  try {
    if (mode === 'simple') {
      const seasonBtns = document.querySelectorAll('.season-btn');
      let season = 'dry';
      seasonBtns.forEach(function(btn) {
        if (btn.style.opacity === '1') {
          season = btn.dataset.season;
        }
      });
      
      if (!season) {
        alert('☀️ Choisissez la saison (pluie ou sèche)!');
        return;
      }
      
      result = calculateSimpleMode(cultureKey, surface, season);
    } else {
      result = calculateAdvancedMode(cultureKey, surface);
    }
    
    displayResult(result, culture, surface);
  } catch(error) {
    alert('❌ Erreur: ' + error.message);
  }
});

// Afficher résultats
function displayResult(result, culture, surface) {
  const unitSelect = document.getElementById('unit-select');
  const unit = unitSelect.value === 'ha' ? 'hectare(s)' : 'm²';
  
  let resultHTML = '<div style="margin-bottom:1.5em;"><strong style="font-size:1.2em;">📊 ' + result.method + '</strong></div>';
  resultHTML += '<div style="background:#fff; padding:1em; border-radius:8px; margin-bottom:1em; border-left:4px solid #27ae60;">';
  resultHTML += '<strong style="color:#27ae60; font-size:1.05em;">🌱 Culture:</strong> ' + culture.name + '<br>';
  resultHTML += '<strong>📏 Surface:</strong> ' + surface + ' ' + unit + '</div>';
  
  resultHTML += '<div style="background:#fff3cd; padding:1.5em; border-radius:10px; border-left:5px solid #ff6b00; margin-bottom:1.5em;">';
  resultHTML += '<strong style="color:#ff6b00; font-size:1.3em;">���� QUANTITÉ D\'EAU À DONNER:</strong><br><br>';
  resultHTML += '<div style="font-size:1.4em; line-height:2; color:#333;">';
  resultHTML += '<strong style="color:#27ae60;">🌄 PAR JOUR:</strong> <span style="background:#e8f5e9; padding:0.5em 1em; border-radius:8px; font-size:1.1em;">' + parseInt(result.dailyWater).toLocaleString('fr-FR') + ' litres</span><br>';
  resultHTML += '<strong style="color:#27ae60;">📅 PAR SEMAINE:</strong> <span style="background:#e8f5e9; padding:0.5em 1em; border-radius:8px; font-size:1.1em;">' + parseInt(result.weeklyWater).toLocaleString('fr-FR') + ' litres</span><br>';
  resultHTML += '<strong style="color:#27ae60;">📆 PAR MOIS:</strong> <span style="background:#e8f5e9; padding:0.5em 1em; border-radius:8px; font-size:1.1em;">' + parseInt(result.monthlyWater).toLocaleString('fr-FR') + ' litres</span>';
  resultHTML += '</div></div>';
  
  resultHTML += '<div style="background:#e8f5e9; padding:1.5em; border-radius:10px; border-left:5px solid #27ae60;">';
  resultHTML += '<strong style="color:#27ae60; font-size:1.2em;">💡 CONSEILS PRATIQUES:</strong><br><br>';
  resultHTML += '<div style="font-size:1.05em; line-height:1.8;">';
  resultHTML += '✅ <strong>Arroser tôt le matin</strong> (avant 7h) ou fin d\'après-midi (après 17h)<br>';
  resultHTML += '✅ <strong>Arroser lentement</strong> pour que l\'eau pénètre bien<br>';
  resultHTML += '✅ <strong>Vérifier l\'humidité du sol</strong> avant d\'arroser (pincer la terre)<br>';
  resultHTML += '✅ <strong>Goutte-à-goutte économise 40% d\'eau</strong> comparé à arrosage manuel<br>';
  resultHTML += '✅ <strong>Réduire l\'arrosage si pluie</strong> prévue le lendemain<br>';
  resultHTML += '⚠️ <strong>Ne pas mouiller les feuilles</strong> (maladies)<br>';
  resultHTML += '🌳 <strong>Mulch/paille = réduit évaporation de 30%</strong>';
  resultHTML += '</div></div>';

  document.getElementById('result-text').innerHTML = resultHTML;
  document.getElementById('calculation-result').style.display = 'block';
  document.getElementById('calculation-result').scrollIntoView({ behavior: 'smooth' });
}

// Changement culture
document.getElementById('culture-select').addEventListener('change', function(e) {
  const cultureKey = e.target.value;
  
  if (cultureKey) {
    displayIrrigation(cultureKey);
  } else {
    document.getElementById('irrigation-display').style.display = 'none';
    document.getElementById('no-selection').style.display = 'block';
  }
});