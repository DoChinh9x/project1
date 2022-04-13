const jwt = require("jsonwebtoken");

const verifyToken = ( req,res,next)=>{
    // const token = req.headers.token; 
    // if(token){
    //     const accessToken = token.split(" ")[1];
    //     jwt.verify(accessToken,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
    //         if(err){
    //             res.status(403).json("Token is not valid");
    //         }
    //         req.user = user;
    //         next();
    //     })
    // }else{
    //     res.status(401).json("You're not authenticated");
    // }
    const token = req.header('auth-token');
    // if(!token) return res.status(401).send('Acess Denied');
    // const authHeader = req.header('Authorization');
    // const token = authHeader && authHeader.split(' ')[1];
    if(!token) return res.status(401).send('Acess Denied');
    try {
        const verified =jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).send('Invalid Token');
    }
};

const verifyTokenAdmin =  (req,res,next) => {
    verifyToken(req, res, () => {
        if (req.user._id === req.params.id || req.user.admin) {
          next();
        } else {
          res.status(403).json("You are not alowed to do that!");
        }
      });
    };

module.exports ={ verifyToken, verifyTokenAdmin};