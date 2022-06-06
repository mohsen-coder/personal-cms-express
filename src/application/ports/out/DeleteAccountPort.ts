export interface DeleteAccountPort {
    deleteAccountById(accountId: string): Promise<boolean>

    deleteAccountByEmail(email: string): Promise<boolean>

    deleteAccountByUsername(username: string): Promise<boolean>
}