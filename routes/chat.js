const router = require("express").Router();
const Customer = require("../models/Customer")
const Chat = require("../models/Chat")


router.post("/connectedfriends", async (req,res)=>{
    
    try{
        console.log(req.body.id);
        var customers = await Customer.findOne({userId:req.body.id})
        var connectedCustomerList = customers.connectedCustomer
        console.log(connectedCustomerList);
        res.send(connectedCustomerList)

    }
    catch(err){
        res.status(400).send(err)
    }
    
})

router.post("/personalchat", async (req,res)=>{
    

    try{
        console.log(req.body.roomId);
        var chatHistory = await Chat.find({roomId:req.body.roomId})
     
        console.log(chatHistory);
        res.send(chatHistory)

    }
    catch(err){
        res.status(400).send(err)
    }
    
})

module.exports= router