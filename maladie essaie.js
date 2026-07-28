// CONFIGURATION API HUGGING FACE
// ============================================

const HF_API_TOKEN = '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';
const HF_API_URL = 'https://api-inference.huggingface.co/models/sait-watson/plant-disease-detection';

// BASE DE DONNÉES COMPLÈTE DES MALADIES
// ============================================

const maladieBDD = {

  mildiou: {
    id: 'mildiou',
    nom: 'Mildiou',
    emoji: '🌫️',
    scientific: 'Phytophthora infestans',
    plantes: ['tomate', 'pomme_terre', 'laitue'],
    symptoms_keywords: ['late blight', 'mildiou', 'brown spot', 'water-soaked', 'wet lesion', 'phytophthora'],
    description: 'Le mildiou est une maladie cryptogamique causée par un pathogène aquatique (oomycète). C\'est l\'une des maladies les plus destructrices des cultures. Peut détruire une culture entière en 10 jours.',
    treatments: [
      { name: 'Cuivre (fongicide de contact)', dose: '5-10 ml/L', freq: 'Tous les 7 jours', type: 'chimique' },
      { name: 'Mancozèbe', dose: '2-2.5 kg/ha', freq: 'Tous les 10 jours', type: 'chimique' },
      { name: 'Cymoxanil + Cuivre', dose: 'Selon étiquette', freq: 'Tous les 7-10 jours', type: 'chimique' },
      { name: 'Bacillus subtilis (Bio-Fungicide)', dose: 'Selon étiquette', freq: '7-10 jours', type: 'biologique' },
      { name: 'Trichoderma harzianum', dose: 'Selon étiquette', freq: '10 jours', type: 'biologique' },
      { name: 'Décoction de prêle', dose: 'Selon étiquette', freq: '7 jours', type: 'biologique' }
    ],
    prevention: [
      'Aérer la culture et réduire l\'humidité',
      'Arroser à la base, jamais le feuillage',
      'Arroser le matin pour évaporation rapide',
      'Espacer les plants (30-40 cm)',
      'Nettoyer les feuilles basses régulièrement',
      'Détruire les plants atteints',
      'Rotation culturale (3-4 ans)',
      'Utiliser des variétés résistantes (code R)',
      'Paillage pour éviter les éclaboussures'
    ],
    urgency: 5,
    actions: [
      '1. Isoler les plants atteints IMMÉDIATEMENT',
      '2. Pulvériser un fongicide cuivré dès maintenant',
      '3. Augmenter l\'aération du feuillage',
      '4. Réduire l\'arrosage foliaire',
      '5. Surveiller quotidiennement'
    ]
  },

  oidium: {
    id: 'oidium',
    nom: 'Oïdium (Blanc)',
    emoji: '❄️',
    scientific: 'Oidium / Erysiphe spp.',
    plantes: ['tomate', 'courge', 'raisin', 'carotte', 'courgette', 'poivron'],
    symptoms_keywords: ['powdery mildew', 'white powder', 'white coating', 'poudre blanche', 'blanc', 'oidium'],
    description: 'Maladie fongique superficielle formant un dépôt blanc poudreux caractéristique sur les feuilles et les fruits. Se développe par temps chaud et sec avec humidité modérée.',
    treatments: [
      { name: 'Soufre micronisé', dose: '3-5 kg/ha', freq: 'Tous les 10-14 jours', type: 'chimique' },
      { name: 'Carbendazim', dose: '0.5-1 ml/L', freq: 'Tous les 14 jours', type: 'chimique' },
      { name: 'Bicarbonate de potassium', dose: '5 g/L + savon noir', freq: 'Tous les 7 jours', type: 'chimique' },
      { name: 'Soufre biodynamique', dose: 'Selon étiquette', freq: '10 jours', type: 'biologique' },
      { name: 'Huile neem 5%', dose: '5%', freq: '7-10 jours', type: 'biologique' },
      { name: 'Lait écrémé (20% + eau)', dose: '20%', freq: '7 jours', type: 'biologique' }
    ],
    prevention: [
      'Aérer régulièrement la culture (très important)',
      'Espacer les plants',
      'Éliminer les feuilles basses',
      'Éviter l\'excès d\'azote (favorise l\'oïdium)',
      'Arroser uniquement aux racines',
      'Nettoyer régulièrement les débris'
    ],
    urgency: 2,
    actions: [
      '1. Pulvériser du soufre micronisé ou bicarbonate',
      '2. Améliorer l\'aération autour des plants',
      '3. Retirer les feuilles basses affectées'
    ]
  },

  rouille: {
    id: 'rouille',
    nom: 'Rouille',
    emoji: '🟠',
    scientific: 'Puccinia triticina (blé)',
    plantes: ['ble', 'mais', 'raisin', 'courge'],
    symptoms_keywords: ['rust', 'orange pustule', 'rouille', 'leaf rust', 'stem rust', 'pustule orangé', 'puccinia'],
    description: 'Maladie fongique avec production de spores rouille-orangé caractéristiques visibles sur le revers des feuilles. Affecte fortement le rendement en grains.',
    treatments: [
      { name: 'Azoxystrobine', dose: '0.6-1 L/ha', freq: 'Tous les 14-21 jours', type: 'chimique' },
      { name: 'Soufre + Cuivre', dose: 'Selon formule', freq: 'Tous les 10 jours', type: 'chimique' },
      { name: 'Tébuconazole', dose: 'Selon étiquette', freq: 'Tous les 14 jours', type: 'chimique' },
      { name: 'Soufre micronisé', dose: '5 kg/ha', freq: '10 jours', type: 'biologique' },
      { name: 'Extraits de prêle', dose: 'Selon étiquette', freq: '10 jours', type: 'biologique' }
    ],
    prevention: [
      'Utiliser des variétés résistantes',
      'Rotation longue (3-4 ans)',
      'Nettoyer les résidus de culture',
      'Aérer la culture',
      'Éviter les engrais azotés excessifs',
      'Surveiller les parcelles régulièrement',
      'Éliminer les hôtes alternants'
    ],
    urgency: 4,
    actions: [
      '1. Identifier le stade de la rouille',
      '2. Pulvériser un fongicide anti-rouille',
      '3. Augmenter l\'aération',
      '4. Surveiller la progression'
    ]
  },

  brulure_bacterienne: {
    id: 'brulure_bacterienne',
    nom: 'Brûlure Bactérienne',
    emoji: '🔴',
    scientific: 'Xanthomonas campestris pv. vesicatoria',
    plantes: ['tomate', 'poivron', 'pomme_terre', 'aubergine'],
    symptoms_keywords: ['bacterial spot', 'yellow halo', 'target spot', 'bacterial blight', 'halo jaune', 'xanthomonas'],
    description: 'Maladie bactérienne grave causant des nécroses avec halo jaune caractéristique (aspect "œil de cible"). Pas de vrai traitement curatif, la prévention est essentielle.',
    treatments: [
      { name: 'Cuivre (Bordeaux)', dose: '5-10 ml/L', freq: 'Tous les 7-10 jours', type: 'chimique' },
      { name: 'Streptomycine (Agrimycine)', dose: 'Selon étiquette', freq: 'Tous les 7-10 jours', type: 'chimique' },
      { name: 'Cuivre Bordeaux bio', dose: '5-10 ml/L', freq: '10 jours', type: 'biologique' },
      { name: 'Savon (acides gras)', dose: 'Selon étiquette', freq: '7 jours', type: 'biologique' }
    ],
    prevention: [
      'Utiliser des semences certifiées saines',
      'Nettoyage complet après culture',
      'Rotation longue (3-4 ans)',
      'Éviter les blessures sur les plants',
      'Arroser sans mouiller le feuillage',
      'Espacer les plants',
      'Désinfecter tous les outils',
      'Variétés tolérantes'
    ],
    urgency: 5,
    actions: [
      '1. ISOLER LES PLANTS AFFECTÉS IMMÉDIATEMENT',
      '2. Appliquer du cuivre en préventif',
      '3. Améliorer l\'aération du feuillage',
      '4. Arroser uniquement à la base',
      '5. Désinfecter tous les outils',
      '6. Consulter un expert rapidement'
    ]
  },

  alternariose: {
    id: 'alternariose',
    nom: 'Alternariose (Early Blight)',
    emoji: '🎯',
    scientific: 'Alternaria solani',
    plantes: ['tomate', 'pomme_terre', 'aubergine'],
    symptoms_keywords: ['early blight', 'target spot', 'concentric rings', 'alternaria', 'anneaux concentriques', 'brown lesion'],
    description: 'Maladie cryptogamique créant des lésions en cibles concentriques (anneaux alternés clairs/foncés) sur les feuilles. Débute sur les feuilles basses âgées.',
    treatments: [
      { name: 'Mancozèbe', dose: '2-2.5 kg/ha', freq: 'Tous les 7-10 jours', type: 'chimique' },
      { name: 'Chlorothalonil', dose: '1.5-2 L/ha', freq: 'Tous les 10-14 jours', type: 'chimique' },
      { name: 'Famoxadone + Cymoxanil', dose: 'Selon étiquette', freq: 'Tous les 14 jours', type: 'chimique' },
      { name: 'Bacillus subtilis', dose: 'Selon étiquette', freq: '10 jours', type: 'biologique' },
      { name: 'Décoction de prêle', dose: 'Selon étiquette', freq: '10 jours', type: 'biologique' },
      { name: 'Purin d\'ortie', dose: 'Selon étiquette', freq: '10 jours', type: 'biologique' }
    ],
    prevention: [
      'Éliminer les feuilles basses (à 30 cm du sol)',
      'Aérer la culture maximalement',
      'Arroser aux racines le matin',
      'Tuteurage pour ventilation',
      'Nettoyer les résidus au sol',
      'Rotation (2-3 ans)',
      'Variétés tolérantes',
      'Utiliser un compost de qualité'
    ],
    urgency: 3,
    actions: [
      '1. Retirer les feuilles basses affectées',
      '2. Pulvériser un fongicide adapté',
      '3. Augmenter l\'aération',
      '4. Arroser uniquement à la base'
    ]
  }
};

