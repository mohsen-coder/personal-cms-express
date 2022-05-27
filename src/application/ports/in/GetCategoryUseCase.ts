import {GetCategoryRequest} from "../request/GetCategoryRequest";
import {CategoryResponse} from "../response/CategoryResponse";

export interface GetCategoryUseCase {
    getCategory(request: GetCategoryRequest): CategoryResponse
}