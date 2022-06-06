import {
    BaseEntity,
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToMany, JoinTable
} from "typeorm";
import {PostModel} from "./PostModel";
import {Category} from "../../../../domain/Category";

@Entity()
export class CategoryModel extends BaseEntity {
    @PrimaryGeneratedColumn("uuid") id!: string
    @Column({nullable: true}) parentId?: string
    @Column() title!: string
    @ManyToMany(() => PostModel, post => post.categories, {nullable: true})
    @JoinTable()
    post?: PostModel
    @CreateDateColumn() createAt!: Date
    @UpdateDateColumn() updateAt!: Date

    toDomainModel(): Category {
        const category = new Category()
        category.id = this.id;
        category.parentId = this.parentId
        category.title = this.title
        category.createAt = this.createAt
        category.updateAt = this.updateAt

        return category
    }
}