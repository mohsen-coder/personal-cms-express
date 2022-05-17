import { ICategoryController } from "../interfaces/ICategoryController";
import { CategoryModel } from "../models/CategoryModel";
import { CategoryDeleteRequest } from "../request/CategoryDeleteRequest"; 
import { CategoryPutRequest } from "../request/CategoryPutRequest"; 
import { CategoryGetRequest } from "../request/CategoryGetRequest"; 
import { CategoryPostRequest } from "../request/CategoryPostRequest"; 
import { CategoryGetResponse } from "../response/CategoryGetResponse"; 
import { ResponseBase } from "../response/ResponseBase";
import { ResponseStatus } from "../response/ResponseStatus";

export class CategoryController implements ICategoryController {

    private model: typeof CategoryModel

    constructor(model: typeof CategoryModel) {
        this.model = model
    }

    async createCategory(request: CategoryPostRequest): Promise<ResponseBase> {
        const response = new ResponseBase()

        const category = await this.model.findCategoryByTitle(request.title)
        if (category) {
            response.messages.push('دسته بندی موجود می باشد!')
            response.status = ResponseStatus.error
            return response
        }

        this.model.create({ ...request })

        response.messages.push('دسته بندی با موفقیت ایجاد شد.')
        response.status = ResponseStatus.success
        return response
    }

    private async fetchSingleCategory(data: string, isTitle: boolean): Promise<CategoryGetResponse> {
        const categoryResponse = new CategoryGetResponse()
        let category = null

        if (isTitle)
            category = await this.model.findCategoryByTitle(data);
        else
            category = await this.model.findCategoryById(data);

        if (!category) {
            categoryResponse.messages.push('دسته بندی موجود نیست!')
            categoryResponse.status = ResponseStatus.error
            return categoryResponse
        }

        categoryResponse.category = category
        categoryResponse.messages.push('دسته بندی با موفقیت دریافت شد.')
        categoryResponse.status = ResponseStatus.success
        return categoryResponse
    }


    async getCategory(request: CategoryGetRequest): Promise<CategoryGetResponse> {

        if (request.id) return this.fetchSingleCategory(request.id, false);

        if (request.title) return this.fetchSingleCategory(request.title, true);

        const categoryResponse = new CategoryGetResponse()
        let categories = null
        if (request.pagination && request.pagination.limit > 0) {
            categories = await this.model.findAll({ offset: request.pagination.offset, limit: request.pagination.limit })
        }else {
            categories = await this.model.findAll()
        }

        categoryResponse.categories = categories
        categoryResponse.messages.push('دسته بندی ها با موفقیت دریافت شد.')
        categoryResponse.status = ResponseStatus.success
        return categoryResponse
    }

    async updateCategory(request: CategoryPutRequest): Promise<ResponseBase> {
        const response = new ResponseBase()

        const category = await this.model.findCategoryById(request.id)
        if(!category){
            response.messages.push('دسته بندی موجود نیست!')
            response.status = ResponseStatus.error
            return response
        }

        await this.model.update({title: request.title}, {where: {id: request.id}})
        
        response.messages.push('دسته بندی با موفقیت ویرایش شد.')
        response.status = ResponseStatus.success
        return response
    }

    async deleteCategory(request: CategoryDeleteRequest): Promise<ResponseBase> {
        const response = new ResponseBase()

        const category = await this.model.findCategoryById(request.categoryId)
        if(!category){
            response.messages.push('دسته بندی موجود نیست!')
            response.status = ResponseStatus.error
            return response
        }

        await this.model.destroy({where: {id: request.categoryId}})

        response.messages.push('دسته بندی با موفقیت حذف شد.')
        response.status = ResponseStatus.success
        return response
    }

}