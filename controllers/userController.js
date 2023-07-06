const User = require('../models/userSchema');


const Habit = require('../models/habitsSchema');



const getProfile = async(req,res)=>{
    // try {
    //     const userId = req.user._id;
    //     console.log(userId);
    //      const post = await Post.find({user: userId}).populate('user').populate({
    //          path : 'comments',
    //          populate:{
    //              path : 'user'
    //          }
    //      }).exec();
    //      // console.log(post);
    //      res.render("profile" , {title : "Habit-tracker" , posts :post});
 
         
    //  } catch (error) {
    //      console.log(error);
    //  }
     try {
        const habits = await Habit.find({user : req.user._id}).populate('user').exec();
        res.render('profile', {title:"Habit Tracker" , habits });
      } catch (err) {
        console.error('Error retrieving habits', err);
        res.render('index', { habits: [] });
      }
}


//rendering signup page
const userSignUp = async(req,res)=>{
    try {
        if(req.isAuthenticated()){
            return res.redirect('/user/profile');
        }

        res.render('user_signUp' , {title : "Sign-Up"});
    } catch (error) {
        console.log(error.message);
    }
}


//redering signin page
const userSignIn = async(req,res)=>{
    try {
        if(req.isAuthenticated()){
            return res.redirect('/user/profile');
        }

        res.render('user_signIn' , {title : "Sign-In"});
    } catch (error) {
        console.log(error.message);
    }
}


//post request creating a user on signUp page
const create = async(req,res)=>{
    try {
        if(req.body.password != req.body.confirmpassword){
            console.log("password does not match");
           return res.redirect('back');
        }

        const user =await User.findOne({email : req.body.email});

        if(!user){
            const doc = new User({
                name : req.body.name,
                email : req.body.email,
                password : req.body.password
            });

            const result = await doc.save();
            
            res.redirect('/user/signin');
        }

        
        
    } catch (error) {
        console.log(error.message);
    }

}
//post request  user login
const createSession = async(req,res)=>{
    return res.redirect('/user/profile');
}


//logout user
const destroySession = async(req,res)=>{
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
      });
}


module.exports = {
    getProfile , userSignUp , userSignIn , create , createSession , destroySession
}

