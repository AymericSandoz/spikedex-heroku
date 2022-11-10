const mongoose = require("mongoose"); //Mongoose est un package qui facilite les interactions avec notre base de données MongoDB.
const uniqueValidator = require("mongoose-unique-validator");
var validateEmail = function (email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validateEmail, "invalid email"],
  }, //********New modif
  name: { type: String, required: true },
  pseudo: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  cardsId: [(type = String)],
  packToken: { type: Number, default: 3 },
  nbCardCreated: { type: Number, default: 0 },
  location: { type: String, default: 29 },
  imageUrl: { type: String },
  cloudinary_id: { type: String },
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
