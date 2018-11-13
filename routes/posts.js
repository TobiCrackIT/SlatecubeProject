const express = require("express");

      router = express.Router();

const allPost = require("../models/posts");    


//ROUTES


//Route to show all Posts
router.get("/posts", (req, res)=>{

  allPost.find({}, function(err, allPosts){
    if(err){
      console.log(err);
    }

    res.render("posts/index", {allPosts:allPosts})
  })
})



//SHow form to create new post
router.get("/posts/new",function(req, res){

res.render("posts/new");
});


//route to create posts


router.post("/posts", function(req, res){

  var message = req.body.message;

  //connect post to a user

  // var author = 
  //   {    id: req.user._id,
  //       username : req.user.username
  //   }

    var newPost = {message:message}

    //Create a new Post and add it to the DATEBASE

    allPost.create(newPost, function(err, createdPost){

      if(err){
        console.log(err);
      }
      console.log(createdPost);

      res.redirect("/posts");
    })

});


//Delete post

router.delete("/posts/:id", (req, res)=>{
  allPost.findByIdAndDelete(req.params.id, function(err, deletedPost){
if(err){
  console.log(err);
  res.redirect("/posts");
}else{

  res.redirect("/posts");

}


  })
})




module.exports = router;