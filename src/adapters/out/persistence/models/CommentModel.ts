import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class CommentModel extends BaseEntity {
    @PrimaryGeneratedColumn("uuid") id: string
    @Column() email: string
    @Column() name: string
    @Column() content: string
    @Column() createDate: number
    @Column() parentId: string
    @Column() postId: string
}