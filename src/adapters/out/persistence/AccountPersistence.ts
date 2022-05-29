import { CreateAccountPort } from "../../../application/ports/out/CreateAccountPort";
import { AccountDAO } from "../../../application/ports/out/dao/AccountDAO";
import { DeleteAccountPort } from "../../../application/ports/out/DeleteAccountPort";
import { GetAccountPort } from "../../../application/ports/out/GetAccountPort";
import { UpdateAccountPort } from "../../../application/ports/out/UpdateAccountPort";
import { AccountModel } from "./models/AccountModel";
import { FileModel } from "./models/FileModel";

export class AccountPersistence implements CreateAccountPort, GetAccountPort, UpdateAccountPort, DeleteAccountPort {

    private readonly accountModel: typeof AccountModel
    private readonly fileModel: typeof FileModel

    constructor(model: typeof AccountModel, fileModel: typeof FileModel) {
        this.accountModel = model;
        this.fileModel = fileModel;
    }

    async createAccount(accountArg: AccountDAO): Promise<AccountDAO> {

        const account = new this.accountModel()
        account.name = accountArg.name
        account.family = accountArg.family
        account.email = accountArg.email
        account.password = accountArg.password
        account.role = accountArg.role

        const savedAccount = await account.save()

        return new AccountDAO(savedAccount);
    }


    async getAccountById(id: string): Promise<AccountDAO | null> {

        const account = await this.accountModel.findOne({ where: { id: id } })

        if (account) return new AccountDAO(account);

        return null;
    }

    async getAccountByEmail(email: string): Promise<AccountDAO | null> {

        const account = await this.accountModel.findOne({ where: { email: email } })

        if (account) return new AccountDAO(account);

        return null;
    }

    async getAccountByRole(role: string): Promise<AccountDAO[]> {
        const accounts = await this.accountModel.find({ where: { role: role } })
        return accounts.map(account => new AccountDAO(account));
    }

    async updateAccount(account: AccountDAO): Promise<AccountDAO | null> {

        const loadedAccount = await this.accountModel.findOne({ where: { username: account.username } })

        if (loadedAccount) {
            loadedAccount.name = account.name
            loadedAccount.family = account.family
            loadedAccount.email = account.email
            loadedAccount.username = account.username
            loadedAccount.password = account.password
            loadedAccount.about = account.about
            loadedAccount.role = account.role
            if (account.thumbnail && account.thumbnail.id) {
                const file = await this.fileModel.findOne({ where: { id: account.thumbnail.id } })
                loadedAccount.thumbnail = file!
            }

            const updatedAccount = await this.accountModel.save(loadedAccount)

            return new AccountDAO(updatedAccount)
        }

        return null;
    }

    async deleteAccount(accountId: string): Promise<boolean> {

        const account = await this.accountModel.findOne({ where: { id: accountId } })

        if (account) {
            await this.accountModel.remove(account)
            return true;
        }

        return false;
    }
}