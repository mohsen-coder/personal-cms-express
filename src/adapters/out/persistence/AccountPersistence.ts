import {CreateAccountPort} from "../../../application/ports/out/CreateAccountPort";
import {DeleteAccountPort} from "../../../application/ports/out/DeleteAccountPort";
import {GetAccountPort} from "../../../application/ports/out/GetAccountPort";
import {UpdateAccountPort} from "../../../application/ports/out/UpdateAccountPort";
import {AccountModel} from "./models/AccountModel";
import {FileModel} from "./models/FileModel";
import {Account} from "../../../domain/Account";

export class AccountPersistence implements CreateAccountPort, GetAccountPort, UpdateAccountPort, DeleteAccountPort {

    constructor(
        private readonly accountModel: typeof AccountModel,
        private readonly fileModel: typeof FileModel
    ) {
    }

    async createAccount(accountArg: Account): Promise<Account> {

        const account = new this.accountModel()
        account.name = accountArg.name!
        account.family = accountArg.family!
        account.email = accountArg.email!
        account.username = accountArg.username!
        account.password = accountArg.password!
        account.role = accountArg.role

        const savedAccount = await account.save()

        return savedAccount.toDomainModel();
    }


    async getAccountById(id: string): Promise<Account | null> {

        const account = await this.accountModel.findOne({where: {id: id}})

        if (account) return account.toDomainModel();

        return null;
    }

    async getAccountByEmail(email: string): Promise<Account | null> {

        const account = await this.accountModel.findOne({where: {email: email}})

        if (account) return account.toDomainModel();

        return null;
    }

    async getAccountByUsername(username: string): Promise<Account | null> {

        const account = await this.accountModel.findOne({where: {username: username}})

        if (account) return account.toDomainModel();

        return null;
    }

    async getAccountByRole(role: string): Promise<Account[]> {
        const accounts = await this.accountModel.find({where: {role: role}})
        return accounts.map(account => account.toDomainModel());
    }

    async getAccounts(offset: number, limit: number): Promise<Account[]> {
        const accounts = await this.accountModel.find({skip: offset, take: limit})
        return accounts.map(account => account.toDomainModel());
    }

    async updateAccount(account: Account): Promise<Account> {

        const loadedAccount = await this.accountModel.findOne({where: {username: account.username}})

        loadedAccount!.name = account.name!
        loadedAccount!.family = account.family!
        loadedAccount!.email = account.email!
        loadedAccount!.username = account.username!
        if (account.password) loadedAccount!.password = account.password
        if (account.about) loadedAccount!.about = account.about
        loadedAccount!.role = account.role
        if (account.thumbnail && account.thumbnail.id) {
            const file = await this.fileModel.findOne({where: {id: account.thumbnail.id}})
            loadedAccount!.thumbnail = file!
        }

        const updatedAccount = await this.accountModel.save(loadedAccount!)

        return updatedAccount.toDomainModel()
    }


    async deleteAccountById(accountId: string): Promise<boolean> {
        const account = await this.accountModel.findOne({where: {id: accountId}})

        if (account) {
            await this.accountModel.remove(account)
            return true;
        }

        return false;
    }

    async deleteAccountByEmail(email: string): Promise<boolean> {
        const account = await this.accountModel.findOne({where: {email: email}})

        if (account) {
            await this.accountModel.remove(account)
            return true;
        }

        return false;
    }

    async deleteAccountByUsername(username: string): Promise<boolean> {
        const account = await this.accountModel.findOne({where: {username: username}})

        if (account) {
            await this.accountModel.remove(account)
            return true;
        }

        return false;
    }
}