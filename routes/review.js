const router = require("express").Router();
const verify = require("./verifyToken")
const Review = require("../models/review")
const {removeStopwords,stemmer,frequencyCounter,csv,bayes,wordCount,addCount} = require("../review/nlp")

router.post("/addreview",verify, async (req,res)=>{
    var id = req.body.id
    var review=req.body.review
    var rating= req.body.rating
    var customerId=req.user._id
    var role=req.body.role
    var reviewData = {id,review,rating,customerId,role}
    try{
        wordCount(csv, frequencyCounter,removeStopwords,stemmer,bayes,review,addCount,Review,reviewData)
    }
    catch(err){
        res.send({errMessage: err})
    }
    
})

module.exports= router