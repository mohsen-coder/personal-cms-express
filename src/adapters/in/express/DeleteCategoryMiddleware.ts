import {DeleteCategoryUseCase} from "../../../application/ports/in/DeleteCategoryUseCase";
import {Request, Response} from "express";

export function DeleteCategoryMiddleware(deleteCategoryUseCase: DeleteCategoryUseCase) {
    return async (request: Request, response: Response) => {
        const responseBase = await deleteCategoryUseCase.deleteCategory(request.params.id);
        response.status(responseBase.status === "success" ? 200 : 400)
        response.send(responseBase);
    }
}