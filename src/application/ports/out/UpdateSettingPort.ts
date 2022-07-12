import {Setting} from "../../../domain/Setting";

export interface UpdateSettingPort {
    updateSetting(setting: Setting): Promise<Setting>
}