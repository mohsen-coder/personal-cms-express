import {UpdateCommentUseCase} from "../ports/in/UpdateCommentUseCase";
import {GetCommentPort} from "../ports/out/GetCommentPort";
import {UpdateCommentPort} from "../ports/out/UpdateCommentPort";
import {Comment} from "../../domain/Comment";
import {CommentResponse} from "../ports/in/response/CommentResponse";
import {ResponseStatus} from "../ports/in/response/ResponseStatus";
import {Messages} from "../../../values/Messages";
import {CommentModel} from "../../adapters/in/express/model/CommentModel";

export class UpdateCommentService implements UpdateCommentUseCase {

    constructor(
        private readonly getCommentRepo: GetCommentPort,
        private readonly updateCommentRepo: UpdateCommentPort
    ) {
    }

    async updateComment(comment: Comment): Promise<CommentResponse> {
        const response = new CommentResponse();
        let commentDAO = await this.getCommentRepo.getCommentById(comment.id!);
        if (!commentDAO.comment) {
            response.status = ResponseStatus.error;
            response.messages.push(Messages.comment.get.NotFoundError.fa);
            return response;
        }

        commentDAO = await this.updateCommentRepo.updateComment(comment);
        response.comment = new CommentModel();
        response.comment.fromDomainModel(commentDAO.comment);
        response.status = ResponseStatus.success;
        response.messages.push(Messages.comment.update.Success.fa);
        return response;
    }

}