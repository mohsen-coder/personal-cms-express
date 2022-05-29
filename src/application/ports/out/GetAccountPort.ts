import {AccountDAO} from "./dao/AccountDAO";

export interface GetAccountPort {
    getAccountById(id: string): Promise<AccountDAO | null>
    getAccountByEmail(email: string): Promise<AccountDAO | null>
    getAccountByUsername(username: string): Promise<AccountDAO | null>
    getAccountByRole(role: string): Promise<AccountDAO[]>
    getAccounts(offset: number, limit: number): Promise<AccountDAO[]>
}