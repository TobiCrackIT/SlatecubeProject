const mongoose = require("mongoose");

const passportLocalMongoose = require("passport-local-mongoose");

//set user schema
const userSchema = new mongoose.Schema({

  fullName: String,
  userName: {type: String, set: toLower},
  email: String,
  password: String,
  date: { type: Date, default: Date.now }

});

function toLower (str) {
  return str.toLowerCase();
}

userSchema.pre("save", function(next){

  User.find({username: this.username}, function(err, regUser){
     if (!regUser.length){
      next();
    } else{
      // console.log("User Already Exists", this.username);
      next(new Error("Username already Taken!! Register with another Username"))
    } 
  });
});

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", userSchema);

module.exports = User;