import {Account} from "../../../domain/Account";
import {AccountDAO} from "./dao/AccountDAO";

export interface UpdateAccountPort {
    updateAccount(account: Account): Promise<AccountDAO>
}