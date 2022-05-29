import { CategoryDAO } from "./dao/CategoryDAO";

export interface UpdateCategoryPort {
    updateCategory(category: CategoryDAO): Promise<CategoryDAO | null>
}