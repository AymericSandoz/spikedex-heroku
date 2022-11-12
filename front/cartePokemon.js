/************ <!--  Définition d'une variable, en recherchant dans l'URl de page, 
 de idItem qui contient l'Id du produit que l'utilisateur a cliqué  --> *************/
var str = window.location.href;
var url = new URL(str);
var nameItem = url.searchParams.get("name");
//var idItem = "633e07b48d77b66d3d634134";
/************ <!--  Promesse qui va rechercher 1 produit définit par son ID --> *************/

fetch("api/card/name/" + nameItem)
  .then(function (res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function (card) {
    const cartePokemon = document.querySelector(".pokemon-card");
    displayBackgroundImage(card.type);
    cartePokemon.innerHTML = displayCardItem(card);
  })
  .catch(function (err) {
    alert("Une erreur est survenue");
  });

const cartePokemon = document.querySelector(".pokemon-card");

const displayCardItem = (card) => {
  let name = localStorage.getItem("name");
  let result = `
  <section class="title-row">
  
  <h1 class="name">${card.name}</h1>
  <p class="health"> PV ${card.pv}</p>
  <img class="element-icon" src="images/${card.type}.png" alt="element-icon">
  
</section>

<section class="character-img">
  <img src="${card.imageUrl}" alt="spikemon">
</section>



<section class="character-ability">
  <span class="ability-cost">
    <img class="element-icon" src="images/${card.attaque1Type}.png" alt="element-icon">
  </span>
  <span class="ability-description">
    <span class="ability-name">${card.attaque1}</span>
  </span>
  <p class="ability-damage">${card.attaque1power}</p>
</section>
<section class="character-ability">
  <span class="ability-cost">
    <img class="element-icon" src="images/${card.attaque2Type}.png" alt="element-icon">
  </span>
  <span class="ability-description">
    <span class="ability-name">${card.attaque2}</span>
  
  </span>
  <p class="ability-damage">${card.attaque2power}</p>
</section>

<section class="character-stats">
  <span class="character-stat">
    <p class = "force-weakness">weakness</p>
    <p > ${card.weakness}</p>
  </span>
  <span class="character-stat">
    <p class = "force-weakness" >force</p>
    <p > ${card.weakness}</p>
  </span>
 
</section>

<section class="character-description">
  <p>${card.description}</p>
</section>

<section class="card-details">
</section> 
`;

  return result;
};

const displayBackgroundImage = (type) => {
  background = document.querySelector(".pokemon-card");
  background.style.backgroundSize = "cover";

  switch (type) {
    case "Electrik":
      background.style.backgroundImage = "url(images/background_electrik.png)";
      break;

    case "Eau":
      background.style.backgroundImage = "url(images/background_eau.png)";
      break;

    case "Feuille":
      background.style.backgroundImage = "url(images/background_feuille.png)";
      break;

    case "Psy":
      background.style.backgroundImage = "url(images/background_psy.png)";
      break;

    case "Normal":
      background.style.backgroundImage = "url(images/background_normal.png)";
      break;

    case "Acier":
      background.style.backgroundImage = "url(images/background_acier.png)";
      break;

    case "Ténèbre":
      background.style.backgroundImage = "url(images/background_ténèbre.png)";
      background.style.color = "white";
      break;

    case "Eau":
      background.style.backgroundImage = "url(images/background_eau.png)";
      break;

    case "Combat":
      background.style.backgroundImage = "url(images/background_combat.png)";
      break;

    case "Feu":
      background.style.backgroundImage = "url(images/background_feu.png)";
      break;

    default:
      console.log(`Sorry`);
  }
};
