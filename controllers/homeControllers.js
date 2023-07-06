const User = require("../models/userSchema");


const getHome = async(req,res)=>{

    try {
        res.render('home' , {title : "Home"});
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getHome
}