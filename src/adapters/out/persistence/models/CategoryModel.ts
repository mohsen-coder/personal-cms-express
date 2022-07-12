import {
    BaseEntity,
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToMany, JoinTable, ManyToOne, OneToMany
} from "typeorm";
import {PostModel} from "./PostModel";
import {Category} from "../../../../domain/Category";

@Entity()
export class CategoryModel extends BaseEntity {
    @PrimaryGeneratedColumn("uuid") id: string;

    @ManyToOne(() => CategoryModel, category => category.children, {onDelete: "CASCADE"})
    parent: CategoryModel | null;

    @OneToMany(() => CategoryModel, category => category.parent, {onDelete: "CASCADE"})
    children: CategoryModel[];

    @Column({unique: true}) title: string
    @ManyToMany(() => PostModel, post => post.categories, {nullable: true, onDelete: "NO ACTION"})
    @JoinTable()
    post: PostModel | null;
    @CreateDateColumn() createAt: Date;
    @UpdateDateColumn() updateAt: Date;

    toDomainModel(): Category {
        const category = new Category();

        if (this.id) category.id = this.id;
        if (this.parent) category.parent = this.parent.toDomainModel();
        if (this.children) category.children = this.children.map(child => child.toDomainModel());
        if (this.title) category.title = this.title;
        if (this.createAt) category.createAt = this.createAt;
        if (this.updateAt) category.updateAt = this.updateAt;

        return category;
    }
}