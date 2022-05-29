import {CategoryDAO} from "./dao/CategoryDAO";

export interface CreateCategoryPort{
    createCategory(category: CategoryDAO): Promise<CategoryDAO>
}