function getCurrentUser() {
  return localStorage.getItem('user-login') || "Anonyme";
}

function showUserSession() {
  const user = getCurrentUser();
  const userSession = document.getElementById('user-session');
  if (user) userSession.textContent = `👤 ${user}`;
  else userSession.innerHTML = `<a href="login.html" style="color:#27ae60;">Connexion</a>`;
}

showUserSession();

// Données complètes des zones agricoles
const zoneAgriculture = {
  "Zone Côtière (Sud)": {
    icon: "🌊",
    description: "Climat tropical humide, idéal pour les cultures de plantation",
    villes: "Abidjan, Grand-Bassam, Jacqueville, Tabou",
    region: "Lagunes",
    rainfall: "2200mm/an",
    bestCrops: ["cacao", "cafe", "cocotier", "banane", "ananas", "noix_de_coco", "plantain"],
    characteristics: [
      "✓ Climat tropical humide avec pluies abondantes",
      "✓ Sols riches en matière organique",
      "✓ Température stable entre 24-28°C",
      "✓ Humidité élevée (80-90%)",
      "✓ Accès aux débouchés commerciaux"
    ],
    tips: [
      "🌴 Privilégie les cultures d'exportation (cacao, café)",
      "💧 Gère bien l'humidité pour éviter les maladies fongiques",
      "🚀 Accès aux ports : excellente logistique",
      "🌳 Maintien de cultures d'ombrage pour le cacao",
      "♻️ Rotation des cultures importante"
    ],
    season: [
      { month: "Jan-Fév", activity: "Préparation des sols, plantation" },
      { month: "Mar-Mai", activity: "Croissance végétative" },
      { month: "Jun-Août", activity: "Récolte cacao (saison principale)" },
      { month: "Sep-Déc", activity: "Récolte secondaire, entretien" }
    ]
  },
  "Zone Forestière Centrale": {
    icon: "🌳",
    description: "Forêts humides, excellente biodiversité agricole",
    villes: "Yamoussoukro, Toumodi, Dimbokro, Tiassalé",
    region: "Forêts humides",
    rainfall: "1800mm/an",
    bestCrops: ["cacao", "cafe", "noix_de_cajou", "igname", "manioc", "avocat", "safran_rouge"],
    characteristics: [
      "✓ Forêts denses avec bonne couverture végétale",
      "✓ Sols fertiles et bien structurés",
      "✓ Température modérée 20-27°C",
      "✓ Humidité stable 75-85%",
      "✓ Diversité biologique naturelle"
    ],
    tips: [
      "🌱 Exploite la biodiversité naturelle",
      "☕ Excellente zone pour le café haut de gamme",
      "🎯 Cultive le cacao avec ombrage naturel",
      "🥜 Noix de cajou : cultures pérennes rentables",
      "🔄 Diversifie les cultures pour stabiliser revenus"
    ],
    season: [
      { month: "Jan-Fév", activity: "Plantation, préparation" },
      { month: "Mar-Juin", activity: "Croissance et développement" },
      { month: "Juil-Sep", activity: "Récolte cacao et café" },
      { month: "Oct-Déc", activity: "Récolte secondaire, préparation" }
    ]
  },
  "Zone de Transition": {
    icon: "🌤️",
    description: "Entre forêt et savane, diversité agricole importante",
    villes: "Bouaké, Kossou, Adzopé, Abengourou",
    region: "Forêts-Savane",
    rainfall: "1500mm/an",
    bestCrops: ["coton", "mais", "cacao", "noix_de_cajou", "arachide", "soja", "tomate"],
    characteristics: [
      "✓ Zone de transition entre forêt et savane",
      "✓ Sols variés mais généralement fertiles",
      "✓ Température 22-29°C",
      "✓ Humidité modérée 65-80%",
      "✓ Saison sèche marquée mais supportable"
    ],
    tips: [
      "🧵 Zone idéale pour le coton (culture majeure)",
      "🌽 Maïs : culture de base très rentable",
      "🥜 Rotation maïs-arachide très recommandée",
      "☕ Cacao possible avec gestion hydrique",
      "🌍 Marché local et d'exportation actif"
    ],
    season: [
      { month: "Avr-Mai", activity: "Préparation et semis coton/maïs" },
      { month: "Juin-Août", activity: "Croissance et développement" },
      { month: "Sep-Déc", activity: "Récolte coton et maïs" },
      { month: "Jan-Mar", activity: "Préparation sols pour saison suivante" }
    ]
  },
  "Zone Soudanienne (Nord)": {
    icon: "🌵",
    description: "Savane sèche, climat semi-aride, cultures robustes",
    villes: "Korhogo, Odienné, Boundiali, Ferkéssédougou",
    region: "Savane sèche",
    rainfall: "1200mm/an",
    bestCrops: ["coton", "mais", "arachide", "mil", "riz", "niebe", "gombo"],
    characteristics: [
      "✓ Savane sèche avec végétation arbustive",
      "✓ Sols sableux, nécessitent amendement",
      "✓ Température élevée 28-35°C",
      "✓ Humidité basse 50-70%",
      "✓ Saison sèche longue (7-8 mois)"
    ],
    tips: [
      "🧵 Coton : culture traditionnelle très rentable",
      "🌽 Maïs : nécessite irrigation possible",
      "💧 Irrigation essentielle en saison sèche",
      "🥒 Arachide : culture complémentaire excellente",
      "🌾 Sorgho/Mil : très résistants à la sécheresse",
      "📍 Disponibilité eau : critère décisif"
    ],
    season: [
      { month: "Avr-Mai", activity: "Semis coton (critical period)" },
      { month: "Juin-Août", activity: "Croissance avec irrigation" },
      { month: "Sep-Nov", activity: "Récolte coton (saison principale)" },
      { month: "Déc-Mar", activity: "Saison sèche, préparation" }
    ]
  },
  "Zone Côtière Occidentale": {
    icon: "🌊",
    description: "Très humide avec pluies abondantes, cultures aquatiques possibles",
    villes: "San-Pédro, Sassandra, Tabou, Grébao",
    region: "Lagunes côtières",
    rainfall: "2400mm/an",
    bestCrops: ["cacao", "banane", "ananas", "noix_de_coco", "palmier_a_huile", "plantain", "papaye"],
    characteristics: [
      "✓ Climat tropical très humide",
      "✓ Pluies très abondantes et régulières",
      "✓ Température stable 24-28°C",
      "✓ Humidité extrêmement élevée (85-95%)",
      "✓ Accès port côtier (San-Pédro)"
    ],
    tips: [
      "🍫 Cacao : meilleure zone de Côte d'Ivoire",
      "🍌 Banane : production continue possible",
      "🌴 Palmier à huile : culture industrielle d'avenir",
      "💧 Gestion maladies fongiques très importante",
      "🚢 Port côtier : avantage logistique majeur",
      "🌳 Drainage des sols : élément critique"
    ],
    season: [
      { month: "Jan-Fév", activity: "Entretien, préparation" },
      { month: "Mar-Mai", activity: "Plantation et croissance" },
      { month: "Juin-Sep", activity: "Récolte principale cacao" },
      { month: "Oct-Déc", activity: "Récolte secondaire, maintenance" }
    ]
  },
  "Zone Montagneuse (Ouest)": {
    icon: "⛰️",
    description: "Altitudes élevées, climat frais, cultures de montagne",
    villes: "Man, Danané, Biankouma, Zouan-Hounien",
    region: "Montagnes et collines",
    rainfall: "2100mm/an",
    bestCrops: ["cafe", "cacao", "igname", "manioc", "mais", "avocat", "pomme_de_terre"],
    characteristics: [
      "✓ Terrains montagneux et collines",
      "✓ Altitude 500-1000m favorable",
      "✓ Température fraîche 20-25°C",
      "✓ Humidité stable 75-85%",
      "✓ Bonne drainage naturel du terrain"
    ],
    tips: [
      "☕ Café : culture reine de la montagne (qualité)",
      "🌳 Altitude favorable pour qualité supérieure",
      "🍫 Cacao : possible à altitude modérée",
      "🥔 Igname : culture très bien adaptée",
      "🌱 Sols naturellement drainés (excellent)",
      "⛰️ Érosion : attention à la gestion des pentes"
    ],
    season: [
      { month: "Avr-Mai", activity: "Semis et plantation principale" },
      { month: "Juin-Août", activity: "Croissance optimale" },
      { month: "Sep-Nov", activity: "Récolte café et igname" },
      { month: "Déc-Mar", activity: "Entretien et préparation" }
    ]
  }
};

