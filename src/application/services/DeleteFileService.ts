import {DeleteFileUseCase} from "../ports/in/DeleteFileUseCase";
import {DeleteFilePort} from "../ports/out/DeleteFilePort";
import {ResponseBase} from "../ports/in/response/ResponseBase";
import {ResponseStatus} from "../ports/in/response/ResponseStatus";
import {Messages} from "../../../values/Messages";

export class DeleteFileService implements DeleteFileUseCase {

    constructor(
        private readonly deleteFileRepo: DeleteFilePort
    ) {}

    async deleteFile(fileId: string): Promise<ResponseBase> {
        const responseBase = new ResponseBase()
        
        if (await this.deleteFileRepo.deleteFile(fileId)){
            responseBase.status = ResponseStatus.success
            responseBase.messages.push(Messages.file.delete.Success.fa)
            return responseBase;
        }

        responseBase.status = ResponseStatus.error
        responseBase.messages.push(Messages.file.delete.SomethingWentWrongError.fa)
        return responseBase;
    }
}