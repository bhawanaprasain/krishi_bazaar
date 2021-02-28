var mongoose = require("mongoose")

const offerSchema = new mongoose.Schema({
    sellerId:{
        type:String,
        required:true,
        trim:true,
        min:15,
      
    },
    productId:{
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
    receiverName:{
        type:String,
        required:true,
        trim:true,
        min:3,
    },
    sellerPhone:{
        type:String,
        required:true,
        trim:true,
        min:9,
        max:10
    },
    receiverPhone:{
        type:String,
        required:true,
        trim:true,
        min:9,
        max:10
    },
    productName:{
        type:String,
        required:true,
        trim:true,
        min:15,
    },
    quantity:{
        type:Number,
        required:true

    },
    price:{
        type:Number,
        required:true

    },
    category:{
        type:String,
        required:true,
        trim:true,
        min:4,
      
    },
  delivery_date:{
    type:Date,
    required:true,
    default:Date.now

},
date:{
    type:Date,
    default:Date.now()
}


})

module.exports = mongoose.model("Offer", offerSchema)