const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cloudinary = require("../utils/cloudinary");
//Inscriptions des utilisateurs
exports.signup = (req, res, next) => {
  bcrypt
    .hash(req.body.mdp, 10)
    .then((hash) => {
      const user = new User({
        email: req.body.email,
        password: hash,
        pseudo: req.body.pseudo,
        name: req.body.name,
      });
      user
        .save()
        .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
        .catch((error) => console.log(error)); //res.status(400).json({ error })
    })
    .catch((error) => console.log(error)); //res.status(500).json({ error })
};

exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      return res.status(500).json({ err });
    }

    console.log("hamster");
    console.log(user);
    if (user) {
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(200).json({
              error: "Mot de passe ou identifiant incorrect !",
            });
          } else {
            console.log("cheetah");
            res.status(200).json({
              userId: user._id,
              token: jwt.sign({ userId: user._id }, process.env.KEY_JWT, {
                expiresIn: "30d",
              }),
              pseudo: user.pseudo,
              name: user.name,
            });
          }
        })
        .catch((error) => console.log(error)); //res.status(500).json({ error })
    } else {
      res.status(200).json({
        error: "Mot de passe ou identifiant incorrect !",
      });
    }
  });
};

exports.getAllUsers = (req, res, next) => {
  User.find((err, docs) => {
    if (!err) res.send(docs);
    else res.send("Erreur :" + err);
  }).sort({ cardsId: -1 });
};

exports.getOneUser = (req, res, next) => {
  console.log("citrouille");
  User.findOne({
    _id: req.params.userId,
  })
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((error) => {
      console.log(error);
      res.status(404).json({
        error: error,
      });
    });
};

exports.getUser = (req, res, next) => {
  console.log("citrouille");
  User.findOne({
    _id: req.auth.userId,
  })
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((error) => {
      console.log(error);
      res.status(404).json({
        error: error,
      });
    });
};

exports.uploadProfil = async (req, res, next) => {
  const result = await cloudinary.uploader.upload(req.file.path);
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      //////////////////////////////////
      const profilObject = req.file
        ? {
            ...req.body,
            imageUrl: result.secure_url,
            cloudinary_id: result.public_id,
            // imageUrl: `${req.protocol}://${req.get("host")}/images/${
            //   req.file.filename
            // }`,
          }
        : { ...req.body };
      delete profilObject._userId;
      User.findOne({ _id: req.auth.userId })
        .then((user) => {
          if (user._id != req.auth.userId) {
            res.status(403).json({ message: "unauthorized request" });
          } else {
            User.updateOne(
              { _id: req.auth.userId },
              { ...profilObject, password: hash, _id: req.auth.userId }
            )
              .then(() => res.status(200).json({ message: "Object modified!" }))
              .catch((error) => res.status(401).json({ error }));
          }
        })
        .catch((error) => {
          console.log(error);
          res.status(500).json({ error });
        });

      /////////////////////
    })
    .catch((error) => res.status(500).json({ error })); //res.status(500).json({ error })
};
