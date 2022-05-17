import { Request, Response } from 'express'
import { CategoryController } from '../../controllers/CategoryController'
import { RouteHelper } from '../../helper/RouteHelper'
import { CategoryModel } from '../../models/CategoryModel'
import { CategoryDeleteRequest } from '../../request/CategoryDeleteRequest'
import { redirectWithMessage } from '../../utils/RedirectUtil'

export const CategoryDelete = async (req: Request, res: Response) => {
    const deleteRequest = new CategoryDeleteRequest(req.body.id)
    const controller = new CategoryController(CategoryModel)
    const response = await controller.deleteCategory(deleteRequest)

    res.redirect(redirectWithMessage(RouteHelper.categories, response.messages, response.status))
}