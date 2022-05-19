import {Router} from "express";
import {RouteHelper} from "../helper/RouteHelper";
import {CategoryDelete} from "../middlewares/panel/CategoryDelete";
import {CategoryGet} from "../middlewares/panel/CategoryGet";
import {CategoryPost} from "../middlewares/panel/CategoryPost";
import {CategoryPut} from "../middlewares/panel/CategoryPut";
import {DashboardGet} from "../middlewares/panel/DashboardGet";
import {CategoryPostValidation} from "../middlewares/panel/CategoryPostValidation";
import {CategoryGetValidation} from "../middlewares/panel/CategoryGetValidation";
import {CategoryPutValidation} from "../middlewares/panel/CategoryPutValidation";
import {CategoryDeleteValidation} from "../middlewares/panel/CategoryDeleteValidation";

const panel = Router()

panel.get(RouteHelper.panel, DashboardGet)

panel.get(RouteHelper.categories, CategoryGetValidation, CategoryGet)
panel.post(RouteHelper.categories, CategoryPostValidation, CategoryPost)
panel.put(RouteHelper.categories, CategoryPutValidation, CategoryPut)
panel.delete(RouteHelper.categories, CategoryDeleteValidation, CategoryDelete)

export {panel as panelRouter}