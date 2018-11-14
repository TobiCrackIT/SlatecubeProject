const mongoose = require("mongoose");

const passportLocalMongoose = require("passport-local-mongoose");

//set user schema
const userSchema = new mongoose.Schema({

  fullName: String,
  userName: {type: String, set: toLower},
  password: String,
  date: { type: Date, default: Date.now }

});

function toLower (str) {
  return str.toLowerCase();
}

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", userSchema);

module.exports = User;