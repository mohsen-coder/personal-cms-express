import { Messages } from "../../../values/Messages";
import { SettingModel } from "../../adapters/in/express/model/SettingModel";
import { GetSettingUseCase } from "../ports/in/GetSettingUseCase";
import { ResponseStatus } from "../ports/in/response/ResponseStatus";
import { SettingResponse } from "../ports/in/response/SettingResponse";
import { GetSettingPort } from "../ports/out/GetSettingPort";

export class GetSettingService implements GetSettingUseCase {

    constructor(
        private readonly getSettingRepo: GetSettingPort
    ) { }

    async getSetting(): Promise<SettingResponse> {
        const response = new SettingResponse();
        const setting = await this.getSettingRepo.getSetting();
        if (!setting) {
            response.status = ResponseStatus.error;
            response.messages.push(Messages.setting.get.NotFoundError.fa);
            return response;
        }
        const settingModel = new SettingModel();
        settingModel.fromDomainModel(setting);
        response.setting = settingModel;
        response.status = ResponseStatus.success;
        response.messages.push(Messages.setting.get.Success.fa);
        return response;
    }
}