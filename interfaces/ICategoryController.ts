import { CategoryDeleteRequest } from "../request/CategoryDeleteRequest" 
import { CategoryPutRequest } from "../request/CategoryPutRequest" 
import { CategoryGetRequest } from "../request/CategoryGetRequest" 
import { CategoryPostRequest } from "../request/CategoryPostRequest" 
import { CategoryGetResponse } from "../response/CategoryGetResponse" 
import { ResponseBase } from "../response/ResponseBase";

export interface ICategoryController {

    createCategory(request: CategoryPostRequest): Promise<ResponseBase>

    getCategory(request: CategoryGetRequest): Promise<CategoryGetResponse>

    updateCategory(request: CategoryPutRequest): Promise<ResponseBase>

    deleteCategory(request: CategoryDeleteRequest): Promise<ResponseBase>

}