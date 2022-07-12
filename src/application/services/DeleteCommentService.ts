import {DeleteCommentUseCase} from "../ports/in/DeleteCommentUseCase";
import {DeleteCommentPort} from "../ports/out/DeleteCommentPort";
import {ResponseBase} from "../ports/in/response/ResponseBase";
import {ResponseStatus} from "../ports/in/response/ResponseStatus";
import {Messages} from "../../../values/Messages";

export class DeleteCommentService implements DeleteCommentUseCase {

    constructor(
        private readonly deleteCommentRepo: DeleteCommentPort
    ){}

    async deleteComment(commentId:string): Promise<ResponseBase>{
        const response = new ResponseBase()
        if (await this.deleteCommentRepo.deleteComment(commentId)){
            response.status = ResponseStatus.success
            response.messages.push(Messages.comment.delete.Success.fa)
            return response;
        }

        response.status = ResponseStatus.error
        response.messages.push(Messages.comment.delete.SomethingWentWrongError.fa)
        return response;
    }

}