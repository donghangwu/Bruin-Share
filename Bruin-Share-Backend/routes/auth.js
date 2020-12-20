const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const User = require('../models/userSchema')
//hasing the password
const bcrypt = require('bcryptjs')
// user token
const jwt = require('jsonwebtoken');
require('dotenv').config({path:'./config/.env'})
const routeProtection = require('../helper/routeProtection')
router.get('/protected',routeProtection,(req,res)=>{
    res.json(req.user)
})

router.post('/login',async(req,res)=>{
    const {email,password}=req.body;
    try {
        const userinfo = await User.findOne({email:email})
        console.log(password)
        if(!userinfo)
        {
           return res.status(401).json({error:"Invalid Email!"})
        }
        //compare entered password with hashed worded from database
        const result =await bcrypt.compare(password,userinfo.password);
        if(result)
        {
            userinfo.password=undefined
            //generate jwt token
            const mytoken = jwt.sign({user_id:userinfo._id},process.env.JWT_KEY)
            res.json({mytoken,userinfo})
        }
        else{
            return res.status(404).json({error:"Invalid password!"})
        }

    } catch (error) {
        return res.json(error)
    }
});

//signup route
router.post('/signup',async(req,res)=>{
    //extract all the info
    //validation is for client side
    const {name,email,password}=req.body;
    //first check if the 
    const result = await User.findOne({email:email})
    if(result)
    {
        return res.status(400).json({error:name+" with "+email+"already exists!"})
    }
    encryptedpassword = await bcrypt.hash(password,10)
    const newuser = new User({
        name:name,
        email:email,
        password:encryptedpassword
    })
    try {
        const created = await newuser.save()
        res.json({success:"successfully created user ",result:created})
    } catch (error) {
        return res.json(error)
    }
    
});

 
module.exports=router