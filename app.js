const express = require("express"),

        app = express();

 const   bodyParser   = require("body-parser"),
        methodOverride = require("method-override"),
        mongoose =    require("mongoose"),
        passport     = require("passport"),
         LocalStrategy= require("passport-local"),
         session       = require("express-session"),
         allPost          = require("./models/posts.js"),
         User          = require("./models/users.js");


      // connect MONGODB
 mongoose.connect("mongodb://localhost/friendsMEET", {useNewUrlParser:true})

      let url = "mongodb://meet:meet1990@ds033679.mlab.com:33679/friendsmeet" ;

      mongoose.connect(url);
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(express.static(__dirname + "/public"));

//PASSPORT CONFIGURATIONS
//passport middlewares
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
  
  next();
});


//REQUIRE ALLL ROUTES

const postRoute = require("./routes/posts"),

      authRoute = require("./routes/auth");
//Using the routes
app.use(postRoute);
app.use(authRoute);



 app.listen(3000, ()=>{
   console.log("Friends Meet App started");
 })       

//Coonect to MongoLab
 app.listen(process.env.IP, process.env.PORT, ()=>{
   console.log("Friends Meet App started")
 })