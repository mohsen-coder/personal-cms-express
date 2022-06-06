import {Account} from "../../../../domain/Account";
import {File} from "../../../../domain/File";
import {AccountRole} from "../../../../domain/AccountRole";
import {FileModel} from "./FileModel";

export class AccountModel {
    id?: string
    name?: string
    family?: string
    username?: string
    email?: string
    password?: string
    thumbnail?: FileModel
    role?: string
    createAt?: number
    updateAt?: number

    constructor(init?: any) {
        init && Object.assign(this, init)
        if (init && init.thumbnail)
            this.thumbnail = new FileModel(init.thumbnail);
    }

    toDomainModel(): Account {
        const account = new Account();
        account.id = this.id
        account.name = this.name
        account.family = this.family
        account.username = this.username
        account.email = this.email
        if (this.password) account.password = this.password
        if (this.createAt) account.createAt = new Date(this.createAt)
        if (this.updateAt) account.updateAt = new Date(this.updateAt)
        if (this.thumbnail) account.thumbnail = this.thumbnail.toDomainModel();

        if (this.role) {
            switch (this.role) {
                case "user":
                    account.role = AccountRole.user;
                    break;
                case "admin":
                    account.role = AccountRole.admin;
                    break;
                default:
                    account.role = AccountRole.none
            }
        }

        return account;
    }

    fromDomainModel(account: Account) {
        this.id = account.id
        this.name = account.name
        this.family = account.family
        this.username = account.username
        this.email = account.email
        if (account.thumbnail) {
            this.thumbnail = new FileModel()
            this.thumbnail.fromDomainModel(account.thumbnail)
        }
        this.role = account.role
        this.createAt = account.createAt?.getTime()
        this.updateAt = account.updateAt?.getTime()
    }
}