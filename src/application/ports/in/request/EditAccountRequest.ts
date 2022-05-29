export class EditAccountRequest {
    id!: string
    name!: string
    family!: string
    email!: string
    username!: string
    password!: string
    about?: string
    thumbnail?: {id: string}
    role!: string
}