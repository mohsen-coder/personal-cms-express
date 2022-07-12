import {CreateCommentPort} from "../../../application/ports/out/CreateCommentPort";
import {DeleteCommentPort} from "../../../application/ports/out/DeleteCommentPort";
import {GetCommentPort} from "../../../application/ports/out/GetCommentPort";
import {UpdateCommentPort} from "../../../application/ports/out/UpdateCommentPort";
import {CommentModel} from "./models/CommentModel";
import {PostModel} from "./models/PostModel";
import {Comment} from "../../../domain/Comment";
import {CommentDAO} from "../../../application/ports/out/dao/CommentDAO";
import log from "../../../utils/logger";

export class CommentPersistence implements CreateCommentPort, GetCommentPort, UpdateCommentPort, DeleteCommentPort {

    constructor(
        private readonly commentModel: typeof CommentModel,
        private readonly postModel: typeof PostModel
    ) {
    }

    async createComment(commentArg: Comment): Promise<CommentDAO> {
        const comment = new this.commentModel()
        comment.email = commentArg.email
        comment.name = commentArg.name
        comment.content = commentArg.content
        comment.status = commentArg.status
        const post = await this.postModel.createQueryBuilder("post")
            .where("post.id = :id", {id: commentArg.post.id})
            .getOne();
        comment.post = post!;

        if (commentArg.parent) {
            const parentComment = await this.commentModel.createQueryBuilder("comment")
                .where("comment.id = :commentId", {commentId: commentArg.parent.id})
                .getOne();
            if (commentArg.status === "accept" && parentComment!.status !== "accept") {
                parentComment!.status = "accept";
                comment.parent = await this.commentModel.save(parentComment!);
            } else {
                comment.parent = parentComment!;
            }
        }

        const savedComment = await comment.save()
        const commentDAO = new CommentDAO();
        commentDAO.comment = savedComment.toDomainModel();
        return commentDAO;
    }

    async getCommentById(commentId: string): Promise<CommentDAO> {
        const comment = await this.commentModel.createQueryBuilder("comment")
            .leftJoinAndSelect("comment.post", "post")
            .where("comment.id = :commentId", {commentId})
            .select([
                "comment",
                "post.id", "post.title"
            ])
            .getOne();
        const commentDAO = new CommentDAO();
        if (comment) commentDAO.comment = comment.toDomainModel();
        return commentDAO;
    }

    async getCommentsByStatusAndPostId(postId: string, status: string, offset: number, limit: number): Promise<CommentDAO> {
        const commentDAO = new CommentDAO();
        try {
            if (status !== "accept") {
                const [comments, count] = await this.commentModel.createQueryBuilder("comment")
                    .leftJoinAndSelect("comment.post", "post")
                    .leftJoinAndSelect("comment.children", "children")
                    .where("post.id = :postId", {postId})
                    .andWhere("children.status = :status OR comment.parent IS NULL AND comment.status = :status", {status})
                    .skip(offset)
                    .take(limit)
                    .getManyAndCount();
                commentDAO.comments = comments.map(comment => comment.toDomainModel());
                commentDAO.count = count;
                return commentDAO;
            }
            const [comments, count] = await this.commentModel.createQueryBuilder("comment")
                .leftJoinAndSelect("comment.post", "post")
                .leftJoinAndSelect("comment.children", "children", "children.status = :status", {status})
                .where("post.id = :postId", {postId})
                .andWhere("comment.parent IS NULL AND comment.status = :status", {status})
                .select([
                    'comment',
                    'post.id', 'post.title',
                    'children'
                ])
                .skip(offset)
                .take(limit)
                .getManyAndCount();
            commentDAO.comments = comments.map(comment => comment.toDomainModel());
            commentDAO.count = count;
        } catch (err) {
            log.error(err, "GetCommentByStatus");
            commentDAO.comments = [];
            commentDAO.count = 0;
        }
        return commentDAO;
    }

    async getCommentsByStatus(commentStatus: string, offset: number, limit: number): Promise<CommentDAO> {
        const commentDAO = new CommentDAO();
        try {
            if (commentStatus !== "accept") {
                const [comments, count] = await this.commentModel.createQueryBuilder("comment")
                    .leftJoinAndSelect("comment.post", "post")
                    .leftJoinAndSelect("comment.children", "children")
                    .where("children.status = :status OR comment.parent IS NULL AND comment.status = :status", {status: commentStatus})
                    .skip(offset)
                    .take(limit)
                    .getManyAndCount();
                commentDAO.comments = comments.map(comment => comment.toDomainModel());
                commentDAO.count = count;
                return commentDAO;
            }
            const [comments, count] = await this.commentModel.createQueryBuilder("comment")
                .leftJoinAndSelect("comment.post", "post")
                .leftJoinAndSelect("comment.children", "children", "children.status = :status", {status: commentStatus})
                .where("comment.parent IS NULL AND comment.status = :status", {status: commentStatus})
                .select([
                    'comment',
                    'post.id', 'post.title',
                    'children'
                ])
                .skip(offset)
                .take(limit)
                .getManyAndCount();
            commentDAO.comments = comments.map(comment => comment.toDomainModel());
            commentDAO.count = count;
        } catch
            (err) {
            log.error(err, "GetCommentByStatus");
            commentDAO.comments = [];
            commentDAO.count = 0;
        }
        return commentDAO;
    }

    async updateComment(commentArg: Comment): Promise<CommentDAO> {
        const comment = await this.commentModel.createQueryBuilder("comment")
            .leftJoinAndSelect("comment.post", "post")
            .where("comment.id = :commentId", {commentId: commentArg.id})
            .select([
                'comment',
                'post.id', 'post.title'
            ])
            .getOne();
        if (commentArg.name) comment!.name = commentArg.name;
        if (commentArg.email) comment!.email = commentArg.email;
        if (commentArg.content) comment!.content = commentArg.content;
        if (commentArg.status) comment!.status = commentArg.status;

        const updatedComment = await this.commentModel.save(comment!)
        const commentDAO = new CommentDAO();
        commentDAO.comment = updatedComment.toDomainModel();
        return commentDAO;
    }

    async deleteComment(commentId: string): Promise<boolean> {
        try {
            await this.commentModel.createQueryBuilder()
                .delete()
                .where("id = :commentId", {commentId})
                .execute();
            return true;
        } catch (err) {
            log.error(err, "DeleteComment");
            return false;
        }
    }
}