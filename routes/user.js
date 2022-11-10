const express = require("express");
const router = express.Router(); //création d'un routeur express dans lequel on va enregistrer nos routes
const auth = require("../middleware/auth"); //auth

//Importation controller
const userCtrl = require("../controllers/user");
const multer = require("../middleware/multer"); //gestions des images

//Routes
router.post("/signup", userCtrl.signup); //Inscription
router.post("/login", userCtrl.login); //COnnexion
router.get("/getOneUser/:userId", userCtrl.getOneUser); //COnnexion
router.get("/getUsers", userCtrl.getAllUsers); //COnnexion
router.get("/getUser", auth, userCtrl.getUser);
router.put("/uploadProfil", auth, multer, userCtrl.uploadProfil);
module.exports = router; //exportations de notre routeur
