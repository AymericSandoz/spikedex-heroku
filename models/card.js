const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const cartSchema = mongoose.Schema(
  {
    rarity: { type: Number, default: 0 },
    weight: { type: Number, default: 0 },
    userId: { type: String },
    userEmail: { type: String },
    userPseudo: { type: String },
    userName: { type: String },
    name: { type: String, unique: true },
    pv: { type: Number },
    type: { type: String },
    attaque1: { type: String },
    attaque1Type: { type: String },
    attaque1power: { type: Number, required: true },
    attaque2: { type: String },
    attaque2Type: { type: String },
    attaque2power: { type: Number, required: true },
    weakness: { type: String },
    force: { type: String },
    description: { type: String },
    imageUrl: { type: String },
    profile_img: { type: String },
    cloudinary_id: { type: String },
    usersLiked: [(type = String)],
    comments: {
      type: [
        {
          commenterId: String,
          commenterEmail: String,
          commenterPseudo: String,
          text: String,
          timestamp: Number,
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Card", cartSchema);
