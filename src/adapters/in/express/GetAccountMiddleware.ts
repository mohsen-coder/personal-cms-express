import {GetAccountUseCase} from "../../../application/ports/in/GetAccountUseCase";
import {Request, Response} from "express";
import {toNumber, toString, trim} from "lodash";

export function GetAccountMiddleware(getAccountUseCase: GetAccountUseCase) {
    return async (request: Request, response: Response) => {
        const data:
            { id?: string | undefined, username?: string | undefined, email?: string | undefined, pagination?: { offset: number, limit: number } }
            = {}

        if (request.query.id) data.id = trim(toString(request.query.id));
        if (request.query.username) data.username = trim(toString(request.query.username));
        if (request.query.email) data.email = trim(toString(request.query.email));
        if (request.query.offset && request.query.limit)
            data.pagination = {
                offset: toNumber(request.query.offset),
                limit: toNumber(request.query.limit)
            };

        const accountResponse = await getAccountUseCase.getAccount(data);

        response.status(accountResponse.status === "success" ? 200 : 400)
        response.send(accountResponse);
    }
}