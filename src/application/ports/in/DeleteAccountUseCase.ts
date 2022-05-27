import {DeleteAccountRequest} from "./request/DeleteAccountRequest";
import {ResponseBase} from "./response/ResponseBase";

export interface DeleteAccountUseCase {
    deleteAccount(request: DeleteAccountRequest): ResponseBase
}