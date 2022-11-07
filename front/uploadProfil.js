const Profil = document.querySelector("main");
var update = new Object();
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
    createProfil(user);
    updateProfil(user);
  })
  .catch(function (err) {
    console.log(err);
    alert("Une erreur est survenue");
  });

const createProfil = (user) => {
  const profil = document.createElement("div");
  profil.classList.add("profil");
  const txtCarte = document.createElement("h5");
  txtCarte.innerText = `${user.pseudo}`;
  const idCarte = document.createElement("p");
  idCarte.innerText = `${user.name}`;

  const imgCarte = document.createElement("img");
  if (user.imageUrl) {
    imgCarte.src = `${user.imageUrl}`;
  } else {
    imgCarte.src = "images/pikatchu.jpg";
  }

  const numberOfCards = document.createElement("p");
  if (user.cardsId) {
    numberOfCards.innerText = `${user.cardsId.length}`;
  }
  const stars = document.createElement("div");
  stars.classList.add("étoiles");
  const backgroundcolor = "grey";

  stars.innerHTML = displayUserStars(user);

  const divNbPokemon = document.createElement("div");
  divNbPokemon.innerHTML = `
    <img src='images/pokedex.png' alt='pokéball'/>
    <span>${user.cardsId.length}<span/>
    `;
  divNbPokemon.classList.add("NbPokémon");

  const cardsDetails = document.createElement("div");
  cardsDetails.classList.add("cardsDetails");

  profil.appendChild(imgCarte);
  profil.appendChild(txtCarte);
  profil.appendChild(idCarte);
  profil.appendChild(cardsDetails);
  cardsDetails.appendChild(stars);
  cardsDetails.appendChild(divNbPokemon);
  profil.style.background = displayBackgroundColor(user);
  console.log(profil);
  Profil.appendChild(profil);
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

///////////////////Détails du compte
const updateProfil = (user) => {
  const accountDetails = document.querySelector(".compte-détails");
  accountDetails.innerHTML = `
<div class="card mb-4">
    <div class="card-header">Détails du compte</div>
    <div class="card-body">
        <form>
            <!-- Form Group (name)-->
            <div class="mb-3">
                <label class="small mb-1 " for="inputUsername">Username </label>
                <input class="form-control name-update" id="inputUsername" type="text" placeholder=${user.name} value=${user.name}>
            </div>
            <!-- Form Row-->
        
                <!-- Form Group (first name)-->
                <div class="mb-3">
                    <label class="small mb-1" for="inputPseudo">Pseudo</label>
                    <input class="form-control pseudo-update" id="inputPseudo" type="text" placeholder=${user.pseudo} value=${user.pseudo}>
                </div>
                <!-- Form Group (location)-->
                <div class="mb-3">
                    <label class="small mb-1" for="inputLocation">Location</label>
                    <input class="form-control location-update" id="inputLocation" type="text" placeholder=${user.location} value=${user.location}>
                </div>
  
            <!-- Form Group (email address)-->
            <div class="mb-3">
                <label class="small mb-1" for="inputEmailAddress">Email address</label>
                <input class="form-control email-update" id="inputEmailAddress" type="email" placeholder=${user.email} value=${user.email}>
            </div>
            
            <!-- Form Group (password)-->
            <div class="mb-3 password">
                <label class="small mb-1" for="inputPassword">Nouveau mot de passe</label>
                <input class="form-control" id="inputPassword" type="password" placeholder='Votre nouveau mot de passe'>
            </div>
            <!-- Form Group (Image)-->
            <div class="mb-3 image">
                <label class="small mb-1 label-img" for="inputImage"><i class="fa-solid fa-image"></i></label>
                <input class="form-control" id="inputImage" type="file" placeholder='Image'>
            </div>
            <!-- Save changes button-->
            <div class="btn-container">
            <button class="btn btn-primary btn-enregistrer" type="button">Enregistrer</button>
            <button class="btn btn-mdp" type="button">Modifier mdp</button>
            </div>
        </form>
    </div>
</div>
</div>
</div>`;

  const cardHeader = document.querySelector(".card-header");
  const btn = document.querySelectorAll(".btn");

  btn.forEach(function (btn) {
    btn.style.background = displayBackgroundColor(user);
  });
  cardHeader.style.background = displayBackgroundColor(user);
  let updateName = document.querySelector("#inputUsername");

  console.log(updateName);
  updateName.addEventListener("change", function () {
    update.name = this.value;
  });
  let updateEmail = document.querySelector(".email-update");
  console.log(updateEmail);
  updateEmail.addEventListener("change", function () {
    update.email = this.value;
  });

  let updatePseudo = document.querySelector(".pseudo-update");
  console.log(updatePseudo);
  updatePseudo.addEventListener("change", function () {
    update.pseudo = this.value;
  });

  let updateLocation = document.querySelector(".location-update");
  console.log(updateLocation);
  updateLocation.addEventListener("change", function () {
    update.location = this.value;
  });

  let savebtn = document.querySelector(".btn-enregistrer");
  console.log(savebtn);
  savebtn.addEventListener("click", function () {
    const data = new FormData();
    if (update.name) {
      data.append("name", update.name);
    }
    if (update.email) {
      data.append("email", update.email);
    }
    if (update.image) {
      data.append("image", update.image);
    }
    if (update.password) {
      data.append("password", update.password);
    }
    if (update.location) {
      data.append("location", update.location);
    }
    if (update.pseudo) {
      data.append("pseudo", update.pseudo);
    }
    console.log(update);
    submitForm(data);
  });
  let btnPassword = document.querySelector(".btn-mdp");
  let passwordSection = document.querySelector(".password");
  let inputPassword = document.querySelector("#inputPassword");
  console.log(btnPassword);
  btnPassword.addEventListener("click", function () {
    if (passwordSection.classList.contains("active")) {
      passwordSection.style.display = "none";
      passwordSection.classList.remove("active");

      delete update["password"];
      console.log("loup");
    } else {
      passwordSection.style.display = "block";
      passwordSection.classList.add("active");
      update.password = this.value;
      console.log(update);
    }
  });

  inputPassword.addEventListener("change", function () {
    update.password = this.value;
  });

  let form = document.querySelector("form");

  form.inputImage.addEventListener("change", function (event) {
    update.image = event.target.files[0];
  });
};

//
const submitForm = (data) => {
  console.log(data);
  fetch("http://localhost:5000/api/user/uploadProfil/", {
    method: "PUT",
    headers: {
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: data,
  })
    .then((reponse) => reponse.json())
    .then((response) => {
      console.log(response);

      //location.reload();
    })
    .catch((error) => {
      console.log(error);
    });
};
