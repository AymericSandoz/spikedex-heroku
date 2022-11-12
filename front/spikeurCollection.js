var str = window.location.href;

var url = new URL(str);
var userId = url.searchParams.get("id");
var name2 = url.searchParams.get("name");
var pseudo2 = url.searchParams.get("pseudo");
const nameSection = document.querySelector(".name-section");
const listePoke = document.querySelector(".liste-poke");
nameSection.innerHTML = `
<h3>${name2}</h3>
`;
// const types = {
//   Feuille: "#78c850",
//   Sol: "#E2BF65",
//   Dragon: "#6F35FC",
//   Feu: "#F58271",
//   Electrik: "#F7D02C",
//   Fée: "#D685AD",
//   Poison: "#966DA3",
//   Insecte: "#B3F594",
//   Eau: "#6390F0",
//   Normal: "#D9D5D8",
//   Psy: "#F95587",
//   Vol: "#A98FF3",
//   Combat: "#C25956",
//   Pierre: "#B6A136",
//   Fantome: "#735797",
//   Glace: "#96D9D6",
// };

// fetch(`http://localhost:5000/api/card/getAllUserCards/${userId}`)
//   .then(function (res) {
//     if (res.ok) {
//       return res.json();
//     }
//   })
//   .then(function (cards) {
//     console.log(cards);
//     createCards(cards);
//   })
//   .catch(function (err) {
//     console.log(err);
//     alert("Une erreur est survenue");
//   });
fetch(`api/user/getOneUser/${userId}`)
  .then(function (res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function (user) {
    getAllUserCards(user.cardsId);
  })
  .catch(function (err) {
    console.log(err);
    alert("Une erreur est survenue");
  });

const getAllUserCards = (cardsId) => {
  for (let i = 0; i < cardsId.length; i++) {
    fetch(`api/card/getOneCardById/${cardsId[i]}`)
      .then(function (res) {
        if (res.ok) {
          return res.json();
        }
      })
      .then(function (card) {
        createCard(card);
      })
      .catch(function (err) {
        console.log(err);
        alert("Une erreur est survenue");
      });
  }
  console.log(listePoke);
};

// function createCards(arr) {
//   for (let i = 0; i < arr.length; i++) {
//     const carte = document.createElement("li");
//     let couleur = types[arr[i].type];
//     carte.style.background = couleur;
//     const txtCarte = document.createElement("h5");
//     txtCarte.innerText = arr[i].name;
//     const idCarte = document.createElement("p");
//     idCarte.innerText = `${arr[i].userName}`;
//     const imgCarte = document.createElement("img");
//     imgCarte.src = arr[i].imageUrl;

//     carte.appendChild(imgCarte);
//     carte.appendChild(txtCarte);
//     carte.appendChild(idCarte);
//     listePoke.appendChild(carte);
//   }
// }
function createCard(card) {
  const carte = document.createElement("li");
  // let couleur = types[card.type];
  // carte.style.background = couleur;
  let backgroundColor = card.type.toLowerCase();

  carte.style.backgroundImage = `url(images/background_${backgroundColor}.png)`;
  const txtCarte = document.createElement("h5");
  txtCarte.innerText = card.name;
  //   const idCarte = document.createElement("p");
  //   idCarte.innerText = `${card.userName}`;
  const stars = document.createElement("p");
  stars.innerHTML = displayStars(card.rarity);
  const imgCarte = document.createElement("img");
  imgCarte.src = card.imageUrl;

  carte.appendChild(imgCarte);
  carte.appendChild(txtCarte);

  carte.appendChild(stars);
  listePoke.appendChild(carte);
}

// const displayStars = (weight) => {
//   let numberOfStars = 10 - Math.ceil(weight * 10);
//   console.log(numberOfStars);

//   let result = "";
//   for (let i = 0; i < numberOfStars; i++) {
//     result += '<i class="fa-solid fa-star"></i>';
//   }
//   console.log(result);
//   return result;
// };

const displayStars = (rarity) => {
  let result = "";
  for (let i = 0; i < rarity; i++) {
    result += '<i class="fa-solid fa-star"></i>';
  }

  return result;
};
