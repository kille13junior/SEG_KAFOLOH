'use strict';

// ============================================================
// BASE DE DONNÉES DES CULTURES (informations d'affichage)
// ============================================================

const CROP_INFO = {
  riz:          { emoji: '🌾', sci: 'Oryza sativa',         fr: 'Riz',            saison: 'Saison des pluies',  duree: '90–120 jours',  rendement: '4–6 t/ha',   desc: 'Céréale de base pour une grande partie de la population mondiale. Requiert de l\'eau en abondance et un sol argileux retenant bien l\'humidité. Idéal dans les plaines inondables et les deltas.', conseils: ['Préparer les casiers avec bonne rétention d\'eau','Planter en ligne avec espacement 20×15 cm','Maintenir 5 cm d\'eau pendant la croissance','Fertilisation en 3 apports fractionnés','Récolter à 80% de maturité des grains'] },
  mais:         { emoji: '🌽', sci: 'Zea mays',             fr: 'Maïs',           saison: 'Printemps–Été',      duree: '70–100 jours',  rendement: '5–8 t/ha',   desc: 'Céréale polyvalente (alimentation, fourrage, industrie). Très productive dans les sols bien drainés, riches en azote. Sensible à la sécheresse en phase de floraison.', conseils: ['Sol bien préparé, profond et drainé','Semis dès que le sol atteint 10°C','Espacement 75×25 cm','Irriguer à la floraison (critique)','Apport d\'azote en couverture au stade 6 feuilles'] },
  pois_chiche:  { emoji: '🫘', sci: 'Cicer arietinum',      fr: 'Pois chiche',    saison: 'Hiver',              duree: '90–120 jours',  rendement: '1–2 t/ha',   desc: 'Légumineuse riche en protéines, résistante à la sécheresse. Fixe l\'azote atmosphérique et améliore la fertilité des sols. Adapté aux régions arides et semi-arides.', conseils: ['Inoculer les semences avec Rhizobium','Sol légèrement alcalin (pH 6.5–7.5)','Ne pas irriguer en excès','Récolter à maturité complète','Excellente culture de rotation'] },
  haricot_rouge:{ emoji: '🫘', sci: 'Phaseolus vulgaris',   fr: 'Haricot rouge',  saison: 'Saison chaude',      duree: '85–105 jours',  rendement: '1.5–2.5 t/ha',desc: 'Légumineuse riche en fer et protéines. Préfère les sols bien drainés, légèrement acides. Ne tolère pas l\'engorgement. Améliore la structure du sol par fixation d\'azote.', conseils: ['Éviter les sols compacts et humides','Espacement 50×10 cm','Irriguer régulièrement mais sans excès','Tuteurer si variété grimpante','Récolter avant dessèchement complet des gousses'] },
  pois_pigeon:  { emoji: '🫛', sci: 'Cajanus cajan',        fr: 'Pois pigeon',    saison: 'Kharif',             duree: '120–200 jours', rendement: '1–2 t/ha',   desc: 'Légumineuse vivace très résistante à la sécheresse. Excellente pour les zones semi-arides d\'Afrique et d\'Asie. Racines profondes qui améliorent le sol.', conseils: ['Très peu exigeant en eau','Semer en début de saison','Espacement 100×30 cm','Ne pas fertiliser à l\'excès','Récolter les gousses vertes ou sèches selon usage'] },
  moth_bean:    { emoji: '🌿', sci: 'Vigna aconitifolia',   fr: 'Haricot moth',   saison: 'Été',                duree: '60–90 jours',   rendement: '0.5–1 t/ha', desc: 'Légumineuse très résistante aux conditions extrêmes de sécheresse et de chaleur. Culture principale dans les zones arides. Excellente valeur nutritive.', conseils: ['Adapté aux sols sableux et pauvres','Très peu d\'irrigation nécessaire','Semer à la volée ou en ligne','Résiste aux températures > 40°C','Bonne culture de couverture'] },
  mung_bean:    { emoji: '🫛', sci: 'Vigna radiata',        fr: 'Haricot mungo',  saison: 'Kharif / Rabi',      duree: '60–75 jours',   rendement: '0.8–1.2 t/ha',desc: 'Légumineuse à croissance rapide, idéale pour l\'alimentation humaine et animale. Supporte bien la chaleur. Bonne culture de rotation qui enrichit le sol en azote.', conseils: ['Sol bien drainé et aéré','Irrigation légère et régulière','Espacement 30×10 cm','Protéger contre les insectes en fructification','Récolter avant ouverture des gousses'] },
  gramme_noir:  { emoji: '🫘', sci: 'Vigna mungo',          fr: 'Gramme noir',    saison: 'Kharif',             duree: '65–90 jours',   rendement: '0.8–1.5 t/ha',desc: 'Légumineuse très nutritive, riche en protéines et minéraux. Cultivation courante en Asie du Sud. Bonne tolérance à la sécheresse en phase végétative.', conseils: ['pH légèrement acide à neutre','Éviter l\'engorgement','Fertiliser modérément','Surveiller les pucerons','Récolter en plusieurs passages'] },
  lentille:     { emoji: '🫘', sci: 'Lens culinaris',       fr: 'Lentille',       saison: 'Hiver',              duree: '80–120 jours',  rendement: '1–1.5 t/ha', desc: 'Légumineuse riche en protéines et fer. Culture de saison froide, résistante au gel léger. Améliore la fertilité des sols par fixation d\'azote.', conseils: ['Préparer un lit de semence fin','Semer en rangées de 20 cm d\'espacement','Inoculer avec Rhizobium','Peu d\'irrigation nécessaire','Récolter à maturité complète'] },
  grenade:      { emoji: '🍎', sci: 'Punica granatum',      fr: 'Grenade',        saison: 'Toute l\'année',     duree: '150–180 jours', rendement: '10–15 t/ha', desc: 'Fruit tropical résistant à la sécheresse. Riche en antioxydants. Adapté aux zones semi-arides. L\'arbre peut produire pendant 25-30 ans une fois établi.', conseils: ['Sol bien drainé','Irrigation goutte à goutte conseillée','Tailler après récolte','Fertiliser en début de floraison','Protéger les fruits contre les oiseaux'] },
  banane:       { emoji: '🍌', sci: 'Musa spp.',            fr: 'Banane',         saison: 'Toute l\'année',     duree: '9–12 mois',     rendement: '20–40 t/ha', desc: 'Fruit tropical à croissance rapide. Très productive dans les zones chaudes et humides. Nécessite une irrigation régulière et des apports importants en potassium.', conseils: ['Plantation en début de saison humide','Espacement 2×2 m ou 3×3 m','Irrigation régulière (2–3x/semaine)','Fertilisation riche en potassium','Éliminer les rejets excédentaires'] },
  mangue:       { emoji: '🥭', sci: 'Mangifera indica',     fr: 'Mangue',         saison: 'Été',                duree: '3–5 ans (1re récolte)', rendement: '15–25 t/ha', desc: 'Roi des fruits tropicaux. L\'arbre peut vivre plus de 100 ans et produit abondamment. Préfère une saison sèche avant la floraison pour une bonne fructification.', conseils: ['Plantation en saison sèche','Arrosage modéré en saison sèche','Tailler pour former un port ouvert','Fertiliser après récolte','Protéger contre la mouche des fruits'] },
  raisin:       { emoji: '🍇', sci: 'Vitis vinifera',       fr: 'Raisin',         saison: 'Été',                duree: '3 ans (1re récolte)',   rendement: '15–25 t/ha', desc: 'Culture de vigne adaptée aux zones subtropicales et méditerranéennes. Requiert un sol bien drainé, de la chaleur et un ensoleillement suffisant pour la maturation.', conseils: ['Installer des treilles adaptées','Taille annuelle en hiver (dormance)','Irrigation contrôlée par goutte à goutte','Effeuillage pour aérer les grappes','Surveiller mildiou et oïdium'] },
  pasteque:     { emoji: '🍉', sci: 'Citrullus lanatus',    fr: 'Pastèque',       saison: 'Été',                duree: '70–90 jours',   rendement: '25–40 t/ha', desc: 'Cucurbitacée de saison chaude très appréciée. Requiert de la chaleur et du soleil. Excellente culture sous irrigation dans les zones semi-arides.', conseils: ['Sol sableux à limoneux','Irrigation régulière mais sans excès','Pollinisation par abeilles importante','Paillage pour conserver l\'humidité','Récolter quand la vrille la plus proche se dessèche'] },
  cantaloup:    { emoji: '🍈', sci: 'Cucumis melo',         fr: 'Melon',          saison: 'Été',                duree: '70–80 jours',   rendement: '20–30 t/ha', desc: 'Cucurbitacée sucrée adaptée aux zones chaudes et sèches avec irrigation. Très sensible au froid. Requiert peu de pluie mais une irrigation régulière.', conseils: ['Sol sableux bien drainé','Planter en buttes pour le drainage','Irrigation au pied uniquement','Récolter au premier signe de maturité (odeur, pédoncule qui se fissure)','Rotation obligatoire'] },
  pomme:        { emoji: '🍎', sci: 'Malus domestica',      fr: 'Pomme',          saison: 'Automne',            duree: '4–5 ans (1re récolte)', rendement: '20–30 t/ha', desc: 'Fruit tempéré nécessitant une période de froid hivernal (vernalisation). Adapté aux zones montagneuses. Grande diversité de variétés.', conseils: ['Zone d\'altitude conseillée','Taille de formation les 3 premières années','Éclaircissage des fruits','Fertilisation équilibrée','Traitement préventif contre la tavelure'] },
  orange:       { emoji: '🍊', sci: 'Citrus sinensis',      fr: 'Orange',         saison: 'Hiver',              duree: '3–5 ans (1re récolte)', rendement: '15–25 t/ha', desc: 'Agrume tropical à subtropical. Sensible au gel. Requiert des hivers doux et des étés chauds. Très riche en vitamine C et très demandé sur les marchés.', conseils: ['Sol légèrement acide (pH 5.5–6.5)','Irrigation régulière mais bien drainée','Tailler pour aérer','Fertiliser avec bore et zinc','Protéger contre la mouche des fruits'] },
  papaye:       { emoji: '🍑', sci: 'Carica papaya',        fr: 'Papaye',         saison: 'Toute l\'année',     duree: '6–9 mois',      rendement: '40–80 t/ha', desc: 'Fruit tropical à croissance très rapide, l\'une des plus productives par hectare. Très sensible au froid et à l\'engorgement. Nécessite sol drainé et chaud.', conseils: ['Planter sur buttes pour le drainage','Ne jamais laisser d\'eau stagner au pied','Espacement 2.5×2.5 m','Irriguer régulièrement mais modérément','Récolter quand 20% de la peau jaunit'] },
  coco:         { emoji: '🥥', sci: 'Cocos nucifera',       fr: 'Noix de coco',   saison: 'Toute l\'année',     duree: '6–7 ans (1re récolte)', rendement: '80–150 noix/arbre', desc: 'Palmier tropical indispensable dans les régions côtières. Très résistant au vent et à la salinité. Productif pendant 60-80 ans.', conseils: ['Plantation près de la côte conseillée','Sol sableux avec bonne drainage','Irrigation modérée','Fertilisation avec potassium (KCl)','Récolter toutes les 45-60 jours'] },
  coton:        { emoji: '🌿', sci: 'Gossypium hirsutum',   fr: 'Coton',          saison: 'Kharif',             duree: '150–180 jours', rendement: '2–3 t/ha',   desc: 'Fibre naturelle indispensable à l\'industrie textile. Requiert de la chaleur, du soleil et une bonne pluviométrie en début de cycle. Tolérant à la sécheresse en fin de cycle.', conseils: ['Sol argilo-limoneux profond','Semis après dernières pluies','Désherbage régulier les 45 premiers jours','Surveiller les insectes (chenilles)','Récolter par temps sec et ensoleillé'] },
  jute:         { emoji: '🌱', sci: 'Corchorus olitorius',  fr: 'Jute',           saison: 'Kharif',             duree: '90–120 jours',  rendement: '2–3 t/ha',   desc: 'Fibre végétale naturelle et biodégradable. Culture principale dans les deltas alluviaux (Bangladesh, Inde). Requiert forte humidité et températures élevées.', conseils: ['Sol alluvial riche préférable','Forte humidité nécessaire','Récolter avant floraison pour meilleure qualité des fibres','Rouissage dans l\'eau douce','Sécher les tiges à l\'ombre'] },
  cafe:         { emoji: '☕', sci: 'Coffea arabica',        fr: 'Café',           saison: 'Toute l\'année',     duree: '3–4 ans (1re récolte)', rendement: '2–4 t/ha', desc: 'Culture de plantation tropicale à haute valeur commerciale. Préfère les altitudes moyennes (600–2000m), les temperatures douces et une humidité modérée. Très sensible aux maladies foliaires.', conseils: ['Altitude 600–2000m idéale','Ombrage modéré conseillé','Sol légèrement acide (pH 5–6.5)','Irrigation en saison sèche','Récolte sélective des cerises rouges'] }
};