// ANALYSE IMAGE AVEC API HUGGING FACE
// ============================================

async function analyzeImageWithHF(imageBase64, plantType) {
  const loadingText = document.getElementById('loading-text');

  try {
    if (loadingText) loadingText.textContent = 'Envoi de l\'image à l\'IA HuggingFace...';

    // Convertir base64 en Blob binaire
    const res = await fetch(imageBase64);
    const blob = await res.blob();

    // Appel à l'API Hugging Face
    const response = await fetch(HF_API_URL, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${HF_API_TOKEN}` },
      body: blob
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`HF API ${response.status}: ${errText}`);
    }

    const predictions = await response.json();
    console.log('✅ HuggingFace résultats:', predictions);

    const result = matchPredictionsWithDiseases(predictions, plantType);

    if (result) {
      return [result];
    }

    // Pas de correspondance → fallback analyse couleurs
    console.warn('⚠️ Pas de correspondance HF, fallback analyse couleurs...');
    return analyzeByColors(imageBase64, plantType);

  } catch (error) {
    console.error('❌ Erreur HuggingFace:', error.message, '— Fallback analyse couleurs');
    return analyzeByColors(imageBase64, plantType);
  }
}

// MATCHER PRÉDICTIONS HF AVEC NOS MALADIES
// ============================================

function matchPredictionsWithDiseases(predictions, plantType) {
  const preds = Array.isArray(predictions) ? predictions : [predictions];

  // Trier par score décroissant
  preds.sort((a, b) => (b.score || 0) - (a.score || 0));

  for (const pred of preds) {
    const label = (pred.label || '').toLowerCase();
    const confidence = Math.round((pred.score || 0) * 100);

    if (confidence < 15) continue;

    for (const [key, disease] of Object.entries(maladieBDD)) {
      const matched = disease.symptoms_keywords.some(kw =>
        label.includes(kw.toLowerCase()) || kw.toLowerCase().includes(label)
      );

      if (!matched) continue;

      // Ajuster la confiance si la plante n'est pas sensible
      let adjustedConfidence = confidence;
      if (plantType && !disease.plantes.includes(plantType)) {
        adjustedConfidence = Math.round(confidence * 0.7);
      }

      console.log(`✅ Match: ${disease.nom} (${adjustedConfidence}%) — HF label: "${pred.label}"`);

      return {
        ...disease,
        confidence: Math.max(adjustedConfidence, 35),
        detectedLabel: pred.label,
        source: 'HuggingFace IA'
      };
    }
  }

  return null;
}

// ============================================
// FALLBACK: ANALYSE PAR COULEURS (LOCAL)
// ============================================

function analyzeByColors(imageBase64, plantType) {
  return new Promise((resolve) => {
    const loadingText = document.getElementById('loading-text');
    if (loadingText) loadingText.textContent = 'Analyse locale des couleurs de l\'image...';

    const img = new Image();
    img.onload = function () {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      // Réduire la taille pour accélérer l'analyse
      canvas.width = Math.min(img.width, 200);
      canvas.height = Math.min(img.height, 200);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imgData.data;

      const colors = { white: 0, yellow: 0, orange: 0, brown: 0, dark: 0 };

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i], g = data[i + 1], b = data[i + 2];

        if (r > 200 && g > 200 && b > 200) colors.white++;
        else if (r > 200 && g > 200 && b < 100) colors.yellow++;
        else if (r > 200 && g > 100 && b < 80) colors.orange++;
        else if (r > 100 && g < 80 && b < 80) colors.brown++;
        else if (r < 60 && g < 60 && b < 60) colors.dark++;
      }

      const total = data.length / 4;
      const r = { white: colors.white / total, yellow: colors.yellow / total, orange: colors.orange / total, brown: colors.brown / total };

      // Scorer chaque maladie
      const scores = {};
      for (const [key, disease] of Object.entries(maladieBDD)) {
        let score = disease.plantes.includes(plantType) ? 30 : 0;

        if (r.white > 0.08 && disease.id === 'oidium') score += 50;
        if (r.orange > 0.04 && disease.id === 'rouille') score += 50;
        if (r.brown > 0.10 && disease.id === 'mildiou') score += 45;
        if (r.brown > 0.06 && r.yellow > 0.04 && disease.id === 'brulure_bacterienne') score += 45;
        if (r.brown > 0.07 && disease.id === 'alternariose') score += 40;

        scores[key] = score;
      }

      const bestKey = Object.entries(scores).sort((a, b) => b[1] - a[1])[0];
      const bestDisease = maladieBDD[bestKey[0]];

      console.log(`🎨 Analyse couleurs → ${bestDisease.nom} (score: ${bestKey[1]})`);

      resolve([{
        ...bestDisease,
        confidence: Math.min(bestKey[1], 65),
        source: 'Analyse locale'
      }]);
    };

    img.onerror = () => {
      const fallback = Object.values(maladieBDD).find(d => d.plantes.includes(plantType))
        || Object.values(maladieBDD)[0];
      resolve([{ ...fallback, confidence: 40, source: 'Analyse locale' }]);
    };

    img.src = imageBase64;
  });
}

// ============================================
// DIAGNOSTIC PAR SYMPTÔMES (FORMULAIRE)
// ============================================

function diagnoseMaladie(formData) {
  const { symptomes, plante, parties, severite, duree } = formData;
  const symptomesLower = symptomes.toLowerCase();
  const scores = {};

  for (const [key, disease] of Object.entries(maladieBDD)) {
    let score = 0;

    // Critère 1: plante sensible
    if (disease.plantes.includes(plante)) score += 30;
    else score -= 40;

    // Critère 2: parties affectées
    if (parties.includes('feuilles') && disease.id !== 'rouille') score += 15;
    if (parties.includes('tige') && (disease.id === 'mildiou' || disease.id === 'brulure_bacterienne')) score += 10;
    if (parties.includes('fruits') && (disease.id === 'mildiou' || disease.id === 'alternariose' || disease.id === 'brulure_bacterienne')) score += 15;

    // Critère 3: mots-clés dans les symptômes
    disease.symptoms_keywords.forEach(kw => {
      if (symptomesLower.includes(kw.toLowerCase())) score += 25;
    });

    // Critère 4: mots descriptifs généraux
    const descMots = {
      mildiou: ['aqueux', 'humide', 'blanc', 'brun', 'halo', 'duvet', 'pourriture'],
      oidium: ['blanc', 'poudre', 'poudreu', 'frottan'],
      rouille: ['orange', 'rouille', 'pustule', 'orangé'],
      brulure_bacterienne: ['nécrose', 'halo jaune', 'noirâtre', 'brun', 'bactérien'],
      alternariose: ['anneau', 'cible', 'concentrique', 'brun', 'circulaire']
    };
    (descMots[disease.id] || []).forEach(mot => {
      if (symptomesLower.includes(mot)) score += 15;
    });

    // Critère 5: conditions météo
    if ((symptomesLower.includes('humide') || symptomesLower.includes('pluie')) &&
      (disease.id === 'mildiou' || disease.id === 'alternariose' || disease.id === 'brulure_bacterienne')) {
      score += 20;
    }

    // Critère 6: durée
    if (duree === 'moins_1_semaine' && disease.urgency >= 4) score += 15;
    if (duree === '1_2_semaines') score += 15;
    if (duree === '3_4_semaines' || duree === 'plus_1_mois') score += 10;

    // Critère 7: sévérité
    const sev = parseInt(severite);
    if (sev === 3 && disease.urgency >= 4) score += 15;
    if (sev === 2 && disease.urgency === 3) score += 10;
    if (sev === 1 && disease.urgency <= 2) score += 10;

    scores[key] = Math.max(0, score);
  }

  return Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .filter(([, score]) => score > 15)
    .map(([key, score]) => ({
      ...maladieBDD[key],
      confidence: Math.min(100, score),
      source: 'Formulaire symptômes'
    }));
}

// ============================================
// AFFICHAGE DES RÉSULTATS
// ============================================

function displayResults(results) {
  const container = document.getElementById('results-container');
  container.innerHTML = '';

  if (!results || results.length === 0) {
    container.innerHTML = `
      <div style="text-align:center; padding: 2em; background: #fff; border-radius: 12px;">
        <p style="font-size:1.3em;">❌ Aucune maladie détectée avec certitude</p>
        <p style="color: #666;">Suggestions:</p>
        <ul style="text-align:left; display:inline-block; color:#555;">
          <li>Décrivez les symptômes plus précisément</li>
          <li>Prenez une photo plus nette et proche</li>
          <li>Consultez un expert phytopathologiste</li>
        </ul>
      </div>`;
    return;
  }

  results.forEach((disease, idx) => {
    const confiance = disease.confidence;
    const color = confiance >= 70 ? '#27ae60' : confiance >= 50 ? '#f39c12' : '#e74c3c';
    const label = confiance >= 70 ? 'TRÈS PROBABLE' : confiance >= 50 ? 'POSSIBLE' : 'À CONFIRMER';
    const urgencyColor = disease.urgency >= 4 ? '#e74c3c' : disease.urgency >= 2 ? '#f39c12' : '#27ae60';

    const chimiques = disease.treatments.filter(t => t.type === 'chimique');
    const biologiques = disease.treatments.filter(t => t.type === 'biologique');

    let html = `
      <div class="disease-card" style="background:#fff; border-radius:15px; padding:1.5em; margin-bottom:1.5em;
           box-shadow:0 2px 10px rgba(45,106,79,0.1); border-left:5px solid ${color}; animation: fadeIn 0.5s ease;">

        <!-- En-tête -->
        <div class="disease-header" style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1em; margin-bottom:1.2em;">
          <h3 style="margin:0; font-size:1.5em; color:#2d6a4f;">${disease.emoji} ${disease.nom}</h3>
          <div style="background:${color}; color:#fff; padding:0.5em 1.2em; border-radius:25px; font-weight:bold; font-size:1em;">
            ${label}: ${confiance}%
          </div>
        </div>

        <!-- Source IA -->
        ${idx === 0 ? `<div style="background:#e8f5f0; padding:0.8em 1.2em; border-radius:8px; margin-bottom:1em; border-left:4px solid #27ae60;">
          <strong>🎯 DIAGNOSTIC PRINCIPAL</strong> — Source: <em>${disease.source || 'analyse'}</em>
          ${disease.detectedLabel ? ` | Étiquette IA: "<em>${disease.detectedLabel}</em>"` : ''}
        </div>` : `<div style="background:#fff8e1; padding:0.6em 1em; border-radius:8px; margin-bottom:1em; border-left:4px solid #f39c12;">
          <strong>Diagnostic alternatif #${idx + 1}</strong>
        </div>`}

        <!-- Info scientifique -->
        <div style="background:#f9fff8; padding:1em; border-radius:8px; margin-bottom:1.2em; border-left:4px solid #e2f0d9;">
          <strong>🔬 ${disease.scientific}</strong>
          <p style="margin:0.5em 0 0; color:#555; line-height:1.6;">${disease.description}</p>
        </div>

        <!-- Traitements chimiques -->
        <div style="margin-bottom:1.2em;">
          <h4 style="color:#2d6a4f; margin-bottom:0.8em;">💊 Traitements Chimiques</h4>
          ${chimiques.map(t => `
            <div style="background:#f9fff8; padding:0.8em 1em; margin:0.5em 0; border-radius:8px; border-left:3px solid #27ae60;">
              <strong>${t.name}</strong><br>
              <small><strong>Dosage:</strong> ${t.dose} &nbsp;|&nbsp; <strong>Fréquence:</strong> ${t.freq}</small>
            </div>`).join('')}
        </div>

        <!-- Traitements biologiques -->
        <div style="margin-bottom:1.2em;">
          <h4 style="color:#2d6a4f; margin-bottom:0.8em;">🌿 Traitements Biologiques</h4>
          ${biologiques.map(t => `
            <div style="background:#f0fff4; padding:0.8em 1em; margin:0.5em 0; border-radius:8px; border-left:3px solid #52b788;">
              <strong>${t.name}</strong><br>
              <small><strong>Dosage:</strong> ${t.dose} &nbsp;|&nbsp; <strong>Fréquence:</strong> ${t.freq}</small>
            </div>`).join('')}
        </div>

        <!-- Prévention -->
        <div style="margin-bottom:1.2em;">
          <h4 style="color:#2d6a4f; margin-bottom:0.8em;">🛡️ Mesures de Prévention</h4>
          <div style="background:#f9fff8; padding:1em; border-radius:8px; border-left:3px solid #a8d5ba;">
            <ol style="margin:0; padding-left:1.5em; color:#555; line-height:1.8;">
              ${disease.prevention.map(p => `<li>${p}</li>`).join('')}
            </ol>
          </div>
        </div>

        <!-- Actions urgentes -->
        <div style="background:${urgencyColor}18; padding:1.2em; border-radius:10px; border-left:5px solid ${urgencyColor};">
          <h4 style="color:${urgencyColor}; margin:0 0 0.8em;">⚡ ACTIONS URGENTES — Niveau ${disease.urgency}/5</h4>
          <ol style="margin:0; padding-left:1.5em; color:#444; line-height:1.8;">
            ${disease.actions.map(a => `<li>${a}</li>`).join('')}
          </ol>
        </div>

      </div>
    `;

    container.innerHTML += html;
  });
}

// ============================================
// GESTION DES ONGLETS
// ============================================

function setupTabs() {
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById(btn.dataset.tab).classList.add('active');
    });
  });
}

// ============================================
// GESTION DE L'IMAGE (ONGLET IA)
// ============================================

let selectedImage = null;

function setupImageHandler() {
  const cameraInput = document.getElementById('camera-input');
  const imageInput  = document.getElementById('image-input');
  const preview     = document.getElementById('image-preview-container');
  const previewImg  = document.getElementById('preview-image');
  const closeBtn    = document.querySelector('.btn-close-preview');
  const analyzeBtn  = document.getElementById('btn-image-diagnostic');
  const modal       = document.getElementById('loading-modal');

  // Sélection d'image (caméra ou galerie)
  [cameraInput, imageInput].forEach(input => {
    input.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (evt) => {
        selectedImage = evt.target.result;
        previewImg.src = selectedImage;
        preview.style.display = 'block';
        analyzeBtn.disabled = false;
        analyzeBtn.style.opacity = '1';
        analyzeBtn.style.cursor = 'pointer';
        const nameEl = document.getElementById('file-name-display');
        if (nameEl) nameEl.textContent = `📷 Fichier: ${file.name}`;
      };
      reader.readAsDataURL(file);
    });
  });

  // Fermer l'aperçu
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      preview.style.display = 'none';
      selectedImage = null;
      analyzeBtn.disabled = true;
      analyzeBtn.style.opacity = '0.5';
      analyzeBtn.style.cursor = 'not-allowed';
      if (cameraInput) cameraInput.value = '';
      if (imageInput) imageInput.value = '';
    });
  }

  // Bouton analyser avec IA
  analyzeBtn.addEventListener('click', async () => {
    if (!selectedImage) {
      alert('⚠️ Veuillez sélectionner une image d\'abord.');
      return;
    }

    const plantType = document.getElementById('image-plant-type').value;
    if (!plantType) {
      alert('⚠️ Veuillez sélectionner le type de plante.');
      return;
    }

    if (modal) modal.style.display = 'flex';

    try {
      const results = await analyzeImageWithHF(selectedImage, plantType);
      displayResults(results);

      document.getElementById('no-selection').style.display = 'none';
      const imgForm = document.querySelector('.image-diagnostic-form');
      if (imgForm) imgForm.style.display = 'none';
      const wrapper = document.getElementById('results-wrapper');
      wrapper.style.display = 'block';
      setTimeout(() => wrapper.scrollIntoView({ behavior: 'smooth' }), 100);

    } catch (err) {
      alert('❌ Erreur lors de l\'analyse: ' + err.message);
      console.error(err);
    } finally {
      if (modal) modal.style.display = 'none';
    }
  });
}

// ============================================
// FORMULAIRE DIAGNOSTIC PAR SYMPTÔMES
// ============================================

function setupSymptomForm() {
  const severityBtns = document.querySelectorAll('.severity-btn');
  const submitBtn    = document.getElementById('btn-diagnostic');

  severityBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      severityBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      document.getElementById('severity-level').value = this.dataset.level;
    });
  });

  submitBtn.addEventListener('click', () => {
    const plante   = document.getElementById('type-plante').value;
    const symptomes = document.getElementById('symptomes').value;
    const severite = document.getElementById('severity-level').value;
    const parties  = Array.from(document.querySelectorAll('input[name="partie"]:checked')).map(c => c.value);
    const duree    = document.getElementById('duree').value;

    if (!plante || !symptomes.trim() || !severite || parties.length === 0 || !duree) {
      alert('⚠️ Veuillez remplir tous les champs obligatoires (*)');
      return;
    }

    const resultats = diagnoseMaladie({ plante, symptomes, parties, severite, duree });
    displayResults(resultats);

    document.getElementById('no-selection').style.display = 'none';
    document.querySelector('.form-wrapper').style.display = 'none';
    const wrapper = document.getElementById('results-wrapper');
    wrapper.style.display = 'block';
    setTimeout(() => wrapper.scrollIntoView({ behavior: 'smooth' }), 100);
  });
}

// ============================================
// BOUTON NOUVEAU DIAGNOSTIC
// ============================================

function setupNewDiagBtn() {
  const btn = document.getElementById('btn-nouveau-diagnostic');
  if (btn) {
    btn.addEventListener('click', () => {
      // Réinitialiser tout
      document.getElementById('type-plante').value = '';
      document.getElementById('symptomes').value = '';
      document.getElementById('severity-level').value = '';
      document.getElementById('duree').value = '';
      document.querySelectorAll('input[name="partie"]').forEach(c => c.checked = false);
      document.querySelectorAll('input[name="conditions"]').forEach(c => c.checked = false);
      document.querySelectorAll('.severity-btn').forEach(b => b.classList.remove('active'));

      document.getElementById('no-selection').style.display = 'none';
      document.querySelector('.form-wrapper').style.display = 'block';
      document.getElementById('results-wrapper').style.display = 'none';

      setTimeout(() => document.querySelector('.form-wrapper').scrollIntoView({ behavior: 'smooth' }), 100);
    });
  }
}

// ============================================
// INITIALISATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  setupTabs();
  setupImageHandler();
  setupSymptomForm();
  setupNewDiagBtn();
});
