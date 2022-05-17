import Joi from "joi";

const schema = Joi.object({

    id: Joi.string().trim().guid({ version: 'uuidv4' }).optional().allow(null).messages({
        'string.guid': 'آیدی معتبر نمی باشد!'
    }),

    title: Joi.string().trim().min(2).optional().allow(null).messages({
        'string.min': 'عنوان باید حداقل ۲ حرف باشد!'
    }),

    pagination: Joi.object({
        offset: Joi.number().min(0).integer(),
        limit: Joi.number().min(0).max(50).integer()
    }).optional().allow(null)
    
})

export { schema as categoryGetSchema }