// ============================================================
// DATASET D'ENTRAÎNEMENT — k-NN
// Format: [N, P, K, temp, humidity, pH, rainfall, "label"]
// 70 exemples par culture × 22 cultures = 1540 points
// ============================================================

function generateDataset() {
  function r(min, max, dec = 1) {
    return parseFloat((Math.random() * (max - min) + min).toFixed(dec));
  }

  const samples = [];
  const crops = [
    // [label, N_range, P_range, K_range, temp_range, hum_range, pH_range, rain_range]
    ['riz',          [60,90],  [30,60],  [25,55],  [20,28],[75,90],[5.5,6.8],[175,300]],
    ['mais',         [75,100], [35,60],  [18,40],  [18,28],[55,80],[5.5,7.0],[ 60,110]],
    ['pois_chiche',  [20,45],  [55,80],  [70,100], [15,26],[13,50],[5.5,7.5],[ 65,115]],
    ['haricot_rouge',[15,35],  [40,80],  [160,200],[16,27],[15,60],[5.5,7.0],[ 95,135]],
    ['pois_pigeon',  [15,35],  [50,90],  [150,195],[23,32],[35,65],[5.0,6.8],[ 95,140]],
    ['moth_bean',    [15,35],  [30,65],  [155,195],[24,38],[25,60],[3.5,7.0],[ 40,75]],
    ['mung_bean',    [15,35],  [40,75],  [155,195],[22,36],[72,90],[6.2,7.0],[ 45,90]],
    ['gramme_noir',  [20,40],  [55,90],  [155,195],[24,37],[60,80],[5.5,7.5],[ 60,100]],
    ['lentille',     [15,25],  [30,60],  [15,35],  [15,28],[55,90],[5.5,7.5],[ 35,75]],
    ['grenade',      [0,20],   [0,25],   [30,55],  [18,40],[72,90],[5.5,7.5],[ 95,135]],
    ['banane',       [80,110], [60,85],  [45,75],  [24,32],[70,90],[5.5,7.0],[100,200]],
    ['mangue',       [0,20],   [18,45],  [25,50],  [24,37],[45,80],[3.5,7.0],[ 90,200]],
    ['raisin',       [10,25],  [115,145],[195,210],[7,24], [80,92],[5.5,7.0],[ 60,110]],
    ['pasteque',     [95,130], [8,35],   [45,70],  [24,38],[80,90],[6.0,7.0],[ 50,100]],
    ['cantaloup',    [95,130], [5,30],   [45,70],  [24,38],[80,90],[6.0,7.5],[ 20,40]],
    ['pomme',        [0,25],   [120,145],[195,210],[21,24],[90,95],[5.5,6.8],[110,150]],
    ['orange',       [0,20],   [5,25],   [5,20],   [9,20], [82,95],[6.0,8.0],[ 95,115]],
    ['papaye',       [40,55],  [55,75],  [45,65],  [33,39],[90,97],[6.5,8.0],[130,175]],
    ['coco',         [0,25],   [0,30],   [25,50],  [26,37],[85,97],[5.0,8.0],[130,200]],
    ['coton',        [105,140],[40,55],  [18,42],  [23,40],[60,82],[5.8,8.0],[ 60,120]],
    ['jute',         [60,90],  [40,55],  [38,55],  [24,37],[70,90],[6.0,7.2],[150,250]],
    ['cafe',         [95,115], [25,45],  [28,45],  [15,26],[50,70],[3.5,6.9],[150,275]]
  ];

  const SAMPLES_PER_CROP = 70;

  crops.forEach(([label, nR, pR, kR, tR, hR, phR, rR]) => {
    for (let i = 0; i < SAMPLES_PER_CROP; i++) {
      samples.push([
        r(nR[0], nR[1], 0),
        r(pR[0], pR[1], 0),
        r(kR[0], kR[1], 0),
        r(tR[0], tR[1], 1),
        r(hR[0], hR[1], 1),
        r(phR[0], phR[1], 1),
        r(rR[0], rR[1], 1),
        label
      ]);
    }
  });

  return samples;
}

