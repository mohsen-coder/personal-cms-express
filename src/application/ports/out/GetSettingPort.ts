import { Setting } from "../../../domain/Setting";

export interface GetSettingPort {
    getSetting(): Promise<Setting | null>;
}