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
    @PrimaryGeneratedColumn("uuid") id?: string
    @Column() name!: string
    @Column() family!: string
    @Column() email!: string
    @Column({unique: true}) username!: string
    @Column() password!: string
    @Column({nullable: true}) about?: string
    @OneToOne(() => FileModel, {nullable: true}) @JoinColumn() thumbnail?: FileModel
    @Column() role!: string
    @OneToMany(() => PostModel, post => post.author, {nullable: true}) posts?: PostModel[]
    @CreateDateColumn() createAt!: Date
    @UpdateDateColumn() updateAt!: Date

    toDomainModel(): Account {
        const account = new Account()
        account.id = this.id!
        account.name = this.name;
        account.family = this.family;
        account.email = this.email;
        account.username = this.username;
        account.password = this.password;
        account.about = this.about
        if(this.thumbnail) account.thumbnail = this.thumbnail.toDomainModel();
        account.createAt = this.createAt;
        account.updateAt = this.updateAt;

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
