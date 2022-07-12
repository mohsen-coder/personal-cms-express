import { SocialNetwork } from "../../../../domain/SocialNetwork";
import { FileModel } from "./FileModel";

export class SocialNetworkModel {
	id: string;
	name: string;
	url: string;
	icon: FileModel;

	constructor(init?: any) {
		init && Object.assign(this, init);
		if(init && init.icon){
			this.icon = new FileModel(init.icon);
		}
	}

	toDomainModel(): SocialNetwork {
		const socialNetWork = new SocialNetwork();
		if (this.id) socialNetWork.id = this.id;
		if (this.name) socialNetWork.name = this.name;
		if (this.url) socialNetWork.url = this.url;
		if (this.icon) socialNetWork.icon = this.icon.toDomainModel();

		return socialNetWork;
	}

	fromDomainModel(socialNetwork: SocialNetwork) {
		if(socialNetwork.id) this.id = socialNetwork.id;
		if(socialNetwork.name) this.name = socialNetwork.name;
		if(socialNetwork.url) this.url = socialNetwork.url;
		if (socialNetwork.icon) {
			this.icon = new FileModel();
			this.icon.fromDomainModel(socialNetwork.icon);
		}
	}
}
