import { Messages } from "../../../values/Messages";
import { SettingModel } from "../../adapters/in/express/model/SettingModel";
import { Setting } from "../../domain/Setting";
import { ResponseStatus } from "../ports/in/response/ResponseStatus";
import { SettingResponse } from "../ports/in/response/SettingResponse";
import { UpdateSettingUseCase } from "../ports/in/UpdateSettingUseCase";
import { UpdateSettingPort } from "../ports/out/UpdateSettingPort";

export class UpdateSettingService implements UpdateSettingUseCase {
	constructor(private readonly updateSettingRepo: UpdateSettingPort) {}

	async updateSetting(setting: Setting): Promise<SettingResponse> {
		const response = new SettingResponse();
		const updatedSetting = await this.updateSettingRepo.updateSetting(
			setting
		);
		response.setting = new SettingModel();
		response.setting.fromDomainModel(updatedSetting);
		response.status = ResponseStatus.success;
		response.messages.push(Messages.setting.update.Success.fa);
		return response;
	}
}
