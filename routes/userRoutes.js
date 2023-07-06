const express = require('express');
const passport = require('passport');

const router = express.Router();

const userController = require('../controllers/userController');

router.get('/profile', passport.checkAuthentication , userController.getProfile);
router.get('/signup' , userController.userSignUp);
router.get('/signin' , userController.userSignIn);
router.post('/create',userController.create);
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect: '/user/signin'},
) ,userController.createSession);


router.get('/signout', userController.destroySession);


module.exports= router;