import { CategoryModel } from "../models/CategoryModel";
import { ResponseBase } from "./ResponseBase";

export class CategoryGetResponse extends ResponseBase {
    category: CategoryModel | null = null
    categories: CategoryModel[] | null = null
}