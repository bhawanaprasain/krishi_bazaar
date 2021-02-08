const router = require("express").Router();
const Post = require("../models/Post")
const Review = require("../models/review")
const User = require("../models/User")

var userInfo =[]
router.get("/profile/:id",async (req,res)=>{
    await Review.findOne({userId: req.params.id}, (error, doc) => {
        if(error){
            res.send({errMessage: error})
        }
        else{
            userInfo.push({reviewDetails:doc});
        }
      });

      await User.findOne({_id: req.params.id}, (error, doc) => {
        if(error){
            res.send({errMessage: error})
        }
        else{
            userInfo.push({userDetails:doc});
        }
      });

      await Post.findOne({userId: req.params.id}, (error, doc) => {
        if(error){
            res.send({errMessage: error})
        }
        else{
            userInfo.push({postDetails:doc});
            res.send(userInfo)

        }
      });
})

module.exports= router
