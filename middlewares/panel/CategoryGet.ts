import {Request, Response} from 'express'
import {CategoryGetRequest} from "../../request/CategoryGetRequest";
import {CategoryController} from "../../controllers/CategoryController";
import {CategoryModel} from "../../models/CategoryModel";

export const CategoryGet = async (req: Request, res: Response) => {
    const categoryGetRequest = new CategoryGetRequest();
    const categoryController = new CategoryController(CategoryModel);
    const responseBase = await categoryController.getCategory(categoryGetRequest);
    res.render('panel/categories', {pageTitle: 'دسته بندی ها', ...responseBase.data})
}