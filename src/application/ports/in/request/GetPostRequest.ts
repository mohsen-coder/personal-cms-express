export class GetPostRequest {
    id: string | null = null
    categoryId: string | null = null
    mostLike: boolean | null = null
    mostView: boolean | null = null
    pagination: {offset: number, limit: number} | null = null
}