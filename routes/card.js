const express = require("express");
const router = express.Router(); //création d'un routeur express dans lequel on va enregistrer nos routes

//Importation controllers
const stuffCtrl = require("../controllers/card");
const auth = require("../middleware/auth"); //auth
const multer = require("../middleware/multer"); //gestions des images
//Routes

router.get("/ownerCards", auth, stuffCtrl.getOwnCards);
router.post("/packOpener", auth, multer, stuffCtrl.addCardPack); //Création de card
router.patch("/actTokenPackNb", auth, stuffCtrl.actTokenPackNb); //Création de card
// router.get("/getAllUserCards/:id", stuffCtrl.getAllUserCards); //Création de card
router.get("/getOneCardById/:id", stuffCtrl.getOneCardById); //Création de card
router.post("/", auth, multer, stuffCtrl.createCard); //Création de card
router.get("/:id", stuffCtrl.getOneCardById); //recup une card
router.get("/name/:name", stuffCtrl.getOneCard); //recup une card

router.get("/", stuffCtrl.getAllCards); //recup une card

module.exports = router; //exportations de notre routeur
