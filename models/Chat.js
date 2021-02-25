var mongoose = require("mongoose")

const chatSchema = new mongoose.Schema({
    senderId:{
        type:String,
        required:true,
        trim:true,
        min:15,
      
    },
    receiverId:{
        type:String,
        required:true,
        trim:true,
        min:15,
      
    },
        roomId:{
        type:String,
        required:true,
        trim:true,
        min:15,
    },
    message:{
        type:String,
        required:true,
        trim:true,
        min:1,
    },
    role:{
        type:String,
        required:true,
        trim:true,
        min:5,
    },
date:{
    type:Date,
    default:Date.now()
}


})

module.exports = mongoose.model("Chat", chatSchema)
