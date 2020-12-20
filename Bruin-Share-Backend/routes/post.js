const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Post = require("../models/postSchema")
const Comment = require("../models/commentSchema");
const routeProtection = require("../helper/routeProtection");
const { json } = require('express');

//------------=---------`view posts-------------------------------------

//no route protection, this is for public view
router.get("/publicposts", async (req, res) => {
  try {
    let result = await Post.find()
        .populate("postBy", "image email name _id")
        .populate("likes", "image name _id ")
        .populate("comments")
        .populate({
          path:"comments",
          populate:{
            path:'commentBy',
            model:'User',
            select:"name _id image email",
          }
        })
        .populate({
          path:"newcomments",
          populate:{
            path:'commentBy',
            model:'User',
            select:"name _id image email",
            options: { sort: { timestamp: -1 }}       
          }
        }).sort("-createdAt");
        
        //sort in decending order
        result.forEach(element => {
          element.comments=element.comments.reverse();
          element.newcomments=element.newcomments.reverse();
        });
    res.json(result);
  } catch (error) {
    return res.json(error);
  }
});

//view single post
router.get("/post/:postid", async (req, res) => {
  try {

    let result = await Post.findById(req.params.postid)
      .populate("postBy", "image email name _id")
      .populate("likes", "image name _id ")
      .populate({
        path:"comments",
        populate:{
          path:'commentBy',
          model:'User',
          select:"name _id image email",
        }
      })
    if (!result) {
      return res.status(412).json({ error: "cannot find this post" });
    }
    result.comments=result.comments.reverse();
    res.json(result);
  } catch (error) {
    return res.json(error);
  }
});

//view logged in user's posts
router.get("/myposts", routeProtection, async (req, res) => {
  try {
    let result = await Post.find({ postBy: req.user._id })
      .populate("postBy", "image email name _id")
      .populate("likes", "image name _id ")
      .populate({
        path:"comments",
        populate:{
          path:'commentBy',
          model:'User',
          select:"name _id image email",
        }
      })
      .populate("newlikes", "image name _id ")
      .populate({
        path:"newcomments",
        populate:{
          path:'commentBy',
          model:'User',
          select:"name _id image email",
        }
      })
      .sort("-createdAt");
    //sort in decending order
    result.forEach(element => {
      element.comments=element.comments.reverse();
      element.newcomments=element.newcomments.reverse();
    });
    res.json(result);
  } catch (error) {
    return res.json(error);
  }
});


//------------------Create/Edit posts--------------------------------

//create a post
router.post("/createpost", routeProtection, async (req, res) => {
  try {
    //do not send the password
    req.user.password = undefined;
    const newpost = new Post({
      content: req.body.content,
      topic: req.body.topic,
      image: req.body.image,
      postBy: req.user,
      lng: req.body.lng,
      lat: req.body.lat,
    });

    const result = await newpost.save();
    res.json(result);
  } catch (error) {
    return res.json(error);
  }
});


//delete a post
router.delete("/deletepost/:postid", routeProtection, async (req, res) => {
  try {
   
    const result = await Post.findOne({ _id: req.params.postid })
    //check the login user is same as the post creator
    if (result.postBy._id.toString() === req.user._id.toString()) {
      //find the post and delete it
      const remove = await Post.findByIdAndRemove(req.params.postid);
      res.json({ success: "remove successfully" });
    }
  } catch (error) {
    return res.json(error);
  }
});

//--------------editing a post--------------------------------------------------
//send origin post info for updating
router.get("/editpost/:postid", routeProtection, async (req, res) => {
    try {
        const result=await Post.findOne({_id:req.params.postid},
                                "topic _id content image")
                                .populate("postBy","name _id image");

        if(JSON.stringify(result.postBy._id)!== JSON.stringify(req.user._id))
        {
          return res.json({error:"wrong user!!"});
        }
        
        res.json(result);

    } catch (error) {
      return res.json(error);
    }
});

//updating the new post contents
router.put("/updatepost/:postid",routeProtection,async(req,res)=>{
  const found = Post.find({_id:req.params.postid});
  if(!found)
  {
    return res.status(403).json({error:"not found post"})
  }
  try {
      const update =await Post.findOneAndUpdate({_id:req.params.postid},{$set:req.body}, { new: true })
      res.json(update);
  } catch (error) {
    return res.json(error)
  }

})



//-------------------Likes/unlike a posts-------------------------------

//like a post
router.put("/like", routeProtection, async (req, res) => {
  try {
    
    //user cannot like the post more than once
    const found=await Post.findById(req.body.postid);
    const likes=found.likes
    if(likes.includes(req.user._id))
    {
      return res.json({error:"you already like the post"})

    }

    //push the logged in user's id into the likes and newlikes array
    const result = await Post.findByIdAndUpdate(
      req.body.postid,
      {
        $push: { likes: req.user._id},
      },
      { new: true }
    )
      .populate("likes", "name _id")
      .populate("newlikes", "name _id");

    //check if it's postBy user to like itself
    let check
    if(JSON.stringify(req.user._id) !== JSON.stringify(result.postBy))
    {
       check= await Post.findByIdAndUpdate(req.body.postid,
        {$push:{newlikes:req.user._id}},
        { new: true })
                        .populate("likes", "name _id")
                        .populate("newlikes", "name _id");
        res.json(check);
    }

    res.json(result);
  } catch (error) {
    return res.json(error);
  }
});

