import Joi from "joi";

const schema = Joi.object({
    title: Joi.string().trim().min(2).required().messages({
        'string.min': 'عنوان باید حداقل ۲ حرف باشد!',
        'any.required': 'عنوان اجباری می باشد!'
    })
})

export {schema as categoryPostSchema}