const express = require("express"),

      router =  express.Router();

      User   = require("../models/users"),

      passport = require("passport");




 // ROOT ROUTE
 
//  router.get("/", (req, res)=>{

//   res.sendFile(__dirname + '/homepage.html');
//  });

 router.get('/',(req,res)=>{
  res.sendFile(__dirname + '/homepage.html')
});

 //show register page

 router.get("/register", (req,res)=>{
  res.render("register");
  })



  //Route to handle signup Logic

router.post("/register", (req,res)=>{

  let fullname = req.body.fullname;
  let username = req.body.username;
  let email = req.body.email;
  let password = req.body.password;
  let userInfo = {fullname:fullname,username:username, email:email,password:password};

  User.register(userInfo, req.body.password, (err, newUser)=>{
if(err){
  console.log(err.message);
  return   res.render("register", {errormsg : err.message});

}

passport.authenticate("local")(req, res,()=>{
  res.redirect("/posts");
});


  });
  });
  

  //Show login page
  router.get("/login", (req, res)=>{
  req.flash("error", "Please Login first")
    res.redirect("/");
  });
  
  
  //Route to handle Login logic
  
  
  //Route to handle Login logic
  
  
  router.post("/login", passport.authenticate("local",
  {
    
    successRedirect:"/posts",
    failureRedirect:"/login"
 
  }), (req,res)=>{
  
    
  });
  
  
  //Logout route
  
  router.get("/logout", (req,res)=>{
    req.logout();
    res.redirect("/");
  
  })

module.exports = router;