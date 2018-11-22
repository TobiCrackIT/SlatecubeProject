const mongoose = require("mongoose");

//set schema

let postSchema = new mongoose.Schema({

title:{
  type: String,
  required: true
},
message:{
  type:String,
  required: true
},
date: {
  type: Date,
  default: Date.now
},
// associate post with user
author : {
id: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User"
},
username: String
},

created: {type: Date, default: Date.now},
comments: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }
]

});

const allPost = mongoose.model("allPost",postSchema);

module.exports = allPost;