// Génération unique du dataset
const DATASET = generateDataset();

// ============================================================
// NORMALISATION (min-max sur le dataset)
// ============================================================

let featureMin, featureMax;

function computeNormParams() {
  const n = DATASET.length;
  const numFeatures = 7;
  featureMin = new Array(numFeatures).fill(Infinity);
  featureMax = new Array(numFeatures).fill(-Infinity);

  DATASET.forEach(row => {
    for (let i = 0; i < numFeatures; i++) {
      const v = parseFloat(row[i]);
      if (v < featureMin[i]) featureMin[i] = v;
      if (v > featureMax[i]) featureMax[i] = v;
    }
  });
}

function normalize(values) {
  return values.map((v, i) => {
    const range = featureMax[i] - featureMin[i];
    return range === 0 ? 0 : (v - featureMin[i]) / range;
  });
}

// ============================================================
// ALGORITHME k-NN
// ============================================================

function euclidean(a, b) {
  let sum = 0;
  for (let i = 0; i < a.length; i++) sum += (a[i] - b[i]) ** 2;
  return Math.sqrt(sum);
}

function knn(query, k = 7) {
  const qNorm = normalize(query);

  // Calculer la distance à chaque point
  const distances = DATASET.map(row => {
    const features = [
      parseFloat(row[0]), parseFloat(row[1]), parseFloat(row[2]),
      parseFloat(row[3]), parseFloat(row[4]), parseFloat(row[5]),
      parseFloat(row[6])
    ];
    return { dist: euclidean(qNorm, normalize(features)), label: row[7] };
  });

  // Trier et garder les k plus proches
  distances.sort((a, b) => a.dist - b.dist);
  const kNearest = distances.slice(0, k);

  // Vote pondéré (1/dist²)
  const votes = {};
  kNearest.forEach(({ dist, label }) => {
    const weight = 1 / (dist * dist + 1e-9);
    votes[label] = (votes[label] || 0) + weight;
  });

  // Trier les candidats par score
  const total = Object.values(votes).reduce((s, v) => s + v, 0);
  const ranked = Object.entries(votes)
    .sort((a, b) => b[1] - a[1])
    .map(([label, score]) => ({
      label,
      confidence: Math.round((score / total) * 100)
    }));

  return ranked;
}

