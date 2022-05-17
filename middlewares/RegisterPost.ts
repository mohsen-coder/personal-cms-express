import { Request, Response } from 'express'
import { RegisterController } from '../controllers/RegisterController'
import { RouteHelper } from '../helper/RouteHelper'
import { UserModel } from '../models/UserModel'
import { RegisterRequest } from '../request/RegisterRequest'
import { redirectWithMessage } from '../utils/RedirectUtil'

export const RegisterPost = async (req: Request, res: Response) => {
    const registerRequest = new RegisterRequest(req.body)
    const controller = new RegisterController(registerRequest, UserModel)
    const response = await controller.registerUser()
    if (response.status === "error") 
        return res.redirect(redirectWithMessage(RouteHelper.register, response.messages, response.status));
    
    return res.redirect(RouteHelper.login)
}