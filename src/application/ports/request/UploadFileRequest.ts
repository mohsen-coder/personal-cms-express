export class UploadFileRequest {
    file: FormData

    constructor(file: FormData) {
        this.file = file;
    }
}