import { Request, Response, NextFunction } from "express";
import { JWT } from "../../../utils/JWT";
import { ResponseBase } from "../../../application/ports/in/response/ResponseBase";
import { ResponseStatus } from "../../../application/ports/in/response/ResponseStatus";

export function TokenValidationMiddleware(finalMiddleware = false) {
	return (request: Request, response: Response, next: NextFunction) => {
		const data = JWT.authenticateToken(request.header("authorization")!);
		if (!data) {
			const responseBase = new ResponseBase();
			responseBase.status = ResponseStatus.error;
			responseBase.messages.push("توکن معتبر نیست!");
			response.status(400).send(responseBase);
			return;
		}
		if (finalMiddleware) {
			const responseBase = new ResponseBase();
			responseBase.status = ResponseStatus.success;
			responseBase.messages.push("توکن معتبر است!");
			response.status(200).send(responseBase);
			return;
		}
		next();
	};
}
