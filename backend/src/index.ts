import express, { Application } from 'express';

import routes from 'api/routes';
import dbInit from 'db/init';

dbInit();

const port = 4000;

export const get = () => {
    const app: Application = express();

    // Body parsing Middleware
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // Enable CORS
    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*")
        res.header("Access-Control-Allow-Methods", "DELETE, POST, GET, OPTIONS")
        res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With")
        next();
    });

    app.use('/uploads/', express.static('uploads'));
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
