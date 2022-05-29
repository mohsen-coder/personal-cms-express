export interface DeleteCategoryPort {
    deleteCategory(categoryId: string): Promise<boolean>
}