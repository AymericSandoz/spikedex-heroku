console.log("lets gooooooooooooo");
const listeUsers = document.querySelector(".liste-users");

fetch("api/user/getUsers/")
  .then(function (res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function (users) {
    createUserList(users);
  })
  .catch(function (err) {
    console.log(err);
    alert("Une erreur est survenue");
  });

const createUserList = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    const carte = document.createElement("a");
    carte.classList.add(arr[i]._id);
    carte.classList.add("carte");
    carte.setAttribute(
      "href",
      `spikeurCollection.html?id=${arr[i]._id}&name=${arr[i].name}&pseudo=${arr[i].pseudo}`
    );
    const txtCarte = document.createElement("h5");
    txtCarte.innerText = arr[i].pseudo;
    const idCarte = document.createElement("p");
    idCarte.innerText = `${arr[i].name}`;

    const imgCarte = document.createElement("img");
    if (arr[i].imageUrl) {
      imgCarte.src = `${arr[i].imageUrl}`;
    } else {
      imgCarte.src = "images/pikatchu.jpg";
    }

    const numberOfCards = document.createElement("p");
    if (arr[i].cardsId) {
      numberOfCards.innerText = `${arr[i].cardsId.length}`;
    }
    const stars = document.createElement("div");
    stars.classList.add("étoiles");
    const backgroundcolor = "grey";

    stars.innerHTML = displayUserStars(arr[i]);

    const divNbPokemon = document.createElement("div");
    divNbPokemon.innerHTML = `
    <img src='images/pokedex.png' alt='pokéball'/>
    <span>${arr[i].cardsId.length}<span/>
    `;
    divNbPokemon.classList.add("NbPokémon");

    const cardsDetails = document.createElement("div");
    cardsDetails.classList.add("cardsDetails");

    carte.appendChild(imgCarte);
    carte.appendChild(txtCarte);
    carte.appendChild(idCarte);
    carte.appendChild(cardsDetails);
    cardsDetails.appendChild(stars);
    cardsDetails.appendChild(divNbPokemon);
    carte.style.background = displayBackgroundColor(arr[i]);

    listeUsers.appendChild(carte);
  }
};

const displayUserStars = (user) => {
  let result = "";
  if (user.cardsId.length >= 50) {
    result = `
        <i class="fa-solid fa-star"></i>
        <i class="fa-solid fa-star"></i>
        <i class="fa-solid fa-star"></i>
        `;
  } else if (user.cardsId.length < 50 && user.cardsId.length >= 25) {
    result = `
        <i class="fa-solid fa-star"></i>
        <i class="fa-solid fa-star"></i>
        `;
  } else if (user.cardsId.length < 25 && user.cardsId.length >= 3) {
    result = `
        <i class="fa-solid fa-star"></i>
        `;
  } else if (user.cardsId.length < 3) {
    result = `
        `;
  }
  return result;
};

const displayBackgroundColor = (user) => {
  if (user.cardsId.length >= 50) {
    backgroundcolor =
      "linear-gradient(to right, #BF953F, #FCF6BA, #B38728, #FBF5B7, #AA771C)";
  } else if (user.cardsId.length < 50 && user.cardsId.length >= 25) {
    backgroundcolor = "linear-gradient(to bottom, #C0C0C0 0%, #B1B1B1 100%)";
  } else if (user.cardsId.length < 25 && user.cardsId.length >= 3) {
    backgroundcolor = " linear-gradient(to bottom, #CD7F32 0%, #BE7023 100%)";
    // backgroundcolor =
    //   "linear-gradient( -72deg,#ca7345,#ffdeca 16%,#ca7345 21%,#ffdeca 24%,#a14521 27%,#ca7345 36%,#ffdeca 45%,#ffdeca 60%,#ca7345 72%,#ffdeca 80%,#ca7345 84%,#732100)";
    // backgroundcolor =
    //   "linear-gradient(-72deg,#ffde45,#ffffff 16%,#ffde45 21%,#ffffff 24%,#452100 27%,#ffde45 36%,#ffffff 45%,#ffffff 60%,#ffde45 72%,#ffffff 80%,#ffde45 84%,#452100)";

    // backgroundcolor =
    //   "linear-gradient( -72deg, #dedede, #ffffff 16%, #dedede 21%, #ffffff 24%, #454545 27%, #dedede 36%, #ffffff 45%, #ffffff 60%, #dedede 72%, #ffffff 80%, #dedede 84%,  #a1a1a1)";

    // backgroundcolor = "linear-gradient(to bottom, #C0C0C0 0%, #B1B1B1 100%)";
    // backgroundcolor =
    //   "linear-gradient(to right, #BF953F, #FCF6BA, #B38728, #FBF5B7, #AA771C)";
  } else if (user.cardsId.length < 3) {
    backgroundcolor = " linear-gradient(to bottom, #CD7F32 0%, #BE7023 100%)";
  }
  return backgroundcolor;
};
