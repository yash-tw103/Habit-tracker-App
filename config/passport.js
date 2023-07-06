const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/userSchema');

passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
    try {
      const user = await User.findOne({ email: email });
      if (!user || user.password !== password) {
        console.log('Invalid Username/Password');
        return done(null, false);
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }));


//serializing useer

passport.serializeUser(async(user,done)=>{
    done(null , user.id);
})

//deserialize user

passport.deserializeUser(async(id,done)=>{

    try {
        const user =await User.findById(id)
        
        return done(null , user)
    } catch (error) {
        return done(error);
    }
 
})


passport.checkAuthentication = (req,res,next)=>{
    //if the user is signed in , then pass the request on the request to the nexxt function (controllers action)
    if(req.isAuthenticated()){
        return next();
    }
    //if the user is not sugned in
    return res.redirect('/user/signin');
}

passport.setAuthenticatedUser = (req,res,next)=>{
    if(req.isAuthenticated()){
        //req.user contains the current signd in user from the sesion cookie and we are just sending this to the locals for the views

        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;