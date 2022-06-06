import {Category} from "../../../domain/Category";

export interface UpdateCategoryPort {
    updateCategory(category: Category): Promise<Category>
}