const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const { findById } = require("../models/User");

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
router.put("/:id/follow",async(req,res)=>{
    if(req.body.userId !== req.params.id)
    {
        try{
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if(!user.followers.includes(req.body.userId))
            {
                try{
                await user.updateOne({ $push: { followers: req.body.userId}});
                await currentUser.updateOne({ $push: { followings: req.params.id}});
                res.status(200).json("User Followed");
                }
                catch(err)
                {
                    res.status(500).json("err");
                }
            }
            else
            {
                res.status(403).json("You already followed this user");
            }
        }
        catch(err)
        {
            res.status(500).json(err);
        }
    }
    else{
        return res.status(403).json("You cannot follow yourself");
    }
})



//unfollow a user
router.put("/:id/unfollow",async(req,res)=>{
    if(req.body.userId !== req.params.id)
    {
        try{
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            console.log("C : ",user);
            if(user.followers.includes(req.body.userId))
            {
                await user.updateOne({ $pull:{followers:req.body.userId}});
                await currentUser.updateOne({$pull:{followings:req.params.id}});
                res.status(200).json("User Unfollowed");
            }
            else
            {
                res.status(500).json("You are not following");
            }
        }
        catch(err)
        {
            res.status(500).json("err");
        }
    }
    else{
        res.status(500).json("You cannot unfollow yourself");
    }
})

module.exports = router;

