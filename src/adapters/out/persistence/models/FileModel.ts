import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";

@Entity()
export class FileModel extends BaseEntity {
    @PrimaryGeneratedColumn("uuid") id!: string
    @Column() size!: string
    @Column() title!: string
    @Column() meme!: string
    @Column() fileType!: string
    @CreateDateColumn() createAt!: Date
}