const express = require("express");
const port =5000;
const connectDb = require('./config/dbConnection');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

//creating session
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport');
const MongoStore = require("connect-mongo");

const app = express();

app.use(express.json());
app.use(cookieParser());

connectDb();

//setting view engine
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));


app.use(session({
    name : 'HabitAppp',
    secret : "blahsomething",
    saveUninitialized : false,
    resave: false,
    cookie:{
        maxAge : (1000 * 60 * 100)
    },
    //setting up session , so that when the server restarts the user wouldn't get log out
    store : MongoStore.create({
        mongoUrl: 'mongodb://localhost:27017/Habits-Tracker',
        autoRemove : 'disabled'
    },function(err){
        console.log(err || 'connect=mongodb setup ok');
    })
}))

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);


//setting routes

//home routes
app.use('/' , require('./routes/homeRoutes'));
//userRoutes
app.use('/user',require('./routes/userRoutes'));

//habitsRroutes
app.use('/',require('./routes/habitsRoutes'));





//running the server
app.listen(port , ()=>{
    console.log("Server is Running on the port: ",port);
})