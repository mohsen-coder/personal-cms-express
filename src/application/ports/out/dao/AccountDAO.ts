export class AccountDAO {
    id?: string
    name!: string
    family!: string
    email!: string
    username!: string
    password!: string
    about?: string
    thumbnail?: {id: string}
    role!: string
    createAt?: Date
    updateAt?: Date

    constructor(init: object) {
        Object.assign(this, init)
    }
}