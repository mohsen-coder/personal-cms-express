export class GetCategoryRequest {
    id: string | null = null
    parentId: string | null = null
    pagination: { offset: number, limit: number } | null = null
}