const router = require("express").Router();
const verify = require("./verifyToken")
const Post = require("../models/Post")
const User = require("../models/User")

router.post("/",verify, async (req,res)=>{
    var user = await User.findOne({_id:req.user_id})
    console.log(user, "userdetails");
    var post = new Post({
        description:req.body.description,
        price: req.body.price,
        quantity:req.body.quantity,
        category: req.body.category,
        expiryDate:req.body.expiryDate,
        province:user.province,
        role: user.role,
        city:user.city,
        district:user.district, 
        active:true,
        userId: req.user._id
    })
    try{
        const savedPost = await post.save();
        console.log(savedPost);
        res.send({post:savedPost})
    }
    catch(err){
        res.send({errMessage: err})
    }
    
})

module.exports= router