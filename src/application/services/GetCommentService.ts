import {GetCommentUseCase} from "../ports/in/GetCommentUseCase";
import {GetCommentPort} from "../ports/out/GetCommentPort";
import {CommentResponse} from "../ports/in/response/CommentResponse";
import {ResponseStatus} from "../ports/in/response/ResponseStatus";
import {Messages} from "../../../values/Messages";
import {CommentModel} from "../../adapters/in/express/model/CommentModel";
import {isNumber, isString} from "lodash";
import {CommentDAO} from "../ports/out/dao/CommentDAO";

export class GetCommentService implements GetCommentUseCase {

    constructor(
        private readonly getCommentRepo: GetCommentPort
    ) {
    }

    async getComment(request: { id?: string, postId?: string, status?: string, offset?: number, limit?: number }): Promise<CommentResponse> {
        let commentDAO: CommentDAO;
        const response = new CommentResponse();
        if (request.id) {
            commentDAO = await this.getCommentRepo.getCommentById(request.id);
            if (!commentDAO.comment) {
                response.status = ResponseStatus.error;
                response.messages.push(Messages.comment.get.NotFoundError.fa);
                return response;
            }
            response.comment = new CommentModel();
            response.comment.fromDomainModel(commentDAO.comment);
            response.status = ResponseStatus.success;
            response.count = 1;
            response.messages.push(Messages.comment.get.Success.fa);
            return response;
        }

        const getCommentsByStatusCondition = isString(request.status) && isNumber(request.offset) && isNumber(request.limit) && request.limit > 0;
        if (request.postId || getCommentsByStatusCondition) {
            if (getCommentsByStatusCondition && request.postId) commentDAO = await this.getCommentRepo.getCommentsByStatusAndPostId(request.postId, request.status!, request.offset!, request.limit!);
            else commentDAO = await this.getCommentRepo.getCommentsByStatus(request.status!, request.offset!, request.limit!);

            response.comments = commentDAO.comments.map(comment => {
                const commentModel = new CommentModel()
                commentModel.fromDomainModel(comment)
                return commentModel;
            })
            response.count = commentDAO.count;
            response.status = ResponseStatus.success
            response.messages.push(Messages.comment.get.Success.fa)
            return response;
        }

        response.status = ResponseStatus.error
        response.messages.push(Messages.comment.get.ParameterError.fa)
        return response;
    }

}