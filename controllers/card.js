const Card = require("../models/card");
const User = require("../models/user");
const cloudinary = require("../utils/cloudinary");
const mongoose = require("mongoose");
//créer un post
exports.createCard = async (req, res, next) => {
  const createCardErrors = (errors) => {
    let error = "";

    if (errors.message.includes("duplicate key error collection"))
      error = "Oups...Le nom de ton Spikemon est déja utilisé :/";
    else {
      error = errors;
    }

    return error;
  };
  const result = await cloudinary.uploader.upload(req.file.path);

  User.findOne({ _id: req.auth.userId })
    .then((user) => {
      const userEmail = user.email;
      const userPseudo = user.pseudo;
      const userName = user.pseudo;
      console.log(result.secure_url, "/////", result.public_id);
      var card = new Card({
        userId: req.auth.userId,
        userEmail: userEmail,
        userName: userName,
        userPseudo: userPseudo,
        description: req.body.description,
        name: req.body.name,
        type: req.body.type,
        pv: req.body.pv,
        attaque1: req.body.attaque1,
        attaque2: req.body.attaque2,
        attaque1Type: req.body.attaque1Type,
        attaque2Type: req.body.attaque2Type,
        attaque1power: req.body.Attack_1_number,
        attaque2power: req.body.Attack_2_number,

        weakness: req.body.weakness,
        force: req.body.force,
        // imageUrl: `${req.protocol}://${req.get("host")}/images/${
        //   req.file.filename
        // }`,
        imageUrl: result.secure_url,
        cloudinary_id: result.public_id,
      });
      console.log(card.imageUrl, "/////kkkkkkk////", req.fileUrl);
      card
        .save()
        .then((doc) => {
          console.log(doc);
          res.status(201).json({ message: "card saved !" });
        })
        .catch((error) => {
          console.log(error);
          res.status(404).json({
            error: createCardErrors(error),
          });
        });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        error: error,
      });
    });
};

//récupérer une carte
exports.getOneCard = (req, res, next) => {
  Card.findOne({
    name: req.params.name,
  })
    .then((card) => {
      res.status(200).json(card);
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
};

exports.getOneCardById = (req, res, next) => {
  console.log("camion");
  Card.findOne({
    _id: req.params.id,
  })
    .then((card) => {
      res.status(200).json(card);
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
};

//Récupérer les cards
exports.getAllCards = (req, res, next) => {
  Card.find((err, docs) => {
    if (!err) res.send(docs);
    else res.send("Erreur :" + err);
  }).sort({ createdAt: -1 });

  console.log("hello");
};

//Récupérer les cards
exports.getAllUserCards = (req, res, next) => {
  console.log(req.params.userId);
  Card.find({ userId: req.params.userId }, (err, docs) => {
    if (!err) res.send(docs);
    else res.send("Erreur :" + err);
  }).sort({ weight: 1 });
};

//Récupérer les cards
// exports.getOwnCards = (req, res, next) => {
//   console.log("hello");
//   console.log("req.auth.userId");

//   Card.find({ userId: req.auth.userId }, (err, docs) => {
//     if (!err) {
//       res.send(docs);
//       console.log("docs");
//     } else res.send("Erreur :" + err);
//   }).sort({ createdAt: -1 });
// };

exports.getOwnCards = (req, res, next) => {
  console.log("citrouille");
  User.findOne({
    _id: req.auth.userId,
  })
    .then((user) => {
      let tab = ["lapin", "Spikatchu"];
      let objectIdArray = user.cardsId.map(mongoose.Types.ObjectId);
      Card.find({ _id: { $in: objectIdArray } })
        .then((cards) => {
          console.log("cards", cards);
          res.send(cards);
        })
        .catch((error) => {
          res.status(400).json({
            error: error,
          });
        });
    })
    .catch((error) => {
      console.log(error);
      res.status(404).json({
        error: error,
      });
    });
};

exports.addCardPack = (req, res) => {
  User.findByIdAndUpdate(
    req.auth.userId,
    {
      $addToSet: { cardsId: { $each: [req.body.cardId] } },
    },
    { new: true }, // `doc` is the document _after_ `update` was applied because of `new: true
    function (err, docs) {
      if (err) {
        res.status(400).json(err);
      } else {
        res.send(docs);
      }
    }
  );
};

exports.actTokenPackNb = (req, res) => {
  User.findByIdAndUpdate(
    req.auth.userId,
    {
      $inc: { packToken: -1 },
    },
    { new: true }, // `doc` is the document _after_ `update` was applied because of `new: true
    function (err, docs) {
      if (err) {
        res.status(400).json(err);
      } else {
        console.log(docs);
        res.send(docs);
      }
    }
  );
};
