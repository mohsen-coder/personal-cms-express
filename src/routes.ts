import { Router } from "express";
import {
	createCategoryMiddleware,
	createCategoryValidationMiddleware,
	createCommentMiddleware,
	createCommentValidationMiddleware,
	createMessageMiddleware,
	createMessageValidationMiddleware,
	createPostMiddleware,
	createPostValidationMiddleware,
	deleteAccountMiddleware,
	deleteAccountValidationMiddleware,
	deleteCategoryMiddleware,
	deleteCategoryValidationMiddleware,
	deleteCommentMiddleware,
	deleteCommentValidationMiddleware,
	deleteFileMiddleware,
	deleteMessageMiddleware,
	deleteMessageValidationMiddleware,
	deletePostMiddleware,
	deletePostValidationMiddleware,
	getAccountMiddleware,
	getAccountValidationMiddleware,
	getCategoryMiddleware,
	getCategoryValidationMiddleware,
	getCommentMiddleware,
	getCommentValidationMiddleware,
	getFileMiddleware,
	getMessageMiddleware,
	getMessageValidationMiddleware,
	getPostMiddleware,
	getPostValidationMiddleware,
	getSettingMiddleware,
	loginMiddleware,
	loginValidationMiddleware,
	registerMiddleware,
	registerValidationMiddleware,
	tokenValidationMiddleware,
	tokenValidationMiddlewareFinal,
	updateAccountMiddleware,
	updateAccountValidationMiddleware,
	updateCategoryMiddleware,
	updateCategoryValidationMiddleware,
	updateCommentMiddleware,
	updateCommentValidationMiddleware,
	updateMessageMiddleware,
	updateMessageValidationMiddleware,
	updatePostMiddleware,
	updatePostValidationMiddleware,
	updateSettingMiddleware,
	uploadFileMiddleware,
	uploadFileValidationMiddleware,
} from "./Config";

const router = Router();

router.post("/register", registerValidationMiddleware, registerMiddleware);
router.post("/login", loginValidationMiddleware, loginMiddleware);
router.get(
	"/account",
	getAccountValidationMiddleware,
	getAccountMiddleware
);
router.put(
	"/account",
	updateAccountValidationMiddleware,
	tokenValidationMiddleware,
	updateAccountMiddleware
);
router.delete(
	"/account",
	deleteAccountValidationMiddleware,
	tokenValidationMiddleware,
	deleteAccountMiddleware
);
router.post("/token/validate", tokenValidationMiddlewareFinal);

router.post(
	"/category",
	createCategoryValidationMiddleware,
	tokenValidationMiddleware,
	createCategoryMiddleware
);
router.get("/category", getCategoryValidationMiddleware, getCategoryMiddleware);
router.put(
	"/category",
	updateCategoryValidationMiddleware,
	tokenValidationMiddleware,
	updateCategoryMiddleware
);
router.delete(
	"/category/:id",
	deleteCategoryValidationMiddleware,
	tokenValidationMiddleware,
	deleteCategoryMiddleware
);

router.post(
	"/post",
	createPostValidationMiddleware,
	tokenValidationMiddleware,
	createPostMiddleware
);
router.get("/post", getPostValidationMiddleware, getPostMiddleware);
router.put(
	"/post",
	updatePostValidationMiddleware,
	tokenValidationMiddleware,
	updatePostMiddleware
);
router.delete(
	"/post/:id",
	deletePostValidationMiddleware,
	tokenValidationMiddleware,
	deletePostMiddleware
);

router.post(
	"/file",
	uploadFileValidationMiddleware,
	tokenValidationMiddleware,
	uploadFileMiddleware
);
router.get("/file", getFileMiddleware);
router.delete("/file/:id", tokenValidationMiddleware, deleteFileMiddleware);

router.post(
	"/message",
	createMessageValidationMiddleware,
	createMessageMiddleware
);
router.get(
	"/message",
	getMessageValidationMiddleware,
	tokenValidationMiddleware,
	getMessageMiddleware
);
router.put(
	"/message",
	updateMessageValidationMiddleware,
	tokenValidationMiddleware,
	updateMessageMiddleware
);
router.delete(
	"/message/:id",
	deleteMessageValidationMiddleware,
	tokenValidationMiddleware,
	deleteMessageMiddleware
);

router.post(
	"/comment",
	createCommentValidationMiddleware,
	createCommentMiddleware
);
router.get("/comment", getCommentValidationMiddleware, getCommentMiddleware);
router.put(
	"/comment",
	updateCommentValidationMiddleware,
	tokenValidationMiddleware,
	updateCommentMiddleware
);
router.delete(
	"/comment/:id",
	deleteCommentValidationMiddleware,
	tokenValidationMiddleware,
	deleteCommentMiddleware
);

router.get('/setting', getSettingMiddleware);
router.put("/setting", updateSettingMiddleware);

export { router };