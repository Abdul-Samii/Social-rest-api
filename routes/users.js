const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

//update user
router.put("/:id",async(req,res)=>{
    if(req.body.userId === req.params.id )
    {
        if(req.body.password || req.body.isAdmin)
        {
            try{
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password,salt);
            }
            catch(err)
            {
                return res.status(500).json(err);
            }
        }
        try{
            const user = await User.findByIdAndUpdate(req.params.id,{
                $set:req.body,
            });
            res.status(200).json("Done");
        }
        catch(err)
        {
            res.status(500).json(err);
        }
    }
    else{
        return res.status(403).json("You can only update your Account");
    }
})


//delete user
router.delete("/:id",async(req,res)=>{
    if(req.body.userId === req.params.id)
    {
        try{
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json("Account deleted successfully");
        }
        catch(err)
        {
            return res.status(500).json(err)
        }
    }
    else{
        return res.status(500).json("You can only delete your account");
    }
})



//get a user
router.get("/:id",async(req,res)=>{
    try{
        const user = await User.findById(req.params.id);
        const {password,...others} = user._doc;
        res.status(200).json(others);
    }
    catch(err)
    {
        return res.status(500).json(err)
    }
})



//follow a user

//unfollow a user


module.exports = router;

