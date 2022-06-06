import {ResponseBase} from "./response/ResponseBase";

export interface DeleteCategoryUseCase {
    deleteCategory(categoryId: string): Promise<ResponseBase>
}