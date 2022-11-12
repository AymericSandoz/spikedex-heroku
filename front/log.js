let tabs = document.querySelectorAll(".tab-link:not(.desactive)");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    unSelectAll();
    tab.classList.add("active");
    let ref = tab.getAttribute("data-ref");
    document
      .querySelector(`.tab-body[data-id="${ref}"]`)
      .classList.add("active");
  });
});

function unSelectAll() {
  tabs.forEach((tab) => {
    tab.classList.remove("active");
  });
  let tabbodies = document.querySelectorAll(".tab-body");
  tabbodies.forEach((tab) => {
    tab.classList.remove("active");
  });
}

document.querySelector(".tab-link.active").click();

//////////////////////////////////////////////////
let connexion = new Object();
let inscription = new Object();

var errorinscription = "";
var errorinscriptionMsg = document.querySelector("#inscriptionError");

var accentedCharacters =
  "àèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ";

//////////////inscription
let inscriptionForm = document.querySelector(".inscription-form");

inscriptionForm.addEventListener("submit", function (e) {
  e.preventDefault();

  if (
    validEmail(emailInscription) &&
    validname(nameInscription) &&
    validPseudo(pseudoInscription) &&
    inscription.mdp == inscription.mdp2 &&
    inscription.mdp.length >= 5
  ) {
    submitInscriptionForm();
  } else {
    if (inscription.mdp.length >= 5) {
      if (inscription.mdp != inscription.mdp2) {
        if (
          validEmail(emailInscription) &&
          validname(nameInscription) &&
          validPseudo(pseudoInscription)
        ) {
          errorinscription = "Les mdp sont différents";
        } else {
          errorinscription =
            errorinscription + " et " + "les mdp sont différents";
        }
      }
    } else {
      errorinscription = "Le mdp doit contenir au moins 5 caractères";
    }

    errorinscriptionMsg.innerHTML = errorinscription;

    alert("Les champs ne sont pas correctement renseignés");
  }
});

///////****************Validation email***************************
//ecouter la modification du mail

let emailInscription = document.querySelector(".email-inscription");

emailInscription.addEventListener("change", function () {
  validEmail(this);
});
const validEmail = function (inputEmail) {
  ///creation de la regexp pour la validation email

  let emailRegex = new RegExp(
    "[a-zA-Z0-9._-]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$",
    "g"
  );

  let testEmail = emailRegex.test(inputEmail.value);
  if (testEmail) {
    inscription.email = inputEmail.value;

    return true;
  } else {
    errorinscription = "E-mail non valide";

    return false;
  }
};

///////****************Validation nom***************************
//ecouter la modification du nom

let nameInscription = document.querySelector(".nom-inscription");

nameInscription.addEventListener("change", function () {
  validname(this);
});
const validname = function (inputName) {
  ///creation de la regexp pour la validation email

  let NameRegex = new RegExp("^[A-Za-z_ -]+$");

  let testName = NameRegex.test(inputName.value);
  if (testName) {
    inscription.name = inputName.value;

    return true;
  } else {
    errorinscription = "Nom invalide";

    return false;
  }
};

///////****************Validation pseudo***************************
//ecouter la modification du pseudo
let pseudoInscription = document.querySelector(".pseudo-inscription");

pseudoInscription.addEventListener("change", function () {
  validPseudo(this);
});
const validPseudo = function (inputPseudo) {
  ///creation de la regexp pour la validation email

  let testPseudo = inputPseudo.value.length <= 18;
  if (testPseudo) {
    inscription.pseudo = inputPseudo.value;

    return true;
  } else {
    errorinscription = "Pseudo invalide";

    return false;
  }
};

///////****************Validation mdp***************************
//ecouter la modification du mdp

let mdpInscription = document.querySelector(".password1-inscription");

mdpInscription.addEventListener("change", function () {
  inscription.mdp = this.value;
});

///////****************Validation mdp***************************
//ecouter la modification du mdp

let mdp2Inscription = document.querySelector(".password2-inscription");

mdp2Inscription.addEventListener("change", function () {
  inscription.mdp2 = this.value;
});

/////****************fonction pour envoyer le formulaire d'inscription***************************
const submitInscriptionForm = () => {
  fetch("api/user/signup", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(inscription),
  })
    .then((res) => {
      return res.json();
    })
    .then((response) => {
      if (response.errors) {
        if (response.errors.email) {
          errorinscriptionMsg.innerHTML = "email déja utilisé";
        } else if (response.errors.pseudo) {
          errorinscriptionMsg.innerHTML = "pseudo déja utilisé...oups";
        }
      } else {
        document.location.href = `log.html`;
      }
    })
    .catch((error) => {
      console.log("error");
    });
};

///////////////////////Connexion

let mdpConnexion = document.querySelector(".password-connexion");

mdpConnexion.addEventListener("change", function () {
  connexion.password = this.value;
});

///////****************Validation mdp***************************
//ecouter la modification du mdp

let emailConnexion = document.querySelector(".email-connexion");

emailConnexion.addEventListener("change", function () {
  connexion.email = this.value;
});

/////****************fonction pour envoyer le formulaire de connexion***************************
const submitConnexionForm = () => {
  fetch("api/user/login", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(connexion),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      if (data.error) {
        const errorConnexion = document.querySelector("#connexionError");
        errorConnexion.innerHTML = data.error;
      } else {
        document.location.href = `index.html`;
        localStorage.setItem("token", data.token);
        localStorage.setItem("pseudo", data.pseudo);
        localStorage.setItem("name", data.name);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

let connexionForm = document.querySelector(".connection-form");

connexionForm.addEventListener("submit", function (e) {
  e.preventDefault();
  submitConnexionForm();
});
