import {DeleteAccountUseCase} from "../../../application/ports/in/DeleteAccountUseCase";
import {Request, Response} from "express";
import {toString, trim} from "lodash";

export function DeleteAccountMiddleware(deleteAccountUseCase: DeleteAccountUseCase) {
    return async (request: Request, response: Response) => {

        const data: { accountId?: string | undefined, username?: string | undefined, email?: string | undefined } = {}

        if (request.query.accountId) data.accountId = trim(toString(request.query.accountId));
        if (request.query.username) data.username = trim(toString(request.query.username));
        if (request.query.email) data.email = trim(toString(request.query.email));

        const responseBase = await deleteAccountUseCase.deleteAccount(data);

        response.status(responseBase.status === "success" ? 200 : 400)
        response.send(responseBase);
    }
}