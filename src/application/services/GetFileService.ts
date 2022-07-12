import {GetFileUseCase} from "../ports/in/GetFileUseCase";
import {GetFilePort} from "../ports/out/GetFilePort";
import {FileResponse} from "../ports/in/response/FileResponse";
import {ResponseStatus} from "../ports/in/response/ResponseStatus";
import {Messages} from "../../../values/Messages";
import {FileModel} from "../../adapters/in/express/model/FileModel";
import {FileDAO} from "../ports/out/dao/FileDAO";

export class GetFileService implements GetFileUseCase {

    constructor(
        private readonly getFileRepo: GetFilePort
    ) {
    }

    async getFile(request: { id?: string }): Promise<FileResponse> {
        const fileResponse = new FileResponse();
        let fileDAO: FileDAO;

        if (request.id) {
            fileDAO = await this.getFileRepo.getFileById(request.id);

            if (!fileDAO.file) {
                fileResponse.status = ResponseStatus.error;
                fileResponse.messages.push(Messages.file.get.NotFoundError.fa);
                return fileResponse;
            }

            fileResponse.file = new FileModel();
            fileResponse.file.fromDomainModel(fileDAO.file);
            fileResponse.count = 1;
            fileResponse.status = ResponseStatus.success;
            fileResponse.messages.push(Messages.file.get.Success.fa);
            return fileResponse;
        }


        fileResponse.status = ResponseStatus.error;
        fileResponse.messages.push(Messages.file.get.ParameterError.fa)
        return fileResponse;
    }
}