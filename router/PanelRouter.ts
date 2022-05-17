import { Router } from "express";
import { RouteHelper } from "../helper/RouteHelper";
import { DashboardGet } from "../middlewares/panel/DashboardGet";

const panel = Router()

panel.get(RouteHelper.panel, DashboardGet)

export { panel as panelRouter }