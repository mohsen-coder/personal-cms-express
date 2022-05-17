import { database } from "./DB";
import { UserModel } from "../models/UserModel";

async function DBSyncer(){
    await UserModel.sync()
}

export {database, UserModel, DBSyncer}