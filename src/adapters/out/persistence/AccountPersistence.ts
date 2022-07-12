import {CreateAccountPort} from "../../../application/ports/out/CreateAccountPort";
import {DeleteAccountPort} from "../../../application/ports/out/DeleteAccountPort";
import {GetAccountPort} from "../../../application/ports/out/GetAccountPort";
import {UpdateAccountPort} from "../../../application/ports/out/UpdateAccountPort";
import {AccountModel} from "./models/AccountModel";
import {FileModel} from "./models/FileModel";
import {Account} from "../../../domain/Account";
import {AccountDAO} from "../../../application/ports/out/dao/AccountDAO";
import log from "../../../utils/logger";

export class AccountPersistence implements CreateAccountPort, GetAccountPort, UpdateAccountPort, DeleteAccountPort {

    constructor(
        private readonly accountModel: typeof AccountModel,
        private readonly fileModel: typeof FileModel
    ) {
    }

    async createAccount(accountArg: Account): Promise<AccountDAO> {
        const account = new this.accountModel()
        account.name = accountArg.name!
        account.family = accountArg.family!
        account.email = accountArg.email!
        account.username = accountArg.username!
        account.password = accountArg.password!
        account.role = accountArg.role

        const savedAccount = await account.save()
        const accountDAO = new AccountDAO();
        accountDAO.account = savedAccount.toDomainModel();
        return accountDAO;
    }


    async getAccountById(id: string): Promise<AccountDAO> {
        const account = await this.accountModel.createQueryBuilder("account")
            .leftJoinAndSelect("account.thumbnail", "thumbnail")
            .where('account.id = :id', {id})
            .getOne()
        const accountDAO = new AccountDAO();
        if(account) accountDAO.account = account.toDomainModel();
        return accountDAO;
    }

    async getAccountByEmail(email: string): Promise<AccountDAO> {
        const account = await this.accountModel.createQueryBuilder("account")
            .leftJoinAndSelect("account.thumbnail", "thumbnail")
            .select(['account', 'thumbnail.id'])
            .where('account.email = :email', {email})
            .getOne();
        const accountDAO = new AccountDAO();
        if(account) accountDAO.account = account.toDomainModel();
        return accountDAO;
    }

    async getAccountByUsername(username: string): Promise<AccountDAO> {
        const account = await this.accountModel.createQueryBuilder("account")
            .leftJoinAndSelect("account.thumbnail", "thumbnail")
            .select(['account', 'thumbnail.id'])
            .where('account.username = :username', {username})
            .getOne()
        const accountDAO = new AccountDAO();
        if(account) accountDAO.account = account.toDomainModel();
        return accountDAO;
    }

    async getAccountByRole(role: string): Promise<AccountDAO> {
        const [accounts, count] = await this.accountModel.createQueryBuilder("account")
            .leftJoinAndSelect("account.thumbnail", "thumbnail")
            .select(['account.id', 'account.name', 'account.family', 'account.email', 'account.username', 'account.role', 'thumbnail.id'])
            .where('account.role = :role', {role})
            .getManyAndCount();
        const accountResponse = new AccountDAO();
        accountResponse.accounts = accounts.map(account => account.toDomainModel());
        accountResponse.count = count;
        return accountResponse;
    }

    async getAccounts(offset: number, limit: number): Promise<AccountDAO> {
        const [accounts, count] = await this.accountModel.createQueryBuilder("account")
            .leftJoinAndSelect("account.thumbnail", "thumbnail")
            .select(['account.id', 'account.name', 'account.family', 'account.email', 'account.username', 'account.role', 'thumbnail.id'])
            .skip(offset)
            .take(limit)
            .getManyAndCount();
        const accountResponse = new AccountDAO();
        accountResponse.accounts = accounts.map(account => account.toDomainModel());
        accountResponse.count = count;
        return accountResponse;
    }

    async updateAccount(account: Account): Promise<AccountDAO> {
        const loadedAccount = await this.accountModel.createQueryBuilder("account")
            .leftJoinAndSelect("account.thumbnail", "thumbnail")
            .where("account.id = :accountId", {accountId: account.id})
            .getOne();

        if (account.name) loadedAccount!.name = account.name;
        if (account.family) loadedAccount!.family = account.family;
        if (account.email) loadedAccount!.email = account.email;
        if (account.username) loadedAccount!.username = account.username;
        if (account.password) loadedAccount!.password = account.password;
        if (account.about) loadedAccount!.about = account.about;
        if (account.role) loadedAccount!.role = account.role;
        if (account.thumbnail && account.thumbnail.id) {
            const file = await this.fileModel.createQueryBuilder("file")
                .where("file.id = :fileId", {fileId: account.thumbnail.id})
                .getOne();
            loadedAccount!.thumbnail = file!
        }

        const updatedAccount = await this.accountModel.save(loadedAccount!)
        const accountDAO = new AccountDAO();
        accountDAO.account = updatedAccount.toDomainModel();
        return accountDAO;
    }


    async deleteAccountById(accountId: string): Promise<boolean> {
        try{
            await this.accountModel.createQueryBuilder()
                .delete()
                .where("id = :accountId", {accountId})
                .execute();
            return true;
        }catch (err){
            log.error(err, "DeleteAccountById")
            return false;
        }
    }

    async deleteAccountByEmail(email: string): Promise<boolean> {
        try{
            await this.accountModel.createQueryBuilder()
                .delete()
                .where("email = :email", {email})
                .execute();
            return true;
        }catch (err){
            log.error(err, "DeleteAccountByEmail")
            return false;
        }
    }

    async deleteAccountByUsername(username: string): Promise<boolean> {
        try{
            await this.accountModel.createQueryBuilder()
                .delete()
                .where("username = :username", {username})
                .execute();
            return true;
        }catch (err){
            log.error(err, "DeleteAccountByUsername")
            return false;
        }
    }
}