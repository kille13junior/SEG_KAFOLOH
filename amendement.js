'use strict';

const CROP_REQUIREMENTS = {
  mais: { ph: [5.8, 7.0], om_min: 2.5, N: 120, P: 40, K: 90 },
  riz: { ph: [5.5, 6.8], om_min: 3.0, N: 100, P: 35, K: 50 },
  cacao: { ph: [5.0, 7.0], om_min: 4.0, N: 80, P: 30, K: 80 },
  cafe: { ph: [5.0, 6.5], om_min: 3.5, N: 90, P: 30, K: 60 },
  tomate: { ph: [6.0, 6.8], om_min: 3.0, N: 150, P: 50, K: 200 },
  manioc: { ph: [5.5, 7.0], om_min: 2.0, N: 60, P: 20, K: 90 },
  banane: { ph: [5.5, 7.0], om_min: 4.0, N: 150, P: 80, K: 250 },
  coton: { ph: [5.8, 7.2], om_min: 2.0, N: 90, P: 35, K: 80 },
  anacarde: { ph: [5.5, 7.0], om_min: 1.5, N: 70, P: 25, K: 60 }
};

const COSTS = {
  lime_per_t: 50000,
  compost_per_t: 20000,
  fertilizer_per_kg: 200,
  manure_per_t: 15000,
  labor_flat: 50000
};

const BIOLOGICAL_SOLUTIONS = {
  compost: {
    name: 'Compost bien décomposé',
    description: 'Améliore la matière organique et la vie microbienne du sol',
    dose: '3-5 tonnes par hectare (t/ha)',
    period: 'Jour -30 à Jour -15 (J-30 à J-15)',
    cost_value: 20000,
    pros: ['Améliore structure du sol', 'Riche en micro-organismes', 'Économique', 'Améliore rétention d\'eau'],
    cons: ['Décomposition lente', 'Résultats variables']
  },
  manure: {
    name: 'Fumier animal bien décomposé',
    description: 'Source naturelle de nutriments et matière organique',
    dose: '5-10 tonnes par hectare (t/ha)',
    period: 'Jour -45 à Jour -30 (J-45 à J-30)',
    cost_value: 15000,
    pros: ['Coût faible', 'Éléments nutritifs équilibrés', 'Améliore fertilité', 'Écologique'],
    cons: ['Contient graines adventices', 'Transport coûteux', 'Odeurs']
  },
  humus: {
    name: 'Humus enrichi',
    description: 'Matière organique très décomposée, riche en nutriments et minéraux',
    dose: '2-4 tonnes par hectare (t/ha)',
    period: 'Jour -30 à Jour -15 (J-30 à J-15)',
    cost_value: 25000,
    pros: ['Très riche en nutriments', 'Améliore fertilité durable', 'Structure stable', 'Améliore rétention d\'eau'],
    cons: ['Coût modéré', 'Disponibilité limitée']
  },
  biochar: {
    name: 'Biochar (charbon activé)',
    description: 'Améliore rétention eau et éléments nutritifs, séquestre carbone',
    dose: '2-5 tonnes par hectare (t/ha)',
    period: 'Jour -30 (J-30)',
    cost_value: 25000,
    pros: ['Très longue durabilité', 'Améliore rétention', 'Augmente activité microbienne', 'Écologique'],
    cons: ['Coût initial élevé', 'Nécessite inoculation']
  },
  legume_residue: {
    name: 'Résidus de légumineuses',
    description: 'Apporte azote biologique et matière organique',
    dose: '2-4 tonnes par hectare (t/ha)',
    period: 'Jour -45 à Jour -15 (J-45 à J-15)',
    cost_value: 0,
    pros: ['Gratuit si produit localement', 'Azote biologique', 'Améliore fertilité', 'Durable'],
    cons: ['Disponibilité saisonnière', 'Transport']
  }
};

const CHEMICAL_SOLUTIONS = {
  urea: {
    name: 'Urée (46% Azote)',
    description: 'Engrais chimique azoté à libération rapide',
    dose: 'Variable selon besoin',
    period: 'Jour +30, Jour +60 (J+30, J+60)',
    cost_value: 200,
    pros: ['Absorption rapide', 'Dosage précis', 'Concentration élevée', 'Facilement disponible'],
    cons: ['Lessivage possible', 'Pollution potentielle', 'Coût énergétique']
  },
  dap: {
    name: 'Phosphate d\'ammonium dibasique (18-46-0)',
    description: 'Phosphore et azote pour développement racinaire',
    dose: 'Variable selon besoin',
    period: 'Jour -7 avant semis (J-7)',
    cost_value: 220,
    pros: ['Absorption rapide', 'Favorise racines', 'Dosage contrôlé', 'Efficace immédiate'],
    cons: ['Coût élevé', 'Risque de sur-dosage', 'Dépendance d\'importation']
  },
  npk: {
    name: 'Engrais Azote-Phosphore-Potassium équilibré (15-15-15)',
    description: 'Équilibre nutriments majeurs pour nutrition complète',
    dose: 'Variable selon besoin',
    period: 'Jour -15 à Jour 0 (J-15 à J0)',
    cost_value: 240,
    pros: ['Équilibre optimal', 'Une seule application', 'Résultats rapides', 'Contrôlé'],
    cons: ['Coût élevé', 'Pas adapté à tous les sols', 'Pollution possible']
  },
  lime: {
    name: 'Chaux agricole (Carbonate de calcium - CaCO₃)',
    description: 'Correction potentiel hydrogène (pH) pour sols acides',
    dose: '1-5 tonnes par hectare (t/ha) selon delta pH',
    period: 'Jour -45 avant semis (J-45)',
    cost_value: 50000,
    pros: ['Effet durable', 'Riche en calcium', 'Améliore structure', 'Corrige acidité'],
    cons: ['Effet lent', 'Immobilise éléments', 'Transport lourd']
  },
  gypsum: {
    name: 'Sulfate de calcium (Gypse - CaSO₄)',
    description: 'Améliore structure du sol et apporte calcium et soufre',
    dose: '0.5-2 tonnes par hectare (t/ha)',
    period: 'Jour -30 à Jour -15 (J-30 à J-15)',
    cost_value: 18000,
    pros: ['Améliore structure', 'Riche en calcium et soufre', 'Économique', 'Effet rapide'],
    cons: ['Action limitée sur pH', 'Nécessite eau pour efficacité']
  }
};

