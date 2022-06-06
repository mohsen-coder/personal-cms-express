import {Account} from "../../../domain/Account";

export interface UpdateAccountPort {
    updateAccount(account: Account): Promise<Account>
}