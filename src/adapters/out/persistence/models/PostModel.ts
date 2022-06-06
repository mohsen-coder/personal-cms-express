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
    id?: string

    @OneToOne(() => FileModel, {nullable: true})
    @JoinColumn()
    thumbnail?: FileModel

    @Column() title!: string
    @Column() content!: string
    @Column() fullContent!: string

    @ManyToMany(() => CategoryModel, category => category.post, {nullable: true})
    @JoinTable()
    categories?: CategoryModel[]

    @Column({type: 'simple-array'})
    tags?: string[]

    @OneToMany(() => CommentModel, (comment) => comment.post, {nullable: true})
    @JoinColumn()
    comments?: CommentModel[]

    @ManyToOne(() => AccountModel, account => account.posts)
    author!: AccountModel

    @Column({nullable: true, default: 0}) view!: number
    @Column({nullable: true, default: 0}) like!: number
    //
    @Column({nullable: true}) publishDate?: Date
    @Column({nullable: true}) status!: string

    @CreateDateColumn() createAt!: Date
    @UpdateDateColumn() updateAt!: Date

    toDomainModel(): Post {
        const post = new Post()
        post.id = this.id
        if(this.thumbnail) post.thumbnail = this.thumbnail.toDomainModel();
        post.title = this.title
        post.content = this.content
        post.fullContent = this.fullContent
        post.categories = this.categories?.map(category => category.toDomainModel())
        post.tags = this.tags
        post.comments = this.comments?.map(comment => comment.toDomainModel())
        post.author = this.author.toDomainModel()
        post.view = this.view
        post.like = this.like
        post.publishDate = this.publishDate
        post.createAt = this.createAt
        post.updateAt = this.updateAt

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