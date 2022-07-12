import {Request, Response, NextFunction} from "express";
import {isEmpty, toString} from "lodash";
import {ResponseBase} from "../../../application/ports/in/response/ResponseBase";
import {ResponseStatus} from "../../../application/ports/in/response/ResponseStatus";

export function DeleteAccountValidationMiddleware() {
    return (request: Request, response: Response, next: NextFunction) => {
        if (!request.query.id || isEmpty(toString(request.query.id))) {
            const responseBase = new ResponseBase();
            responseBase.status = ResponseStatus.error;
            responseBase.messages.push('آیدی الزامی می باشد!');
            response.status(400).send(responseBase);
            return;
        }
        next();
    }
}