// Base de données COMPLÈTE des cultures (AGRANDIE)
const culturesDatabase = {
  cacao: {
    name: "🍫 Cacao",
    scientificName: "Theobroma cacao",
    type: "Culture pérenne",
    production: "Chocolat, poudre de cacao",
    zones: ["Zone Côtière (Sud)", "Zone Forestière Centrale", "Zone Côtière Occidentale"],
    cycle: "3-5 ans avant première récolte",
    rendement: "500-1500 kg/ha",
    prix: "Excellent marché international",
    requirements: {
      temperature: "24-28°C",
      humidity: "80-95%",
      rainfall: "2000-3000mm/an",
      altitude: "0-500m"
    },
    tips: [
      "Nécessite ombrage (arbres tuteurs)",
      "Sensible aux maladies fongiques",
      "Demande travail régulier et expérience",
      "Meilleure rentabilité long terme",
      "Certification possible (équitable)"
    ]
  },
  cafe: {
    name: "☕ Café",
    scientificName: "Coffea spp",
    type: "Culture pérenne",
    production: "Grains de café, café moulu",
    zones: ["Zone Forestière Centrale", "Zone Montagneuse (Ouest)"],
    cycle: "3-4 ans avant première récolte",
    rendement: "300-600 kg/ha",
    prix: "Très bon marché international",
    requirements: {
      temperature: "20-25°C",
      humidity: "70-85%",
      rainfall: "1500-2500mm/an",
      altitude: "500-1500m"
    },
    tips: [
      "Altitude importante pour qualité",
      "Climat frais et stable optimal",
      "Café haut de gamme possible",
      "Marché spécialisé premium",
      "Récolte sélective recommandée"
    ]
  },
  coton: {
    name: "🧵 Coton",
    scientificName: "Gossypium hirsutum",
    type: "Culture annuelle",
    production: "Fibre de coton, graines",
    zones: ["Zone de Transition", "Zone Soudanienne (Nord)"],
    cycle: "6-7 mois",
    rendement: "1500-2500 kg/ha",
    prix: "Marché mondial stable",
    requirements: {
      temperature: "25-32°C",
      humidity: "60-75%",
      rainfall: "800-1200mm/an",
      altitude: "0-600m"
    },
    tips: [
      "Culture majeure d'exportation",
      "Demande peu d'eau comparativement",
      "Parasites : traitement obligatoire",
      "Rotation des cultures conseillée",
      "Mecanisation possible"
    ]
  },
  mais: {
    name: "🌽 Maïs",
    scientificName: "Zea mays",
    type: "Culture annuelle",
    production: "Grains, farine, aliment bétail",
    zones: ["Zone de Transition", "Zone Soudanienne (Nord)", "Zone Montagneuse (Ouest)"],
    cycle: "3-4 mois",
    rendement: "2000-4000 kg/ha",
    prix: "Marché local très actif",
    requirements: {
      temperature: "25-35°C",
      humidity: "60-80%",
      rainfall: "500-800mm/an",
      altitude: "0-1500m"
    },
    tips: [
      "Culture de base très importante",
      "Rendements peut être améliorés (semences)",
      "Plusieurs cycles/an possibles",
      "Demande régulière (nourriture locale)",
      "Rotation maïs-légumineuses"
    ]
  },
  riz: {
    name: "🍚 Riz",
    scientificName: "Oryza sativa",
    type: "Culture annuelle",
    production: "Grains de riz, riz blanc",
    zones: ["Zone Soudanienne (Nord)"],
    cycle: "4-6 mois",
    rendement: "3000-5000 kg/ha",
    prix: "Marché local essentiel",
    requirements: {
      temperature: "20-30°C",
      humidity: "80-100%",
      rainfall: "1000-1500mm/an",
      altitude: "0-200m"
    },
    tips: [
      "Irrigation essentielle",
      "Sols inondés (plaines basses)",
      "Culture exigeante en eau",
      "Rendements élevés possibles",
      "Élément base régime alimentaire"
    ]
  },
  arachide: {
    name: "🥒 Arachide",
    scientificName: "Arachis hypogaea",
    type: "Culture annuelle",
    production: "Noix d'arachide, huile",
    zones: ["Zone de Transition", "Zone Soudanienne (Nord)"],
    cycle: "4-5 mois",
    rendement: "1200-2000 kg/ha",
    prix: "Bon marché local et exportation",
    requirements: {
      temperature: "25-32°C",
      humidity: "50-70%",
      rainfall: "600-1000mm/an",
      altitude: "0-500m"
    },
    tips: [
      "Excellente culture de rotation",
      "Enrichit les sols (légumineuse)",
      "Culture peu exigeante",
      "Huile d'arachide précieuse",
      "Stockage long terme possible"
    ]
  },
  banane: {
    name: "🍌 Banane",
    scientificName: "Musa spp",
    type: "Culture pérenne",
    production: "Fruits frais, banane plantain",
    zones: ["Zone Côtière (Sud)", "Zone Côtière Occidentale"],
    cycle: "9-12 mois entre récoltes",
    rendement: "10-25 tonnes/ha/an",
    prix: "Excellent marché local et international",
    requirements: {
      temperature: "24-28°C",
      humidity: "75-95%",
      rainfall: "1500-2250mm/an",
      altitude: "0-600m"
    },
    tips: [
      "Production continue possible",
      "Excellente productivité",
      "Marché d'export porteur",
      "Demande main d'œuvre importante",
      "Irrigation utile en saison sèche"
    ]
  },
  igname: {
    name: "🥔 Igname",
    scientificName: "Dioscorea spp",
    type: "Culture annuelle",
    production: "Tubercules, aliment traditionnel",
    zones: ["Zone Forestière Centrale", "Zone Montagneuse (Ouest)"],
    cycle: "7-10 mois",
    rendement: "5000-15000 kg/ha",
    prix: "Marché local très important",
    requirements: {
      temperature: "25-29°C",
      humidity: "70-85%",
      rainfall: "1200-1500mm/an",
      altitude: "100-800m"
    },
    tips: [
      "Culture très importante culturellement",
      "Rendements très élevés",
      "Demande travail important",
      "Tuteurs obligatoires (coût)",
      "Marché festivals locaux actif"
    ]
  },
  manioc: {
    name: "🌱 Manioc",
    scientificName: "Manihot esculenta",
    type: "Culture pérenne",
    production: "Tubercules, gari, attieke",
    zones: ["Zone Forestière Centrale", "Zone Montagneuse (Ouest)"],
    cycle: "1-3 ans (récolte flexible)",
    rendement: "8000-20000 kg/ha",
    prix: "Marché local stable",
    requirements: {
      temperature: "20-29°C",
      humidity: "50-70%",
      rainfall: "600-1500mm/an",
      altitude: "0-1000m"
    },
    tips: [
      "Culture très résistante et fiable",
      "Peu exigeante en maintenance",
      "Récolte flexible (pas urgent)",
      "Nombreux usages (alimentaire + industrie)",
      "Très bonne culture sécurité alimentaire"
    ]
  },
  ananas: {
    name: "🍍 Ananas",
    scientificName: "Ananas comosus",
    type: "Culture pérenne",
    production: "Fruits frais, jus",
    zones: ["Zone Côtière (Sud)", "Zone Côtière Occidentale"],
    cycle: "18-24 mois",
    rendement: "30-50 tonnes/ha",
    prix: "Excellent marché d'export",
    requirements: {
      temperature: "25-32°C",
      humidity: "60-80%",
      rainfall: "1500-2500mm/an",
      altitude: "0-500m"
    },
    tips: [
      "Culture très rentable",
      "Rendements très élevés",
      "Marché export très actif",
      "Excellent drainage requis",
      "Mécanisation possible"
    ]
  },
  noix_de_cajou: {
    name: "🥜 Noix de Cajou",
    scientificName: "Anacardium occidentale",
    type: "Culture pérenne",
    production: "Noix de cajou, jus fruit",
    zones: ["Zone Forestière Centrale", "Zone de Transition"],
    cycle: "3-5 ans",
    rendement: "800-1500 kg/ha",
    prix: "Excellent marché international",
    requirements: {
      temperature: "24-28°C",
      humidity: "60-80%",
      rainfall: "1000-1500mm/an",
      altitude: "0-600m"
    },
    tips: [
      "Culture en expansion importante",
      "Très bon prix international",
      "Peu exigeante en entretien",
      "Production long terme rentable",
      "Arbre très longévité (100+ ans)"
    ]
  },
  cocotier: {
    name: "🥥 Cocotier",
    scientificName: "Cocos nucifera",
    type: "Culture pérenne",
    production: "Noix de coco, coprah, huile",
    zones: ["Zone Côtière (Sud)"],
    cycle: "6-9 ans",
    rendement: "50-80 noix/an/arbre",
    prix: "Très bon marché international",
    requirements: {
      temperature: "25-30°C",
      humidity: "75-90%",
      rainfall: "1500-2500mm/an",
      altitude: "0-500m"
    },
    tips: [
      "Culture peu exigeante",
      "Multiple usages (noix, huile, fibres)",
      "Très longue longévité de l'arbre",
      "Production très stable",
      "Idéal zones côtières"
    ]
  },
  palmier_a_huile: {
    name: "🌴 Palmier à Huile",
    scientificName: "Elaeis guineensis",
    type: "Culture pérenne",
    production: "Huile de palme, palmiste",
    zones: ["Zone Côtière Occidentale"],
    cycle: "3-5 ans",
    rendement: "4000-6000 kg/ha",
    prix: "Excellent marché mondial",
    requirements: {
      temperature: "24-28°C",
      humidity: "80-90%",
      rainfall: "2000-2500mm/an",
      altitude: "0-500m"
    },
    tips: [
      "Culture industrielle majeure",
      "Très haut rendement",
      "Marché mondial très important",
      "Nécessite infrastructure transformation",
      "Production continue (3 ans)"
    ]
  },
  mil: {
    name: "🌾 Mil/Sorgho",
    scientificName: "Sorghum bicolor",
    type: "Culture annuelle",
    production: "Grains, farine, aliment bétail",
    zones: ["Zone Soudanienne (Nord)"],
    cycle: "3-4 mois",
    rendement: "800-1500 kg/ha",
    prix: "Marché local stable",
    requirements: {
      temperature: "20-35°C",
      humidity: "40-60%",
      rainfall: "400-800mm/an",
      altitude: "0-1000m"
    },
    tips: [
      "Culture très résistante sécheresse",
      "Peu exigeante en eau",
      "Culture de sécurité alimentaire",
      "Aliment bétail précieux",
      "Adaptée aux sols pauvres"
    ]
  },
  // ===== NOUVELLES CULTURES =====
  plantain: {
    name: "🍌 Plantain",
    scientificName: "Musa paradisiaca",
    type: "Culture pérenne",
    production: "Fruits cuisinés, farine",
    zones: ["Zone Côti��re (Sud)", "Zone Côtière Occidentale", "Zone Forestière Centrale"],
    cycle: "9-12 mois",
    rendement: "8-20 tonnes/ha",
    prix: "Excellent marché local",
    requirements: {
      temperature: "24-28°C",
      humidity: "75-90%",
      rainfall: "1500-2500mm/an",
      altitude: "0-500m"
    },
    tips: [
      "Aliment de base très important",
      "Production abondante et régulière",
      "Peu exigeant en entretien",
      "Marché local stable et certain",
      "Racines peu profondes"
    ]
  },
  avocat: {
    name: "🥑 Avocat",
    scientificName: "Persea americana",
    type: "Culture pérenne",
    production: "Fruits frais, export",
    zones: ["Zone Forestière Centrale", "Zone Montagneuse (Ouest)"],
    cycle: "3-4 ans",
    rendement: "3000-5000 kg/ha",
    prix: "Très bon marché export",
    requirements: {
      temperature: "20-28°C",
      humidity: "60-80%",
      rainfall: "1200-2000mm/an",
      altitude: "200-1000m"
    },
    tips: [
      "Marché export en croissance",
      "Culture peu exigeante",
      "Haute valeur nutritive",
      "Arbre longévif (100+ ans)",
      "Demande croissante mondial"
    ]
  },
  soja: {
    name: "🌱 Soja",
    scientificName: "Glycine max",
    type: "Culture annuelle",
    production: "Grains, huile, farine",
    zones: ["Zone de Transition"],
    cycle: "4-5 mois",
    rendement: "1500-2500 kg/ha",
    prix: "Bon marché local et export",
    requirements: {
      temperature: "25-30°C",
      humidity: "65-80%",
      rainfall: "700-1000mm/an",
      altitude: "0-800m"
    },
    tips: [
      "Légumineuse enrichit sols",
      "Haute teneur en protéines",
      "Produit animal substituable",
      "Marché en expansion",
      "Rotation cultures excellente"
    ]
  },
  tomate: {
    name: "🍅 Tomate",
    scientificName: "Solanum lycopersicum",
    type: "Culture annuelle",
    production: "Fruits frais, sauce, conserves",
    zones: ["Zone de Transition", "Zone Soudanienne (Nord)"],
    cycle: "3-4 mois",
    rendement: "15000-30000 kg/ha",
    prix: "Excellent marché local",
    requirements: {
      temperature: "24-28°C",
      humidity: "60-80%",
      rainfall: "600-900mm/an",
      altitude: "0-800m"
    },
    tips: [
      "Culture maraîchère très importante",
      "Plusieurs récoltes/an possible",
      "Demande constante marché",
      "Légume export croissant",
      "Irrigation importante"
    ]
  },
  papaye: {
    name: "🧡 Papaye",
    scientificName: "Carica papaya",
    type: "Culture pérenne",
    production: "Fruits frais, enzymes",
    zones: ["Zone Côtière Occidentale", "Zone Côtière (Sud)"],
    cycle: "1-2 ans",
    rendement: "20000-30000 kg/ha",
    prix: "Bon marché local et export",
    requirements: {
      temperature: "25-32°C",
      humidity: "70-85%",
      rainfall: "1500-2500mm/an",
      altitude: "0-600m"
    },
    tips: [
      "Croissance très rapide",
      "Fruits riches en vitamine C",
      "Enzymes papaïne précieuses",
      "Demande santé en hausse",
      "Production continue possible"
    ]
  },
  niebe: {
    name: "🫘 Niébé",
    scientificName: "Vigna unguiculata",
    type: "Culture annuelle",
    production: "Grains secs, feuilles",
    zones: ["Zone Soudanienne (Nord)", "Zone de Transition"],
    cycle: "3-4 mois",
    rendement: "800-1500 kg/ha",
    prix: "Bon marché local",
    requirements: {
      temperature: "25-32°C",
      humidity: "50-70%",
      rainfall: "600-900mm/an",
      altitude: "0-800m"
    },
    tips: [
      "Légumineuse très nutritive",
      "Enrichit les sols en azote",
      "Très résistant sécheresse",
      "Aliment traditionnel important",
      "Rotation cultures excellent"
    ]
  },
  gombo: {
    name: "💚 Gombo",
    scientificName: "Abelmoschus esculentus",
    type: "Culture annuelle",
    production: "Fruits frais, séchés",
    zones: ["Zone Soudanienne (Nord)", "Zone de Transition"],
    cycle: "2-3 mois",
    rendement: "5000-10000 kg/ha",
    prix: "Marché local important",
    requirements: {
      temperature: "25-35°C",
      humidity: "50-75%",
      rainfall: "600-1000mm/an",
      altitude: "0-500m"
    },
    tips: [
      "Légume très apprécié localement",
      "Plusieurs récoltes/an",
      "Culture facile et peu exigeante",
      "Excellente nutritionnelement",
      "Séchage possible conservation"
    ]
  },
  pomme_de_terre: {
    name: "🥔 Pomme de Terre",
    scientificName: "Solanum tuberosum",
    type: "Culture annuelle",
    production: "Tubercules, fécule",
    zones: ["Zone Montagneuse (Ouest)"],
    cycle: "3-4 mois",
    rendement: "15000-25000 kg/ha",
    prix: "Bon marché local",
    requirements: {
      temperature: "15-20°C",
      humidity: "75-85%",
      rainfall: "500-750mm/an",
      altitude: "800-1200m"
    },
    tips: [
      "Récolte abondante rapidement",
      "Altitude élevée optimal",
      "Climat frais nécessaire",
      "Aliment base traditionnel",
      "Conservation long terme"
    ]
  },
  safran_rouge: {
    name: "🌺 Safran Rouge",
    scientificName: "Bixa orellana",
    type: "Culture pérenne",
    production: "Colorant, épices",
    zones: ["Zone Forestière Centrale"],
    cycle: "2-3 ans",
    rendement: "1000-2000 kg/ha",
    prix: "Excellent marché épices",
    requirements: {
      temperature: "24-28°C",
      humidity: "70-85%",
      rainfall: "1500-2000mm/an",
      altitude: "100-600m"
    },
    tips: [
      "Marché épices croissant",
      "Peu exigeant en eau",
      "Colorant naturel précieux",
      "Export vers pays voisins",
      "Plantation pérenne rentable"
    ]
  },
  noix_de_coco: {
    name: "🥥 Noix de Coco",
    scientificName: "Cocos nucifera",
    type: "Culture pérenne",
    production: "Noix, lait, coprah",
    zones: ["Zone Côtière (Sud)"],
    cycle: "6-9 ans",
    rendement: "60-100 noix/an",
    prix: "Très bon marché international",
    requirements: {
      temperature: "25-32°C",
      humidity: "75-95%",
      rainfall: "1500-2500mm/an",
      altitude: "0-500m"
    },
    tips: [
      "Excellente pour zones côtières",
      "Multiples produits dérivés",
      "Culture très pérenne",
      "Peu nécessite maintenance",
      "Produit exportable"
    ]
  }
};