// Impact heuristique pour comparaison bio vs chim
const IMPACT_SCORES = {
  bio: { compost: 20, manure: 12, humus: 25, biochar: 18, legume_residue: 10 },
  chem: { urea: 20, dap: 18, npk: 22, lime: 25, gypsum: 10 }
};

const el = id => document.getElementById(id);
const round = (v, d = 2) => Math.round(v * Math.pow(10, d)) / Math.pow(10, d);
const formatCurrency = v => {
  const num = Math.round(v);
  return num.toLocaleString('fr-FR') + ' FCFA';
};
const capitalize = s => s ? s.charAt(0).toUpperCase() + s.slice(1) : s;
const escapeHtml = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

let analysisData = {};

function sanitizeFilename(name) {
  return String(name || 'rapport').normalize('NFKD').replace(/[^\w.-]/g, '_');
}

function showAnnouncement(type, title, subtitle) {
  const box = el('announce');
  const typeClass = type === 'ok' ? 'ok' : type === 'warn' ? 'warn' : 'bad';
  box.className = 'announce visible ' + typeClass;
  box.innerHTML = `<div><div class="msg">${escapeHtml(title)}</div><div class="sub">${escapeHtml(subtitle)}</div></div><button>→</button>`;
  box.classList.remove('hidden');

  const btn = box.querySelector('button');
  const proceed = () => hideAnnouncement();
  btn.onclick = proceed;

  setTimeout(() => hideAnnouncement(), 2500);
}

function hideAnnouncement() {
  const box = el('announce');
  box.classList.remove('visible');
  setTimeout(() => box.classList.add('hidden'), 420);
}

function setScoreVisual(score) {
  const circle = el('score-value');
  const text = el('score-text');
  const pct = Math.max(0, Math.min(100, score));

  circle.setAttribute('stroke-dasharray', `${pct},100`);

  if (pct >= 75) {
    circle.style.stroke = '#1e8449';
  } else if (pct >= 50) {
    circle.style.stroke = '#f39c12';
  } else {
    circle.style.stroke = '#e74c3c';
  }

  text.textContent = `${pct}%`;
}

function initFlow() {
  const crop = el('crop');
  const characteristics = el('characteristics');
  const prevBlock = el('previous-block');

  crop.addEventListener('change', () => {
    if (crop.value) {
      characteristics.classList.remove('hidden');
      setTimeout(() => el('ph').focus(), 160);
    } else {
      characteristics.classList.add('hidden');
      prevBlock.classList.add('hidden');
    }
  });

  const charFields = ['ph', 'om', 'n', 'p', 'k', 'texture', 'drainage', 'retention', 'salinity'];
  charFields.forEach(id => {
    const f = el(id);
    if (!f) return;
    f.addEventListener('input', () => {
      prevBlock.classList.remove('hidden');
    }, { passive: true });
  });
}

function analyze() {
  const cropKey = el('crop').value;
  if (!cropKey) {
    alert('Sélectionnez une culture');
    return;
  }

  const ph = parseFloat(el('ph').value) || 0;
  const om = parseFloat(el('om').value) || 0;
  const N = parseFloat(el('n').value) || 0;
  const P = parseFloat(el('p').value) || 0;
  const K = parseFloat(el('k').value) || 0;
  const texture = el('texture').value;
  const drainage = el('drainage').value;
  const retention = el('retention').value;
  const salinity = el('salinity').value === '' ? null : parseFloat(el('salinity').value);
  const surface = parseFloat(el('surface').value) || 0.0;
  const previous = el('previous').value || '—';
  const location = el('location').value || '—';

  const req = CROP_REQUIREMENTS[cropKey];
  let quickNeed = false;

  if (req) {
    if (ph < req.ph[0] || ph > req.ph[1]) quickNeed = true;
    if (om < req.om_min) quickNeed = true;
    if (N < req.N || P < req.P || K < req.K) quickNeed = true;
  }

  if (quickNeed) {
    showAnnouncement('warn', '⚠️ Amendement recommandé', `Corrections nécessaires pour ${capitalize(cropKey)}`);
  } else {
    showAnnouncement('ok', '✅ Sol compatible', `Bon potentiel pour ${capitalize(cropKey)}`);
  }

  computeAndDisplay({ ph, om, N, P, K, texture, drainage, retention, salinity, surface, previous, location }, cropKey);
}

