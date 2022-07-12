import {ResponseBase} from "./ResponseBase";
import {CategoryModel} from "../../../../adapters/in/express/model/CategoryModel";

export class CategoryResponse extends ResponseBase{
    category: CategoryModel;
    categories: CategoryModel[];
    count: number;
}