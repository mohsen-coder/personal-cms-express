import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn, OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {FileModel} from "./FileModel";
import {Account} from "../../../../domain/Account";
import {AccountRole} from "../../../../domain/AccountRole";
import {PostModel} from "./PostModel";

@Entity()
export class AccountModel extends BaseEntity {
    @PrimaryGeneratedColumn("uuid") id: string
    @Column() name: string;
    @Column() family: string;
    @Column() email: string;
    @Column({unique: true}) username: string
    @Column() password: string;
    @Column({nullable: true, type: "text"}) about: string;
    @OneToOne(() => FileModel, {nullable: true, onDelete: "CASCADE"}) @JoinColumn() thumbnail: FileModel | null;
    @Column() role: string;
    @OneToMany(() => PostModel, post => post.author, {nullable: true, onDelete: "NO ACTION"}) posts: PostModel[];
    @CreateDateColumn() createAt: Date;
    @UpdateDateColumn() updateAt: Date;

    toDomainModel(): Account {
        const account = new Account()

        if (this.id) account.id = this.id;
        if (this.name) account.name = this.name;
        if (this.family) account.family = this.family;
        if (this.email) account.email = this.email;
        if (this.username) account.username = this.username;
        if (this.password) account.password = this.password;
        if (this.about) account.about = this.about;
        if (this.thumbnail) account.thumbnail = this.thumbnail.toDomainModel();
        if (this.createAt) account.createAt = this.createAt;
        if (this.updateAt) account.updateAt = this.updateAt;

        switch (this.role) {
            case "admin":
                account.role = AccountRole.admin;
                break;
            case "user":
                account.role = AccountRole.user;
                break;
            default:
                account.role = AccountRole.none;
        }

        return account;
    }

}
