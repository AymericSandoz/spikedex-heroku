let allPokemon = [];
let tableauFin = [];
const searchInput = document.querySelector(".recherche-poke input");
const listePoke = document.querySelector(".liste-poke");
const chargement = document.querySelector(".loader");

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

document.getElementById("switch").addEventListener("change", function () {
  //this.setAttribute("aria-checked", this.checked);
  console.log(this.value);
  if (this.value == "on") {
    this.value = "off";
    chargement.style.display = "flex";
    allPokemon = [];
    listePoke.innerHTML = "";
    setTimeout(function () {
      fetchOwnerCardList();
    }, 1000);

    console.log(listePoke);
  } else {
    this.value = "on";
    chargement.style.display = "flex";
    allPokemon = [];
    listePoke.innerHTML = "";
    setTimeout(function () {
      fetchCardList();
    }, 1000);
    console.log(listePoke);
  }
});

const fetchCardList = () => {
  fetch(`api/card/`)
    .then((reponse) => reponse.json())
    .then((allSpikemmon) => {
      console.log("allspikemon:", allSpikemmon);
      //createCard(allSpikemmon);
      chargement.style.display = "none";
      console.log(allSpikemmon);
    })
    .catch((error) => {
      console.log(error);
    });
};
setTimeout(function () {
  fetchCardList();
}, 1000);

///////////////////////

// const fetchOwnerCardList = () => {
//   fetch(`http://localhost:5000/api/user/getUser`, {
//     headers: {
//       authorization: `Bearer ${localStorage.getItem("token")}`,
//       "Content-Type": "application/json",
//       //       "Content-Type": "text/plain",
//     },
//   })
//     .then(function (res) {
//       if (res.ok) {
//         return res.json();
//       }
//     })
//     .then(function (user) {
//       console.log(user);
//       let OwnerCardsList = getAllUserCards(user.cardsId);
//       createCard(OwnerCardsList);
//     })
//     .catch(function (err) {
//       console.log(err);
//       alert("Une erreur est survenue");
//     });
// };

// const getAllUserCards = (cardsId) => {
//   console.log(cardsId);
//   var OwnerCardsList = [];
//   for (let i = 0; i < cardsId.length; i++) {
//     fetch(`http://localhost:5000/api/card/getOneCardById/${cardsId[i]}`)
//       .then(function (res) {
//         if (res.ok) {
//           return res.json();
//         }
//       })
//       .then(function (card) {
//         OwnerCardsList.push(card);
//         chargement.style.display = "none";
//       })
//       .catch(function (err) {
//         console.log(err);
//         alert("Une erreur est survenue");
//       });
//   }
//   return OwnerCardsList;
// };
//////////Get your own cards
const fetchOwnerCardList = () => {
  fetch("api/card/ownerCards", {
    method: "GET",
    headers: {
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((reponse) => reponse.json())
    .then((allSpikemmon) => {
      console.log(allSpikemmon);
      createCard(allSpikemmon);
      chargement.style.display = "none";
    })
    .catch((error) => {
      console.log(error);
    });
};

// // Création des cartes

function createCard(arr) {
  for (let i = 0; i < arr.length; i++) {
    const carte = document.createElement("li");
    // let couleur = types[arr[i].type];
    // carte.style.background = couleur;

    let backgroundColor = arr[i].type.toLowerCase();
    console.log("coucou");
    carte.style.backgroundImage = `url(images/background_${backgroundColor}.png)`;
    const txtCarte = document.createElement("h5");
    txtCarte.innerText = arr[i].name;
    // const idCarte = document.createElement("p");
    // idCarte.innerText = `${arr[i].userName}`;
    const stars = document.createElement("p");
    stars.innerHTML = displayStars(arr[i].rarity);
    const imgCarte = document.createElement("img");
    imgCarte.src = arr[i].imageUrl;

    carte.appendChild(imgCarte);
    carte.appendChild(txtCarte);
    carte.appendChild(stars);
    listePoke.appendChild(carte);
  }
}
// // // scroll infini

// window.addEventListener("scroll", () => {
//   const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
//   if (clientHeight + scrollTop >= scrollHeight - 20) {
//     addPoke(6);
//   }
// });
// let index = 21;

// function addPoke(nb) {
//   if (index > 300) {
//     return;
//   }
//   const arrToAdd = allPokemon.slice(index, index + nb);
//   createCard(arrToAdd);
//   index += nb;
// }

// Recherche
searchInput.addEventListener("keyup", recherche);
function recherche() {
  if (index < 300) {
    addPoke(280);
  }
  let filter, allLi, titleValue, allTitles;
  filter = searchInput.value.toUpperCase();
  allLi = document.querySelectorAll("li");
  allTitles = document.querySelectorAll("li > h5");

  for (i = 0; i < allLi.length; i++) {
    titleValue = allTitles[i].innerText;

    if (titleValue.toUpperCase().indexOf(filter) > -1) {
      allLi[i].style.display = "flex";
    } else {
      allLi[i].style.display = "none";
    }
  }
}

// animation bouton de recherche
searchInput.addEventListener("input", function (e) {
  if (e.target.value !== "") {
    e.target.parentNode.classList.add("active-input");
  } else if (e.target.value === "") {
    e.target.parentNode.classList.remove("active-input");
  }
});

const displayStars = (rarity) => {
  let result = "";
  for (let i = 0; i < rarity; i++) {
    result += '<i class="fa-solid fa-star"></i>';
  }
  console.log(result);
  return result;
};