function evaluateSolutionImpact(solutions) {
  let bioScore = 0;
  let chemScore = 0;

  (solutions || []).forEach(sol => {
    const amount = typeof sol.amount === 'number' ? sol.amount : 0;
    const multiplier = 1 + Math.min(2, Math.abs(amount) / 100);
    if (sol.bio && IMPACT_SCORES.bio[sol.bio]) {
      bioScore += IMPACT_SCORES.bio[sol.bio] * multiplier;
    }
    if (sol.chimique && IMPACT_SCORES.chem[sol.chimique]) {
      chemScore += IMPACT_SCORES.chem[sol.chimique] * multiplier;
    }
  });

  let recommendation = 'none';
  if (bioScore <= 0 && chemScore <= 0) recommendation = 'none';
  else if (bioScore > chemScore * 1.15) recommendation = 'bio';
  else if (chemScore > bioScore * 1.15) recommendation = 'chem';
  else recommendation = 'both';

  return { bioScore: round(bioScore, 1), chemScore: round(chemScore, 1), recommendation };
}

function computeAndDisplay(input, cropKey) {
  const { ph, om, N, P, K, texture, drainage, retention, salinity, surface, previous, location } = input;
  const req = CROP_REQUIREMENTS[cropKey];
  const problems = [];
  const solutions = [];
  let score = 100;

  if (req) {
    const [minPh, maxPh] = req.ph;
    if (ph < minPh) {
      const delta = minPh - ph;
      problems.push({ type: 'pH', text: `Sol trop acide (pH ${ph}) → cible ${minPh}–${maxPh}`, severity: 'high' });
      score -= Math.min(30, Math.round(delta * 15));
      solutions.push({ problem: 'pH acide', bio: 'legume_residue', chimique: 'lime', amount: delta * 1.5 });
    } else if (ph > maxPh) {
      const delta = ph - maxPh;
      problems.push({ type: 'pH', text: `Sol trop alcalin (pH ${ph}) → cible ${minPh}–${maxPh}`, severity: 'high' });
      score -= Math.min(25, Math.round(delta * 10));
    }

    if (om < req.om_min) {
      const delta = req.om_min - om;
      problems.push({ type: 'Matière organique', text: `M.O. faible (${om}%) → cible ≥${req.om_min}%`, severity: 'high' });
      score -= Math.min(25, Math.round(delta * 8));
      if (!solutions.some(s => s.problem === 'M.O. insuffisante')) {
        solutions.push({ problem: 'M.O. insuffisante', bio: 'humus', chimique: 'gypsum', amount: delta * 4 + 2 });
      }
    }

    if (N < req.N) {
      const delta = req.N - N;
      problems.push({ type: 'Azote (N)', text: `Carence Azote (${N} kg/ha) → besoin ~${req.N} kg/ha`, severity: 'medium' });
      score -= Math.min(15, Math.round(delta / 5));
      if (!solutions.some(s => s.problem === 'Azote insuffisant')) {
        solutions.push({ problem: 'Azote insuffisant', bio: 'legume_residue', chimique: 'urea', amount: delta });
      }
    }

    if (P < req.P) {
      const delta = req.P - P;
      problems.push({ type: 'Phosphore (P)', text: `Carence Phosphore (${P} kg/ha) → besoin ~${req.P} kg/ha`, severity: 'medium' });
      score -= Math.min(10, Math.round(delta / 4));
      if (!solutions.some(s => s.problem === 'Phosphore insuffisant')) {
        solutions.push({ problem: 'Phosphore insuffisant', bio: 'compost', chimique: 'dap', amount: delta });
      }
    }

    if (K < req.K) {
      const delta = req.K - K;
      problems.push({ type: 'Potassium (K)', text: `Carence Potassium (${K} kg/ha) → besoin ~${req.K} kg/ha`, severity: 'medium' });
      score -= Math.min(10, Math.round(delta / 6));
      if (!solutions.some(s => s.problem === 'Potassium insuffisant')) {
        solutions.push({ problem: 'Potassium insuffisant', bio: 'legume_residue', chimique: 'npk', amount: delta });
      }
    }
  }

  if (texture === 'sableux' && retention === 'faible') {
    problems.push({ type: 'Texture', text: 'Sol sableux → mauvaise rétention, paillage/compost recommandé', severity: 'low' });
    score -= 5;
    if (!solutions.some(s => s.problem === 'Texture sableuse')) {
      solutions.push({ problem: 'Texture sableuse', bio: 'compost', chimique: null, amount: 5 });
    }
  }

  if (drainage === 'pauvre') {
    problems.push({ type: 'Drainage', text: 'Drainage pauvre → risque d\'engorgement, aération nécessaire', severity: 'high' });
    score -= 8;
  }

  if (salinity !== null && salinity > 4) {
    const delta = salinity - 4;
    problems.push({ type: 'Salinité', text: `Salinité élevée (${salinity} dS/m) → lessivage possible`, severity: 'high' });
    score -= Math.min(15, Math.round(delta * 3));
  }

  score = Math.max(0, Math.min(100, round(score, 0)));

  const schedule = [
    { when: 'J-60', phase: 'Préparation', action: 'Prélèvement et analyse sols' },
    ...(solutions.some(s => s.chimique === 'lime' || s.chimique === 'gypsum' || s.bio === 'compost' || s.bio === 'humus') ? [{ when: 'J-45', phase: 'Correction', action: 'Épandre amendements + labour' }] : []),
    { when: 'J-15', phase: 'Préparation', action: 'Finition lit de semence' },
    { when: 'J0', phase: 'Semis', action: `Semis ${capitalize(cropKey)}` },
    { when: 'J+15', phase: 'Suivi', action: 'Contrôle levée' },
    ...(solutions.some(s => s.chimique === 'urea') ? [{ when: 'J+30-J+60', phase: 'Nutrition', action: 'Fractionnement Azote (N)' }] : []),
    { when: 'J+90', phase: 'Développement', action: 'Monitoring culture' }
  ];

  let improvementPct = 0;
  let improvementText = 'Amélioration estimée variable';

  if (score < 40) {
    improvementPct = 40;
    improvementText = '🔥 Amélioration majeure attendue (+35-45%)';
  } else if (score < 60) {
    improvementPct = 25;
    improvementText = '📈 Amélioration notable (+20-30%)';
  } else if (score < 75) {
    improvementPct = 15;
    improvementText = '➡️ Amélioration modérée (+10-20%)';
  } else {
    improvementPct = 8;
    improvementText = '✅ Amélioration limitée (+5-10%)';
  }

  const impactEval = evaluateSolutionImpact(solutions);

  analysisData = {
    crop: cropKey,
    input,
    problems,
    solutions,
    schedule,
    score,
    improvement: improvementText,
    improvementPct,
    impactEval
  };

  renderAnalysis(analysisData);
}

