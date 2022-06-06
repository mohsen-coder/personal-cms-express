import {DeleteCategoryUseCase} from "../ports/in/DeleteCategoryUseCase";
import {DeleteCategoryPort} from "../ports/out/DeleteCategoryPort";
import {ResponseBase} from "../ports/in/response/ResponseBase";
import {ResponseStatus} from "../ports/in/response/ResponseStatus";
import {Messages} from "../../../values/Messages";

export class DeleteCategoryService implements DeleteCategoryUseCase {

    constructor(
        private readonly deleteCategoryRepo: DeleteCategoryPort
    ) {
    }

    async deleteCategory(categoryId: string): Promise<ResponseBase> {
        const response = new ResponseBase()
        const isCategoryDeleted = await this.deleteCategoryRepo.deleteCategory(categoryId)
        if (!isCategoryDeleted) {
            response.status = ResponseStatus.error
            response.messages.push(Messages.category.delete.SomethingWentWrongError.fa)
            return response;
        }

        response.status = ResponseStatus.success
        response.messages.push(Messages.category.delete.Success.fa)
        return response;
    }
}