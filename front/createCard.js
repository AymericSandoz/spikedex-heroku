let card = new Object();
///////****************fonction pour envoyer le formulaire ***************************
// async function submitForm(data) {
//    fetch("http://localhost:5000/api/card", {
//     method: "POST",
//     headers: {
//       authorization: `Bearer ${localStorage.getItem("token")}`,
//     },
//     body: data,
//   });
//   document.location.href = `cartePokemon.html?name=${card.name}`;
// }
let cardPreview = document.querySelector(".card-preview");
// cardPreview.innerHTML = `<section class="title-row">

// <h1 class="name">Name</h1>
// <p class="health"> 300 PV</p>
// <img class="element-icon" src="images/Feu.png">

// </section>

// <section class="character-img">
// <img src="images/pikatchu.jpg">
// </section>

// <section class="character-ability">
// <span class="ability-cost">
//   <img class="element-icon" src="images/Psy.png">
// </span>
// <span class="ability-description">
//   <span class="ability-name">Attaque 1</span>
// </span>
// <p class="ability-damage">10</p>
// </section>
// <section class="character-ability">
// <span class="ability-cost">
//   <img class="element-icon" src="images/Combat.png">
// </span>
// <span class="ability-description">
//   <span class="ability-name">Attaque 2</span>

// </span>
// <p class="ability-damage">30</p>
// </section>

// <section class="character-stats">
// <span class="character-stat">
//   <p class = "force-weakness">weakness</p>
//   <p > Fainéant</p>
// </span>
// <span class="character-stat">
//   <p class = "force-weakness" >force</p>
//   <p > Créatif</p>
// </span>`;

const submitForm = (data) => {
  fetch("http://localhost:5000/api/card/", {
    method: "POST",
    headers: {
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: data,
  })
    .then((reponse) => reponse.json())
    .then((response) => {
      console.log(response.error);
      if (response.error) {
        let err = document.querySelector(".error-message");
        err.innerHTML = response.error;
      } else {
        document.location.href = `cartePokemon.html?name=${card.name}`;
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

let form = document.querySelector(".create-card");
form.addEventListener("submit", function (e) {
  e.preventDefault();

  console.log(card);

  const data = new FormData();
  console.log(card.description);
  data.append("description", card.description);
  data.append("name", card.name);
  data.append("type", card.type);
  data.append("pv", card.pv);
  data.append("attaque1Type", card.attaque1Type);
  data.append("attaque2Type", card.attaque2Type);
  data.append("Attack_1_number", card.Attack_1_number);
  data.append("Attack_2_number", card.Attack_2_number);
  data.append("attaque1", card.attaque1);
  data.append("attaque2", card.attaque2);
  data.append("force", card.force);
  data.append("weakness", card.weakness);
  data.append("image", card.image);
  submitForm(data);
});

let previewButton = document.querySelector(".preview");
previewButton.addEventListener("click", function (e) {
  e.preventDefault();

  console.log(card);

  const data = new FormData();
  console.log(card.description);
  data.append("description", card.description);
  data.append("name", card.name);
  data.append("type", card.type);
  data.append("pv", card.pv);
  data.append("attaque1Type", card.attaque1Type);
  data.append("attaque2Type", card.attaque2Type);
  data.append("Attack_1_number", card.Attack_1_number);
  data.append("Attack_2_number", card.Attack_2_number);

  data.append("attaque1", card.attaque1);
  data.append("attaque2", card.attaque2);
  data.append("force", card.force);
  data.append("weakness", card.weakness);
  data.append("image", card.image);
  data.append("image", card.imgPreview);

  displayBackgroundImage(card.type);

  console.log(card.imgPreview);
  cardPreview.innerHTML = displayCardItem(card);
});

const cardName = document.querySelectorAll(".name");
form.Spikemon_name.addEventListener("change", function () {
  card.name = this.value;
  cardName.innertext = this.value;
  console.log(cardName);
  console.log(card);
});

form.type.addEventListener("change", function () {
  card.type = this.value;
  const cardType = document.querySelectorAll(".type");
  cardType.innerHTML = this.value;
  console.log(cardType);
  console.log(card);
});

form.Pv_number.addEventListener("change", function () {
  card.pv = this.value;
  const cardHealth = document.querySelectorAll(".health");
  cardHealth.innerHTML = `${this.value} PV`;
  console.log(cardHealth);
  console.log(card);
});

form.type_attack_1.addEventListener("change", function () {
  card.attaque1Type = this.value;
  console.log(card);
});

form.attack_number_1.addEventListener("change", function () {
  card.attaque1 = this.value;
  console.log(card);
});

form.type_attack_2.addEventListener("change", function () {
  card.attaque2Type = this.value;
  console.log(card);
});

form.attack_number_2.addEventListener("change", function () {
  card.attaque2 = this.value;
  console.log(card);
});

form.weakness.addEventListener("change", function () {
  card.weakness = this.value;
  console.log(card);
});
form.force.addEventListener("change", function () {
  card.force = this.value;
  console.log(card);
});

form.Attack_1_number.addEventListener("change", function () {
  card.Attack_1_number = this.value;
  console.log(card);
});
form.Attack_2_number.addEventListener("change", function () {
  card.Attack_2_number = this.value;
  console.log(card);
});
form.pokemon_description.addEventListener("change", function () {
  card.description = this.value;
  console.log(card);
});

form.avatar.addEventListener("change", function (event) {
  card.image = event.target.files[0];
  console.log(event.files);
  console.log(event.target.files[0]);
  console.log(event.target.files[0]);

  const [picture] = event.target.files;
  card.imgPreview = URL.createObjectURL(picture);
});

const displayCardItem = (card) => {
  let name = localStorage.getItem("name");
  let result = `
  <section class="title-row">
  
  <h1 class="name">${card.name}</h1>
  <p class="health"> PV ${card.pv}</p>
  <img class="element-icon" src="images/${card.type}.png" alt="element-icon">
  
</section>

<section class="character-img">
  <img src="${card.imgPreview}" alt="Spikémon">
</section>



<section class="character-ability">
  <span class="ability-cost">
    <img class="element-icon" src="images/${card.attaque1Type}.png" alt="element-icon">
  </span>
  <span class="ability-description">
    <span class="ability-name">${card.attaque1}</span>
  </span>
  <p class="ability-damage">${card.Attack_1_number}</p>
</section>
<section class="character-ability">
  <span class="ability-cost">
    <img class="element-icon" src="images/${card.attaque2Type}.png" alt="element-icon">
  </span>
  <span class="ability-description">
    <span class="ability-name">${card.attaque2}</span>
  
  </span>
  <p class="ability-damage">${card.Attack_2_number}</p>
</section>

<section class="character-stats">
  <span class="character-stat">
    <p class = "force-weakness">weakness</p>
    <p > ${card.weakness}</p>
  </span>
  <span class="character-stat">
    <p class = "force-weakness" >force</p>
    <p > ${card.force}</p>
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
  background = document.querySelector(".card-preview");
  background.style.backgroundSize = "cover";
  background.style.color = "black";
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
