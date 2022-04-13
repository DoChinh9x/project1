const jwt = require('jsonwebtoken');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const {registerValidation,loginValidation} = require('../validations/validation');

let refreshArray =[];
const authController={
    
    register: async(req,res,next)=>{


        // //LETs Validate the data
        const {error} = registerValidation(req.body);
        if(error) return res.status(400).send(error.details[0].message);
    
        // //Checking if the user exist in database
        const emailExist = await User.findOne({email: req.body.email});
        if(emailExist) return res.status(400).send('Email already exists');
    
        // //Hash passwords
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);
    
        //Creat a new user
        const user = await new User({
            name : req.body.name,
            email: req.body.email,
            password: hashPassword
        });
        try {
            const saveUser = await user.save();
            res.send(saveUser);
        } catch (error) {
            res.status(400).send(err)
        }
    },

    login: async(req,res,next)=>{
        // //LETs Validate the data
        const {error} = loginValidation(req.body);
        if(error) return res.status(400).send(error.details[0].message);
    
        //Checking if the user exist
        const user = await User.findOne({email: req.body.email});
        if(!user) return res.status(400).send('Email is not found');
        //Password is correct
        const validPass = await bcrypt.compare(req.body.password, user.password);
        if(!validPass) return res.status(400).send('Invalid Password');
        
    
        //Creat and assign a token
        const accessToken = jwt.sign({
            _id:user._id,
            admin: user.admin
        }, process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: '1h'
        });
        const refreshToken = jwt.sign({
            _id:user._id,
            admin: user.admin
        }, process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: '1h'
        });
        refreshArray.push(refreshToken);
    
        res.cookie("refreshToken", refreshToken,{
            httpOnly: true,
            secure:false,
            path:"/",
            sameSite: "strict",
        });
        const {password,...others} = user._doc;
        // res.header('auth-token', accessToken).json({accessToken,user});
        res.status(200).json({...others,accessToken});
    },
    refresh: async(req,res)=>{
        // take refresh token from user
        const refreshToken = req.cookies.refreshToken;
        if(!refreshToken) return res.status(401).json("You're not authenticated");
        if(!refreshArray.includes(refreshToken)){
            return res.status(403).json("refresh token is not valid");
        }
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET,(err,user)=>{
            if(err){
                res.send(err);
            }
            refreshArray = refreshArray.filter(token=> token!== refreshToken);
            const newAccessToken = jwt.sign({
                _id:user._id,
                admin: user.admin
            }, process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: '1h'
            });
            const newRefreshToken = jwt.sign({
                _id:user._id,
                admin: user.admin
            }, process.env.REFRESH_TOKEN_SECRET,
            {
                expiresIn: '1h'
            });
            refreshArray.push(newRefreshToken);
            res.cookie("refreshToken", newRefreshToken,{
                httpOnly: true,
                secure:false,
                path:"/",
                sameSite: "strict",
            });
            res.status(200).json({accessToken: newAccessToken});
        })
    },
    
    logout: async(req,res)=>{
        res.clearCookie("refreshToken");
        refreshArray = refreshArray.filter(token=> token!== req.cookies.refreshToken);
        res.status(200).json("Log out!");
    }
}

module.exports = authController;