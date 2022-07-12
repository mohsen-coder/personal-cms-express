import {File} from "./File";
import {AccountRole} from "./AccountRole";

export class Account {
    id: string
    name: string
    family: string
    username: string
    email: string
    password: string
    about: string
    thumbnail: File
    role: AccountRole
    createAt: Date
    updateAt: Date
}