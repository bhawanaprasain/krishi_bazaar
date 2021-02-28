const router = require("express").Router();
const verify = require("./verifyToken")
const Review = require("../models/review")
const User = require("../models/User")

const {removeStopwords,stemmer,frequencyCounter,csv,bayes,wordCount,addCount} = require("../review/nlp")

router.post("/addreview",verify, async (req,res)=>{
    var sellerId = req.body.reviewData.sellerId
    var reviewerId = req.body.reviewData.reviewerId
    var review=req.body.reviewData.review
    var rating= 2.5
    
    console.log(review,"tough");

    // var rating= req.body.reviewData.rating
    //customerId person who gives review //reviewer
    var customerId=req.user._id
    var role=req.body.reviewData.role
    var reviewData = {sellerId,reviewerId,review,customerId,role,rating}
    try{
        wordCount(csv, frequencyCounter,removeStopwords,stemmer,bayes,review,addCount,Review,reviewData,User)
    }
    catch(err){
        res.send({errMessage: err})
    }

})
   

router.get("/personalreview/:id",async (req,res)=>{
    await Review.findOne({userId: req.params.id}, (error, doc) => {
        if(error){
            res.send({errMessage: error})
        }
        else{
            res.send({data:doc});
        }
      });
})

module.exports= router