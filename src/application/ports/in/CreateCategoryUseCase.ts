import {NewCategoryRequest} from "./request/NewCategoryRequest";
import {CategoryResponse} from "./response/CategoryResponse";

export interface CreateCategoryUseCase {
    createCategory(request: NewCategoryRequest): Promise<CategoryResponse>
}