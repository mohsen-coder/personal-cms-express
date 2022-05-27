import {EditCategoryRequest} from "../request/EditCategoryRequest";
import {CategoryResponse} from "../response/CategoryResponse";

export interface UpdateCategoryUseCase {
    updateCategory(request: EditCategoryRequest): CategoryResponse
}