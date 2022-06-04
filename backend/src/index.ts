import express, { Application, Request, Response } from 'express';

import routes from './api/routes';
import dbInit from './db/init';

dbInit();

const port = 4000;

export const get = () => {
    const app: Application = express();

    // Body parsing Middleware
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.get('/', async (req: Request, res: Response): Promise<Response> => {
        return res.status(200).send({ message: `Endpoints available at http://localhost:${port}/api/v1` });
    })
    // Enable CORS
    app.use(function (req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        next();
    });

    app.use(express.static('uploads'));
    app.use('/api/v1', routes);

    return app
}

export const start = () => {
    const app = get();
    try {
        app.listen(port, () => {
            console.log(`Server running on http://localhost:${port}`);
        })
    } catch (error: any) {
        console.log(`Error occurred: ${error.message}`);
    }
}

start();