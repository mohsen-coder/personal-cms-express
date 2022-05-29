import {AccountDAO} from "./dao/AccountDAO";

export interface UpdateAccountPort {
    updateAccount(account: AccountDAO): Promise<AccountDAO | null>
}