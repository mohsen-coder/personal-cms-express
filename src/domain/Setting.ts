import { SocialNetwork } from "./SocialNetwork";
import { File } from "./File";

export class Setting {
	id: string;
	socialNetworks: SocialNetwork[];
	favIcon: File;
	title: string;
	description: string;
	metaTags: string;
	styles: string;
	jsScripts: string;
	theme: string;
	createAt: Date;
	updateAt: Date;
}
