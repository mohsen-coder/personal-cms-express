import "reflect-metadata"
import express from 'express'
import cors from "cors";
import bodyParser from 'body-parser';
import config from 'config'
import logger from './utils/logger'
import {router} from "./routes";
import {db} from "../config/Database";
import path from "path";

const app = express()

const port = config.get<number>('port')
const rootPath = config.get<string>('rootPath')

app.use(express.json())
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors())
app.use(express.static(path.join(rootPath, 'public')))

app.use('/api/v1/', router)

// config

async function main() {
    try {
        await db.initialize()
        app.listen(port)
        logger.info(`server is running at http://localhost:${port}`)
    } catch (error) {
        logger.error(error, 'fail to start server')
    }
}

main();