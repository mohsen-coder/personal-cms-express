import path from 'path';
import express, { Request, Response } from 'express'
import bodyParser from 'body-parser';
import mustacheExpress from 'mustache-express';
import session from 'express-session'
import connectSequelize from 'connect-session-sequelize'
import {database, DBSyncer} from './config/Database'


(async () => {
    const app = express()
    const SequelizeStore = connectSequelize(session.Store);


    app.engine('mustache', mustacheExpress());
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'mustache');
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(session({
        secret: 'session key id',
        store: new SequelizeStore({ db: database }),
        resave: false,
        saveUninitialized: false
    }))


    try {
        await DBSyncer()
        app.listen(8000, () => console.log('server is runing on http://localhost:8000'))
    } catch (err) {
        console.log(err);
        console.log("fail to start server");
    }

})()