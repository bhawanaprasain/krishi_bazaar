const router = require("express").Router();
const verify = require("./verifyToken")
const Review = require("../models/review")
const {removeStopwords,stemmer,frequencyCounter,csv,bayes,wordCount,addCount} = require("../review/nlp")

router.post("/addreview",verify, async (req,res)=>{
    var id = req.body.reviewData.id
    var review=req.body.reviewData.review
    var rating= 2.5
    
    console.log(review,"tough");

    // var rating= req.body.reviewData.rating
    var customerId=req.user._id
    var role=req.body.reviewData.role
    var reviewData = {id,review,customerId,role,rating}
    try{
        wordCount(csv, frequencyCounter,removeStopwords,stemmer,bayes,review,addCount,Review,reviewData)
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