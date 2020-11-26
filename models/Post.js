var mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
    post:{
        type:String,
        required:true,
        trim:true,
        min:15,
      
    },
    role:{
        type:String,
        required:true,
        trim:true,
        min:4,
        max:6

    },
    province:{
        type:Number,
        required:true,
        min:1,
        max:7
    },
    city:{
        type:String,
        required:true,
        min:4,
        max:15
    },
    district:{
        type:String,
        required:true,
        min:5,
        max:15
    },
    active:{
        type:Boolean,
        required:true
    },
    userId:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model("Post", postSchema)