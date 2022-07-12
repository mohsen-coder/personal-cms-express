import {Account} from "../../../../domain/Account";
import {File} from "../../../../domain/File";
import {AccountRole} from "../../../../domain/AccountRole";
import {FileModel} from "./FileModel";

export class AccountModel {
    id: string
    name: string
    family: string
    username: string
    email: string
    password: string
    about: string
    thumbnail: FileModel
    role: string
    createAt: number
    updateAt: number

    constructor(init?: any) {
        init && Object.assign(this, init);
        if (init && init.role) this.role = init.role;
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
        if (this.about) account.about = this.about
        if (this.thumbnail) account.thumbnail = this.thumbnail.toDomainModel();

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

        return account;
    }

    fromDomainModel(account: Account) {
        if (account.id) this.id = account.id
        if (account.name) this.name = account.name
        if (account.family) this.family = account.family
        if (account.username) this.username = account.username
        if (account.email) this.email = account.email
        if (account.about) this.about = account.about
        if (account.thumbnail) {
            this.thumbnail = new FileModel()
            this.thumbnail.fromDomainModel(account.thumbnail)
        }
        if (account.role) this.role = account.role;
        if (account.createAt) this.createAt = account.createAt.getTime();
        if (account.updateAt) this.updateAt = account.updateAt.getTime();
    }
}