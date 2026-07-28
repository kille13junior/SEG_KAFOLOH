window.addEventListener('DOMContentLoaded', function(){
  const pnj = document.getElementById('pnj-bienvenue');
  setTimeout(()=>{
    pnj.classList.add('hide');
    setTimeout(()=>{ pnj.style.display='none'; }, 900);
  }, 5000);
});
// Personnalisation du message PNJ selon la session
    window.addEventListener('DOMContentLoaded', function(){
      const user = localStorage.getItem('user-login');
      const pnjMessage = document.getElementById('pnj-message-text');
      if (user) {
        pnjMessage.textContent = `Bienvenue, ${user} ! Ravi de te retrouver sur Agricole.`;
        // Masque le bouton connexion si l'utilisateur est connecté
        const btnLogin = document.getElementById('btn-login-link');
        if(btnLogin) btnLogin.style.display = 'none';
      } else {
        pnjMessage.textContent = "Bienvenue à toi ! Connecte-toi pour rendre ton champ le numéro 1.";
      }
    });