import Joi from "joi";

const schema = Joi.object({

    name: Joi.string().trim().min(3).max(25).required().messages({
        'string.min': 'نام حداقل باید ۳ حرف باشد!',
        'string.max': 'نام حداکثر باید 25 حرف باشد!',
        'string.empty': 'نام نمی تواند خالی باشد!',
        'any.required': 'وارد کردن نام اجباری می باشد!'
    }),

    family: Joi.string().trim().min(2).max(25).required().messages({
        'string.min': 'نام خانوادگی حداقل باید ۳ حرف باشد!',
        'string.max': 'نام خانوادگی حداکثر باید 25 حرف باشد!',
        'string.empty': 'نام خانوادگی نمی تواند خالی باشد!',
        'any.required': 'وارد کردن نام خانوادگی اجباری می باشد!'
    }),

    email: Joi.string().email().required().messages({
        'string.email': 'لطفا یک ایمیل معتبر وارد کنید!',
        'string.empty': 'ایمیل نمی تواند خالی باشد!',
        'any.required': 'وارد کردن ایمیل اجباری می باشد!'
    }),

    password: Joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
        .message('پسورد معتبر نیست!'),

    confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({
        'string.required': 'تکرار پسورد الزامی می باشد!',
        'any.only': 'تکرار پسورد صحیح نیست!'
    })
})

export { schema as registerPostSchema }