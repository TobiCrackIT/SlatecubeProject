const Post = require("../models/posts");

let middlewareObj = {};

middlewareObj.checkPostOwnership = (req, res, next) => {
  // Is user logged in?
    if(req.isAuthenticated()){
      Post.findById(req.params.id, (err, foundPost) => {
        if(err){
          res.redirect("back")
        } else {
          // does user own the post?
          if(foundPost.author.id.equals(req.user._id)) {
            next();
          } else {
            res.redirect("back");
          }
        }
      })
    } else {
      res.redirect("back");
    }
}

middlewareObj.isLoggedIn = (req, res, next) => {
  if(req.isAuthenticated()){
    return next();
  }
  req.flash("error", "You need to be logged in to do that");
  res.redirect("/login");
}

module.exports = middlewareObj