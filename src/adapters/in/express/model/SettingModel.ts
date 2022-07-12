import { Setting } from "../../../../domain/Setting";
import { FileModel } from "./FileModel";
import { SocialNetworkModel } from "./SocialNetworkModel";

export class SettingModel {
	id: string;
	socialNetworks: SocialNetworkModel[];
	favIcon: FileModel;
	title: string;
	description: string;
	metaTags: string;
	styles: string;
	jsScripts: string;
	theme: string;
	createAt: number;
	updateAt: number;

	constructor(init?: any) {
		init && Object.assign(this, init);
		if (init && init.socialNetworks) {
			this.socialNetworks = init.socialNetworks.map(
				(socialNetwork: object) => new SocialNetworkModel(socialNetwork)
			);
		}
	}

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

		return setting;
	}

	fromDomainModel(setting: Setting) {
		if (setting.id) this.id = setting.id;
		if (setting.socialNetworks)
			this.socialNetworks = setting.socialNetworks.map(
				(socialNetwork) => {
					const socialNetworkModel = new SocialNetworkModel();
					socialNetworkModel.fromDomainModel(socialNetwork);
					return socialNetworkModel;
				}
			);
		if (setting.favIcon) {
			this.favIcon = new FileModel();
			this.favIcon.fromDomainModel(setting.favIcon);
		}
		if (setting.title) this.title = setting.title;
		if (setting.description) this.description = setting.description;
		if (setting.metaTags) this.metaTags = setting.metaTags;
		if (setting.styles) this.styles = setting.styles;
		if (setting.jsScripts) this.jsScripts = setting.jsScripts;
		if (setting.theme) this.theme = setting.theme;
	}
}
