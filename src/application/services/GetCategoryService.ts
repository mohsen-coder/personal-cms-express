import {GetCategoryUseCase} from "../ports/in/GetCategoryUseCase";
import {GetCategoryPort} from "../ports/out/GetCategoryPort";
import {CategoryResponse} from "../ports/in/response/CategoryResponse";
import {ResponseStatus} from "../ports/in/response/ResponseStatus";
import {Messages} from "../../../values/Messages";
import {CategoryModel} from "../../adapters/in/express/model/CategoryModel";
import {CategoryDAO} from "../ports/out/dao/CategoryDAO";

export class GetCategoryService implements GetCategoryUseCase {

    constructor(
        private readonly getCategoryRepo: GetCategoryPort
    ) {
    }

    async getCategory(
        request: { id?: string, title?: string, parentId?: string, pagination?: { offset: number, limit: number } }
    ): Promise<CategoryResponse> {
        const response = new CategoryResponse();
        let categoryDAO: CategoryDAO;
        if (request.id || request.title) {
            if (request.id) categoryDAO = await this.getCategoryRepo.getCategoryById(request.id);
            else categoryDAO = await this.getCategoryRepo.getCategoryByTitle(request.title!);

            if (!categoryDAO.category) {
                response.status = ResponseStatus.error;
                response.messages.push(Messages.category.get.NotFoundError.fa);
                return response;
            }

            response.category = new CategoryModel();
            response.category.fromDomainModel(categoryDAO.category);
            response.status = ResponseStatus.success;
            response.count = 1;
            response.messages.push(Messages.category.get.Success.fa);
            return response;
        }

        if (request.parentId || request.pagination) {
            if (request.parentId && request.pagination)
                categoryDAO = await this.getCategoryRepo.getCategoriesByParentId(request.parentId, request.pagination.offset, request.pagination.limit);
            else
                categoryDAO = await this.getCategoryRepo.getCategories(request.pagination!.offset, request.pagination!.limit);

            response.categories = categoryDAO.categories.map(category => {
                const categoryModel = new CategoryModel();
                categoryModel.fromDomainModel(category);
                return categoryModel;
            });
            response.count = categoryDAO.count;
            response.status = ResponseStatus.success;
            response.messages.push(Messages.category.get.Success.fa);
            return response;
        }

        response.status = ResponseStatus.error;
        response.messages.push(Messages.category.get.ParameterError.fa);
        return response;
    }

}