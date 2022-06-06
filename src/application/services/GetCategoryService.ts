import {GetCategoryUseCase} from "../ports/in/GetCategoryUseCase";
import {GetCategoryPort} from "../ports/out/GetCategoryPort";
import {CategoryResponse} from "../ports/in/response/CategoryResponse";
import {ResponseStatus} from "../ports/in/response/ResponseStatus";
import {Messages} from "../../../values/Messages";

export class GetCategoryService implements GetCategoryUseCase {

    constructor(
        private readonly getCategoryRepo: GetCategoryPort
    ) {
    }

    async getCategory(
        request: { id?: string, title?: string, parentId?: string, pagination?: { offset: number, limit: number } }
    ): Promise<CategoryResponse> {
        const response = new CategoryResponse()

        if (request.id || request.title) {
            let category;
            if (request.id) category = await this.getCategoryRepo.getCategoryById(request.id);
            else category = await this.getCategoryRepo.getCategoryByTitle(request.title!);

            if (!category) {
                response.status = ResponseStatus.error;
                response.messages.push(Messages.category.get.NotFoundError.fa)
                return response;
            }

            response.category = category;
            response.status = ResponseStatus.success;
            response.messages.push(Messages.category.get.Success.fa);
            return response;
        }

        if (request.parentId || request.pagination) {
            if (request.parentId)
                response.categories = await this.getCategoryRepo.getCategoriesByParentId(request.parentId);
            else
                response.categories = await this.getCategoryRepo.getCategories(request.pagination!.offset, request.pagination!.limit);

            response.status = ResponseStatus.success;
            response.messages.push(Messages.category.get.Success.fa);
            return response;
        }

        response.status = ResponseStatus.error;
        response.messages.push(Messages.category.get.ParameterError.fa);
        return response;
    }

}