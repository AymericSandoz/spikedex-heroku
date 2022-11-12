///////////affiche du dom pour la partie connexion/déconnexion
const nav__links = document.querySelector(".nav__links");
const header__wrapper = document.querySelector(".site-header__wrapper");

const pseudo = localStorage.getItem("pseudo");

// const welcomeMessage = document.querySelector(".welcome-message");
if (!pseudo) {
  nav__links.innerHTML = `
  <a href="log.html" class = "nav__item connection-link"> <span class= "log-big-screen"> Connexion / Inscription </span> <span class= "log-small-screen"><i class="fa-solid fa-user"></i> / <i class="fa-solid fa-user-plus"></i> </span> </a>
  `;
  const connectionLink = document.querySelector(".connection-link");

  connectionLink.style.justifyContent = "flex-end";
  header__wrapper.style.display = "flex";
  header__wrapper.style.justifyContent = "space-between";
  header__wrapper.style.alignItems = "center";
  // welcomeMessage.innerHTML = `
  // <p>bienvenu ${pseudo}</p>
  // `;
} else {
  nav__links.innerHTML = `
  <button class="nav__toggle" aria-expanded="false" type="button">
  <i class="fa-solid fa-bars"></i>
      </button>
      <ul class="nav__wrapper">
        <li class="nav__item"><a href="createCard.html">Création</a></li>
        <li class="nav__item"><a href="packOpener.html">Pack</a></li>
        <li class="nav__item"><a href="spikeursList.html">  Autres joueurs</a></li>
        <li class="nav__item"><a href="myCards.html">Mes cartes</a></li>
        <li class="nav__item"><a href="uploadProfil.html">Profil</a></li>
        <li class="nav__item deconnection-link"><a href="#" ><i class="fa-solid fa-user-slash"></i></a></li>
      </ul>`;
}
// nav__links.innerHTML = `
//   <a href="index.html"><img class="logo" src="./images/pokedex.png" alt=""></a>

//   <a href="createCard.html"> <i class="fa-solid fa-plus"></i> </a>
//   <a href="packOpener.html" class = "pack-opener-link"> <i class="fa-solid fa-box-open"></i> </a>
//   <a href="spikeursList.html" class = "dresseurs-link"> <i class="fa-brands fa-redhat"></i> </a>
//   <div class="mon-compte">
//   <a href="#">  Mon compte </a>
//   <ul class="sous-déroulant">
//   <li><a href="#" class="profil"> Mon profil</a></li>
//   <li><a href="#"  class="my-cards"> Mes cartes</a></li>
//   <li><a href="#"  class="deconnection-link"> Déconnexion</a></li>
//   </ul>
//   </div>

//   `;
/* <a href="index.html"><img class="logo" src="./images/pokedex.png" alt=""></a>


<a href="createCard.html"> <i class="fa-solid fa-plus"></i> </a>
<a href="packOpener.html" class = "pack-opener-link"> <i class="fa-solid fa-box-open"></i> </a>
<a href="spikeursList.html" class = "dresseurs-link"> <i class="fa-brands fa-redhat"></i> </a>
<a class="mon-compte">  Mon compte 
<ul class="sous-déroulant">
<li><a class="profil"> Mon profil</a></li>
<li><a class="my-cards"> Mes cartes</a></li>
<li><a class="deconnection-link"> Déconnexion</a></li>
</ul>
</a> */
// const monCompte = document.querySelector(".mon-compte");
// const menuDeroulant = document.querySelector(".sous-déroulant");
// monCompte.addEventListener("mouseover", function (e) {
//   menuDeroulant.style.transform = "scale(1)";
// });

// monCompte.addEventListener("mouseout", function (e) {
//   menuDeroulant.style.transform = "scale(0)";
// });

{
  /* <a class="deconnection-link"> <i class="fa-solid fa-user-slash"></i></a> */
}

if (pseudo) {
  const deconnectionLink = document.querySelector(".deconnection-link");
  deconnectionLink.addEventListener("click", function (e) {
    e.preventDefault();
    if (window.confirm("Voulez-vous vous déconnectez ?")) {
      localStorage.clear();
      document.location.href = `log.html`;
    }
  });
}

let navToggle = document.querySelector(".nav__toggle");
let navWrapper = document.querySelector(".nav__wrapper");
navToggle.addEventListener("click", function () {
  if (navWrapper.classList.contains("active")) {
    this.setAttribute("aria-expanded", "false");
    this.setAttribute("aria-label", "menu");
    navWrapper.classList.remove("active");
  } else {
    navWrapper.classList.add("active");
    this.setAttribute("aria-label", "close menu");
    this.setAttribute("aria-expanded", "true");
  }
});
