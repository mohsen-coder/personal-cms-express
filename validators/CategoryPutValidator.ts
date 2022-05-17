import Joi from "joi";

const schema = Joi.object({

    id: Joi.string().trim().guid({version: 'uuidv4'}).required().messages({
        'string.guid': 'آیدی معتبر نمی باشد!',
        'any.required': 'آیدی الزامی می باشد!'
    }),

    title: Joi.string().trim().min(2).required().messages({
        'string.min': 'عنوان باید حداقل ۲ حرف باشد!',
        'any.required': 'عنوان اجباری می باشد!'
    })
    
})

export {schema as categoryPutSchema}