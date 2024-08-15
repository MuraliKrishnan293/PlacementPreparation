const express = require('express');
const router = express.Router();
const User = require('./models/User');

const isAdmin =  async(req,res,next)=>{
const {id} = req.user;
const user = await User.findById(id);
if(user.role === 'admin'){
    // console.log("This is Admin");
    next();
}
else{
    res.json("You should be Admin to perform this");
}
};

const isUser =  async(req,res,next)=>{
    const id = req.user.id;
    const user = await User.findById(id);
    if(user.role === 'student'){
        next();
    }
    else{
        res.json("You should be an User to perform this");
    }
    };

    module.exports = { isAdmin, isUser };