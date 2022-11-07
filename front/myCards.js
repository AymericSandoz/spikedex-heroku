const listePoke = document.querySelector(".liste-poke");

fetch(`http://localhost:5000/api/user/getUser`, {
  headers: {
    authorization: `Bearer ${localStorage.getItem("token")}`,
    "Content-Type": "application/json",
    //       "Content-Type": "text/plain",
  },
})
  .then(function (res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function (user) {
    console.log(user);
    getAllUserCards(user.cardsId);
  })
  .catch(function (err) {
    console.log(err);
    alert("Une erreur est survenue");
  });

const getAllUserCards = (cardsId) => {
  console.log(cardsId);
  for (let i = 0; i < cardsId.length; i++) {
    fetch(`http://localhost:5000/api/card/getOneCardById/${cardsId[i]}`)
      .then(function (res) {
        if (res.ok) {
          return res.json();
        }
      })
      .then(function (card) {
        console.log(card);
        createCard(card, i);
      })
      .catch(function (err) {
        console.log(err);
        alert("Une erreur est survenue");
      });
  }
  console.log(listePoke);
};

function createCard(card, i) {
  const carte = document.createElement("div");
  carte.classList.add("pokemon-card");
  carte.setAttribute("id", "${i}-${card._id}");
  carte.innerHTML = `
    <section class="title-row">
    
    <h1 class="name">${card.name}</h1>
    <p class="health"> PV ${card.pv}</p>
    <img class="element-icon" src="images/${card.type}.png" alt="element-icon">
    
  </section>
  
  <section class="character-img">
    <img src="${card.imageUrl}">
  </section>
  
  
  
  <section class="character-ability">
    <span class="ability-cost">
      <img class="element-icon" src="images/${
        card.attaque1Type
      }.png" alt="element-icon">
    </span>
    <span class="ability-description">
      <span class="ability-name">${card.attaque1}</span>
    </span>
    <p class="ability-damage">10</p>
  </section>
  <section class="character-ability">
    <span class="ability-cost">
      <img class="element-icon" src="images/${
        card.attaque2Type
      }.png" alt="element-icon">
    </span>
    <span class="ability-description">
      <span class="ability-name">${card.attaque2}</span>
    
    </span>
    <p class="ability-damage">30</p>
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
  <p class="rarity">${displayStars(card.rarity)}</p>
  <p class="owner">@${localStorage.getItem("pseudo")}</p>
  </section> 
  </div> 

  `;
  const carteDownloadButton = document.createElement("div");
  carteDownloadButton.classList.add("download-card");
  carteDownloadButton.setAttribute("id", "button-${i}-${card._id}");

  carteDownloadButton.innerHTML = `<i class="fa-solid fa-download"></i>
  <btn id= '${i}-btn-download-card'> Download </btn>
  <a id="link"></a>`;

  let backgroundColor = card.type.toLowerCase();
  carte.style.backgroundSize = "cover";
  carte.style.backgroundImage = `url(images/background_${backgroundColor}.png)`;
  const cardAnddownloadButton = document.createElement("div");
  cardAnddownloadButton.classList.add("container-card-download");
  cardAnddownloadButton.appendChild(carte);
  console.log(cardAnddownloadButton);
  cardAnddownloadButton.appendChild(carteDownloadButton);
  console.log(cardAnddownloadButton);
  listePoke.appendChild(cardAnddownloadButton);
}

const displayStars = (rarity) => {
  let result = "";
  for (let i = 0; i < rarity; i++) {
    result += '<i class="fa-solid fa-star"></i>';
  }
  console.log(result);
  return result;
};
