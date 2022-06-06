import {Category} from "../../../domain/Category";

export interface GetCategoryPort {
    getCategoryById(categoryId: string): Promise<Category | null>

    getCategoryByTitle(categoryTitle: string): Promise<Category | null>

    getCategoriesByParentId(parentId: string): Promise<Category[]>

    getCategories(offset: number, limit: number): Promise<Category[]>
}