// ============================================================
// PRESETS RÉGIONAUX
// ============================================================

const REGION_PRESETS = {
  sahel_sec:       { nitrogen:20, phosphorus:20, potassium:15, temperature:35, humidity:25, rainfall:40,  ph:6.5 },
  sahel_pluie:     { nitrogen:50, phosphorus:35, potassium:30, temperature:30, humidity:75, rainfall:150, ph:6.5 },
  tropical_humide: { nitrogen:80, phosphorus:50, potassium:40, temperature:27, humidity:85, rainfall:220, ph:6.0 },
  subtropical:     { nitrogen:60, phosphorus:45, potassium:35, temperature:22, humidity:65, rainfall:120, ph:6.5 },
  montagne:        { nitrogen:40, phosphorus:55, potassium:60, temperature:15, humidity:70, rainfall:130, ph:6.0 },
  cote:            { nitrogen:10, phosphorus:15, potassium:45, temperature:28, humidity:90, rainfall:180, ph:7.0 }
};

function applyRegionPreset() {
  const region = document.getElementById('region').value;
  if (!region || !REGION_PRESETS[region]) return;
  const p = REGION_PRESETS[region];

  const fields = { nitrogen: 'n-val', phosphorus: 'p-val', potassium: 'k-val',
                   temperature: 't-val', humidity: 'h-val', rainfall: 'r-val', ph: 'ph-val' };

  Object.entries(fields).forEach(([id, valId]) => {
    const input = document.getElementById(id);
    input.value = p[id];
    document.getElementById(valId).textContent = p[id];
  });
}

