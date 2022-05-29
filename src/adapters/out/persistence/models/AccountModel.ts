import {Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn} from "typeorm";
import {FileModel} from "./FileModel";

@Entity()
export class AccountModel extends BaseEntity{
    @PrimaryGeneratedColumn("uuid") id!: string
    @Column() name!: string
    @Column() family!: string
    @Column() email!: string
    @Column({unique: true}) username!: string
    @Column() password!: string
    @Column({nullable: true}) about?: string
    @OneToOne(() => FileModel, {nullable: true}) @JoinColumn() thumbnail?: FileModel
    @Column() role!: string
    @CreateDateColumn() createAt!: Date
    @UpdateDateColumn() updateAt!: Date
}
