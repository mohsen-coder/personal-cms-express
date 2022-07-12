import multer from 'multer'
import {Request} from "express";
import path from "path";

export const upload = multer({
    dest: 'public/files',
    limits: {fileSize: 25000000},
    fileFilter(req: Request, file: Express.Multer.File, callback: multer.FileFilterCallback) {
        const fileTypes = /jpe?g|png|gif|pdf|zip|txt|rar/
        const extName = fileTypes.test(path.extname(file.originalname).toLowerCase())
        if (extName){
            return callback(null, true)
        }else {
            callback(new Error("file is not acceptable!"))
        }
    }
})