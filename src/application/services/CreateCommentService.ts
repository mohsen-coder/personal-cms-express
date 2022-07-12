import {CreateCommentUseCase} from "../ports/in/CreateCommentUseCase";
import {CreateCommentPort} from "../ports/out/CreateCommentPort";
import {Comment} from "../../domain/Comment";
import {CommentResponse} from "../ports/in/response/CommentResponse";
import {GetCommentPort} from "../ports/out/GetCommentPort";
import {CommentModel} from "../../adapters/in/express/model/CommentModel";
import {ResponseStatus} from "../ports/in/response/ResponseStatus";
import {Messages} from "../../../values/Messages";

export class CreateCommentService implements CreateCommentUseCase {

    constructor(
        private readonly getCommentRepo: GetCommentPort,
        private readonly createCommentRepo: CreateCommentPort
    ) {
    }

    async createComment(comment: Comment): Promise<CommentResponse> {
        const response = new CommentResponse();
        const commentDAO = await this.createCommentRepo.createComment(comment);
        response.comment = new CommentModel();
        response.comment.fromDomainModel(commentDAO.comment);
        response.status = ResponseStatus.success;
        response.messages.push(Messages.comment.create.Success.fa);
        return response;
    }

}