import {ResponseBase} from "./response/ResponseBase";

export interface DeleteAccountUseCase {
    deleteAccount(request: { id?: string, username?: string, email?: string }): Promise<ResponseBase>
}