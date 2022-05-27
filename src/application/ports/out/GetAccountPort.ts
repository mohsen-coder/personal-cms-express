import {AccountDAO} from "./dao/AccountDAO";

export interface GetAccountPort {
    getAccountById(id: string): AccountDAO
    getAccountByEmail(email: string): AccountDAO
    getAccountByRole(role: string): AccountDAO[]
}