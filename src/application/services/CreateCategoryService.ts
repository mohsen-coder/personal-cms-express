import {CreateCategoryUseCase} from "../ports/in/CreateCategoryUseCase";
import {CreateCategoryPort} from "../ports/out/CreateCategoryPort";
import {GetCategoryPort} from "../ports/out/GetCategoryPort";
import {CategoryResponse} from "../ports/in/response/CategoryResponse";
import {ResponseStatus} from "../ports/in/response/ResponseStatus";
import {Messages} from "../../../values/Messages";
import {Category} from "../../domain/Category";

export class CreateCategoryService implements CreateCategoryUseCase {

    constructor(
        private readonly createCategoryRepo: CreateCategoryPort,
        private readonly getCategoryRepo: GetCategoryPort
    ) {
    }

    async createCategory(category: Category): Promise<CategoryResponse> {
        const categoryExist = await this.getCategoryRepo.getCategoryByTitle(category.title)

        const response = new CategoryResponse()
        if (categoryExist) {
            response.status = ResponseStatus.error
            response.messages.push(Messages.category.get.ExistError.fa)
            return response;
        }

        response.category = await this.createCategoryRepo.createCategory(category)
        response.status = ResponseStatus.success
        response.messages.push(Messages.category.create.Success.fa)
        return response;
    }

}