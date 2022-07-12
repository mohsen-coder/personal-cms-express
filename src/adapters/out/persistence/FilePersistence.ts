import {CreateFilePort} from "../../../application/ports/out/CreateFilePort";
import {FileModel} from "./models/FileModel";
import {GetFilePort} from "../../../application/ports/out/GetFilePort";
import {DeleteFilePort} from "../../../application/ports/out/DeleteFilePort";
import {File} from "../../../domain/File";
import {FileDAO} from "../../../application/ports/out/dao/FileDAO";
import log from "../../../utils/logger";

export class FilePersistence implements CreateFilePort, GetFilePort, DeleteFilePort {

    constructor(
        private readonly fileModel: typeof FileModel
    ) {
    }

    async createFile(fileArg: File): Promise<FileDAO> {
        const file = new this.fileModel()
        file.id = fileArg.id!
        file.size = fileArg.size!
        file.name = fileArg.name!
        file.mimeType = fileArg.mimeType!

        const savedFile = await file.save()
        const fileDAO = new FileDAO();
        fileDAO.file = savedFile.toDomainModel();
        return fileDAO;
    }

    async getFileById(fileId: string): Promise<FileDAO> {
        const file = await this.fileModel.createQueryBuilder("file")
            .where("file.id = :fileId", {fileId})
            .getOne();
        const fileDAO = new FileDAO();
        if (file) fileDAO.file = file.toDomainModel();
        return fileDAO;
    }

    async deleteFile(fileId: string): Promise<boolean> {
        try{
            await this.fileModel.createQueryBuilder()
                .delete()
                .where("id = :fileId", {fileId})
                .execute();
            return true;
        }catch (err){
            log.error(err, "DeleteFile");
            return false;
        }
    }

}