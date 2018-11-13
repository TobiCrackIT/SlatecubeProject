const mongoose = require("mongoose");

//set schema

let postSchema = new mongoose.Schema({

message : String,

// associate post with user
author : {
id: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User"
},
username: String
}


});

const allPost = mongoose.model("allPost",postSchema);

module.exports = allPost;