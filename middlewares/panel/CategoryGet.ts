import {Request, Response} from 'express'

export const CategoryGet = (req: Request, res: Response) => {
    res.render('panel/categories', {pageTitle: 'دسته بندی ها', categories: []})
}