const router = require("express").Router();
const verify = require("./verifyToken")
const Post = require("../models/Post")
const User = require("../models/User")

router.post("/",verify, async (req,res)=>{
    var user = await User.findOne({_id:req.user._id})
    console.log(req.body);
    var post = new Post({
        name:req.body.product.name,
        description:req.body.product.description,
        price: req.body.product.price,
        quantity:req.body.product.quantity,
        category: req.body.product.category,
        expiryDate:req.body.product.expiryDate,
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