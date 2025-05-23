import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';

import routes from './routes';
import {
  appErrorHandler,
  genericErrorHandler,
  notFound
} from './middlewares/error.middleware';
import logger, { logStream } from './config/logger';

import morgan from 'morgan';
// import swaggerUi from 'swagger-ui-express';
// import swaggerDocument from './swagger/swagger.json'; 


const app = express();
const host = process.env.APP_HOST;
const port = process.env.APP_PORT;
const api_version = process.env.API_VERSION;

app.use(cors());
app.use(
  helmet({
    contentSecurityPolicy: {
      useDefaults: true,
      directives: {
        "script-src": ["'self'", "https://code.jquery.com"],
        "style-src": ["'self'", "'unsafe-inline'"], 
      },
    },
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('combined', { stream: logStream }));
app.use(express.static(path.join(__dirname, 'src/public')));
app.use(express.static(path.resolve('src/public')));


app.use(`/api/${api_version}`, routes());
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.use(appErrorHandler);
app.use(genericErrorHandler);
app.use(notFound);

app.listen(port, () => {
  logger.info(`Server started at ${host}:${port}/api/${api_version}/`);
  // logger.info(`Swagger UI at ${host}:${port}/api-docs`);
});


export default app;