// === Nouveau : calculateCostSummary regroupant par catégorie ===
function calculateCostSummary(aData) {
  const { solutions, input } = aData || {};
  const surface = (input && input.surface) ? Number(input.surface) : 1;
  const costItems = [];
  let totalCost = 0;
  const addedProblems = new Set();

  if (solutions && solutions.length) {
    const uniqueProblems = [...new Set(solutions.map(s => s.problem))];

    uniqueProblems.forEach(problem => {
      if (addedProblems.has(problem)) return;
      const sol = solutions.find(s => s.problem === problem);
      if (!sol) return;

      if (sol.bio) {
        const bioSol = BIOLOGICAL_SOLUTIONS[sol.bio];
        if (bioSol) {
          const unitCost = Number(bioSol.cost_value || 0);
          const totalItemCost = unitCost * surface;
          costItems.push({
            name: bioSol.name,
            type: 'Biologique',
            unit: unitCost > 0 ? formatCurrency(unitCost) : 'Gratuit',
            total: unitCost > 0 ? formatCurrency(totalItemCost) : 'Gratuit',
            cost: totalItemCost
          });
          totalCost += totalItemCost;
        }
      }

      if (sol.chimique) {
        const chimSol = CHEMICAL_SOLUTIONS[sol.chimique];
        if (chimSol) {
          const unitCost = Number(chimSol.cost_value || 0);
          const totalItemCost = unitCost * surface;
          costItems.push({
            name: chimSol.name,
            type: 'Chimique',
            unit: formatCurrency(unitCost),
            total: formatCurrency(totalItemCost),
            cost: totalItemCost
          });
          totalCost += totalItemCost;
        }
      }

      addedProblems.add(problem);
    });
  }

  // Services / main-d'oeuvre
  const laborCost = Number(COSTS.labor_flat || 0) * surface;
  costItems.push({
    name: 'Main-d\'œuvre et application',
    type: 'Services',
    unit: formatCurrency(COSTS.labor_flat || 0),
    total: formatCurrency(laborCost),
    cost: laborCost
  });
  totalCost += laborCost;

  // Calculer totaux par catégorie
  const totalsByCategory = costItems.reduce((acc, it) => {
    const t = it.type || 'Autre';
    acc[t] = (acc[t] || 0) + (Number(it.cost) || 0);
    return acc;
  }, {});
  // garantir les clés présentes
  totalsByCategory['Biologique'] = totalsByCategory['Biologique'] || 0;
  totalsByCategory['Chimique'] = totalsByCategory['Chimique'] || 0;
  totalsByCategory['Services'] = totalsByCategory['Services'] || 0;

  return {
    items: costItems,
    total: totalCost,
    totalsByCategory
  };
}

