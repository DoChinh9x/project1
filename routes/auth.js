require('dotenv').config();

const router = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const {registerValidation,loginValidation} = require('../validations/validation');
const {verifyToken, verifyTokenAdmin} = require('../middlewares/auth.verify');
const authController = require('../controllers/auth.controller');



//REGISTER
router.post('/register',authController.register);
//LOGIN
router.post('/login',authController.login);
//REFRESH TOKEN
router.post("/refresh",authController.refresh);
//Log out
router.post("/logout", verifyToken, authController.logout);

module.exports = router;