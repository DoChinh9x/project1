const Joi =require('Joi');

const registerValidation = (data)=>{
    const schema=Joi.object({
        name: Joi.string()
            .required(),
        password: Joi.string()
            .min(6)
            .required(),
        email: Joi.string()
            .email()
            .min(6)
            .required()
    });
    return schema.validate(data);
}
const loginValidation = (data)=>{
    const schema=Joi.object({
        password: Joi.string()
            .min(6)
            .required(),
        email: Joi.string()
            .email()
            .min(6)
            .required()
    });
    return schema.validate(data);
}

module.exports = {registerValidation,loginValidation};

