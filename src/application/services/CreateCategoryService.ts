import {CreateCategoryUseCase} from "../ports/in/CreateCategoryUseCase";
import {CreateCategoryPort} from "../ports/out/CreateCategoryPort";
import {GetCategoryPort} from "../ports/out/GetCategoryPort";
import {CategoryResponse} from "../ports/in/response/CategoryResponse";
import {ResponseStatus} from "../ports/in/response/ResponseStatus";
import {Messages} from "../../../values/Messages";
import {Category} from "../../domain/Category";
import {CategoryModel} from "../../adapters/in/express/model/CategoryModel";
import {CategoryDAO} from "../ports/out/dao/CategoryDAO";

export class CreateCategoryService implements CreateCategoryUseCase {

    constructor(
        private readonly createCategoryRepo: CreateCategoryPort,
        private readonly getCategoryRepo: GetCategoryPort
    ) {
    }

    async createCategory(category: Category): Promise<CategoryResponse> {
        let categoryDAO: CategoryDAO;
        categoryDAO = await this.getCategoryRepo.getCategoryByTitle(category.title);

        const response = new CategoryResponse();
        if (categoryDAO.category) {
            response.status = ResponseStatus.error;
            response.messages.push(Messages.category.get.ExistError.fa);
            return response;
        }

        categoryDAO = await this.createCategoryRepo.createCategory(category);
        response.category = new CategoryModel();
        response.category.fromDomainModel(categoryDAO.category);
        response.status = ResponseStatus.success;
        response.messages.push(Messages.category.create.Success.fa);
        return response;
    }

}