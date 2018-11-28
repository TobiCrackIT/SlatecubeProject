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
  req.body.comment.text = req.sanitize(req.body.comment.text);
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
               req.flash("success", "Comment created successfully");

               res.redirect("/posts/" + post._id)
           }
       });
   }
});
});

// Comment edit route
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment){
    if(err){
        res.redirect("back");
    } else{
        res.render("comments/edit", {post_id: req.params.id, comment: foundComment});
    }
});
});

//COMMENT UPDATE ROUTE
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
  req.body.comment.text = req.sanitize(req.body.comment.text);
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, upDatedComment){
        if(err){
            res.redirect("back");
        } else{
            req.flash("success", "Comment edited successfully");

            res.redirect("/posts/" + req.params.id);
        }
    });
});

// COMMENT DELETE ROUTE
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            res.redirect("back");
        } else{
            req.flash("success", "Comment Deleted successfully");
            res.redirect("/posts/" + req.params.id);
        }
    });
});

module.exports = router;