const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        require:true,
        min:3,
        max:20,
        unique:true
    },
    email:{
        type:String,
        required:true,
        max:5,
        unique:true
    }
        ,
    password:{
        type:String,
        required:true,
        min:6,
    },
    profilePicture:{
        type:String,
        default:""
    },
    converPicture:{
        type:String,
        default:""
    },
    followers:{
        type:Array,
        default:""
    },
    followings:{
        type:Array,
        default:""
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
},
{timestamps:true}
);

module.exports = mongoose.model("User",userSchema);