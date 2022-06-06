import {CreateCategoryUseCase} from "../../../application/ports/in/CreateCategoryUseCase";
import {Request, Response} from "express";
import {CategoryModel} from "./model/CategoryModel";

export function CreateCategoryMiddleware(createCategoryUseCase: CreateCategoryUseCase) {

    return async (request: Request, response: Response) => {
        const categoryModel = new CategoryModel(request.body);
        const categoryResponse = await createCategoryUseCase.createCategory(categoryModel.toDomainModel());
        response.status(categoryResponse.status === "success" ? 200 : 400)
        response.send(categoryResponse)
    }
}