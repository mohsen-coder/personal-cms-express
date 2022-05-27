import {GetAccountRequest} from "../request/GetAccountRequest";
import {AccountResponse} from "../response/AccountResponse";

export interface GetAccountUseCase {
    getAccount(request: GetAccountRequest): AccountResponse
}