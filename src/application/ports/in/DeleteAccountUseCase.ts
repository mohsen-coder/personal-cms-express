import {ResponseBase} from "./response/ResponseBase";

export interface DeleteAccountUseCase {
    deleteAccount(request: { accountId?: string, username?: string, email?: string }): Promise<ResponseBase>
}