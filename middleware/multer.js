// const multer = require("multer"); //package qui nous permet de gérer les fichiers entrants dans les requêtes HTTP.

// const path = require("path");

// //résoudre l'extension de fichier
// const MIME_TYPES = {
//   "image/jpg": "jpg",
//   "image/jpeg": "jpg",
//   "image/png": "png",
// };

// //Storage contient la logique nécessaire à passer à multer
// const storage = multer.diskStorage({
//   destination: (req, file, callback) => {
//     callback(null, "images");
//   },
//   filename: (req, file, callback) => {
//     const name = file.originalname.split(" ").join("_");
//     const extension = MIME_TYPES[file.mimetype];
//     callback(null, name + Date.now() + "." + extension);
//   },
// });

// module.exports = multer({ storage: storage }).single("image"); //exportons ensuite l'élément multer entièrement configuré, lui passons notre constante storage et lui indiquons que nous gérerons uniquement les téléchargements de fichiers image.

const multer = require("multer");
const path = require("path");
// Multer config
module.exports = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
      cb(new Error("Unsupported file type!"), false);
      return;
    }
    cb(null, true);
  },
});
