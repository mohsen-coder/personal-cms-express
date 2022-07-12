import {Category} from "../../../domain/Category";
import {CategoryDAO} from "./dao/CategoryDAO";

export interface GetCategoryPort {
    getCategoryById(categoryId: string): Promise<CategoryDAO>

    getCategoryByTitle(categoryTitle: string): Promise<CategoryDAO>

    getCategoriesByParentId(parentId: string, offset: number, limit: number): Promise<CategoryDAO>

    getCategories(offset: number, limit: number): Promise<CategoryDAO>
}