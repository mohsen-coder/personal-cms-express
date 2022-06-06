import {Router} from "express";
import {
    createCategoryMiddleware,
    createPostMiddleware,
    deleteAccountMiddleware, deleteCategoryMiddleware, deletePostMiddleware,
    getAccountMiddleware, getCategoryMiddleware, getPostMiddleware,
    loginMiddleware,
    registerMiddleware,
    registerValidationMiddleware,
    updateAccountMiddleware, updateCategoryMiddleware, updatePostMiddleware
} from "./Config";

const router = Router()

router.post('/register', registerValidationMiddleware, registerMiddleware)
router.post('/login', loginMiddleware)
router.get('/account', getAccountMiddleware)
router.put('/account/update', updateAccountMiddleware)
router.delete('/account', deleteAccountMiddleware)

router.post('/category', createCategoryMiddleware)
router.get('/category', getCategoryMiddleware)
router.put('/category', updateCategoryMiddleware)
router.delete('/category/:id', deleteCategoryMiddleware)

router.post('/post', createPostMiddleware)
router.get('/post', getPostMiddleware)
router.put('/post', updatePostMiddleware)
router.delete('/post/:id', deletePostMiddleware)

export {router};