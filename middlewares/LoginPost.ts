import {Request, Response} from 'express'
import { LoginController } from '../controllers/LoginController'
import { RouteHelper } from '../helper/RouteHelper'
import { UserModel } from '../models/UserModel'
import { LoginRequest } from '../request/LoginRequest'
import { redirectWithMessage } from '../utils/RedirectUtil'

export const LoginPost = async (req: Request, res: Response) => {
    const loginRequest = new LoginRequest(req.body, req.session)
    const controller = new LoginController(loginRequest, UserModel)
    const response = await controller.loginUser()

    if(response.status === "error") 
        return res.redirect(redirectWithMessage(RouteHelper.login, response.messages, response.status))
    
    res.redirect(RouteHelper.panel)
}