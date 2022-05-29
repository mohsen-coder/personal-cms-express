import {BaseEntity, Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne} from "typeorm";
import { PostModel } from "./PostModel";

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
}