// Affiche les informations de la zone ET les cultures seulement de cette zone
function displayZone(zoneName) {
  const zone = zoneAgriculture[zoneName];
  if (!zone) {
    console.log("Zone non trouvée:", zoneName);
    return;
  }

  console.log("Affichage zone:", zoneName);
  
  document.getElementById('no-selection').style.display = 'none';
  document.getElementById('zone-display').style.display = 'block';

  // Header zone
  document.getElementById('zone-name').textContent = zoneName;
  document.getElementById('zone-description').textContent = zone.description;
  document.getElementById('zone-villes').textContent = "📌 " + zone.villes;
  document.getElementById('zone-icon').textContent = zone.icon;

  // Caractéristiques
  const charDiv = document.getElementById('zone-characteristics');
  charDiv.innerHTML = `
    <div class="char-item">
      <strong>📍 Région:</strong> ${zone.region}
    </div>
    <div class="char-item">
      <strong>☔ Pluviométrie:</strong> ${zone.rainfall}
    </div>
    <div class="char-item">
      <strong>📝 Caractéristiques:</strong>
      <ul>
        ${zone.characteristics.map(c => `<li>${c}</li>`).join('')}
      </ul>
    </div>
  `;

  // Cultures recommandées - SEULEMENT POUR CETTE ZONE
  const culturesDiv = document.getElementById('cultures-grid');
  culturesDiv.innerHTML = zone.bestCrops.map(cropKey => {
    const crop = culturesDatabase[cropKey];
    if (!crop) return '';
    return `
      <div class="culture-card">
        <div class="culture-emoji">${crop.name.charAt(0)}</div>
        <h4>${crop.name}</h4>
        <p><strong>Type:</strong> ${crop.type}</p>
        <p><strong>Cycle:</strong> ${crop.cycle}</p>
        <p><strong>Rendement:</strong> ${crop.rendement}</p>
        <p><strong>Marché:</strong> ${crop.prix}</p>
        <button class="btn-details" onclick="showCultureDetails('${cropKey}')">Détails</button>
      </div>
    `;
  }).join('');

  // Calendrier agricole
  const seasonDiv = document.getElementById('seasonal-calendar');
  seasonDiv.innerHTML = `
    <div class="calendar-grid">
      ${zone.season.map(s => `
        <div class="season-item">
          <div class="season-month">${s.month}</div>
          <div class="season-activity">${s.activity}</div>
        </div>
      `).join('')}
    </div>
  `;

  // Conseils zone
  const tipsDiv = document.getElementById('zone-tips');
  tipsDiv.innerHTML = zone.tips.map(tip => `
    <div class="tip-item">${tip}</div>
  `).join('');
}

