import {CreateFilePort} from "../../../application/ports/out/CreateFilePort";
import {FileModel} from "./models/FileModel";
import {GetFilePort} from "../../../application/ports/out/GetFilePort";
import {DeleteFilePort} from "../../../application/ports/out/DeleteFilePort";
import {File} from "../../../domain/File";

export class FilePersistence implements CreateFilePort, GetFilePort, DeleteFilePort {

    constructor(
        private readonly fileModel: typeof FileModel
    ) {
    }

    async createFile(fileArg: File): Promise<File> {
        const file = new this.fileModel()
        file.size = fileArg.size!
        file.title = fileArg.title!
        file.meme = fileArg.meme!
        file.fileType = fileArg.fileType!

        const savedFile = await file.save()

        return savedFile.toDomainModel()
    }

    async getFileById(fileId: string): Promise<File | null> {
        const file = await this.fileModel.findOne({where: {id: fileId}})
        return file ? file.toDomainModel() : null;
    }

    async deleteFile(fileId: string): Promise<boolean> {
        const file = await this.fileModel.findOne({where: {id: fileId}})
        if (file){
            await this.fileModel.remove(file)
            return true;
        }
        return false;
    }

}