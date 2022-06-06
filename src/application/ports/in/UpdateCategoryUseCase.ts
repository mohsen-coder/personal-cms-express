import {CategoryResponse} from "./response/CategoryResponse";
import {Category} from "../../../domain/Category";

export interface UpdateCategoryUseCase {
    updateCategory(category: Category): Promise<CategoryResponse>
}