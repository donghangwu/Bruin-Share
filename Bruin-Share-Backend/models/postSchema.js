const mongoose = require("mongoose");


const postSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    topic: {
      type: String,
      required: true,
    },
    image: {
      //store image url from cloudinary
      type: String,
      
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
      }
    ],
    likes: [
      {
        //mongoDB _id who likes this post
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    //new comments for notification purpose
    newcomments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
      }
    ],
    //new likes for notification purpose
    newlikes: [
      {
        //mongoDB _id who likes this post
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    postBy: {
      //mongoDB _id of the user who posted this post
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    lat:{
        type:String,
        default:"34.068920"
    },
    lng:{
        type:String,
        default:"-118.445183"
    }
  },
  {
    //add createAt and updateAt properties, type:Date
    timestamps: true,
  }
);
postSchema.index({ topic: "text", content: "text" });
module.exports =mongoose.model("Post", postSchema)