// Affiche les détails d'une culture (dans une popup/alert)
function showCultureDetails(cropKey) {
  const crop = culturesDatabase[cropKey];
  if (!crop) return;

  const message = `
${crop.name}
━━━━━━━━━━━━━━━━━━━━━━
Nom scientifique: ${crop.scientificName}
Type: ${crop.type}

📊 Rendement: ${crop.rendement}
💰 Marché: ${crop.prix}
🔄 Cycle: ${crop.cycle}

📍 Zones optimales:
${crop.zones.map(z => `  • ${z}`).join('\n')}

🌡️ Conditions requises:
  • Température: ${crop.requirements.temperature}
  • Humidité: ${crop.requirements.humidity}
  • Pluviométrie: ${crop.requirements.rainfall}
  • Altitude: ${crop.requirements.altitude}

💡 Conseils pratiques:
${crop.tips.map(t => `  • ${t}`).join('\n')}
  `;
  
  alert(message);
}

// Événements
document.getElementById('zone-select').addEventListener('change', function(e) {
  const zoneName = e.target.value;
  console.log("Sélection zone:", zoneName);
  
  if (zoneName) {
    displayZone(zoneName);
  } else {
    document.getElementById('zone-display').style.display = 'none';
    document.getElementById('no-selection').style.display = 'block';
  }
});

// Initialisation au chargement (NE PLUS afficher "toutes les cultures")
document.addEventListener('DOMContentLoaded', function() {
  console.log("Page chargée");
  // On ne fait PLUS displayAllCultures()
  document.getElementById('zone-display').style.display = 'none';
  document.getElementById('no-selection').style.display = 'block';
});