//unlike a post
router.put("/unlike", routeProtection, async (req, res) => {
  try {
    //pop the logged in user's id into the likes array
    const result = await Post.findByIdAndUpdate(
      req.body.postid,
      {
        $pull: { likes: req.user._id,newlikes: req.user._id },
      },
      { new: true }
    )
      .populate("likes", "name _id")
      .populate("newlikes", "name _id");

    res.json(result);
  } catch (error) {
    return res.json(error);
  }
});

//-------------------comment/delete comment---------------------------

//comment a post
router.put("/comment", routeProtection, async (req, res) => {
  try {
    const newcomment = new Comment({
      text: req.body.comment,
      commentBy: req.user._id,
    });
    //add a new comment to comment schema
    const addcomment = await newcomment.save();
    //push the new comment schema to the post schme. comments field
    const result = await Post.findByIdAndUpdate(
      req.body.postid,
      {
        $push: { comments:addcomment._id },
      },
      { new: true }
    )
      .populate("comments")
      .populate({
        path:"comments",
        populate:{
          path:'commentBy',
          model:'User',
          select:"name _id image email",
                 
        }
      })
      .populate({
        path:"newcomments",
        populate:{
          path:'commentBy',
          model:'User',
          select:"name _id image email",
                 
        }
      }).sort("-createdAt");
      //check if the postBy user comments on itself
      var loginid=(JSON.stringify(req.user._id));
      var postbyid=(JSON.stringify(result.postBy));
      let check
    if((loginid)!=(postbyid))
    {
      check = await Post.findByIdAndUpdate(
        req.body.postid,
        {
          $push: { newcomments: addcomment._id }
        },
        { new: true }
      )
        .populate("comments")
        .populate({
          path:"comments",
          populate:{
            path:'commentBy',
            model:'User',
            select:"name _id image email",
                   
          }
        })
        .populate({
          path:"newcomments",
          populate:{
            path:'commentBy',
            model:'User',
            select:"name _id image email",
                   
          }
        }).sort("-createdAt");  
        res.json(check);
               
      }
      else{
        res.json(result);

      }

  } catch (error) {
    return res.json(error);
  }
});

//delete a comment
router.put("/deletecomment", routeProtection, async (req, res) => {
  try {
    //delete commentID from post schema
    const result = await Post.findByIdAndUpdate(
      req.body.postid,
      {
        $pull: { comments: req.body.commentid },
      },
      { safe: true, multi: true }
    )
    .populate({
      path:"comments",
      populate:{
        path:'commentBy',
        model:'User',
        select:"name _id image email",
               
      }
    }).populate("likes","name image _id")
      .populate("postBy","name image _id");

    //remove comment from comment schema
    const deletecomment = await Comment.findByIdAndDelete(req.body.commentid);
    res.json({success:"remove comment successfully"});
  } catch (error) {
    return res.json(error);
  }
});


//---------------Notification features handling---------------------------------

//delete user's new likes Notification
router.put("/deletenewlike", routeProtection, async (req, res) => {
  try {
    //pop the logged in user's id into the likes array
    const result = await Post.findByIdAndUpdate(
      req.body.postid,
      { $pull: { newlikes: req.body.likeid } },
      { new: true }
    );

    res.json({success:"delete like notification successfully"});
  } catch (error) {
    return res.json(error);
  }
});

//delete user's new comments Notification
router.put("/deletenewcomment", routeProtection, async (req, res) => {
  try {
    const result = await Post.findByIdAndUpdate(
      req.body.postid,
      {
        $pull: { newcomments: req.body.commentid  },
      },
      { safe: true, multi: true }
    );
    res.json({success:"delete comment notification successfully"});
  } catch (error) {
    return res.json(error);
  }
});

//--------------------searching----------------------------------------------

//serach route
router.post("/search", async (req, res) => {
  const { keyword, option } = req.body;
  if (keyword.trim().length === 0) {
    res.status(405).json({ error: "keyword is empty" });
  }
  if (option !== "topic" && option !== "content") {
    res.status(422).json({ error: "Not a correct search type" });
  }
  try {
    let results = await Post.find(
      {
        $text: { $search: keyword },
      },
      {
        score: { $meta: "textScore" },
      }
    ).populate({
      path:"comments",
      populate:{
        path:'commentBy',
        model:'User',
        select:"name _id image email",
      }
    }).populate("likes","name image _id")
      .populate("postBy","name image _id")
    .sort({ score: { $meta: "textScore" } });

    if (option === "topic") {
      results = results.filter((p) => p.topic.includes(keyword));
    } else if (option === "content") {
      results = results.filter((p) => p.content.includes(keyword));
    }
    res.json({ posts: results });
  } catch (error) {
    console.error(error);
    res.status(406).json({ error: "Can't find post with specified keyword" });
  }
});

//--------------------Geo Locations------------------------------------------
router.get("/postbylocations", async (req, res) => {
  try {
    var posts = await Post.find()
      .select("topic content lat lng postBy")
      .populate("postBy", "name image _id");
    res.json(posts);
  } catch (error) {
    return res.json(error);
  }
});


module.exports = router;
