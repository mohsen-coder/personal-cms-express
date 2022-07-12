import {Category} from "../../../domain/Category";
import {CategoryDAO} from "./dao/CategoryDAO";

export interface CreateCategoryPort{
    createCategory(category: Category): Promise<CategoryDAO>
}