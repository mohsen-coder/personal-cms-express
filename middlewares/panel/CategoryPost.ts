import { Request, Response } from 'express'
import { CategoryController } from '../../controllers/CategoryController'
import { RouteHelper } from '../../helper/RouteHelper'
import { CategoryModel } from '../../models/CategoryModel'
import { CategoryPostRequest } from '../../request/CategoryPostRequest'
import { redirectWithMessage } from '../../utils/RedirectUtil'

export const CategoryPost = async (req: Request, res: Response) => {
    const categoryRequest = new CategoryPostRequest(req.body.title)
    const controller = new CategoryController(CategoryModel)
    const response = await controller.createCategory(categoryRequest)

    res.redirect(redirectWithMessage(RouteHelper.categories, response.messages, response.status))
}