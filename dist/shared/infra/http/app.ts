import 'reflect-metadata';
import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import swaggerUi from 'swagger-ui-express';

import createConnection from '../typeorm_database';
import '../../container';

import { router } from './routes';
import swaggerFile from '../../../swagger.json';
import { AppErros } from '../../errors/AppErros';
import upload from '../../../config/upload';

createConnection();
const app = express();

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(router);
app.use('/avatar', express.static(`${upload.tmpFolder}/avatar`));
app.use('/cars', express.static(`${upload.tmpFolder}/cars`));

app.use(
    (err: Error, request: Request, response: Response, next: NextFunction) => {
        if (err instanceof AppErros) {
            return response
                .status(err.statusCode)
                .json({ message: err.message });
        }

        return response.status(500).json({
            status: 'error',
            message: `Internal server error = ${err.message}`,
        });
    }
);

export { app };