function renderAnalysis(aData) {
  analysisData = aData || analysisData || {};
  const { crop, input, problems, solutions, schedule, score, improvement, improvementPct, impactEval } = analysisData;

  el('results').classList.remove('hidden');
  setScoreVisual(typeof score === 'number' ? score : 0);

  if (problems && problems.length) {
    el('diagnostic').innerHTML = `
      <div class="diagnostic-header">
        <div class="diagnostic-icon">🔍</div>
        <h3 class="diagnostic-title">État du sol</h3>
      </div>
      <div class="diagnostic-content">
        <div class="diagnostic-item">
          <div class="diagnostic-item-label">Culture</div>
          <div class="diagnostic-item-value">${capitalize(crop)}</div>
        </div>
        <div class="diagnostic-item">
          <div class="diagnostic-item-label">Score qualité</div>
          <div class="diagnostic-item-value">${score}%</div>
        </div>
        <div class="diagnostic-item">
          <div class="diagnostic-item-label">Problèmes</div>
          <div class="diagnostic-item-value">${problems.length}</div>
        </div>
        <div class="diagnostic-item">
          <div class="diagnostic-item-label">Rendement estimé</div>
          <div class="diagnostic-item-value">+${improvementPct}%</div>
        </div>
      </div>
    `;
  }

  if (problems && problems.length) {
    el('problems').innerHTML = `
      <div class="problems-header">
        <div class="problems-icon">⚠️</div>
        <h3 class="problems-title">Problèmes identifiés (${problems.length})</h3>
      </div>
      <ul class="problems-list">
        ${problems.map(p => `<li class="problem-item"><div class="problem-icon">🔴</div><div class="problem-text">${escapeHtml(p.text)}</div></li>`).join('')}
      </ul>
    `;
  } else {
    el('problems').innerHTML = `
      <div class="no-problems">
        <div class="no-problems-icon">✅</div>
        <div class="no-problems-text">Sol en bon état pour cette culture</div>
      </div>
    `;
  }

  // === Solutions display (table + centered banner) ===
  const solutionsArea = el('solutions');
  solutionsArea.innerHTML = '';

  const bioNames = [];
  const chemNames = [];
  (solutions || []).forEach(s => {
    if (s.bio) {
      const bio = BIOLOGICAL_SOLUTIONS[s.bio];
      if (bio && !bioNames.includes(bio.name)) bioNames.push(bio.name);
    }
    if (s.chimique) {
      const ch = CHEMICAL_SOLUTIONS[s.chimique];
      if (ch && !chemNames.includes(ch.name)) chemNames.push(ch.name);
    }
  });

  if (!bioNames.length && !chemNames.length) {
    solutionsArea.innerHTML = '<div style="padding:1rem;border-radius:10px;background:linear-gradient(135deg,#f0fff0,#eef8ee);font-weight:700;color:var(--green-600);text-align:center">✨ Sol optimal, aucune solution recommandée</div>';
  } else {
    const maxRows = Math.max(bioNames.length, chemNames.length);
    let tableHtml = `
      <div style="overflow:auto;">
        <table style="width:100%;border-collapse:collapse;background:#fff">
          <thead>
            <tr>
              <th style="padding:10px;background:#e8f6ea;border-bottom:1px solid #e0e0e0">Solutions biologiques</th>
              <th style="padding:10px;background:#fff0f0;border-bottom:1px solid #e0e0e0">Solutions chimiques</th>
            </tr>
          </thead>
          <tbody>
    `;
    for (let i = 0; i < maxRows; i++) {
      const bioCell = bioNames[i] ? escapeHtml(bioNames[i]) : '';
      const chemCell = chemNames[i] ? escapeHtml(chemNames[i]) : '';
      tableHtml += `<tr><td style="padding:10px;border-bottom:1px solid #f0f0f0">${bioCell}</td><td style="padding:10px;border-bottom:1px solid #f0f0f0">${chemCell}</td></tr>`;
    }
    tableHtml += `
          </tbody>
        </table>
      </div>
    `;

    let recText = '';
    if (impactEval) {
      const { bioScore, chemScore, recommendation } = impactEval;
      if (recommendation === 'bio') {
        recText = `✅ Méthode recommandée : Solutions biologiques (impact estimé bio=${bioScore} > chim=${chemScore})`;
      } else if (recommendation === 'chem') {
        recText = `✅ Méthode recommandée : Solutions chimiques (impact estimé chim=${chemScore} > bio=${bioScore})`;
      } else if (recommendation === 'both') {
        recText = `✅ Méthode recommandée : Combiner biologique + chimique (bio=${bioScore}, chim=${chemScore})`;
      } else {
        recText = `ℹ️ Aucune méthode spécifique recommandée (impact estimé faible)`;
      }
    }

    const bannerStyle = impactEval && impactEval.recommendation === 'chem' ? 'background:linear-gradient(135deg,#f06b6b,#c0392b);' : impactEval && impactEval.recommendation === 'bio' ? 'background:linear-gradient(135deg,#2ecc71,#16a085);' : impactEval && impactEval.recommendation === 'both' ? 'background:linear-gradient(135deg,#f39c12,#27ae60);' : 'background:#95a5a6;';

    const bannerHtml = `<div style="margin-top:0.8rem;padding:0.8rem;border-radius:10px;font-weight:800;text-align:center;color:#fff;${bannerStyle}">${escapeHtml(recText)}</div>`;

    solutionsArea.innerHTML = tableHtml + bannerHtml;
  }

  // === Schedule ===
  el('schedule-table').innerHTML = `
    <table>
      <thead><tr><th>📅 Période</th><th>Phase</th><th>Action</th></tr></thead>
      <tbody>
        ${(schedule || []).map(s => `<tr><td><strong>${escapeHtml(s.when)}</strong></td><td><span class="schedule-phase">${escapeHtml(s.phase)}</span></td><td>${escapeHtml(s.action)}</td></tr>`).join('')}
      </tbody>
    </table>
  `;

  // === Coûts : affichage groupé par catégorie ===
  const costSummary = calculateCostSummary(analysisData);
  const grouped = {
    Biologique: costSummary.items.filter(i => i.type === 'Biologique'),
    Chimique: costSummary.items.filter(i => i.type === 'Chimique'),
    Services: costSummary.items.filter(i => i.type === 'Services')
  };

  const groupToHtml = (label, arr) => {
    if (!arr || !arr.length) return '';
    return `
      <tr><td colspan="4" style="background:#f7f7f7;font-weight:800;padding:10px">${escapeHtml(label)} — sous-total : <strong style="float:right">${formatCurrency(arr.reduce((s, it) => s + (Number(it.cost) || 0), 0))}</strong></td></tr>
      ${arr.map(item => `
        <tr>
          <td><strong>${escapeHtml(item.name)}</strong></td>
          <td>${escapeHtml(item.type)}</td>
          <td style="text-align: right;">${escapeHtml(item.unit)}</td>
          <td style="text-align: right;"><strong>${escapeHtml(item.total)}</strong></td>
        </tr>
      `).join('')}
    `;
  };

  el('costs-table').innerHTML = `
    <table>
      <thead>
        <tr>
          <th>Amendement / Service</th>
          <th>Type</th>
          <th style="text-align: right;">Coût unitaire</th>
          <th style="text-align: right;">Coût total (${escapeHtml(String(input.surface || 1))} ha)</th>
        </tr>
      </thead>
      <tbody>
        ${groupToHtml('Biologique', grouped.Biologique)}
        ${groupToHtml('Chimique', grouped.Chimique)}
        ${groupToHtml('Services', grouped.Services)}
        <tr class="cost-total">
          <td colspan="2"><strong>💰 COÛT TOTAL ESTIMÉ</strong></td>
          <td colspan="2" style="text-align: right;"><strong>${formatCurrency(costSummary.total)}</strong></td>
        </tr>
      </tbody>
    </table>
  `;

  setTimeout(() => el('results').scrollIntoView({ behavior: 'smooth' }), 160);
}

