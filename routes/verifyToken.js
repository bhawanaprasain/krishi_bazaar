const jwt = require("jsonwebtoken")

module.exports = (req,res,next)=>{
    const header = req.body.header
    // console.log(header['auth-token']);
    // console.log(req.body.header);
    const token = header['auth-token']
    if(!token) return res.send({errMessage:"Access denied"})

    try{
        // console.log(token.substring(1,token.length-1));
        const verified = jwt.verify(token.substring(1,token.length-1), process.env.TOKEN_SECRET)
        req.user = verified
        // console.log(req.user);
        next()
    }
    catch(err){
        console.log(err);
        res.send({errMessage:"Invalid token"})
    }
}