import express, { Request, Response } from 'express'


(async () => {
    const app = express()

    app.get('/', (req: Request, res: Response) => {
        res.send('<h1> Hello World </h1>')
    })

    app.listen(8000, () => console.log('server is runing on http://localhost:8000'))
})()