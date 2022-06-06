import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {PostModel} from "./PostModel";
import {Comment} from "../../../../domain/Comment";
import {CommentStatus} from "../../../../domain/CommentStatus";

@Entity()
export class CommentModel extends BaseEntity {
    @PrimaryGeneratedColumn("uuid") id!: string
    @Column() email!: string
    @Column() name!: string
    @Column() content!: string
    @Column() status!: string
    @Column({nullable: true}) parentId?: string
    @ManyToOne(() => PostModel, post => post.comments) post!: PostModel
    @CreateDateColumn() createAt!: Date
    @UpdateDateColumn() updateAt!: Date

    toDomainModel(): Comment {
        const comment = new Comment()
        comment.id = this.id
        comment.email = this.email
        comment.name = this.name
        comment.content = this.content
        comment.parentId = this.parentId
        comment.createAt = this.createAt
        comment.updateAt = this.updateAt

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
}