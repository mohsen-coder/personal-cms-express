import Joi from "joi";

const schema = Joi.object({
    id: Joi.string().trim().guid({ version: 'uuidv4' }).required().messages({
        'string.guid': 'آیدی معتبر نمی باشد!',
        'any.required': 'آیدی الزامی می باشد!'
    })
})

export { schema as categoryDeleteSchema }