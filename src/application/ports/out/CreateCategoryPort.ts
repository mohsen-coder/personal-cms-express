import {CategoryDAO} from "./dao/CategoryDAO";

export interface CreateCategoryPort{
    createCategory(category: CategoryDAO): CategoryDAO
}