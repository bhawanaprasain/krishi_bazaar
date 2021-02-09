const jwt = require("jsonwebtoken")

module.exports = (req,res,next)=>{
    const header = req.body.header
    const token = header['auth-token']
    if(!token) return res.send({errMessage:"Access denied"})

    try{
        const verified = jwt.verify(token.substring(1,token.length-1), process.env.TOKEN_SECRET)
        req.user = verified
        next()
    }
    catch(err){
        console.log(err);
        res.send({errMessage:"Invalid token"})
    }
}