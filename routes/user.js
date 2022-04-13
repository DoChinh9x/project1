const router = require('express').Router();
const User = require('../models/user');
const {verifyToken, verifyTokenAdmin} = require('../middlewares/auth.verify');
const userController = require('../controllers/user.controller');

//get all users
router.get('/',verifyToken, userController.getAllUser);

//delete user
router.delete('/:id',verifyTokenAdmin, userController.deleteUser)


module.exports = router;