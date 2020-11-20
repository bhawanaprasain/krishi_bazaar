
const router = require("express").Router();
const Review = require("../models/review")

router.get("/topbuyers",async (req,res)=>{
    await Review.find({role:"buyer"}).sort({ positiveReview: 'descending' }).exec(function(err, docs) { 
        if(err){
            res.send({errMessage: err})
        }
        else{
            res.send(docs.slice(0,10))
        }
     });

})

router.get("/topsellers",async (req,res)=>{
    await Review.find({role:"seller"}).sort({ positiveReview: 'descending' }).exec(function(err, docs) { 
        if(err){
            res.send({errMessage: err})
        }
        else{
            res.send(docs.slice(0,10))
        }
    });

})

module.exports= router
