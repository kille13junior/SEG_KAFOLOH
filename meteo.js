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

// Données météo réalistes pour chaque ville (Côte d'Ivoire)
const weatherData = {
  abidjan: {
    name: "Abidjan",
    zone: "Zone Côtière (Sud)",
    region: "Lagunes",
    temperature: 28,
    humidity: 85,
    feelsLike: 32,
    windSpeed: 12,
    pressure: 1013,
    icon: "🌤️",
    description: "Partiellement nuageux",
    rainfall: "2200mm/an"
  },
  yamoussoukro: {
    name: "Yamoussoukro",
    zone: "Zone Forestière Centrale",
    region: "Forêts humides",
    temperature: 27,
    humidity: 78,
    feelsLike: 31,
    windSpeed: 10,
    pressure: 1014,
    icon: "☀️",
    description: "Ensoleillé",
    rainfall: "1800mm/an"
  },
  bouake: {
    name: "Bouaké",
    zone: "Zone de Transition",
    region: "Forêts-Savane",
    temperature: 29,
    humidity: 72,
    feelsLike: 33,
    windSpeed: 14,
    pressure: 1012,
    icon: "🌤️",
    description: "Partiellement nuageux",
    rainfall: "1500mm/an"
  },
  korhogo: {
    name: "Korhogo",
    zone: "Zone Soudanienne (Nord)",
    region: "Savane sèche",
    temperature: 31,
    humidity: 65,
    feelsLike: 35,
    windSpeed: 16,
    pressure: 1011,
    icon: "☀️",
    description: "Ensoleillé",
    rainfall: "1200mm/an"
  },
  "san-pedro": {
    name: "San-Pédro",
    zone: "Zone Côtière Occidentale",
    region: "Lagunes côtières",
    temperature: 25,
    humidity: 88,
    feelsLike: 29,
    windSpeed: 15,
    pressure: 1014,
    icon: "🌧️",
    description: "Risque de pluie",
    rainfall: "2400mm/an"
  },
  man: {
    name: "Man",
    zone: "Zone Montagneuse (Ouest)",
    region: "Montagnes et collines",
    temperature: 24,
    humidity: 79,
    feelsLike: 28,
    windSpeed: 7,
    pressure: 1015,
    icon: "🌤️",
    description: "Partiellement nuageux",
    rainfall: "2100mm/an"
  }
};

// Génère les conseils basés sur la météo
function generateAdvice(data) {
  const advice = [];
  
  // Conseils température
  if (data.temperature > 30) {
    advice.push("🌡️ <strong>Chaleur intense:</strong> Assure une bonne hydratation. Les cultures consomment plus d'eau. Augmente la fréquence d'arrosage.");
  } else if (data.temperature < 20) {
    advice.push("🧊 <strong>Température fraîche:</strong> Réduis légèrement l'arrosage. Surveille les maladies fongiques.");
  } else {
    advice.push("😊 <strong>Température idéale:</strong> Parfait pour la plupart des activités agricoles. Conditions optimales!");
  }
  
  // Conseils humidité
  if (data.humidity > 85) {
    advice.push("💧 <strong>Très humide:</strong> Risque accru de maladies fongiques (moisissures, rouilles). Assure bonne aération. Traite si nécessaire.");
  } else if (data.humidity < 50) {
    advice.push("🏜️ <strong>Air très sec:</strong> Augmente l'arrosage. Risque de stress hydrique. Utilise du paillis pour conserver l'humidité.");
  } else {
    advice.push("✅ <strong>Humidité normale:</strong> Conditions favorables pour la plupart des cultures.");
  }
  
  // Conseils pluie
  if (data.description.includes("pluie") || data.description.includes("Pluie")) {
    advice.push("☔ <strong>Pluies prévues:</strong> Parfait! Les plantes vont bien se développer. Profite pour ne pas arroser si les pluies sont abondantes.");
  } else if (data.windSpeed > 15) {
    advice.push("💨 <strong>Vent fort:</strong> Risque de dessèchement rapide. Arrose davantage. Protège les jeunes plants.");
  }
  
  // Conseil supplémentaire basé sur combinaison
  if (data.temperature > 28 && data.humidity > 75) {
    advice.push("🌱 <strong>Conditions tropicales:</strong> Parfait pour les cultures de plantation. Surveille les ravageurs et maladies.");
  }
  
  return advice;
}

// Affiche la météo
function displayWeather(cityKey) {
  const data = weatherData[cityKey];
  if (!data) return;
  
  document.getElementById('no-selection').style.display = 'none';
  document.getElementById('weather-display').style.display = 'block';
  
  document.getElementById('city-name').textContent = `${data.name} - ${data.zone}`;
  document.getElementById('region-info').innerHTML = `
    <div class="info-row">
      <span class="info-label">📍 Zone:</span>
      <span class="info-value">${data.zone}</span>
    </div>
    <div class="info-row">
      <span class="info-label">🏘️ Région:</span>
      <span class="info-value">${data.region}</span>
    </div>
    <div class="info-row">
      <span class="info-label">☔ Pluviométrie annuelle:</span>
      <span class="info-value">${data.rainfall}</span>
    </div>
  `;
  
  document.getElementById('temperature').textContent = `${data.temperature}°C`;
  document.getElementById('humidity').textContent = `${data.humidity}%`;
  document.getElementById('feels-like').textContent = `${data.feelsLike}°C`;
  document.getElementById('wind-speed').textContent = `${data.windSpeed} km/h`;
  document.getElementById('pressure').textContent = `${data.pressure} mb`;
  document.getElementById('weather-icon').textContent = data.icon;
  document.getElementById('description').textContent = data.description;
  
  // Affiche les conseils météo
  const adviceList = document.getElementById('advice-list');
  const advice = generateAdvice(data);
  adviceList.innerHTML = advice.map(a => `<div class="advice-item">${a}</div>`).join('');
}

// Événement de changement de ville
document.getElementById('city-select').addEventListener('change', function(e) {
  const cityKey = e.target.value;
  if (cityKey) {
    displayWeather(cityKey);
  } else {
    document.getElementById('weather-display').style.display = 'none';
    document.getElementById('no-selection').style.display = 'block';
  }
});