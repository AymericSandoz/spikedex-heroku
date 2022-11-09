// import * as htmlToImage from "html-to-image";
// import { toPng, toJpeg, toBlob, toPixelData, toSvg } from "html-to-image";
var pack = document.querySelector(".pokemon-pack");
var packImg = document.querySelector(".img-pokemon-pack");
var messagePack = document.querySelector(".message-pack");
console.log("pack", pack);
const atcualiseMessagePack = async () => {
  let tokenNumber = await getTokenNumber();
  messagePack.innerHTML = `
<span> ${tokenNumber} </span>
<img src="images/img_coin.png" alt="pokemon coin" id="pokemon-coin"/>

`;
};

window.onload = function () {
  atcualiseMessagePack();
  packImg.addEventListener("click", fetchCardListPack);
};

const getTokenNumber = async () => {
  var packToken = fetch("api/user/getUser/", {
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
      packToken = user.packToken;
      console.log(packToken);
      return packToken;
    })
    .catch(function (err) {
      console.log(err);
      alert("Une erreur est survenue");
    });

  return packToken;
};

const fetchCardListPack = async () => {
  // document.onreadystatechange = function()
  // {
  //   if (document.readyState != "complete")
  //   {
  //     document.querySelector("body").style.visibility = "hidden";
  //     document.querySelector("#chargement").style.visibility = "visible";
  //   }
  //   else
  //   {
  //     document.querySelector("#chargement").style.display = "none";
  //     document.querySelector("body").style.visibility = "visible";
  //   }
  // };
  const packTokenNumber = await getTokenNumber();
  if (packTokenNumber > 0) {
    fetch("api/card/")
      .then((reponse) => reponse.json())
      .then((allSpikemmon) => {
        pack.style.display = "none";
        document.querySelector(".loader").style.display = "flex";
        setTimeout(() => {
          openPack(allSpikemmon);
          document.querySelector(".loader").style.display = "none";
          document.querySelector("#pokemon-cards-opened").style.display =
            "flex";
        }, "3000");
        return allSpikemmon;
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    alert("Oupsssssss, tu n'a plus de token, attend 21h pour en avoir :)");
  }
};

const savePackCards = (data) => {
  fetch("api/card/packOpener", {
    method: "POST",
    mode: "cors",
    headers: {
      authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
      //       "Content-Type": "text/plain",
    },
    body: JSON.stringify({ cardId: data }),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        //console.log(data);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const tableauFinal = [];
const openPack = (allSpikemmon) => {
  fetch("api/card/actTokenPackNb", {
    method: "PATCH",
    headers: {
      authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      console.log("done");
    })
    .catch((error) => {
      console.log(error);
    });

  let i = 1;
  while (i <= 3) {
    let hasardNumber = getRandomInt(allSpikemmon.length);
    let hasardProba = Math.random();

    if (allSpikemmon[hasardNumber].weight / 100 > hasardProba) {
      tableauFinal.push(allSpikemmon[hasardNumber]);
      i++;
      console.log(i);
    } else {
      console.log("oups");
    }
  }

  let cardsOpened = document.getElementById("pokemon-cards-opened");
  cardsOpened.innerHTML = displayAllPackCards(tableauFinal);
  displayBackgroundImage(tableauFinal);
  //////////////store cards

  for (let i = 0; i < 3; i++) {
    // console.log(tableauFinal[i]._id);
    savePackCards(tableauFinal[i]._id);
    downloadCard(tableauFinal[i]._id, i);
  }
};

const displayOneCard = (card, i) => {
  let name = localStorage.getItem("token");
  let result = `
<div class="pokemon-card" id='${i}-${card._id}'>
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
      <img class="element-icon" src="images/${card.attaque2Type}.png">
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
      <p > ${card.weakness}</p>
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

  <div class="download-card">
  <i class="fa-solid fa-download"></i>
  <btn id= '${i}-btn-download-card'> Download </btn>
  <a id="link"></a>
  </div>
  </div>
  `;

  return result;
};

const displayAllPackCards = (listOfCards) => {
  let result = "";
  for (let i = 0; i < listOfCards.length; i++) {
    result += displayOneCard(listOfCards[i], i);
  }
  return result;
};

const displayBackgroundImage = (listOfCards) => {
  console.log(listOfCards);
  for (let i = 0; i < listOfCards.length; i++) {
    const type = listOfCards[i].type;

    let background = document.getElementById(`${i}-${listOfCards[i]._id}`);

    background.style.backgroundSize = "cover";

    switch (type) {
      case "Electrik":
        background.style.backgroundImage =
          "url(images/background_electrik.png)";
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
  }
};

// const downloadCard = (idCardToDownload, i) => {
//   let btn = document.getElementById(`${i}-btn-download-card`);
//   let cardToDownload = document.getElementById(idCardToDownload);

//   btn.addEventListener("click", function () {
//     html2PDF(cardToDownload, {
//       jsPDF: {
//         format: "a4",
//       },
//       imageType: "image/jpeg",
//       output: "./pdf/generate.pdf",
//     });
//   });
// };

// const downloadCard = (idCardToDownload, i) => {
//   let btn = document.getElementById(`${i}-btn-download-card`);
//   let cardToDownload = document.getElementById(`${i}-${idCardToDownload}`);
//   // let cardToDownload = document.querySelector("body");
//   console.log(cardToDownload.style);
//   btn.addEventListener("click", function () {
//     html2canvas(cardToDownload, {
//       allowTaint: false,
//       useCORS: true,

//       // allowTaint: true,
//       // foreignObjectRendering: true,
//       windowWidth: cardToDownload.scrollWidth,
//       windowHeight: cardToDownload.scrollHeight,
//     }).then(function (canvas) {
//       // document.body.appendChild(canvas);
//       // console.log(canvas);
//       const cardPokemon = canvas.toDataURL("image/png", 1.0);

//       var anchor = document.querySelector("a");
//       console.log(anchor);
//       anchor.setAttribute("href", cardPokemon);
//       anchor.setAttribute("download", `card-n${i}.png`);
//       anchor.click();
//     });
//   });
// };

var style = {
  transform: "scale(2)",
  transformOrigin: "top left",
  top: 0,
  left: 0,
  margin: 0,
  width: "465px",
  height: "687px",
};
const downloadCard = (idCardToDownload, i) => {
  let btn = document.getElementById(`${i}-btn-download-card`);
  let cardToDownload = document.getElementById(`${i}-${idCardToDownload}`);
  // let cardToDownload = document.querySelector("body");
  let scale = 2;
  console.log("les guepars sont des ....................;");
  btn.addEventListener("click", function () {
    domtoimage
      .toBlob(cardToDownload, {
        style: style,
        width: 465 * scale,
        height: 687 * scale,
      })
      .then(function (dataUrl) {
        // console.log(dataUrl);
        // var img = new Image();
        // img.src = dataUrl;
        // document.body.appendChild(img);
        window.saveAs(dataUrl);
      });
  });
};

// const downloadCard = (idCardToDownload, i) => {
//   let btn = document.getElementById(`${i}-btn-download-card`);
//   let element = document.getElementById(`${i}-${idCardToDownload}`);
//   let scale = 3;
//   btn.addEventListener("click", function () {
//     console.log(element.clientWidth);
//     console.log(element.clientHeight);
//     domtoimage
//       .toBlob(element, {
//         width: element.clientWidth * scale,
//         height: element.clientHeight * scale,
//         style: {
//           transform: "scale(" + scale + ")",
//           transformOrigin: "top left",
//           width: "450px",
//           height: "672px",
//         },
//       })
//       .then(function (dataUrl) {
//         window.saveAs(dataUrl);
//       })
//       .catch(function (error) {
//         console.error("oops, something went wrong!", error);
//       });
//   });
// };

// const downloadCard = (idCardToDownload, i) => {
//   let btn = document.getElementById(`${i}-btn-download-card`);
//   let cardToDownload = document.getElementById(`${i}-${idCardToDownload}`);
//   btn.addEventListener("click", function () {
//     WKHtmlToImage.generate(cardToDownload).pipe(res);
//   });
// };

const displayStars = (rarity) => {
  let result = "";
  for (let i = 0; i < rarity; i++) {
    result += '<i class="fa-solid fa-star"></i>';
  }
  console.log(result);
  return result;
};
