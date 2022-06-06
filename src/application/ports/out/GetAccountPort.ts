import {Account} from "../../../domain/Account";

export interface GetAccountPort {
    getAccountById(id: string): Promise<Account | null>

    getAccountByEmail(email: string): Promise<Account | null>

    getAccountByUsername(username: string): Promise<Account | null>

    getAccountByRole(role: string): Promise<Account[]>

    getAccounts(offset: number, limit: number): Promise<Account[]>
}