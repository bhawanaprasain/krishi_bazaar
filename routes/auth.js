const router = require("express").Router();
const User = require("../models/User")
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')
const {registerValidation,loginWithEmailValidation,loginWithPhoneValidation} = require("./validation");


router.post("/register",async (req,res)=>{
    console.log(req.body, "empty");
    //validating user before registering
    const {error} = registerValidation(req.body);
    if(error) {
        console.log(error)
        return res.status(400).send(error.details[0].message)
    }
    const phoneExist = await User.findOne({phone:req.body.phone})
    if(phoneExist) return res.status(400).send("Phone number already exist")
    //check if email is already registered
    if(req.body.email != undefined){
        const emailExist = await User.findOne({email:req.body.email})
        if(emailExist) return res.status(400).send("Email already exist")
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
        res.header("auth-token",token).send(token)
    }
    catch(err){
        res.status(400).send(err)
    }
})

router.get("/login",async (req,res)=>{
    var user ={}
    console.log(req.body)
    console.log(req.body.email)

    //validating user before login
    if(req.body.phone != undefined){
        console.log(req.body.phone)
        const {error} = loginWithPhoneValidation(req.body);
        if(error) return res.status(400).send(error.details[0].message)
        console.log(req.body.phone)

        //check if phone is already registered
        user = await User.findOne({phone:req.body.phone})
        console.log(user, "USER");
        if(!user) return res.status(400).send("User does not exist")
    }
    else{
        const {error} = loginWithEmailValidation(req.body);
        if(error) return res.status(400).send(error.details[0].message)

        //check if email is already registered
        user = await User.findOne({email:req.body.email})
        if(!user) return res.status(400).send("User does not exist")

    }

    //password check
    const validPass = await bcrypt.compare(req.body.password,user.password)
    if(!validPass) return res.status(400).send('Invalid password')

    //create and assign token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET)
    res.header("auth-token",token).send(token)

   
})

module.exports = router