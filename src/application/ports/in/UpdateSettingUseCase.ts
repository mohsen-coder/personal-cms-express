import {Setting} from "../../../domain/Setting";
import {SettingResponse} from "./response/SettingResponse";

export interface UpdateSettingUseCase {
	updateSetting(setting: Setting): Promise<SettingResponse>;
}
