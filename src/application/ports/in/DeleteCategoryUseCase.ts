import {DeleteCategoryRequest} from "./request/DeleteCategoryRequest";
import {ResponseBase} from "./response/ResponseBase";

export interface DeleteCategoryUseCase {
    deleteCategory(request: DeleteCategoryRequest): ResponseBase
}