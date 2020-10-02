const jwt = require("jsonwebtoken")

module.exports = (req,res,next)=>{
    const token = req.header('auth-token')
    if(!token) return res.status(401).send("Access denied")

    try{
        const verified = jwt.verify(token, process.env.TOKEN_SECRET)
        req.user = verified
        console.log(verified, "user id")
        next()
    }
    catch(err){
        res.status(400).send("Invalid token")
    }
}