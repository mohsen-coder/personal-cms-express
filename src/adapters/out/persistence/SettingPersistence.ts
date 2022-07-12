import { SettingModel } from "./models/SettingModel";
import { UpdateSettingPort } from "../../../application/ports/out/UpdateSettingPort";
import { Setting } from "../../../domain/Setting";
import { FileModel } from "./models/FileModel";
import { SocialNetworkModel } from "./models/SocialNetworkModel";
import { GetSettingPort } from "../../../application/ports/out/GetSettingPort";

export class SettingPersistence
	implements UpdateSettingPort, GetSettingPort {
	constructor(
		private readonly settingModel: typeof SettingModel,
		private readonly socialNetworkModel: typeof SocialNetworkModel,
		private readonly fileModel: typeof FileModel
	) { }

	async createSetting(setting: Setting): Promise<Setting> {
		const settingModel = new SettingModel();

		if (setting.socialNetworks) {
			settingModel.socialNetworks = [];
			for (let i = 0; i < setting.socialNetworks.length; i++) {
				const socialNetwork = await this.socialNetworkModel.findOne({
					where: { id: setting.socialNetworks[i].id },
				});
				settingModel.socialNetworks.push(socialNetwork!);
			}
		}

		if (setting.favIcon) {
			const file = await this.fileModel.findOne({
				where: { id: setting.favIcon.id },
			});
			settingModel.favIcon = file!;
		}

		if (setting.title) settingModel.title = setting.title;
		if (setting.description) settingModel.description = setting.description;
		if (setting.metaTags) settingModel.metaTags = setting.metaTags;
		if (setting.styles) settingModel.styles = setting.styles;
		if (setting.jsScripts) settingModel.jsScripts = setting.jsScripts;
		if (setting.theme) settingModel.theme = setting.theme;

		const savedSetting = await settingModel.save();
		return savedSetting.toDomainModel();
	}

	async getSetting(): Promise<Setting | null> {
		const [settingModel] = await this.settingModel
			.createQueryBuilder("setting")
			.skip(0)
			.limit(1)
			.getMany();
		return settingModel ? settingModel.toDomainModel() : null;
	}

	async updateSetting(setting: Setting): Promise<Setting> {
		const [settingModel] = await this.settingModel
			.createQueryBuilder("setting")
			.skip(0)
			.limit(1)
			.getMany();

		if (!settingModel) {
			return await this.createSetting(setting);
		}

		if (setting.socialNetworks) {
			settingModel.socialNetworks = [];
			for (let i = 0; i < setting.socialNetworks.length; i++) {
				const socialNetwork = await this.socialNetworkModel.findOne({
					where: { id: setting.socialNetworks[i].id },
				});
				settingModel.socialNetworks.push(socialNetwork!);
			}
		}

		if (setting.favIcon) {
			const file = await this.fileModel.findOne({
				where: { id: setting.favIcon.id },
			});
			settingModel.favIcon = file!;
		}

		if (setting.title) settingModel.title = setting.title;
		if (setting.description) settingModel.description = setting.description;
		if (setting.metaTags) settingModel.metaTags = setting.metaTags;
		if (setting.styles) settingModel.styles = setting.styles;
		if (setting.jsScripts) settingModel.jsScripts = setting.jsScripts;
		if (setting.theme) settingModel.theme = setting.theme;

		const updatedSetting = await this.settingModel.save(settingModel);

		return updatedSetting.toDomainModel();
	}
}
