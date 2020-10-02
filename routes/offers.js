const router = require("express").Router();
const Post = require("../models/Post")

router.get("/selleroffer",async (req,res)=>{
    await Post.find({role:"seller", active:true}).then(response=>{
        console.log({data:response})
    })
})

router.get("/buyeroffer",async (req,res)=>{
    await Post.find({role:"buyer",active:true}).then(response=>{
        console.log({data:response})
    })
})

module.exports= router
