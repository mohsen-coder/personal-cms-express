import {CategoryResponse} from "./response/CategoryResponse";
import {Category} from "../../../domain/Category";

export interface CreateCategoryUseCase {
    createCategory(category: Category): Promise<CategoryResponse>
}