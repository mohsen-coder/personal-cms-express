import {DeleteFileUseCase} from "../../../application/ports/in/DeleteFileUseCase";
import {Request, Response} from "express";
import config from "config";
import {unlinkSync} from "fs";
import path from "path";

export function DeleteFileMiddleware(deleteFileUseCase: DeleteFileUseCase) {

    const rootPath = config.get<string>('rootPath')

    return async (request: Request, response: Response) => {
        const responseBase = await deleteFileUseCase.deleteFile(request.params.id);
        response.status(responseBase.status === "success" ? 200 : 400).send(responseBase)
        try{
            unlinkSync(path.join(rootPath, 'public/files', request.params.id))
            response.status(200).send(responseBase)
        }catch (err) {
            response.status(500).send(responseBase)
        }
    }
}