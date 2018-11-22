const       express             = require("express"),
            router              = express.Router({mergeParams: true}),
            allPost             = require("../models/posts"),
            Comment             = require("../models/comment");


         let   middleware       = require("../middleware");



//==============================
//COMMENTS ROUTES
//==============================

//new: shows comment form
router.get("/new", middleware.isLoggedIn, function(req, res){
allPost.findById(req.params.id, function(err, post){
   if(err){
       console.log(err);
   } else{
       res.render("comments/new", {post: post});
   }
});
});

// adds comment
router.post("/", function(req, res){
allPost.findById(req.params.id, function(err, post){
   if(err){
       console.log(err);
       res.redirect("/posts");
   } else{
       Comment.create(req.body.comment, function(err, comment){
           if(err){
               console.log(err);
           } else{
               // add username and id to comment
               comment.author.id = req.user._id;
               comment.author.username = req.user.username;
               // save comment
               comment.save();
               post.comments.push(comment);
               post.save();
               res.redirect("/posts/" + post._id)
           }
       });
   }
});
});

module.exports = router;