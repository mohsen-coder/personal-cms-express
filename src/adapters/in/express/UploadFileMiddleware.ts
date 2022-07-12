import {CreateFileUseCase} from "../../../application/ports/in/CreateFileUseCase";
import {Request, Response} from "express";
import {FileModel} from "./model/FileModel";

function formatBytes(bytes: number, decimals = 2) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

export function UploadFileMiddleware(createFileUseCase: CreateFileUseCase) {
    return async (request: Request, response: Response) => {
        const reqFile = request.file!
        const file = new FileModel()
        file.id = reqFile.filename
        file.name = reqFile.originalname
        file.mimeType = reqFile.mimetype
        file.size = formatBytes(reqFile.size)

        const fileResponse = await createFileUseCase.createFile(file.toDomainModel());

        response.status(fileResponse.status === "success" ? 200 : 500);
        response.send(fileResponse)
    }
}