const express = require('express');

const router = express.Router();

const passport = require('passport');

const homeController = require('../controllers/homeControllers');

const userController = require('../controllers/userController');

router.get('/' , homeController.getHome);



module.exports= router;