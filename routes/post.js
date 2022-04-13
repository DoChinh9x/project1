const router = require('express').Router();
const {verifyToken} = require('../middlewares/auth.verify');


router.get('/',verifyToken,(req,res)=>{
    res.json({
        post : {
            title: 'vanchinh',
            description: 'dep trai'
        }
    })
})


module.exports = router;
