import {UpdateCategoryUseCase} from "../../../application/ports/in/UpdateCategoryUseCase";
import {Request, Response} from "express";
import {CategoryModel} from "./model/CategoryModel";

export function UpdateCategoryMiddleware(updateCategoryUseCase: UpdateCategoryUseCase) {
    return async (request: Request, response: Response) => {
        const categoryModel = new CategoryModel(request.body);
        const categoryResponse = await updateCategoryUseCase.updateCategory(categoryModel.toDomainModel());
        response.status(categoryResponse.status === "success" ? 200 : 400)
        response.send(categoryResponse)
    }
}