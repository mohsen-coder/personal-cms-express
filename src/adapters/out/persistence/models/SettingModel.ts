import {
    BaseEntity,
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    OneToOne,
    JoinColumn,
} from "typeorm";
import {SocialNetworkModel} from "./SocialNetworkModel";
import {FileModel} from "./FileModel";
import {Setting} from "../../../../domain/Setting";

@Entity()
export class SettingModel extends BaseEntity {
    @PrimaryGeneratedColumn("uuid") id: string;
    @OneToMany(
        () => SocialNetworkModel,
        (socialNetWork) => socialNetWork.setting,
        {nullable: true}
    )
    socialNetworks: SocialNetworkModel[];
    @OneToOne(() => FileModel, {nullable: true})
    @JoinColumn()
    favIcon: FileModel;
    @Column({nullable: true}) title: string;
    @Column({type: "text", nullable: true}) description: string;
    @Column({type: "text", nullable: true}) metaTags: string;
    @Column({type: "text", nullable: true}) styles: string;
    @Column({type: "text", nullable: true}) jsScripts: string;
    @Column({nullable: true}) theme: string;
    @CreateDateColumn() createAt: Date;
    @UpdateDateColumn() updateAt: Date;

    toDomainModel(): Setting {
        const setting = new Setting();

        if (this.id) setting.id = this.id;
        if (this.socialNetworks)
            setting.socialNetworks = this.socialNetworks.map((socialNetwork) =>
                socialNetwork.toDomainModel()
            );
        if (this.favIcon) setting.favIcon = this.favIcon.toDomainModel();
        if (this.title) setting.title = this.title;
        if (this.description) setting.description = this.description;
        if (this.metaTags) setting.metaTags = this.metaTags;
        if (this.styles) setting.styles = this.styles;
        if (this.jsScripts) setting.jsScripts = this.jsScripts;
        if (this.theme) setting.theme = this.theme;
        if (this.createAt) setting.createAt = this.createAt;
        if (this.updateAt) setting.updateAt = this.updateAt;

        return setting;
    }

}
