import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToMany } from "typeorm";
import { PostModel } from "./PostModel";

@Entity()
export class CategoryModel extends BaseEntity {
    @PrimaryGeneratedColumn("uuid") id!: string
    @Column({ nullable: true }) parentId?: string
    @Column() title!: string
    @ManyToMany(() => PostModel, post => post.categories, { nullable: true }) post?: PostModel
    @CreateDateColumn() createAt!: Date
    @UpdateDateColumn() updateAt!: Date
}