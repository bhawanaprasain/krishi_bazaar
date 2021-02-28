const router = require("express").Router();
const Post = require("../models/Post")
const Offer = require("../models/Offer");
const User = require("../models/User");


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
    var quantity = parseInt(req.body.quantity)
    var id =  req.body.id
    var post = await Post.findOne({_id :id})
    var seller = await User.findOne({_id:req.body.sellerId})
    var receiver = await User.findOne({_id:req.body.receiverId})
    var activeOffer = new Offer({
        productId:id,
        sellerId:req.body.sellerId,
        receiverId:req.body.receiverId,
        receiverName:receiver.fname,
        sellerPhone: seller.phone,
        receiverPhone: receiver.phone,
        productName:req.body.productName,
        quantity:req.body.quantity,
        price:req.body.price,
        category:req.body.category,
        delivery_date:req.body.deliveryDate
    })
    activeOffer.save().then(res=>console.log(res))
    if(post !== null && post.quantity > quantity){
        await Post.updateOne({_id:id},{$inc:{quantity:-quantity}})
        res.send("product quantity decremented")
    }
    else if(post){
        await Post.findByIdAndDelete(id)
    }
})


router.get("/activeselleroffer/:id",async (req,res)=>{
    await Offer.find({sellerId: req.params.id}, (error, doc) => {
        if(error){
            console.log(error);
            res.send({errMessage: error})
        }
        else{
            console.log(doc,"your active offers");
            res.send({data:doc});
        }
       
      });
    
})

router.get("/activebuyeroffer/:id",async (req,res)=>{
    await Offer.find({receiverId: req.params.id}, (error, doc) => {
        if(error){
            console.log(error);
            res.send({errMessage: error})
        }
        else{
            console.log(doc,"your active offers");
            res.send({data:doc});
        }
       
      });
    
})

router.post("/removeoffer",async (req,res)=>{
    console.log(req.body);
    await Offer.findByIdAndDelete(req.body.id)

})
module.exports= router
