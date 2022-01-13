const router = require("express").Router();
const User = require("../Model/User");


//register
router.get('/register', async (req,res)=>{
    const user = await new User({
       username:"Abdul Sami",
    email:"admin@gmail.com",
    password:"1234567" 
    })
    await user.save();
    res.send("OK");
});

module.exports = router;