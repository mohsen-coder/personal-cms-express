import {Request, Response} from 'express'

export const LoginGet = (req: Request, res: Response) => {
    res.render('login', {pageTitle: 'عضویت'})
}