// ============================================================
// UI — MISE À JOUR DES SLIDERS
// ============================================================

function updateVal(inputId, displayId) {
  document.getElementById(displayId).textContent = document.getElementById(inputId).value;
}

// ============================================================
// ANALYSE — CALCUL ET AFFICHAGE
// ============================================================

function getIdealRange(label, feature) {
  // Valeurs idéales connues par feature index
  const ideals = {
    riz:           [[60,90],  [30,60],  [25,55],  [20,28],[75,90],[5.5,6.8],[175,300]],
    mais:          [[75,100], [35,60],  [18,40],  [18,28],[55,80],[5.5,7.0],[60,110]],
    pois_chiche:   [[20,45],  [55,80],  [70,100], [15,26],[13,50],[5.5,7.5],[65,115]],
    haricot_rouge: [[15,35],  [40,80],  [160,200],[16,27],[15,60],[5.5,7.0],[95,135]],
    pois_pigeon:   [[15,35],  [50,90],  [150,195],[23,32],[35,65],[5.0,6.8],[95,140]],
    moth_bean:     [[15,35],  [30,65],  [155,195],[24,38],[25,60],[3.5,7.0],[40,75]],
    mung_bean:     [[15,35],  [40,75],  [155,195],[22,36],[72,90],[6.2,7.0],[45,90]],
    gramme_noir:   [[20,40],  [55,90],  [155,195],[24,37],[60,80],[5.5,7.5],[60,100]],
    lentille:      [[15,25],  [30,60],  [15,35],  [15,28],[55,90],[5.5,7.5],[35,75]],
    grenade:       [[0,20],   [0,25],   [30,55],  [18,40],[72,90],[5.5,7.5],[95,135]],
    banane:        [[80,110], [60,85],  [45,75],  [24,32],[70,90],[5.5,7.0],[100,200]],
    mangue:        [[0,20],   [18,45],  [25,50],  [24,37],[45,80],[3.5,7.0],[90,200]],
    raisin:        [[10,25],  [115,145],[195,210],[7,24], [80,92],[5.5,7.0],[60,110]],
    pasteque:      [[95,130], [8,35],   [45,70],  [24,38],[80,90],[6.0,7.0],[50,100]],
    cantaloup:     [[95,130], [5,30],   [45,70],  [24,38],[80,90],[6.0,7.5],[20,40]],
    pomme:         [[0,25],   [120,145],[195,210],[21,24],[90,95],[5.5,6.8],[110,150]],
    orange:        [[0,20],   [5,25],   [5,20],   [9,20], [82,95],[6.0,8.0],[95,115]],
    papaye:        [[40,55],  [55,75],  [45,65],  [33,39],[90,97],[6.5,8.0],[130,175]],
    coco:          [[0,25],   [0,30],   [25,50],  [26,37],[85,97],[5.0,8.0],[130,200]],
    coton:         [[105,140],[40,55],  [18,42],  [23,40],[60,82],[5.8,8.0],[60,120]],
    jute:          [[60,90],  [40,55],  [38,55],  [24,37],[70,90],[6.0,7.2],[150,250]],
    cafe:          [[95,115], [25,45],  [28,45],  [15,26],[50,70],[3.5,6.9],[150,275]]
  };
  return ideals[label] ? ideals[label][feature] : null;
}

