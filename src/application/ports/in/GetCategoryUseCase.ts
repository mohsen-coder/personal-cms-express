import {CategoryResponse} from "./response/CategoryResponse";

export interface GetCategoryUseCase {
    getCategory(request: { id?: string, title?: string, parentId?: string, pagination?: { offset: number, limit: number } }):
        Promise<CategoryResponse>
}