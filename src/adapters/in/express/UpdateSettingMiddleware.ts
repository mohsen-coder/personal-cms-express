import { Request, Response } from "express";
import { UpdateSettingUseCase } from "../../../application/ports/in/UpdateSettingUseCase";
import { SettingModel } from "./model/SettingModel";

export function UpdateSettingMiddleware(
	updateSettingUseCase: UpdateSettingUseCase
) {
	return async (request: Request, response: Response) => {
		const settingModel = new SettingModel(request.body);
		const settingResponse = await updateSettingUseCase.updateSetting(
			settingModel.toDomainModel()
		);
		response
			.status(settingResponse.status === "success" ? 200 : 400)
			.send(settingResponse);
	};
}
