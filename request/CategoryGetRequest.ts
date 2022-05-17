export class CategoryGetRequest {
    id: string | null = null
    title: string | null = null
    pagination: {offset: number, limit: number} | null = null // 0 => fetch all categories
}