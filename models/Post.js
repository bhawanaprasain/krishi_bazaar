var mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        min:15,
      
    },
    description:{
        type:String,
        required:true,
        trim:true,
        min:15,
      
    },
    price:{
        type:Number,
        required: true
    },
    quantity:{
        type:Number,
        required:true

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
    category:{
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
  posted_date:{
    type:Date,
    required:true,
    default:Date.now

},

    expiryDate:{
        type:Date,
        required:true
    }
})

module.exports = mongoose.model("Post", postSchema)