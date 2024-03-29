var mongoose = require("mongoose")

const reviewSchema = new mongoose.Schema({
    //id of person who gets review
    userId:{
        type:String,
        required:true,
        trim:true,
        min:15,
    },
    //role of person who gets review
    role:{
        type:String,
        required:true,
        trim:true,
        min:5,
    },
    name:{
        type:String,
        required:true,
        trim:true,
        min:5,
    },
    address:{
        type:String,
        required:true,
        trim:true,
        min:5,
    },
    review:[{description:String,rating:Number,customerId:String,name:String}],
    
    positiveReview:{
        type:Number,
        required:true,
    },
    negativeReview:{
        type:Number,
        required:true,
    },
    date:{
        type:Date,
        default:Date.now()
    }
})

module.exports = mongoose.model("Review", reviewSchema)
