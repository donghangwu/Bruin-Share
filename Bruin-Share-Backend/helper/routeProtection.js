const jwt = require('jsonwebtoken')
const mongoose = require("mongoose");
const User = require('../models/userSchema')

const routeProtection=async(req,res,next)=>{
    const {authorization}=req.headers
    //authorization = "bearer adfjoewkafksf"
    if(!authorization)
    {
        return res.status(404).json({error:"you haven't logged in"})
    }
    const mytoken = authorization.replace("Bearer ",'')
    jwt.verify(mytoken,process.env.JWT_KEY,async(error,payload)=>{
        //unauthorized jwt token
        if(error){
            return res.status(404).json({error:"please send the correct auth token!"})
        }
        //extract user_id from payload
        const {user_id}=payload
        try {
            const found = await User.findById(user_id)
            //attach user info to req, so we can know which user is logged in
            req.user=found
            next();
        } catch (error) {
            return res.json(error)
        }
        
    })
}
module.exports=routeProtection;