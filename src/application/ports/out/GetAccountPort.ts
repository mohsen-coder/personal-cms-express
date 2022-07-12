import {Account} from "../../../domain/Account";
import {AccountDAO} from "./dao/AccountDAO";

export interface GetAccountPort {
    getAccountById(id: string): Promise<AccountDAO>

    getAccountByEmail(email: string): Promise<AccountDAO>

    getAccountByUsername(username: string): Promise<AccountDAO>

    getAccountByRole(role: string): Promise<AccountDAO>

    getAccounts(offset: number, limit: number): Promise<AccountDAO>
}