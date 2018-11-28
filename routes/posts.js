const express = require("express");

      router = express.Router();

const allPost = require("../models/posts");  
let middleware = require("../middleware");


//ROUTES


//Route to show all Posts
router.get("/posts", (req, res)=>{

  allPost.find({}, function(err, allPosts){
    if(err){
      console.log(err);
    }

    res.render("posts/index" , {allPosts:allPosts})
  })
})



//SHow form to create new post
router.get("/posts/new", middleware.isLoggedIn, function(req, res){

res.render("posts/new");
});


//CREATE - Add new Posts

router.post("/posts", middleware.isLoggedIn, function(req, res){

  req.body.message = req.sanitize(req.body.message);

  var title = req.body.title;
  var message = req.body.message;
  var middleware = require("../middleware");

  //connect post to a user
  
  var author = 
    {    id: req.user._id,
        username : req.user.username
    }

    var newPost = {title:title, message:message, author:author};

    //Create a new Post and add it to the DATEBASE

    allPost.create(newPost, function(err, createdPost){

      if(err){
        console.log(err);
      }
      console.log(createdPost);
      req.flash("success", "Your post has been created");
      res.redirect("/posts");
    })

});

//SHOW - show a particular user post
router.get("/posts/:id", (req, res) => {
  // find the post with provied ID
  allPost.findById(req.params.id).populate("comments").exec(function(err, foundPost){
    if(err){
      throw err;
    } else {
      // render show template with that post
      res.render("posts/show", {post: foundPost});
    }
  });
});

// EDIT POST
router.get("/posts/:id/edit", middleware.checkPostOwnership, (req, res) => {
  allPost.findById(req.params.id, (err, foundPost) => {
    res.render("posts/edit", {post: foundPost});
  })
});

// UPDATE POST ROUTE
router.put("/posts/:id", middleware.checkPostOwnership, (req, res) => {
  req.body.post.message = req.sanitize(req.body.post.message);
  allPost.findByIdAndUpdate(req.params.id, req.body.post, (err, updatedPost) => {
    if(err){
      res.redirect("/posts");
    } else {
      req.flash("success", "Your post has been updated successfully");

      res.redirect("/posts/" + req.params.id);
    }
  })
})

//Delete post

router.delete("/posts/:id", middleware.checkPostOwnership, (req, res)=>{
  allPost.findByIdAndDelete(req.params.id, function(err, deletedPost){
if(err){
  console.log(err);
  res.redirect("/posts");
}else{
  req.flash("success", "Your post has been Deleted successfully");

  res.redirect("/posts");

}


  })
})




module.exports = router;