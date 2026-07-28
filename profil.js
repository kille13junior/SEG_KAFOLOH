function getCurrentUser() {
  return localStorage.getItem('user-login') || "Anonyme";
}

function getUserProfile(email) {
  let users = JSON.parse(localStorage.getItem('users') || '[]');
  let user = users.find(u => u.email === email);
  return {
    email: email,
    nom: email.split("@")[0],
    avatar: user && user.avatar ? user.avatar : "cameleon.jpg"
  };
}

// Likes reçus dans le forum
function getForumLikes(email) {
  const forumKey = "crealab-forum-topics-fixed";
  let likes = 0, messages = 0;
  let data = JSON.parse(localStorage.getItem(forumKey) || "{}");
  Object.values(data).forEach(topics => {
    topics.forEach(topic => {
      topic.posts.forEach(post => {
        if (post.author === email) {
          messages++;
          likes += (post.likers ? post.likers.length : 0);
        }
      });
    });
  });
  return { likes, messages };
}

// Likes reçus dans la galerie
function getGalerieLikes(email) {
  let likes = 0, oeuvres = 0;
  let data = JSON.parse(localStorage.getItem('galerie') || "[]");
  data.forEach(oeuvre => {
    if (oeuvre.auteur === email) {
      oeuvres++;
      likes += (oeuvre.likers ? oeuvre.likers.length : 0);
    }
  });
  return { likes, oeuvres };
}

// Likes reçus dans le concours
function getConcoursLikes(email) {
  let likes = 0, oeuvres = 0;
  let data = JSON.parse(localStorage.getItem('concours-oeuvres') || "[]");
  data.forEach(oeuvre => {
    if (oeuvre.auteur === email) {
      oeuvres++;
      likes += (oeuvre.likers ? oeuvre.likers.length : 0);
    }
  });
  return { likes, oeuvres };
}

// Récompenses (badges/attestations)
function getRecompenses(email) {
  let prix = [];
  let gagnants = JSON.parse(localStorage.getItem('concours-gagnants') || "[]");
  gagnants.forEach(prixItem => {
    if (prixItem.email === email) prix.push(prixItem);
  });

  let certifs = [];
  let certifData = JSON.parse(localStorage.getItem('certificats') || "{}");
  for (let k in certifData) {
    if (k.endsWith("_"+email) && certifData[k]) {
      certifs.push(k.split("_")[0]);
    }
  }

  let badges = [];
  let badgesData = JSON.parse(localStorage.getItem('badges') || "{}");
  if (badgesData[email]) badges = badgesData[email];

  return {
    prix,
    certifs,
    badges
  };
}

// Liste des œuvres (galerie + concours)
function getMesOeuvres(email) {
  let galerie = JSON.parse(localStorage.getItem('galerie') || "[]").filter(o => o.auteur === email);
  let concours = JSON.parse(localStorage.getItem('concours-oeuvres') || "[]").filter(o => o.auteur === email);
  return [...galerie, ...concours];
}

function afficherProfil() {
  const user = getCurrentUser();
  if (!user || user === "Anonyme") {
    document.getElementById('profil-bloc').innerHTML = "<p>Connecte-toi pour voir ton profil !</p>";
    return;
  }
  const profil = getUserProfile(user);

  const forumStat = getForumLikes(user);
  const galerieStat = getGalerieLikes(user);
  const concoursStat = getConcoursLikes(user);
  const recomp = getRecompenses(user);
  const oeuvres = getMesOeuvres(user);

  document.getElementById('profil-avatar-img').src = profil.avatar;
  document.getElementById('profil-nom').textContent = profil.nom;
  document.getElementById('profil-email').textContent = profil.email;

  document.getElementById('profil-likes').textContent = forumStat.likes + galerieStat.likes + concoursStat.likes;
  document.getElementById('profil-recompenses').textContent = recomp.badges.length + recomp.certifs.length;
  document.getElementById('profil-prix').textContent = recomp.prix.length;
  document.getElementById('profil-oeuvres').textContent = galerieStat.oeuvres + concoursStat.oeuvres;
  document.getElementById('profil-messages').textContent = forumStat.messages;

  const listOeuvres = document.getElementById('profil-liste-oeuvres');
  listOeuvres.innerHTML = "";
  oeuvres.forEach(o => {
    listOeuvres.innerHTML += `<div class="profil-oeuvre-card">
      <div class="profil-oeuvre-media">
        ${o.type==="photo" ? `<img src="${o.media||'cameleon.jpg'}" alt="">` : ""}
        ${o.type==="video" ? `<video src="${o.media||''}" controls></video>` : ""}
        ${o.type==="audio" ? `<audio src="${o.media||''}" controls></audio>` : ""}
      </div>
      <div class="profil-oeuvre-info">
        <h4>${o.titre||'Œuvre'}</h4>
        <div class="desc">${o.desc||''}</div>
        <div><span style="color:#e88600;">Likes:</span> ${(o.likers||[]).length}</div>
      </div>
    </div>`;
  });
  if (oeuvres.length === 0) listOeuvres.innerHTML = "<div style='color:#aaa;'>Aucune œuvre publiée.</div>";

  const listRec = document.getElementById('profil-liste-recompenses');
  listRec.innerHTML = "";
  recomp.badges.forEach(b => {
    listRec.innerHTML += `<div class="profil-recompense-card">🏅 Badge: ${b}</div>`;
  });
  recomp.certifs.forEach(c => {
    listRec.innerHTML += `<div class="profil-recompense-card">📜 Attestation module: ${c}</div>`;
  });
  if (recomp.badges.length + recomp.certifs.length === 0)
    listRec.innerHTML = "<div style='color:#aaa;'>Aucune récompense pour l’instant.</div>";

  const listPrix = document.getElementById('profil-liste-prix');
  listPrix.innerHTML = "";
  recomp.prix.forEach(p => {
    listPrix.innerHTML += `<div class="profil-prix-card">🎁 ${p.nom||'Prix'}<br>${p.desc||''}</div>`;
  });
  if (recomp.prix.length === 0)
    listPrix.innerHTML = "<div style='color:#aaa;'>Aucun prix remporté.</div>";
}

afficherProfil();