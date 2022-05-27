import {EditAccountRequest} from "../request/EditAccountRequest";
import {AccountResponse} from "../response/AccountResponse";

export interface UpdateAccountUseCase {
    updateAccount(request: EditAccountRequest): AccountResponse
}