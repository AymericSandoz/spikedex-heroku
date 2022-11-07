let allPokemon = [];
let tableauFin = [];
const searchInput = document.querySelector(".recherche-poke input");
const listePoke = document.querySelector(".liste-poke");
const chargement = document.querySelector(".loader");

document.getElementById("switch").addEventListener("change", function () {
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
      //createCard(allSpikemmon);
      // chargement.style.display = "none";
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
//   fetch("api/card/ownerCards", {
//     method: "GET",
//     headers: {
//       authorization: `Bearer ${localStorage.getItem("token")}`,
//     },
//   })
//     .then((reponse) => reponse.json())
//     .then((allSpikemmon) => {
//       console.log(allSpikemmon);
//       createCard(allSpikemmon);
//       chargement.style.display = "none";
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// };

// // // Création des cartes

// function createCard(arr) {
//   for (let i = 0; i < arr.length; i++) {
//     const carte = document.createElement("li");

//     let backgroundColor = arr[i].type.toLowerCase();
//     console.log("coucou");
//     carte.style.backgroundImage = `url(images/background_${backgroundColor}.png)`;
//     const txtCarte = document.createElement("h5");
//     txtCarte.innerText = arr[i].name;
//     const stars = document.createElement("p");
//     stars.innerHTML = displayStars(arr[i].rarity);
//     const imgCarte = document.createElement("img");
//     imgCarte.src = arr[i].imageUrl;

//     carte.appendChild(imgCarte);
//     carte.appendChild(txtCarte);
//     carte.appendChild(stars);
//     listePoke.appendChild(carte);
//   }
// }

// // Recherche
// searchInput.addEventListener("keyup", recherche);
// function recherche() {
//   if (index < 300) {
//     addPoke(280);
//   }
//   let filter, allLi, titleValue, allTitles;
//   filter = searchInput.value.toUpperCase();
//   allLi = document.querySelectorAll("li");
//   allTitles = document.querySelectorAll("li > h5");

//   for (i = 0; i < allLi.length; i++) {
//     titleValue = allTitles[i].innerText;

//     if (titleValue.toUpperCase().indexOf(filter) > -1) {
//       allLi[i].style.display = "flex";
//     } else {
//       allLi[i].style.display = "none";
//     }
//   }
// }

// // animation bouton de recherche
// searchInput.addEventListener("input", function (e) {
//   if (e.target.value !== "") {
//     e.target.parentNode.classList.add("active-input");
//   } else if (e.target.value === "") {
//     e.target.parentNode.classList.remove("active-input");
//   }
// });

// const displayStars = (rarity) => {
//   let result = "";
//   for (let i = 0; i < rarity; i++) {
//     result += '<i class="fa-solid fa-star"></i>';
//   }
//   console.log(result);
//   return result;
// };