function paramStatus(val, min, max) {
  if (val < min * 0.85 || val > max * 1.15) return 'pci-bad';
  if (val < min || val > max) return 'pci-warn';
  return 'pci-ok';
}

function recommend() {
  const N  = parseFloat(document.getElementById('nitrogen').value);
  const P  = parseFloat(document.getElementById('phosphorus').value);
  const K  = parseFloat(document.getElementById('potassium').value);
  const T  = parseFloat(document.getElementById('temperature').value);
  const H  = parseFloat(document.getElementById('humidity').value);
  const Ph = parseFloat(document.getElementById('ph').value);
  const R  = parseFloat(document.getElementById('rainfall').value);

  const modal = document.getElementById('loading-modal');
  const lt    = document.getElementById('loading-text');
  modal.style.display = 'flex';

  // Simuler le temps de calcul pour l'UX
  lt.textContent = 'Normalisation des données...';
  setTimeout(() => {
    lt.textContent = `Calcul des distances sur ${DATASET.length} points...`;
    setTimeout(() => {
      lt.textContent = 'Vote pondéré des k voisins...';
      setTimeout(() => {
        const results = knn([N, P, K, T, H, Ph, R], 9);
        modal.style.display = 'none';
        displayResults(results, [N, P, K, T, H, Ph, R]);
      }, 400);
    }, 300);
  }, 300);
}

