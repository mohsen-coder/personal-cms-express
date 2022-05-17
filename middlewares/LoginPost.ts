import {Request, Response} from 'express'
import { LoginController } from '../controllers/LoginController'
import { RouteHelper } from '../helper/RouteHelper'
import { UserModel } from '../models/UserModel'
import { LoginPostRequest } from '../request/LoginPostRequest'
import { redirectWithMessage } from '../utils/RedirectUtil'

export const LoginPost = async (req: Request, res: Response) => {
    const loginPostRequest = new LoginPostRequest(req.body, req.session)
    const controller = new LoginController(loginPostRequest, UserModel)
    const response = await controller.loginUser()

    if(response.status === "error") 
        return res.redirect(redirectWithMessage(RouteHelper.login, response.messages, response.status))
    
    res.redirect(RouteHelper.panel)
}