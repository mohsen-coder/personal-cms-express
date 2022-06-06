import {AccountResponse} from "./response/AccountResponse";

export interface GetAccountUseCase {
    getAccount(request: { id?: string, username?: string, email?: string, pagination?: { offset: number, limit: number } }):
        Promise<AccountResponse>
}