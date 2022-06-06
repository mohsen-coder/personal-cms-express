import {UpdateAccountUseCase} from "../../../application/ports/in/UpdateAccountUseCase";
import {Request, Response} from "express";
import {AccountModel} from "./model/AccountModel";

export function UpdateAccountMiddleware(updateAccountUseCase: UpdateAccountUseCase){
    return async (request: Request, response: Response) => {
        const accountModel = new AccountModel(request.body);
        const accountResponse = await updateAccountUseCase.updateAccount(accountModel.toDomainModel());
        response.status(accountResponse.status === "success" ? 200 : 400)
        response.send(accountResponse);
    }
}