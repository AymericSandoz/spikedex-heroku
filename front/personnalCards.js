let allPokemon = [];
let tableauFin = [];
const searchInput = document.querySelector(".recherche-poke input");
const listePoke = document.querySelector(".liste-poke");
const chargement = document.querySelector(".loader");
const types = {
  Feuille: "#78c850",
  Sol: "#E2BF65",
  Dragon: "#6F35FC",
  Feu: "#F58271",
  Electrik: "#F7D02C",
  Fée: "#D685AD",
  Poison: "#966DA3",
  Insecte: "#B3F594",
  Eau: "#6390F0",
  Normal: "#D9D5D8",
  Psy: "#F95587",
  Vol: "#A98FF3",
  Combat: "#C25956",
  Pierre: "#B6A136",
  Fantome: "#735797",
  Glace: "#96D9D6",
};
// function fetchPokemonBase() {
//   fetch("https://pokeapi.co/api/v2/pokemon?limit=300")
//     .then((reponse) => reponse.json())
//     .then((allPoke) => {
//       allPoke.results.forEach((pokemon) => {
//         fetchPokemonComplet(pokemon);
//       });
//     });
// }

const fetchCardList = () => {
  fetch("http://localhost:5000/api/card/ownerCards")
    .then((reponse) => reponse.json())
    .then((allSpikemmon) => {
      createCard(allSpikemmon);
      chargement.style.display = "none";
      console.log(allSpikemmon);
    })
    .catch((error) => {
      console.log(error);
    });
};
fetchCardList();

// function fetchPokemonComplet(pokemon) {
//   let objPokemonFull = {};
//   let url = pokemon.url;
//   let nameP = pokemon.name;
//   fetch(url)
//     .then((reponse) => reponse.json())
//     .then((pokeData) => {
//       objPokemonFull.pic = pokeData.sprites.front_default;
//       objPokemonFull.type = pokeData.types[0].type.name;
//       objPokemonFull.id = pokeData.id;
//       fetch(`https://pokeapi.co/api/v2/pokemon-species/${nameP}`)
//         .then((reponse) => reponse.json())
//         .then((pokeData) => {
//           objPokemonFull.name = pokeData.names[4].name;
//           allPokemon.push(objPokemonFull);

//           if (allPokemon.length === 300) {
//             // console.log(allPokemon);

//             tableauFin = allPokemon
//               .sort((a, b) => {
//                 return a.id - b.id;
//               })
//               .slice(0, 21);
//             // console.log(tableauFin);

//             createCard(tableauFin);
//             chargement.style.display = "none";
//           }
//         });
//     });
// }
// // Création des cartes

function createCard(arr) {
  for (let i = 0; i < arr.length; i++) {
    const carte = document.createElement("li");
    let couleur = types[arr[i].type];
    carte.style.background = couleur;
    const txtCarte = document.createElement("h5");
    txtCarte.innerText = arr[i].name;
    const idCarte = document.createElement("p");
    idCarte.innerText = `${arr[i].userName}`;
    const imgCarte = document.createElement("img");
    imgCarte.src = arr[i].imageUrl;

    carte.appendChild(imgCarte);
    carte.appendChild(txtCarte);
    carte.appendChild(idCarte);

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

// animation bouton de recherche
searchInput.addEventListener("input", function (e) {
  if (e.target.value !== "") {
    e.target.parentNode.classList.add("active-input");
  } else if (e.target.value === "") {
    e.target.parentNode.classList.remove("active-input");
  }
});

///////////affiche du dom pour la partie connexion/déconnexion
const connectionLink = document.querySelector(".connection-link");
const pseudo = localStorage.getItem("pseudo");
const welcomeMessage = document.querySelector(".welcome-message");
if (pseudo) {
  connectionLink.innerHTML = `

  <a href="log.html" class = "connection-link"> Déconnexion  </a>
  `;
  welcomeMessage.innerHTML = `
  <p>bienvenu ${pseudo}</p>
  `;

  connectionLink.addEventListener("click", function (e) {
    e.preventDefault();
    if (window.confirm("Voulez-vous vous déconnectez ?")) {
      localStorage.clear();
      document.location.href = `log.html`;
    }
  });
} else {
  connectionLink.innerHTML = `
  <div  class="nav-log">
  <a href="log.html" class = "connection-link"> connecte toi !  </a>
  </div>
  `;
}
