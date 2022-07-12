import {BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {SettingModel} from "./SettingModel";
import {FileModel} from "./FileModel";
import {SocialNetwork} from "../../../../domain/SocialNetwork";

@Entity()
export class SocialNetworkModel extends BaseEntity{
    @PrimaryGeneratedColumn("uuid") id: string;
    @Column() name: string;
    @Column() url: string;
    @OneToOne(() => FileModel, {nullable: true, onDelete: "CASCADE"})
    @JoinColumn()
    icon: FileModel | null;
    @ManyToOne(() => SettingModel, setting => setting.socialNetworks) setting: SettingModel


	toDomainModel(): SocialNetwork {
		const socialNetwork = new SocialNetwork();
		if(this.id) socialNetwork.id = this.id;
		if(this.name) socialNetwork.name = this.name;
		if(this.url) socialNetwork.url = this.url;
		if(this.icon) socialNetwork.icon = this.icon.toDomainModel();

		return socialNetwork;
	}
}
