import {GetFileUseCase} from "../../../application/ports/in/GetFileUseCase";
import {Request, Response} from "express";
import {toString} from "lodash";
import path from "path";
import config from "config";
import {createReadStream} from "fs";

export function GetFileMiddleware(getFileUseCase: GetFileUseCase) {
    return async (request: Request, response: Response) => {
        let data: { id?: string } = {}
        if (request.query.id) data.id = toString(request.query.id);
        const fileResponse = await getFileUseCase.getFile(data);

        if (!data.id || fileResponse.status === "error") {
            response.status(fileResponse.status === "success" ? 200 : 400).send(fileResponse)
            return;
        }

        const rootPath = config.get<string>('rootPath')
        const file = createReadStream(path.join(rootPath, 'public/files', fileResponse.file!.id!));
        response.setHeader('Content-Type', fileResponse.file?.mimeType!)
        response.setHeader('Content-Disposition', `inline; filename="${fileResponse.file?.name}"`)
        file.pipe(response)
    }
}