function displayResults(results, userValues) {
  const top = results[0];
  const info = CROP_INFO[top.label] || {};

  const idealRanges = [0,1,2,3,4,5,6].map(i => getIdealRange(top.label, i));
  const featureNames = ['Azote (N)', 'Phosphore (P)', 'Potassium (K)', 'Température', 'Humidité', 'pH', 'Pluviométrie'];
  const units = ['kg/ha', 'kg/ha', 'kg/ha', '°C', '%', '', 'mm'];

  // ---- TOP RÉSULTAT ----
  const confColor = top.confidence >= 60 ? '#f9c74f' : top.confidence >= 40 ? '#f3722c' : '#e63946';

  document.getElementById('top-result').innerHTML = `
    <div class="top-label">🏆 Meilleure recommandation</div>
    <div class="top-crop-name">${info.emoji || '🌱'} ${info.fr || top.label}</div>
    <div class="top-crop-sci">${info.sci || ''}</div>

    <div class="confidence-bar-wrap">
      <div class="confidence-bar" style="width:${top.confidence}%; background:${confColor};"></div>
    </div>
    <div class="confidence-text">Compatibilité : <strong>${top.confidence}%</strong> — ${top.confidence >= 65 ? 'Très bonne correspondance' : top.confidence >= 45 ? 'Bonne correspondance' : 'Correspondance partielle'}</div>

    <div class="top-info-grid">
      <div class="info-box"><div class="info-box-title">📅 Saison</div><div class="info-box-val">${info.saison || '—'}</div></div>
      <div class="info-box"><div class="info-box-title">⏱️ Durée</div><div class="info-box-val">${info.duree || '—'}</div></div>
      <div class="info-box"><div class="info-box-title">📦 Rendement</div><div class="info-box-val">${info.rendement || '—'}</div></div>
    </div>

    <div class="top-desc">${info.desc || ''}</div>

    <div class="top-tips">
      <h4>💡 Conseils de production :</h4>
      <div class="tips-grid">
        ${(info.conseils || []).map(c => `<div class="tip-item">✔ ${c}</div>`).join('')}
      </div>
    </div>
  `;

  // ---- ALTERNATIVES ----
  const alts = results.slice(1, 5);
  document.getElementById('alt-results').innerHTML = `
    <h3 style="color:var(--green-dark); margin-bottom:1em;">🔄 Cultures Alternatives</h3>
    <div class="alt-grid">
      ${alts.map((r, i) => {
        const ci = CROP_INFO[r.label] || {};
        return `
          <div class="alt-card" style="animation-delay:${i * 0.1}s">
            <div class="alt-card-header">
              <div class="alt-crop-name">${ci.emoji || '🌱'} ${ci.fr || r.label}</div>
              <div class="alt-badge">${r.confidence}%</div>
            </div>
            <div class="alt-mini-bar-wrap">
              <div class="alt-mini-bar" style="width:${r.confidence}%"></div>
            </div>
            <p>${ci.saison ? `📅 ${ci.saison}` : ''} ${ci.duree ? `| ⏱ ${ci.duree}` : ''}</p>
          </div>`;
      }).join('')}
    </div>
  `;

  // ---- TABLEAU PARAMÈTRES ----
  document.getElementById('param-table').innerHTML = `
    <h3>📊 Analyse de vos Paramètres vs Idéal pour <em>${info.fr || top.label}</em></h3>
    <div class="param-compare-grid">
      ${userValues.map((val, i) => {
        const range = idealRanges[i];
        const cls   = range ? paramStatus(val, range[0], range[1]) : '';
        const icon  = cls === 'pci-ok' ? '✅' : cls === 'pci-warn' ? '⚠️' : '❌';
        return `
          <div class="param-compare-item ${cls}">
            <div class="pci-label">${icon} ${featureNames[i]}</div>
            <div class="pci-val">${val} ${units[i]}</div>
            <div class="pci-ideal">${range ? `Idéal : ${range[0]}–${range[1]}` : ''}</div>
          </div>`;
      }).join('')}
    </div>
    <p style="font-size:0.8em; color:#999; margin-top:1em;">
      ✅ Optimal &nbsp;|&nbsp; ⚠️ Limite acceptable &nbsp;|&nbsp; ❌ Hors plage recommandée
    </p>
  `;

  // Afficher la section résultats
  const section = document.getElementById('results-section');
  section.style.display = 'block';
  setTimeout(() => section.scrollIntoView({ behavior: 'smooth' }), 100);
}

// ============================================================
// RESET
// ============================================================

function resetForm() {
  document.getElementById('results-section').style.display = 'none';
  window.scrollTo({ top: 0, behavior: 'smooth' });
  document.getElementById('region').value = '';
}

// ============================================================
// INITIALISATION
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
  computeNormParams(); // Calculer min/max du dataset une seule fois
  console.log(`✅ k-NN prêt — ${DATASET.length} exemples chargés (${DATASET.length / 22} par culture)`);
});
