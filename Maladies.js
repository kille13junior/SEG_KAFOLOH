// ============================================
// ⚙️  CONFIGURATION — METTEZ VOTRE URL ICI
// ============================================

const API_URL = 'https://symptom-detector--soulekara8.replit.app'; // ← Remplacez par votre URL après déploiement

// ============================================
// BASE DE DONNÉES DES MALADIES
// (utilisée pour l'affichage et le fallback)
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
    description: 'Maladie fongique superficielle formant un dépôt blanc poudreux caractéristique sur les feuilles. Se développe par temps chaud et sec avec humidité modérée.',
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

// ============================================
// ANALYSE IMAGE VIA VOTRE API DÉPLOYÉE
// ============================================

async function analyzeImageWithHF(imageBase64, plantType) {
  const loadingText = document.getElementById('loading-text');

  // Étape 1 — Appel à votre API
  try {
    if (loadingText) loadingText.textContent = 'Envoi de l\'image à l\'API IA...';

    const response = await fetch(`${API_URL}/api/diagnostic/analyze-image`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ imageBase64, plantType })
    });

    if (!response.ok) {
      const err = await response.text();
      throw new Error(`API ${response.status}: ${err}`);
    }

    const data = await response.json();
    console.log('✅ Réponse API:', data);

    if (data.success && data.diseases && data.diseases.length > 0) {
      // Convertir le format API → format local attendu par displayResults
      return data.diseases.map(d => ({
        id: d.id,
        nom: d.nom_commun,
        emoji: d.emoji,
        scientific: d.nom_scientifique,
        description: d.description_complete,
        confidence: d.confidence,
        source: `IA (${data.source || 'API'})`,
        urgency: d.urgence?.niveau || 3,
        actions: d.urgence?.actions_immediates || [],
        treatments: [
          ...(d.traitement_chimique?.produits || []).map(p => ({
            name: p.nom, dose: p.dose || '—', freq: p.frequence || '—', type: 'chimique'
          })),
          ...(d.traitement_biologique || []).map(t => ({
            name: t, dose: 'Selon étiquette', freq: 'Voir fiche', type: 'biologique'
          }))
        ],
        prevention: d.prevention_culturale || []
      }));
    }

    // API répond mais aucune maladie trouvée
    console.warn('⚠️ API: aucune maladie détectée, fallback local...');
    return fallbackAnalyseLocale(imageBase64, plantType);

  } catch (error) {
    console.error('❌ Erreur API, fallback local:', error.message);
    return fallbackAnalyseLocale(imageBase64, plantType);
  }
}

// ============================================
// FALLBACK LOCAL (ANALYSE PAR COULEURS)
// ============================================

