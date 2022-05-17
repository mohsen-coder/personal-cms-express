import { Router } from "express";
import { RouteHelper } from "../helper/RouteHelper";
import { CategoryDelete } from "../middlewares/panel/CategoryDelete";
import { CategoryGet } from "../middlewares/panel/CategoryGet";
import { CategoryPost } from "../middlewares/panel/CategoryPost";
import { CategoryPut } from "../middlewares/panel/CategoryPut";
import { DashboardGet } from "../middlewares/panel/DashboardGet";

const panel = Router()

panel.get(RouteHelper.panel, DashboardGet)

panel.get(RouteHelper.categories, CategoryGet)
panel.post(RouteHelper.categories, CategoryPost)
panel.put(RouteHelper.categories, CategoryPut)
panel.delete(RouteHelper.categories, CategoryDelete)

export { panel as panelRouter }