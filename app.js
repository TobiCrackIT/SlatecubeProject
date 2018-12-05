const express = require("express"),

        app = express();

 
const mongoose     = require("mongoose"),
         bodyParser   = require("body-parser"),
         expressSanitizer = require("express-sanitizer"),
         methodOverride = require("method-override"),
         passport     = require("passport"),
         LocalStrategy= require("passport-local"),
         session       = require("express-session"),
         cookieParser = require("cookie-parser"),
         flash         = require("connect-flash"),        
         allPost          = require("./models/posts.js"),
         Comment            = require("./models/comment.js");
         User          = require("./models/users.js");


      // connect MONGODB
//  mongoose.connect("mongodb://localhost/friendsMEET", {useNewUrlParser:true})

let url = process.env.databaseURL || "mongodb://localhost/friendsMEET" ;

 mongoose.connect(url,{ useNewUrlParser: true});
 


      
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(methodOverride("_method"));
app.use(express.static(__dirname + "/public"));
app.use(cookieParser())
app.use(flash());

//PASSPORT CONFIGURATIONS
// passport middlewares
app.use(session({
  secret: "rover",
  resave: false,
  saveUninitialized: true
}))





app.use(passport.initialize());
app.use(passport.session());

//setup passport local mongoose
passport.use(new LocalStrategy(User.authenticate()));

//sessions
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Set Local Variables
app.use(function(req, res, next){
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success"); 
  res.locals.loggedout = req.flash("loggedout"); 

  res.locals.errormsg = req.err;

  next();
});


//REQUIRE ALLL ROUTES

const postRoute = require("./routes/posts"),

      authRoute = require("./routes/auth");
      commentRoute = require("./routes/comments");

//Using the routes
app.use(postRoute);
app.use(authRoute);
app.use("/posts/:id/comments", commentRoute);


app.listen(3000, function(){
  console.log("app started");
})

const port = process.env.PORT;
const ip = process.env.IP;
 app.listen(port, ip, ()=>{
   console.log("Friends Meet App started");
 })       

