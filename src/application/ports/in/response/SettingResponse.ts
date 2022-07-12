import {SettingModel} from "../../../../adapters/in/express/model/SettingModel";
import {ResponseBase} from "./ResponseBase";

export class SettingResponse extends ResponseBase{
	setting?: SettingModel
}
