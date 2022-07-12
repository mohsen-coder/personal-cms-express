import {Category} from "../../../domain/Category";
import {CategoryDAO} from "./dao/CategoryDAO";

export interface UpdateCategoryPort {
    updateCategory(category: Category): Promise<CategoryDAO>
}