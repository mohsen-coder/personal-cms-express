import {LoginRequest} from "../request/LoginRequest";
import {ResponseBase} from "../response/ResponseBase";

export interface LoginUseCase {
    login(request: LoginRequest): ResponseBase
}