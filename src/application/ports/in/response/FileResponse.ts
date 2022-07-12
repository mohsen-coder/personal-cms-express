import {ResponseBase} from "./ResponseBase";
import {FileModel} from "../../../../adapters/in/express/model/FileModel";

export class FileResponse extends ResponseBase {
    file: FileModel;
    files: FileModel[];
    count: number;
}