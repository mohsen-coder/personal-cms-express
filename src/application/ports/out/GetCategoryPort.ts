import { CategoryDAO } from "./dao/CategoryDAO";

export interface GetCategoryPort {
    getCategoryById(categoryId: string): Promise<CategoryDAO | null>

    getCategoryByTitle(categoryTitle: string): Promise<CategoryDAO | null>

    getCategoriesByParentId(parentId: string): Promise<CategoryDAO[]>
}