import {AccountDAO} from "./dao/AccountDAO";

export interface CreateAccountPort {
    createAccount(account: AccountDAO): AccountDAO
}