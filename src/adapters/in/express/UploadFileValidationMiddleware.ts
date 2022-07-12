import {upload} from "../../../../config/Multer";
import {NextFunction, Request, Response} from "express";


export function UploadFileValidationMiddleware() {
    return (request: Request, response: Response, next: NextFunction) => {
        const handelFile = upload.single('file')
        handelFile(request, response, err => {
            if (err) {
                return response.status(400).send({status: 'error', messages: ['نوع فایل مجاز نمی باشد!']})
            }
            next()
        })
    }
}