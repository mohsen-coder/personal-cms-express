import Joi from "joi";

const schema = Joi.object({
    email: Joi.string().trim().email().message('ایمیل معتبر نیست!'),
    password: Joi.string().trim().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/).message('پسورد معتبر نیست!')
})

export {schema as loginPostSchema}