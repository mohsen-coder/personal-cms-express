import {Category} from "../../../domain/Category";

export interface CreateCategoryPort{
    createCategory(category: Category): Promise<Category>
}