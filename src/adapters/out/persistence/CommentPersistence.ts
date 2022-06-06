import {CreateCommentPort} from "../../../application/ports/out/CreateCommentPort";
import {DeleteCommentPort} from "../../../application/ports/out/DeleteCommentPort";
import {GetCommentPort} from "../../../application/ports/out/GetCommentPort";
import {UpdateCommentPort} from "../../../application/ports/out/UpdateCommentPort";
import log from "../../../utils/logger";
import {CommentModel} from "./models/CommentModel";
import {PostModel} from "./models/PostModel";
import {Comment} from "../../../domain/Comment";

export class CommentPersistence implements CreateCommentPort, GetCommentPort, UpdateCommentPort, DeleteCommentPort {

    constructor(
        private readonly commentModel: typeof CommentModel,
        private readonly postModel: typeof PostModel
    ) {
    }

    async createComment(commentArg: Comment): Promise<Comment> {
        const comment = new this.commentModel()
        comment.email = commentArg.email!
        comment.name = commentArg.name!
        comment.content = commentArg.content!

        const savedComment = await comment.save()

        return savedComment.toDomainModel()
    }

    async getCommentById(commentId: string): Promise<Comment | null> {
        const loadedComment = await this.commentModel.findOne({where: {id: commentId}})
        return loadedComment ? loadedComment.toDomainModel() : null;
    }

    async getCommentsByPostId(postId: string): Promise<Comment[]> {

        const loadedPost = await this.postModel.findOne({where: {id: postId}, relations: {comments: true}})

        if (loadedPost && loadedPost.comments) {
            log.info(loadedPost.comments, 'post comments')
            return loadedPost.comments.map(comment => comment.toDomainModel());
        }

        return []
    }

    async getCommentsByStatus(commentStatus: string): Promise<Comment[]> {
        const comments = await this.commentModel.find({where: {status: commentStatus}})
        return comments.map(comment => comment.toDomainModel());
    }

    async updateComment(commentArg: Comment): Promise<Comment> {

        const comment = await this.commentModel.findOne({where: {id: commentArg.id!}})
        comment!.name = commentArg.name!
        comment!.email = commentArg.email!
        comment!.content = commentArg.content!
        comment!.status = commentArg.status!

        const updatedComment = await this.commentModel.save(comment!)

        return updatedComment.toDomainModel();
    }

    async deleteComment(commentId: string): Promise<boolean> {

        const comment = await this.commentModel.findOne({where: {id: commentId}});

        if (comment) {
            await this.commentModel.remove(comment)
            return true;
        }

        return false;
    }
}