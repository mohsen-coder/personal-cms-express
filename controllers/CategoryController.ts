import {CategoryModel} from "../models/CategoryModel";
import {CategoryDeleteRequest} from "../request/CategoryDeleteRequest";
import {CategoryPutRequest} from "../request/CategoryPutRequest";
import {CategoryGetRequest} from "../request/CategoryGetRequest";
import {CategoryPostRequest} from "../request/CategoryPostRequest";
import {ResponseBase} from "../response/ResponseBase";
import {ResponseStatus} from "../response/ResponseStatus";
import {values} from "../values/vlaues";

export class CategoryController {

    private model: typeof CategoryModel

    constructor(model: typeof CategoryModel) {
        this.model = model
    }

    async createCategory(request: CategoryPostRequest): Promise<ResponseBase> {
        const response = new ResponseBase()

        const category = await this.model.findCategoryByTitle(request.title)
        if (category) {
            response.messages.push(values.category.singleExistErr)
            response.status = ResponseStatus.error
            return response
        }

        await this.model.create({...request})

        response.messages.push(values.category.singleCreateSuccess)
        response.status = ResponseStatus.success
        return response
    }

    private async fetchSingleCategory(data: string, isTitle: boolean): Promise<ResponseBase> {
        const responseBase = new ResponseBase()
        let category = null

        if (isTitle)
            category = await this.model.findCategoryByTitle(data);
        else
            category = await this.model.findCategoryById(data);

        if (!category) {
            responseBase.messages.push(values.category.singleNotExistErr)
            responseBase.status = ResponseStatus.error
            return responseBase
        }

        responseBase.data = category
        responseBase.messages.push(values.category.singleReadSuccess)
        responseBase.status = ResponseStatus.success
        return responseBase
    }


    async getCategory(request: CategoryGetRequest): Promise<ResponseBase> {

        if (request.id) return this.fetchSingleCategory(request.id, false);

        if (request.title) return this.fetchSingleCategory(request.title, true);

        const responseBase = new ResponseBase()
        let categories = null
        if (request.pagination && request.pagination.limit > 0) {
            categories = await this.model.findAll({offset: request.pagination.offset, limit: request.pagination.limit})
        } else {
            categories = await this.model.findAll()
        }

        responseBase.data = categories
        responseBase.messages.push(values.category.multiReadSuccess)
        responseBase.status = ResponseStatus.success
        return responseBase
    }

    async updateCategory(request: CategoryPutRequest): Promise<ResponseBase> {
        const response = new ResponseBase()

        const category = await this.model.findCategoryById(request.id)
        if (!category) {
            response.messages.push(values.category.singleNotExistErr)
            response.status = ResponseStatus.error
            return response
        }

        await this.model.update({title: request.title}, {where: {id: request.id}})

        response.messages.push(values.category.singleUpdateSuccess)
        response.status = ResponseStatus.success
        return response
    }

    async deleteCategory(request: CategoryDeleteRequest): Promise<ResponseBase> {
        const response = new ResponseBase()

        const category = await this.model.findCategoryById(request.categoryId)
        if (!category) {
            response.messages.push(values.category.singleNotExistErr)
            response.status = ResponseStatus.error
            return response
        }

        await this.model.destroy({where: {id: request.categoryId}})

        response.messages.push(values.category.singleDeleteSuccess)
        response.status = ResponseStatus.success
        return response
    }

}