import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne, OneToMany, OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {PostModel} from "./PostModel";
import {Comment} from "../../../../domain/Comment";
import {CommentStatus} from "../../../../domain/CommentStatus";
import log from "../../../../utils/logger";

@Entity()
export class CommentModel extends BaseEntity {
    @PrimaryGeneratedColumn("uuid") id: string;
    @Column() email: string;
    @Column() name: string;
    @Column({type: "text"}) content: string;
    @Column() status: string;
    @OneToMany(() => CommentModel, comment => comment.parent, {
        nullable: true,
        onDelete: "CASCADE"
    }) children: CommentModel[] | null;
    @ManyToOne(() => CommentModel, comment => comment.children, {
        nullable: true,
        onDelete: "CASCADE"
    }) parent: CommentModel | null;
    @ManyToOne(() => PostModel, post => post.comments, {onDelete: "NO ACTION"}) post: PostModel;
    @CreateDateColumn() createAt: Date;
    @UpdateDateColumn() updateAt: Date;

    toDomainModel(): Comment {
        const comment = new Comment()

        if (this.id) comment.id = this.id;
        if (this.email) comment.email = this.email;
        if (this.name) comment.name = this.name;
        if (this.content) comment.content = this.content;
        if (this.createAt) comment.createAt = this.createAt;
        if (this.updateAt) comment.updateAt = this.updateAt;
        if (this.post) comment.post = this.post.toDomainModel();
        if (this.children) comment.children = this.children.map(commentArg => commentArg.toDomainModel());

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