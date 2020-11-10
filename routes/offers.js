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

router.get("/deactivateoffer/:id",async (req,res)=>{
    await Post.findOneAndUpdate({_id: req.params.id}, {active: false}, {new: true}, (error, doc) => {
        if(error){
            console.log(error);
            res.send({errMessage: error})
        }
        else{
            console.log(doc);
        }
       
      });
    
})



module.exports= router
