import {Request, Response} from 'express'

export const RegisterGet = (req: Request, res: Response) => {
    res.render('register', {pageTitle: 'عضویت'})
}