function generatePDFContent() {
  const { crop, input, problems, solutions, schedule, score, improvement, improvementPct, impactEval } = analysisData;

  // Build lists of names only
  const bioList = (solutions || []).filter(s => s.bio).map(s => {
    const b = BIOLOGICAL_SOLUTIONS[s.bio];
    return b ? b.name : null;
  }).filter(Boolean);

  const chemList = (solutions || []).filter(s => s.chimique).map(s => {
    const c = CHEMICAL_SOLUTIONS[s.chimique];
    return c ? c.name : null;
  }).filter(Boolean);

  const maxRows = Math.max(bioList.length, chemList.length);
  let solutionsTableRows = '';
  if (maxRows === 0) {
    solutionsTableRows = `<tr><td style="padding:8px">Aucune solution recommandée</td><td style="padding:8px"></td></tr>`;
  } else {
    for (let i = 0; i < maxRows; i++) {
      solutionsTableRows += `<tr><td style="padding:8px;border-bottom:1px solid #eee">${escapeHtml(bioList[i] || '')}</td><td style="padding:8px;border-bottom:1px solid #eee">${escapeHtml(chemList[i] || '')}</td></tr>`;
    }
  }

  let recHtml = '';
  if (impactEval) {
    const { bioScore, chemScore, recommendation } = impactEval;
    if (recommendation === 'bio') {
      recHtml = `<div style="padding:10px;background:#2ecc71;color:#fff;border-radius:8px;font-weight:800;text-align:center">Méthode recommandée : Solutions biologiques (impact estimé bio=${bioScore} > chim=${chemScore})</div>`;
    } else if (recommendation === 'chem') {
      recHtml = `<div style="padding:10px;background:#e74c3c;color:#fff;border-radius:8px;font-weight:800;text-align:center">Méthode recommandée : Solutions chimiques (impact estimé chim=${chemScore} > bio=${bioScore})</div>`;
    } else if (recommendation === 'both') {
      recHtml = `<div style="padding:10px;background:#f39c12;color:#fff;border-radius:8px;font-weight:800;text-align:center">Méthode recommandée : Combiner biologique + chimique (bio=${bioScore}, chim=${chemScore})</div>`;
    } else {
      recHtml = `<div style="padding:10px;background:#95a5a6;color:#fff;border-radius:8px;font-weight:800;text-align:center">Aucune méthode spécifique recommandée (impact estimé faible)</div>`;
    }
  }

  // costs and subtotals
  const costSummary = calculateCostSummary(analysisData);
  const bioTotal = costSummary.totalsByCategory['Biologique'] || 0;
  const chemTotal = costSummary.totalsByCategory['Chimique'] || 0;
  const servTotal = costSummary.totalsByCategory['Services'] || 0;
  const costRowsPdf = costSummary.items.map(it => `<tr><td>${escapeHtml(it.name)}</td><td>${escapeHtml(it.type)}</td><td style="text-align:right">${escapeHtml(it.total)}</td></tr>`).join('');

  let pdfHtml = `
    <html>
    <head>
      <meta charset="utf-8" />
      <style>
        body { font-family: Arial, sans-serif; color: #222; line-height:1.4; }
        h1 { color: #27ae60; text-align:center; }
        table { width:100%; border-collapse:collapse; margin:12px 0; }
        th { background:#27ae60; color:#fff; padding:8px; text-align:left; }
        td { padding:8px; border-bottom:1px solid #eee; }
        .section { margin:12px 0; padding:10px; border-left:4px solid #27ae60; background:#f8f9fa; }
      </style>
    </head>
    <body>
      <h1>RAPPORT D'AMENDEMENT</h1>

      <div class="section">
        <strong>Culture :</strong> ${capitalize(crop)}<br/>
        <strong>Surface :</strong> ${input.surface} ha<br/>
        <strong>Score :</strong> ${score}% — <strong>Rendement estimé :</strong> +${improvementPct}%
      </div>

      <div class="section">
        <h3>Solutions recommandées</h3>
        <table>
          <thead>
            <tr><th>Solutions biologiques</th><th>Solutions chimiques</th></tr>
          </thead>
          <tbody>
            ${solutionsTableRows}
          </tbody>
        </table>
        <div style="margin-top:10px">${recHtml}</div>
      </div>

      <div class="section">
        <h3>Problèmes identifiés</h3>
        ${(problems || []).length ? `<ul>${problems.map(p => `<li>${escapeHtml(p.text)}</li>`).join('')}</ul>` : '<p>Pas de problèmes majeurs détectés</p>'}
      </div>

      <div class="section">
        <h3>Calendrier</h3>
        <table>
          <thead><tr><th>Période</th><th>Phase</th><th>Action</th></tr></thead>
          <tbody>
            ${(schedule || []).map(s => `<tr><td>${escapeHtml(s.when)}</td><td>${escapeHtml(s.phase)}</td><td>${escapeHtml(s.action)}</td></tr>`).join('')}
          </tbody>
        </table>
      </div>

      <div class="section">
        <h3>Résumé des coûts</h3>
        <table>
          <thead><tr><th>Amendement / Service</th><th>Type</th><th style="text-align:right">Coût total</th></tr></thead>
          <tbody>
            ${costRowsPdf}
            <tr><td colspan="2" style="font-weight:800">Sous-total Biologique</td><td style="text-align:right;font-weight:800">${formatCurrency(bioTotal)}</td></tr>
            <tr><td colspan="2" style="font-weight:800">Sous-total Chimique</td><td style="text-align:right;font-weight:800">${formatCurrency(chemTotal)}</td></tr>
            <tr><td colspan="2" style="font-weight:800">Services</td><td style="text-align:right;font-weight:800">${formatCurrency(servTotal)}</td></tr>
            <tr><td colspan="2"><strong>COÛT TOTAL ESTIMÉ</strong></td><td style="text-align:right"><strong>${formatCurrency(costSummary.total)}</strong></td></tr>
          </tbody>
        </table>
      </div>

    </body>
    </html>
  `;

  return pdfHtml;
}

