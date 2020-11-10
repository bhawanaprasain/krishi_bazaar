const router = require("express").Router();
const User = require("../models/User")
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')
const {registerValidation,loginWithEmailValidation,loginWithPhoneValidation} = require("./validation");


router.post("/register",async (req,res)=>{
    console.log(req.body);
    //validating user before registering
    const {error} = registerValidation(req.body);
    if(error) {
        console.log(error)
        return res.send({errMessage: error.details[0].message})
    }
    const phoneExist = await User.findOne({phone:req.body.phone})
    
    if(phoneExist) return res.send({errMessage:"Phone already exist"})
    //check if email is already registered
    if(req.body.email.length>1){
        const emailExist = await User.findOne({email:req.body.email})
        if(emailExist) return res.send({errMessage:"Email already exist"})
    }

    //hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)
    const user = new User({
        role:req.body.role,
        fname:req.body.fname,
        lname:req.body.lname,
        phone:req.body.phone,
        province:req.body.province,
        city:req.body.city,
        district:req.body.district,
        email:req.body.email,
        password:hashedPassword
    })
    try{
        const savedUser = await user.save();
        const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET)
        console.log(token);
        var userDetails = {
        _id :savedUser._id,
        role:req.body.role,
        fname:req.body.fname,
        lname:req.body.lname,
        phone:req.body.phone,
        province:req.body.province,
        city:req.body.city,
        district:req.body.district,
        email:req.body.email,
        token: token
        }
        res.header("auth-token",token).send(userDetails)
    }
    catch(err){
        res.send({errMessage: err})
    }
})

router.post("/login",async (req,res)=>{
    var user ={}
    console.log(req.body)
    console.log(req.body.email)

    //validating user before login
    if(req.body.phone != undefined){
        console.log(req.body.phone)
        const {error} = loginWithPhoneValidation(req.body);
        if(error) return res.send({errMessage: error.details[0].message})
        console.log(req.body.phone)

        //check if phone is already registered
        user = await User.findOne({phone:req.body.phone})
        console.log(user, "USER");
        if(!user) return res.send({errMessage:"User does not exist"})
    }
    else{
        const {error} = loginWithEmailValidation(req.body);
        if(error) return res.send({errMessage: error.details[0].message})

        //check if email is already registered
        user = await User.findOne({email:req.body.email})
        if(!user) return res.send({errMessage: "User does not exist"})

    }

    //password check
    const validPass = await bcrypt.compare(req.body.password,user.password)
    if(!validPass) return res.send({errMessage:'Invalid password'})

    //create and assign token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET)
    var userDetails = {
        _id: user._id,
        role:user.role,
        fname:user.fname,
        lname:user.lname,
        phone:user.phone,
        province:user.province,
        city:user.city,
        district:user.district,
        email:user.email,
        token: token
        }
    res.header("auth-token",token).send(userDetails)

   
})

module.exports = router