function fallbackAnalyseLocale(imageBase64, plantType) {
  return new Promise((resolve) => {
    const loadingText = document.getElementById('loading-text');
    if (loadingText) loadingText.textContent = 'Analyse locale en cours...';

    if (!imageBase64) {
      const d = Object.values(maladieBDD).find(d => d.plantes.includes(plantType))
        || Object.values(maladieBDD)[0];
      return resolve([{ ...d, confidence: 40, source: 'Analyse locale' }]);
    }

    const img = new Image();
    img.onload = function () {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = Math.min(img.width, 200);
      canvas.height = Math.min(img.height, 200);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      const counts = { white: 0, yellow: 0, orange: 0, brown: 0 };

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i], g = data[i + 1], b = data[i + 2];
        if (r > 200 && g > 200 && b > 200)           counts.white++;
        else if (r > 200 && g > 200 && b < 100)       counts.yellow++;
        else if (r > 200 && g > 100 && b < 80)        counts.orange++;
        else if (r > 100 && g < 80  && b < 80)        counts.brown++;
      }

      const total = data.length / 4;
      const r = {
        white:  counts.white  / total,
        yellow: counts.yellow / total,
        orange: counts.orange / total,
        brown:  counts.brown  / total
      };

      const scores = {};
      for (const [key, d] of Object.entries(maladieBDD)) {
        let s = d.plantes.includes(plantType) ? 30 : 0;
        if (r.white  > 0.08 && d.id === 'oidium')              s += 50;
        if (r.orange > 0.04 && d.id === 'rouille')             s += 50;
        if (r.brown  > 0.10 && d.id === 'mildiou')             s += 45;
        if (r.brown  > 0.06 && r.yellow > 0.04 && d.id === 'brulure_bacterienne') s += 45;
        if (r.brown  > 0.07 && d.id === 'alternariose')        s += 40;
        scores[key] = s;
      }

      const [bestKey] = Object.entries(scores).sort((a, b) => b[1] - a[1])[0];
      const best = maladieBDD[bestKey];

      resolve([{ ...best, confidence: Math.min(scores[bestKey], 65), source: 'Analyse locale' }]);
    };

    img.onerror = () => {
      const d = Object.values(maladieBDD).find(d => d.plantes.includes(plantType))
        || Object.values(maladieBDD)[0];
      resolve([{ ...d, confidence: 40, source: 'Analyse locale' }]);
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

    if (disease.plantes.includes(plante)) score += 30; else score -= 40;

    if (parties.includes('feuilles') && disease.id !== 'rouille') score += 15;
    if (parties.includes('tige') && (disease.id === 'mildiou' || disease.id === 'brulure_bacterienne')) score += 10;
    if (parties.includes('fruits') && ['mildiou','alternariose','brulure_bacterienne'].includes(disease.id)) score += 15;

    disease.symptoms_keywords.forEach(kw => {
      if (symptomesLower.includes(kw.toLowerCase())) score += 25;
    });

    const descMots = {
      mildiou:            ['aqueux','humide','blanc','brun','halo','duvet','pourriture'],
      oidium:             ['blanc','poudre','poudreu','frottan'],
      rouille:            ['orange','rouille','pustule','orangé'],
      brulure_bacterienne:['nécrose','halo jaune','noirâtre','brun','bactérien'],
      alternariose:       ['anneau','cible','concentrique','brun','circulaire']
    };
    (descMots[disease.id] || []).forEach(mot => {
      if (symptomesLower.includes(mot)) score += 15;
    });

    if ((symptomesLower.includes('humide') || symptomesLower.includes('pluie')) &&
        ['mildiou','alternariose','brulure_bacterienne'].includes(disease.id)) score += 20;

    if (duree === 'moins_1_semaine' && disease.urgency >= 4) score += 15;
    if (duree === '1_2_semaines') score += 15;
    if (duree === '3_4_semaines' || duree === 'plus_1_mois') score += 10;

    const sev = parseInt(severite);
    if (sev === 3 && disease.urgency >= 4) score += 15;
    if (sev === 2 && disease.urgency === 3) score += 10;
    if (sev === 1 && disease.urgency <= 2) score += 10;

    scores[key] = Math.max(0, score);
  }

  return Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .filter(([, s]) => s > 15)
    .map(([key, s]) => ({
      ...maladieBDD[key],
      confidence: Math.min(100, s),
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
        <p style="color: #666;">Suggestions :</p>
        <ul style="text-align:left; display:inline-block; color:#555;">
          <li>Décrivez les symptômes plus précisément</li>
          <li>Prenez une photo plus nette et proche</li>
          <li>Consultez un expert phytopathologiste</li>
        </ul>
      </div>`;
    return;
  }

  results.forEach((disease, idx) => {
    const conf = disease.confidence;
    const color = conf >= 70 ? '#27ae60' : conf >= 50 ? '#f39c12' : '#e74c3c';
    const label = conf >= 70 ? 'TRÈS PROBABLE' : conf >= 50 ? 'POSSIBLE' : 'À CONFIRMER';
    const urgencyColor = disease.urgency >= 4 ? '#e74c3c' : disease.urgency >= 2 ? '#f39c12' : '#27ae60';

    const chimiques = (disease.treatments || []).filter(t => t.type === 'chimique');
    const biologiques = (disease.treatments || []).filter(t => t.type === 'biologique');

    let html = `
      <div class="disease-card" style="background:#fff; border-radius:15px; padding:1.5em; margin-bottom:1.5em;
           box-shadow:0 2px 10px rgba(45,106,79,0.1); border-left:5px solid ${color};">

        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1em; margin-bottom:1.2em;">
          <h3 style="margin:0; font-size:1.5em; color:#2d6a4f;">${disease.emoji} ${disease.nom}</h3>
          <div style="background:${color}; color:#fff; padding:0.5em 1.2em; border-radius:25px; font-weight:bold;">
            ${label} : ${conf}%
          </div>
        </div>

        ${idx === 0
          ? `<div style="background:#e8f5f0; padding:0.8em 1.2em; border-radius:8px; margin-bottom:1em; border-left:4px solid #27ae60;">
               <strong>🎯 DIAGNOSTIC PRINCIPAL</strong> — Source : <em>${disease.source || 'analyse'}</em>
             </div>`
          : `<div style="background:#fff8e1; padding:0.6em 1em; border-radius:8px; margin-bottom:1em; border-left:4px solid #f39c12;">
               <strong>Diagnostic alternatif #${idx + 1}</strong>
             </div>`}

        <div style="background:#f9fff8; padding:1em; border-radius:8px; margin-bottom:1.2em; border-left:4px solid #e2f0d9;">
          <strong>🔬 ${disease.scientific}</strong>
          <p style="margin:0.5em 0 0; color:#555; line-height:1.6;">${disease.description}</p>
        </div>

        <div style="margin-bottom:1.2em;">
          <h4 style="color:#2d6a4f; margin-bottom:0.8em;">💊 Traitements Chimiques</h4>
          ${chimiques.length > 0 ? chimiques.map(t => `
            <div style="background:#f9fff8; padding:0.8em 1em; margin:0.5em 0; border-radius:8px; border-left:3px solid #27ae60;">
              <strong>${t.name}</strong><br>
              <small><strong>Dosage :</strong> ${t.dose} &nbsp;|&nbsp; <strong>Fréquence :</strong> ${t.freq}</small>
            </div>`).join('') : '<p style="color:#999; font-size:0.9em;">— non disponible —</p>'}
        </div>

        <div style="margin-bottom:1.2em;">
          <h4 style="color:#2d6a4f; margin-bottom:0.8em;">🌿 Traitements Biologiques</h4>
          ${biologiques.length > 0 ? biologiques.map(t => `
            <div style="background:#f0fff4; padding:0.8em 1em; margin:0.5em 0; border-radius:8px; border-left:3px solid #52b788;">
              <strong>${t.name}</strong><br>
              <small><strong>Dosage :</strong> ${t.dose} &nbsp;|&nbsp; <strong>Fréquence :</strong> ${t.freq}</small>
            </div>`).join('') : '<p style="color:#999; font-size:0.9em;">— non disponible —</p>'}
        </div>

        <div style="margin-bottom:1.2em;">
          <h4 style="color:#2d6a4f; margin-bottom:0.8em;">🛡️ Mesures de Prévention</h4>
          <div style="background:#f9fff8; padding:1em; border-radius:8px; border-left:3px solid #a8d5ba;">
            <ol style="margin:0; padding-left:1.5em; color:#555; line-height:1.8;">
              ${(disease.prevention || []).map(p => `<li>${p}</li>`).join('')}
            </ol>
          </div>
        </div>

        <div style="background:${urgencyColor}18; padding:1.2em; border-radius:10px; border-left:5px solid ${urgencyColor};">
          <h4 style="color:${urgencyColor}; margin:0 0 0.8em;">⚡ ACTIONS URGENTES — Niveau ${disease.urgency}/5</h4>
          <ol style="margin:0; padding-left:1.5em; color:#444; line-height:1.8;">
            ${(disease.actions || []).map(a => `<li>${a}</li>`).join('')}
          </ol>
        </div>

      </div>`;

    container.innerHTML += html;
  });
}

// ============================================
// ONGLETS
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
// GESTION IMAGE (ONGLET IA)
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

  [cameraInput, imageInput].forEach(input => {
    if (!input) return;
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
        if (nameEl) nameEl.textContent = `📷 Fichier : ${file.name}`;
      };
      reader.readAsDataURL(file);
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      preview.style.display = 'none';
      selectedImage = null;
      analyzeBtn.disabled = true;
      analyzeBtn.style.opacity = '0.5';
      analyzeBtn.style.cursor = 'not-allowed';
      if (cameraInput) cameraInput.value = '';
      if (imageInput)  imageInput.value  = '';
    });
  }

  analyzeBtn.addEventListener('click', async () => {
    if (!selectedImage) { alert('⚠️ Veuillez sélectionner une image.'); return; }
    const plantType = document.getElementById('image-plant-type').value;
    if (!plantType) { alert('⚠️ Veuillez sélectionner le type de plante.'); return; }

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
      alert('❌ Erreur : ' + err.message);
      console.error(err);
    } finally {
      if (modal) modal.style.display = 'none';
    }
  });
}

// ============================================
// FORMULAIRE SYMPTÔMES
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
    const plante    = document.getElementById('type-plante').value;
    const symptomes = document.getElementById('symptomes').value;
    const severite  = document.getElementById('severity-level').value;
    const parties   = Array.from(document.querySelectorAll('input[name="partie"]:checked')).map(c => c.value);
    const duree     = document.getElementById('duree').value;

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
  if (!btn) return;
  btn.addEventListener('click', () => {
    document.getElementById('no-selection').style.display = 'none';
    document.querySelector('.form-wrapper').style.display = 'block';
    document.getElementById('results-wrapper').style.display = 'none';
    setTimeout(() => document.querySelector('.form-wrapper').scrollIntoView({ behavior: 'smooth' }), 100);
  });
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
