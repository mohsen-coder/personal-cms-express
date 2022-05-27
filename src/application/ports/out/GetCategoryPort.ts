import {CategoryDAO} from "./dao/CategoryDAO";

export interface GetCategoryPort {
    getCategoryById(categoryId: string): CategoryDAO

    getCategoryByTitle(categoryTitle: string): CategoryDAO

    getCategoriesByParentId(parentId: string): CategoryDAO[]
}