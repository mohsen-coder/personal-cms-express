import {DeletePostUseCase} from "../ports/in/DeletePostUseCase";
import {DeletePostPort} from "../ports/out/DeletePostPort";
import {ResponseBase} from "../ports/in/response/ResponseBase";
import {ResponseStatus} from "../ports/in/response/ResponseStatus";
import {Messages} from "../../../values/Messages";

export class DeletePostService implements DeletePostUseCase {

    constructor(
        private readonly deletePostRepo: DeletePostPort
    ) {
    }

    async deletePost(postId: string): Promise<ResponseBase> {
        const response = new ResponseBase()

        const isPostDeleted = await this.deletePostRepo.deletePost(postId)
        if (!isPostDeleted) {
            response.status = ResponseStatus.error
            response.messages.push(Messages.post.delete.SomethingWentWrongError.fa)
            return response
        }

        response.status = ResponseStatus.success
        response.messages.push(Messages.post.delete.Success.fa)
        return response
    }


}