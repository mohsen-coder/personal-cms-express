import "reflect-metadata"
import express from 'express'
import bodyParser from 'body-parser';
import config from 'config'
import logger from './utils/logger'
import {router} from "./routes";
import {db} from "../config/Database";

const app = express()

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api/v1/', router)

// config
const port = config.get<number>('port')

async function main(){
    try {
        await db.initialize()
        app.listen(port)
        logger.info(`server is running at http://localhost:${port}`)
    }catch (error){
        logger.error(error, 'fail to start server')
    }
}

main();