function exportPDF() {
  if (!analysisData.crop) return alert('Aucune analyse disponible');

  try {
    const pdfContent = generatePDFContent();
    const container = document.createElement('div');

    // placer hors écran pour que html2pdf puisse mesurer/render correctement
    container.style.position = 'fixed';
    container.style.left = '-9999px';
    container.style.top = '0';
    container.style.width = '1200px'; // largeur suffisante pour rendu A4
    container.innerHTML = pdfContent;
    document.body.appendChild(container);

    // attendre que toutes les images (le cas échéant) soient chargées
    const images = container.querySelectorAll('img');
    const loadPromises = Array.from(images).map(img => {
      if (img.complete) return Promise.resolve();
      return new Promise(resolve => { img.onload = img.onerror = resolve; });
    });

    Promise.all(loadPromises).then(() => {
      const filename = sanitizeFilename(`rapport-amendement-${analysisData.crop}`) + '.pdf';

      html2pdf()
        .set({
          margin: 10,
          filename,
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2, useCORS: true },
          jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4' }
        })
        .from(container)
        .save()
        .then(() => {
          if (container && container.parentNode) container.parentNode.removeChild(container);
        })
        .catch(err => {
          console.error('html2pdf error:', err);
          if (container && container.parentNode) container.parentNode.removeChild(container);
          alert('Erreur lors de la génération du PDF (voir console).');
        });
    }).catch(err => {
      console.error('Image load error:', err);
      if (container && container.parentNode) container.parentNode.removeChild(container);
      alert('Certaines images n\'ont pas chargé, tentative d\'export PDF annulée. Voir console.');
    });
  } catch (err) {
    console.error('exportPDF exception:', err);
    alert('Erreur inattendue lors de la préparation du PDF (voir console).');
  }
}

