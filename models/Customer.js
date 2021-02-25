var mongoose = require("mongoose")

const customerSchema = new mongoose.Schema({
    //id of person who logs in
    userId:{
        type:String,
        required:true,
        trim:true,
        min:15,
    },
    //array with connected customerId
    connectedCustomerId:{type:Array,
        required:true,
        trim:true,
        min:15},
        
        //array with connected customerId

    connectedRoomId:{type:Array,
        required:true,
        trim:true,
        min:15} 
})

module.exports = mongoose.model("Customer", customerSchema)
