import { SettingResponse } from "./response/SettingResponse";

export interface GetSettingUseCase {
    getSetting(): Promise<SettingResponse>;
}