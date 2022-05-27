import {Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToOne, JoinColumn} from "typeorm";
import {FileModel} from "./FileModel";

@Entity()
export class AccountModel extends BaseEntity{
    @PrimaryGeneratedColumn("uuid") id: number
    @Column() name: string
    @Column() family: string
    @Column() email: string
    @Column() password: string
    @Column() about: string
    @OneToOne(() => FileModel) @JoinColumn() thumbnail: FileModel
    @Column() role: string
}
