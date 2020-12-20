const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Post = require('../models/postSchema')
const User = require('../models/userSchema')
const routeProtection = require('../helper/routeProtection')


//get otheruser's posts
router.get('/userposts/:userid',async(req,res)=>{
    try {
        const found =await User.findOne({_id:req.params.userid})

        if(!found)
        {
            return res.status(409).json({error:"Invalid user"})
        }
        //find all the posts of the user
        var result =await Post.find({postBy:req.params.userid})
                            .populate("postBy","image name _id")
                            .populate("likes","image name _id")
                            .populate({
                                path:"comments",
                                populate:{
                                  path:'commentBy',
                                  model:'User',
                                  select:"name _id image email"
                                        }
                                    }).sort("-createdAt")

           result.forEach(element => {
      element.comments=element.comments.reverse();
      element.newcomments=element.newcomments.reverse();
    });
        res.json(result)

    } catch (error) {

        return res.json(error)

    }
});


//get otheruser's info(name, emails)
//also other user's all posts
router.get('/userinfo/:userid',routeProtection,async(req,res)=>{
    try {
        const result =await User.findById(req.params.userid);

        //discard the password
        result.password=undefined
        var posts = await Post.find({postBy:req.params.userid})
                        .populate("likes","name _id image")
                        .populate({
                            path:"comments",
                            populate:{
                              path:'commentBy',
                              model:'User',
                              select:"name _id image email"
                                    }
                                }).sort("-createdAt")

           posts.forEach(element => {
      element.comments=element.comments.reverse()});
        
      res.json({user:result,posts})

    } catch (error) {
        return res.json(error)
    }
})

//get my personal info(name, emails)
//also get all my posts
router.get('/myinfo',routeProtection,async(req,res)=>{
    try {
        const result =await User.findById(req.user._id);

        //discard the password
        result.password=undefined
        let posts =await Post.find({postBy:req.user._id})
                        .populate("likes","name _id image")
                        .populate({
                            path:"comments",
                            populate:{
                              path:'commentBy',
                              model:'User',
                              select:"name _id image email"
                                    }
                                }).sort("-createdAt")
    posts.forEach(element => {
      element.comments=element.comments.reverse()});                       
    res.json({user:result,posts});
    } catch (error) {
        return res.json(error)
    }
})


//--------------editing my personal info---------------------------------------------
//sending back the original info
router.get('/myprofile',routeProtection,async(req,res)=>{
    try {
        const found =await User.exists({_id:req.user._id});
        if(!found)
        {
            return res.status(410).json({error:"user does not exist"});
        }
        const result =await User.findOne({_id:req.user._id});
        result.password=undefined;
        
        res.json(result);
    } catch (error) {
        return res.json(error);
    }
    
})


//updating the new personal info
router.put('/updateprofile',routeProtection,async(req,res)=>{
    try {
        const found =await User.exists({_id:req.user._id});
        if(!found)
        {
            return res.status(410).json({error:"user does not exist"});
        }
        const result = await User.findByIdAndUpdate(req.user._id,{$set:req.body}
                                                    ,{new:true});
        result.password=undefined;
        res.json(result);
        

    } catch (error) {
        
    }
})

router.put('/updateavatar',routeProtection,async(req,res)=>{
    try {
        var result =await User.findByIdAndUpdate(req.user._id,{
            $set:{image:req.body.avatardata}
        },{new:true})
        res.json(result)
    } catch (error) {
        console.log(error)
    }
})



//sending notification to the logged in user
//includes topic, contents, newlikes by other, newcomments by other
//to the logged in user's posts
router.get('/notifications',routeProtection,async(req,res)=>{

    try {
        const result = await Post.find({postBy:req.user._id},"topic content newcomments newlikes")
                                    .sort("-createdAt")
                                    .populate({
                                        path:"newcomments",
                                        populate:{
                                          path:'commentBy',
                                          model:'User',
                                          select:"name _id image email"
                                                }
                                            })
                                    .populate("newlikes","name _id image")
                                
        res.json(result)
    } catch (error) {
        return res.json(error)
    }

})



module.exports=router
