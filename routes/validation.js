const Joi = require("@hapi/joi")


//Register Validation
const registerValidation = (data)=>{
    const schema =Joi.object({
        role:Joi.string().min(4).max(6).required(),
        fname:Joi.string().min(3).max(225).required(),
        lname:Joi.string().min(3).max(225).required(),
        phone:Joi.string().min(9).max(10).required(),
        province:Joi.number().min(0).max(7).required(),
        city:Joi.string().min(4).required(),
        district:Joi.string().min(5).max(15).required(),
        email:Joi.string().allow('', null),
        password:Joi.string().min(6).max(1024).required()
    })
    return schema.validate(data)
}

//Login validation
const loginWithEmailValidation = (data)=>{
    const schema =Joi.object({
        email:Joi.string().required().email(),
        password:Joi.string().min(6).max(1024).required()
    })
    return schema.validate(data)
}
const loginWithPhoneValidation = (data)=>{
    const schema =Joi.object({
        phone:Joi.string().min(9).max(10).required(),
        password:Joi.string().min(6).max(1024).required()
    })
    return schema.validate(data)
}

module.exports.registerValidation = registerValidation
module.exports.loginWithEmailValidation = loginWithEmailValidation
module.exports.loginWithPhoneValidation = loginWithPhoneValidation

