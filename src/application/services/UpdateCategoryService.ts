import {UpdateCategoryUseCase} from "../ports/in/UpdateCategoryUseCase";
import {UpdateCategoryPort} from "../ports/out/UpdateCategoryPort";
import {GetCategoryPort} from "../ports/out/GetCategoryPort";
import {CategoryResponse} from "../ports/in/response/CategoryResponse";
import {Category} from "../../domain/Category";
import {ResponseStatus} from "../ports/in/response/ResponseStatus";
import {Messages} from "../../../values/Messages";

export class UpdateCategoryService implements UpdateCategoryUseCase {

    constructor(
        private readonly updateCategoryRepo: UpdateCategoryPort,
        private readonly getCategoryRepo: GetCategoryPort
    ) {
    }

    async updateCategory(category: Category): Promise<CategoryResponse> {
        const categoryExist = await this.getCategoryRepo.getCategoryById(category.id!)

        const response = new CategoryResponse();
        if (!categoryExist) {
            response.status = ResponseStatus.error;
            response.messages.push(Messages.category.get.NotFoundError.fa);
            return response;
        }

        response.category = await this.updateCategoryRepo.updateCategory(category)
        response.status = ResponseStatus.success;
        response.messages.push(Messages.category.update.Success.fa);
        return response;
    }

}