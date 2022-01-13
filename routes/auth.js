const router = require("express").Router();
const User = require("../Model/User");
const bcrypt = require("bcrypt")

//register
router.post('/register', async (req,res)=>{
    // console.log(req.body.username);
    const salt = await bcrypt.genSalt(10);
    try{
        const hashedPassword = await bcrypt.hash(req.body.password,salt);
    const newUser =  new User({
       username:req.body.username,
    email:req.body.email,
    password:hashedPassword, 
    })
    const user = await newUser.save();
    res.send(user);
    }
    catch(e)
    {
        console.log(e)
    }
    
});

module.exports = router;