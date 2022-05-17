import { Request, Response } from 'express'
import { CategoryController } from '../../controllers/CategoryController'
import { RouteHelper } from '../../helper/RouteHelper'
import { CategoryModel } from '../../models/CategoryModel'
import { CategoryPutRequest } from '../../request/CategoryPutRequest'
import { redirectWithMessage } from '../../utils/RedirectUtil'

export const CategoryPut = async (req: Request, res: Response) => {
    const categoryRequest = new CategoryPutRequest(req.body)
    const controller = new CategoryController(CategoryModel)
    const response = await controller.updateCategory(categoryRequest)

    res.redirect(redirectWithMessage(RouteHelper.categories, response.messages, response.status))
}