import {LoginUseCase} from "../../../application/ports/in/LoginUseCase";
import {Request, Response} from "express";

export function LoginMiddleware(loginUseCase: LoginUseCase) {

    return async (request: Request, response: Response) => {
        const loginResponse = await loginUseCase.login({
            username: request.body.username,
            password: request.body.password
        });
        response.status(loginResponse.status === "success" ? 200 : 400)
        response.send(loginResponse)
    }
}