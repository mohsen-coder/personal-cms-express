import {ResponseBase} from "./ResponseBase";
import {Category} from "../../../../domain/Category";

export class CategoryResponse extends ResponseBase{
    category?: Category
    categories?: Category[]
}