import {Request, Response} from "express"
import {RegisterUseCase} from "../../../application/ports/in/RegisterUseCase";
import {AccountModel} from "./model/AccountModel";

export function RegisterMiddleware(registerUseCase: RegisterUseCase) {

    return async (req: Request, response: Response) => {
        const accountModel = new AccountModel(req.body);
        const responseBase = await registerUseCase.register(accountModel.toDomainModel());
        response.status(responseBase.status === "success" ? 200 : 400)
        response.send(responseBase)
    }
}