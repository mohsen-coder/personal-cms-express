import {AccountResponse} from "./response/AccountResponse";
import {Account} from "../../../domain/Account";

export interface UpdateAccountUseCase {
    updateAccount(account: Account): Promise<AccountResponse>
}