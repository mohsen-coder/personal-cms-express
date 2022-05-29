import { BaseEntity, Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToMany } from "typeorm";
import { CategoryModel } from "./CategoryModel";
import { CommentModel } from "./CommentModel";
import { AccountModel } from "./AccountModel";
import { FileModel } from "./FileModel";

@Entity()
export class PostModel extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id!: string

    @OneToOne(() => FileModel, { nullable: true })
    thumbnail?: FileModel

    @Column() title!: string
    @Column() content!: string
    @Column() fullContent?: string

    @ManyToMany(() => CategoryModel, category => category.post, { nullable: true })
    categories?: CategoryModel[]

    @Column({ type: 'simple-array', default: [] })
    tags?: string[]

    @OneToMany(() => CommentModel, (comment) => comment.post, { nullable: true })
    @JoinColumn()
    comments?: CommentModel[]

    @OneToOne(() => AccountModel)
    @JoinColumn()
    author!: AccountModel

    @Column({ default: 0 }) view!: number
    @Column({ default: 0 }) like!: number

    @Column({ nullable: true }) publishDate!: Date
    @Column() status!: string

    @CreateDateColumn() createAt!: Date
    @UpdateDateColumn() updateAt!: Date
}