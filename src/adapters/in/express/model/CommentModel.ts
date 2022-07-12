import {Comment} from "../../../../domain/Comment";
import {CommentStatus} from "../../../../domain/CommentStatus";
import {PostModel} from "./PostModel";

export class CommentModel {
    id: string
    parent: CommentModel
    children: CommentModel[]
    post: PostModel
    email: string
    name: string
    content: string
    status: string
    createAt: number
    updateAt: number

    constructor(init?: any) {
        init && Object.assign(this, init)
        if (init && init.parent) this.parent = new CommentModel(init.parent)
        if (init && init.post) this.post = new PostModel(init.post)
        if (init && init.children) this.children = init.children.map((commentArg: any) => new CommentModel(commentArg))
    }

    toDomainModel(): Comment {
        const comment = new Comment();
        if (this.id) comment.id = this.id
        if (this.parent) comment.parent = this.parent.toDomainModel()
        if (this.children) comment.children = this.children.map(commentArg => commentArg.toDomainModel());
        comment.email = this.email
        comment.name = this.name
        comment.content = this.content
        if (this.post) comment.post = new PostModel(this.post).toDomainModel();

        switch (this.status) {
            case "accept":
                comment.status = CommentStatus.accept;
                break;
            case "reject":
                comment.status = CommentStatus.reject;
                break;
            default:
                comment.status = CommentStatus.none;
        }

        return comment;
    }

    fromDomainModel(comment: Comment) {
        this.id = comment.id
        if (comment.parent) {
            this.parent = new CommentModel()
            this.parent.fromDomainModel(comment.parent)
        }
        if (comment.post) {
            this.post = new PostModel()
            this.post.fromDomainModel(comment.post)
        }
        if (comment.children) this.children = comment.children.map(commentArg => {
            const commentModel = new CommentModel()
            commentModel.fromDomainModel(commentArg)
            return commentModel;
        });
        if (comment.email) this.email = comment.email;
        if (comment.name) this.name = comment.name;
        if (comment.content) this.content = comment.content;
        if (comment.status) this.status = comment.status;
        if (comment.createAt) this.createAt = comment.createAt.getTime();
        if (comment.updateAt) this.updateAt = comment.updateAt.getTime()
    }
}