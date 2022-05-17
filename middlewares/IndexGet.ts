import {Request, Response} from 'express'

export const IndexGet = (req: Request, res: Response) => {
    res.render('index', {pageTitle: 'صفحه اصلی'})
}