import {BaseEntity, Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {CategoryModel} from "./CategoryModel";
import {CommentModel} from "./CommentModel";
import {AccountModel} from "./AccountModel";
import {FileModel} from "./FileModel";

@Entity()
export class PostModel extends BaseEntity {
    @PrimaryGeneratedColumn("uuid") id: string
    @OneToOne(() => FileModel) @JoinColumn() thumbnail: FileModel
    @Column() title: string
    @Column() content: string
    @Column() fullContent: string
    @Column() categories: CategoryModel
    @Column() tags: string[]
    @OneToMany(() => CommentModel, (comment) => comment.postId)
    @JoinColumn()
    comments: CommentModel[]
    @OneToOne(() => AccountModel) author: AccountModel
    @Column() view: number
    @Column() like: number
    @Column() isLiked: boolean
    @Column() publishDate: number
    @Column() status: string
}