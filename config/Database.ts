import { database } from "./DB";
import { UserModel } from "../models/UserModel";
import {CategoryModel} from "../models/CategoryModel";

async function DBSyncer(){
    await UserModel.sync()
    await CategoryModel.sync()
}

export {database, UserModel, DBSyncer}