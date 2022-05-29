import { CreateCommentPort } from "../../../application/ports/out/CreateCommentPort";
import { CommentDAO } from "../../../application/ports/out/dao/CommentDAO";
import { DeleteCommentPort } from "../../../application/ports/out/DeleteCommentPort";
import { GetCommentPort } from "../../../application/ports/out/GetCommentPort";
import { UpdateCommentPort } from "../../../application/ports/out/UpdateCommentPort";
import log from "../../../utils/logger";
import { CommentModel } from "./models/CommentModel";
import { PostModel } from "./models/PostModel";

export class CommentPersistence implements CreateCommentPort, GetCommentPort, UpdateCommentPort, DeleteCommentPort {

    private readonly commentModel: typeof CommentModel
    private readonly postModel: typeof PostModel

    constructor(commentModel: typeof CommentModel, postModel: typeof PostModel) {
        this.commentModel = commentModel;
        this.postModel = postModel;
    }

    async createComment(commentArg: CommentDAO): Promise<CommentDAO> {
        const comment = new this.commentModel()
        comment.email = commentArg.email
        comment.name = commentArg.name
        comment.content = commentArg.content

        const savedComment = await comment.save()

        return new CommentDAO(savedComment)
    }

    async getCommentById(commentId: string): Promise<CommentDAO | null> {
        const loadedCommetn = await this.commentModel.findOne({ where: { id: commentId } })
        return loadedCommetn ? new CommentDAO(loadedCommetn) : null;
    }

    async getCommentsByPostId(postId: string): Promise<CommentDAO[]> {

        const loadedPost = await this.postModel.findOne({ where: { id: postId }, relations: { comments: true } })

        if (loadedPost && loadedPost.comments) {
            log.info(loadedPost.comments, 'post comments')
            return loadedPost.comments.map(comment => new CommentDAO(comment));
        }

        return []
    }

    async getCommentsByStatus(commentStatus: string): Promise<CommentDAO[]> {
        const comments = await this.commentModel.find({ where: { status: commentStatus } })
        return comments.map(comment => new CommentDAO(comment));
    }

    async updateComment(commentArg: CommentDAO): Promise<CommentDAO | null> {

        const comment = await this.commentModel.findOne({ where: { id: commentArg.id! } })

        if (comment) {
            comment.name = commentArg.name
            comment.email = commentArg.email
            comment.content = commentArg.content
            comment.status = commentArg.status

            const updatedComment = await this.commentModel.save(comment)

            return new CommentDAO(updatedComment);
        }

        return null;
    }

    async deleteComment(commentId: string): Promise<boolean> {

        const comment = await this.commentModel.findOne({ where: { id: commentId } });

        if (comment) {
            await this.commentModel.remove(comment)
            return true;
        }

        return false;
    }
}