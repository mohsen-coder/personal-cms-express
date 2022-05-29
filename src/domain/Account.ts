import {File} from "./File";
import {AccountRole} from "./AccountRole";

export class Account {
    id: string = ""
    name: string = ""
    family: string = ""
    username: string = ""
    email: string = ""
    password: string = ""
    about: string = ""
    thumbnail: File | null = null
    role: AccountRole = AccountRole.none

    constructor(init?: object) {
        init && Object.assign(this, init)
    }
}