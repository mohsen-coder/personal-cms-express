import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn, JoinTable,
    ManyToMany, ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {CategoryModel} from "./CategoryModel";
import {CommentModel} from "./CommentModel";
import {AccountModel} from "./AccountModel";
import {FileModel} from "./FileModel";
import {Post} from "../../../../domain/Post";
import {PostStatus} from "../../../../domain/PostStatus";

@Entity()
export class PostModel extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @OneToOne(() => FileModel, {nullable: true, onDelete: "CASCADE"})
    @JoinColumn()
    thumbnail: FileModel | null;

    @Column() title: string;
    @Column({type: "text"}) content: string;
    @Column({type: "text"}) fullContent: string;

    @ManyToMany(() => CategoryModel, category => category.post, {nullable: true, onDelete: "NO ACTION"})
    @JoinTable()
    categories: CategoryModel[] | null;

    @Column({type: 'simple-array'})
    tags: string[];

    @OneToMany(() => CommentModel, (comment) => comment.post, {nullable: true, onDelete: "CASCADE"})
    @JoinColumn()
    comments: CommentModel[] | null;

    @ManyToOne(() => AccountModel, account => account.posts, {onDelete: "NO ACTION"})
    author: AccountModel;

    @Column({default: 0}) view: number;
    @Column({default: 0}) like: number;
    @Column() publishDate: Date;
    @Column() status: string;

    @CreateDateColumn() createAt: Date;
    @UpdateDateColumn() updateAt: Date;

    toDomainModel(): Post {
        const post = new Post()

        if (this.id) post.id = this.id;
        if (this.thumbnail) post.thumbnail = this.thumbnail.toDomainModel();
        if (this.title) post.title = this.title;
        if (this.content) post.content = this.content;
        if (this.fullContent) post.fullContent = this.fullContent;
        if (this.categories) post.categories = this.categories.map(category => category.toDomainModel());
        if (this.tags) post.tags = this.tags;
        if (this.comments) post.comments = this.comments.map(commentArg => commentArg.toDomainModel());
        if (this.author) post.author = this.author.toDomainModel();
        if (this.view) post.view = this.view;
        if (this.like) post.like = this.like;
        if (this.publishDate) post.publishDate = this.publishDate;
        if (this.createAt) post.createAt = this.createAt;
        if (this.updateAt) post.updateAt = this.updateAt;

        switch (this.status) {
            case "publish":
                post.status = PostStatus.publish;
                break;
            case "suspend":
                post.status = PostStatus.suspend;
                break;
            default:
                post.status = PostStatus.none;
        }

        return post;
    }
}