function exportExcel() {
  if (!analysisData.crop) return alert('Aucune analyse disponible');

  try {
    const wb = XLSX.utils.book_new();

    // Résumé
    const resumeData = [
      ['RAPPORT D\'AMENDEMENT INTELLIGENT'],
      [''],
      ['Culture', capitalize(analysisData.crop)],
      ['Surface', (analysisData.input && analysisData.input.surface ? String(analysisData.input.surface) : '1') + ' hectares'],
      ['Score qualité', (analysisData.score !== undefined ? String(analysisData.score) : '0') + '%'],
      ['Rendement estimé', '+' + (analysisData.improvementPct !== undefined ? String(analysisData.improvementPct) : '0') + '%'],
      ['Amélioration attendue', analysisData.improvement || '—'],
      ['', '']
    ];
    const ws1 = XLSX.utils.aoa_to_sheet(resumeData);
    ws1['!cols'] = [{ wch: 30 }, { wch: 30 }];
    XLSX.utils.book_append_sheet(wb, ws1, 'Résumé');

    // Solutions
    const bioList = (analysisData.solutions || []).filter(s => s.bio).map(s => {
      const b = BIOLOGICAL_SOLUTIONS[s.bio];
      return b ? String(b.name) : '';
    }).filter(Boolean);
    const chemList = (analysisData.solutions || []).filter(s => s.chimique).map(s => {
      const c = CHEMICAL_SOLUTIONS[s.chimique];
      return c ? String(c.name) : '';
    }).filter(Boolean);

    const maxRows = Math.max(bioList.length, chemList.length);
    const solutionsSheet = [['Solutions biologiques', 'Solutions chimiques']];
    if (maxRows === 0) solutionsSheet.push(['Aucune solution recommandée', '']);
    else {
      for (let i = 0; i < maxRows; i++) {
        solutionsSheet.push([bioList[i] || '', chemList[i] || '']);
      }
    }

    const ie = analysisData.impactEval || null;
    let recText = '—';
    if (ie) {
      if (ie.recommendation === 'bio') recText = `Privilégier biologique (bio=${ie.bioScore} > chem=${ie.chemScore})`;
      else if (ie.recommendation === 'chem') recText = `Privilégier chimique (chem=${ie.chemScore} > bio=${ie.bioScore})`;
      else if (ie.recommendation === 'both') recText = `Combiner biologique + chimique (bio=${ie.bioScore}, chem=${ie.chemScore})`;
    }
    solutionsSheet.push([], ['Recommandation', recText]);

    const ws2 = XLSX.utils.aoa_to_sheet(solutionsSheet);
    ws2['!cols'] = [{ wch: 40 }, { wch: 40 }];
    XLSX.utils.book_append_sheet(wb, ws2, 'Solutions');

    // Problèmes
    const problemsData = [['Type de problème', 'Description', 'Sévérité']];
    (analysisData.problems || []).forEach(p => problemsData.push([String(p.type || ''), String(p.text || ''), String(p.severity || '')]));
    const ws3 = XLSX.utils.aoa_to_sheet(problemsData);
    ws3['!cols'] = [{ wch: 20 }, { wch: 60 }, { wch: 15 }];
    XLSX.utils.book_append_sheet(wb, ws3, 'Problèmes');

    // Calendrier
    const scheduleData = [['Période', 'Phase', 'Action']];
    (analysisData.schedule || []).forEach(s => scheduleData.push([String(s.when || ''), String(s.phase || ''), String(s.action || '')]));
    const ws4 = XLSX.utils.aoa_to_sheet(scheduleData);
    ws4['!cols'] = [{ wch: 15 }, { wch: 20 }, { wch: 40 }];
    XLSX.utils.book_append_sheet(wb, ws4, 'Calendrier');

    // Coûts (avec sous-totaux par catégorie)
    const costSummary = calculateCostSummary(analysisData);
    const costsData = [['Amendement / Service', 'Type', 'Coût unitaire', 'Coût total (hectares)']];
    costSummary.items.forEach(item => {
      costsData.push([String(item.name || ''), String(item.type || ''), String(item.unit || ''), String(item.total || '')]);
    });
    costsData.push([]);
    costsData.push(['Sous-total Biologique', '', '', formatCurrency(costSummary.totalsByCategory['Biologique'] || 0)]);
    costsData.push(['Sous-total Chimique', '', '', formatCurrency(costSummary.totalsByCategory['Chimique'] || 0)]);
    costsData.push(['Services', '', '', formatCurrency(costSummary.totalsByCategory['Services'] || 0)]);
    costsData.push([]);
    costsData.push(['COÛT TOTAL ESTIMÉ', '', '', formatCurrency(costSummary.total || 0)]);
    const ws5 = XLSX.utils.aoa_to_sheet(costsData);
    ws5['!cols'] = [{ wch: 30 }, { wch: 15 }, { wch: 20 }, { wch: 20 }];
    XLSX.utils.book_append_sheet(wb, ws5, 'Coûts');

    const filename = sanitizeFilename(`rapport-amendement-${analysisData.crop}`) + '.xlsx';
    XLSX.writeFile(wb, filename);
  } catch (err) {
    console.error('exportExcel exception:', err);
    alert('Erreur lors de la génération du fichier Excel (voir console).');
  }
}

function downloadJSON() {
  if (!analysisData.crop) return alert('Aucune analyse disponible');

  const costSummary = calculateCostSummary(analysisData);
  const dataToDownload = {
    ...analysisData,
    costSummary
  };

  const blob = new Blob([JSON.stringify(dataToDownload, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `rapport-amendement-${analysisData.crop}.json`;
  link.click();
  URL.revokeObjectURL(url);
}

function resetForm() {
  el('crop').value = '';
  el('characteristics').classList.add('hidden');
  el('previous-block').classList.add('hidden');
  el('ph').value = 6.0;
  el('om').value = 2.0;
  el('n').value = 50;
  el('p').value = 20;
  el('k').value = 60;
  el('texture').value = 'limoneux';
  el('drainage').value = 'bon';
  el('retention').value = 'bonne';
  el('salinity').value = '';
  el('surface').value = 1.00;
  el('location').value = '';
  el('previous').value = '';
  el('results').classList.add('hidden');
  hideAnnouncement();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.addEventListener('DOMContentLoaded', () => {
  initFlow();
  el('announce').classList.add('hidden');
  window.analyze = analyze;
  window.resetForm = resetForm;
  window.exportPDF = exportPDF;
  window.exportExcel = exportExcel;
  window.downloadJSON = downloadJSON;
});