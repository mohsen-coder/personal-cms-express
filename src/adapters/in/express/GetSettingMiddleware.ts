import { Request, Response } from "express";
import { GetSettingUseCase } from "../../../application/ports/in/GetSettingUseCase";

export function GetSettingMiddleware(getSettingUseCase: GetSettingUseCase){
    return async (request: Request, response: Response) => {
        const settingResponse = await getSettingUseCase.getSetting();
        response.status(settingResponse.status === "success" ? 200 : 500).send(settingResponse);
    }
}