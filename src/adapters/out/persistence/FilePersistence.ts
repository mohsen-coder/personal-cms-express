import {CreateFilePort} from "../../../application/ports/out/CreateFilePort";
import {FileModel} from "./models/FileModel";
import {FileDAO} from "../../../application/ports/out/dao/FileDAO";
import {GetFilePort} from "../../../application/ports/out/GetFilePort";
import {DeleteFilePort} from "../../../application/ports/out/DeleteFilePort";

export class FilePersistence implements CreateFilePort, GetFilePort, DeleteFilePort {

    private readonly fileModel: typeof FileModel

    constructor(fileModel: typeof FileModel) {
        this.fileModel = fileModel;
    }

    async createFile(fileArg: FileDAO): Promise<FileDAO> {
        const file = new this.fileModel()
        file.size = fileArg.size
        file.title = fileArg.title
        file.meme = fileArg.meme
        file.fileType = fileArg.fileType

        const savedFile = await file.save()

        return new FileDAO(savedFile)
    }

    async getFileById(fileId: string): Promise<FileDAO | null> {
        const file = await this.fileModel.findOne({where: {id: fileId}})
        return file ? new FileDAO(file) : null;
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