import {CreateFileUseCase} from "../ports/in/CreateFileUseCase";
import {CreateFilePort} from "../ports/out/CreateFilePort";
import {File} from "../../domain/File";
import {FileResponse} from "../ports/in/response/FileResponse";
import {ResponseStatus} from "../ports/in/response/ResponseStatus";
import {Messages} from "../../../values/Messages";
import {FileModel} from "../../adapters/in/express/model/FileModel";

export class CreateFileService implements CreateFileUseCase {

    constructor(
        private readonly createFileRepo: CreateFilePort
    ) {
    }

    async createFile(fileArg: File): Promise<FileResponse> {
        const fileDAO = await this.createFileRepo.createFile(fileArg);
        const fileResponse = new FileResponse();
        fileResponse.file = new FileModel();
        fileResponse.file.fromDomainModel(fileDAO.file);
        fileResponse.status = ResponseStatus.success;
        fileResponse.messages.push(Messages.file.create.Success.fa);
        return fileResponse;
    }
}