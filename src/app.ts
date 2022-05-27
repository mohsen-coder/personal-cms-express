import express from 'express'
import bodyParser from 'body-parser';
import config from 'config'
import logger from './utils/logger'
import routes from "./routes";

const app = express()

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }));

// config
const port = config.get<number>('port')

app.listen(port, async () => {
    logger.info(`server is running at http://localhost:${port}`)
    routes(app)
})