export class GetAccountRequest {
    id?: string
    username?: string
    email?: string
    pagination?: {offset: number, limit: number}
}