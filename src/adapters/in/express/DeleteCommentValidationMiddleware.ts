import {Request, Response, NextFunction} from "express";
import {isEmpty} from "lodash";
import {ResponseBase} from "../../../application/ports/in/response/ResponseBase";
import {ResponseStatus} from "../../../application/ports/in/response/ResponseStatus";

export function DeleteCommentValidationMiddleware() {
    return (request: Request, response: Response, next: NextFunction) => {
        if (!request.params.id || isEmpty(request.params.id)) {
            const responseBase = new ResponseBase();
            responseBase.status = ResponseStatus.error;
            responseBase.messages.push('آیدی الزامی می باشد!');
            response.status(400).send(responseBase);
            return;
        }
        next();
    }
}