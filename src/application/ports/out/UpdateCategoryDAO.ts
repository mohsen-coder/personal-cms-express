import {CategoryDAO} from "./dao/CategoryDAO";

export interface UpdateCategoryDAO {
    updateCategory(category: CategoryDAO): CategoryDAO
}