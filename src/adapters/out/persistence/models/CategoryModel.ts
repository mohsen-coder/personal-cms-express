import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class CategoryModel extends BaseEntity{
    @PrimaryGeneratedColumn("uuid") id: string
    @Column() parentId: string
    @Column() title: string
}