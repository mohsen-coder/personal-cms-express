export interface DeleteAccountPort {
    deleteAccount(accountId: string): Promise<boolean>
}