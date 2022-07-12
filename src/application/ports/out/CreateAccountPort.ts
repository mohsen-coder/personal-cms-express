import {Account} from "../../../domain/Account";
import {AccountDAO} from "./dao/AccountDAO";

export interface CreateAccountPort {
    createAccount(account: Account): Promise<AccountDAO>
}