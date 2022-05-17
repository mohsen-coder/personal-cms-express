import {Request, Response} from 'express'

export const DashboardGet = (req: Request, res: Response) => {
    res.render('panel/index', {pageTitle: 'پنل کاربری'})
}