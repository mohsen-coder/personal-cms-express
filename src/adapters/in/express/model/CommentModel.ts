import {Comment} from "../../../../domain/Comment";
import {CommentStatus} from "../../../../domain/CommentStatus";

export class CommentModel {
    id?: string
    parentId?: string
    email?: string
    name?: string
    content?: string
    status?: string
    createAt?: number
    updateAt?: number

    constructor(init?: any) {
        init && Object.assign(this, init)
    }

    toDomainModel(): Comment {
        const comment = new Comment();
        comment.id = this.id
        comment.parentId = this.parentId
        comment.email = this.email
        comment.name = this.name
        comment.content = this.content

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
        this.parentId = comment.parentId
        this.email = comment.email
        this.name = comment.name
        this.content = comment.content
        this.status = comment.status
        this.createAt = comment.createAt?.getTime()
        this.updateAt = comment.updateAt?.getTime()
    }
}