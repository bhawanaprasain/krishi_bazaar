const router = require("express").Router();
const Post = require("../models/Post")

router.get("/selleroffer",async (req,res)=>{
    var date = new Date()
    var day = date.getUTCDate()
    if(day>7){day=day-7}
    var lastWeek = date.getFullYear()+"-"+date.getUTCMonth()+"-"+day
    var lastWeek = date.getFullYear()+"-"+date.getUTCMonth()+"-"+date.getUTCDate()
    await Post.find({
        posted_date: {
            $gte: new Date(new Date(lastWeek).setHours(00, 00, 00)),
            $lt: new Date().setHours(23, 59, 59)
             }
    }).then(response=>{
        // console.log(response);
        res.send({data:response})
    })
})

router.get("/buyeroffer",async (req,res)=>{
    await Post.find({role:"buyer",active:true}).then(response=>{
        res.send({data:response})
    })
})

router.get("/deactivateoffer/:id",async (req,res)=>{
    await Post.findOneAndUpdate({_id: req.params.id}, {active: false}, {new: true}, (error, doc) => {
        if(error){
            console.log(error);
            res.send({errMessage: error})
        }
        else{
            res.send({data:doc});
        }
       
      });
    
})
router.get("/filtercategory",async (req,res)=>{
    await Post.find({category:req.body.category, active:true}).then(response=>{
        res.send({data:response})
    })
})
router.post("/updateoffer",async (req,res)=>{
    var price = parseInt(req.body.price);
    var quantity = parseInt(req.body.quantity)
    var id =  req.body._id
    var post = await Post.findOne({_id :id})
    if(post !== null && post.quantity > quantity){
        await Post.updateOne({_id:id},{$inc:{quantity:-quantity}})
    }
    else if(post){
        await Post.findByIdAndDelete(id)
    }
})

module.exports= router
