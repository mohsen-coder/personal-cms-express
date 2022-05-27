import {RegisterRequest} from "../request/RegisterRequest";
import {ResponseBase} from "../response/ResponseBase";

export interface RegisterUseCase {
    register(request: RegisterRequest): ResponseBase
}