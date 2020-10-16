var mongoose = require("mongoose")

const chatSchema = new mongoose.Schema({
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
date:{
    type:Date,
    default:Date.now()
}


})

module.exports = mongoose.model("Chat", chatSchema)
