var mongoose = require("mongoose")

const customerSchema = new mongoose.Schema({
    //id of person who logs in
    userId:{
        type:String,
        required:true,
        trim:true,
        min:15,
      
    },
    //array with elements as object with buyer/sellern and roomId
    connectedCustomer:[{name:String, roomId:String}]
    
    


})

module.exports = mongoose.model("Customer", customerSchema)
