import express, { Application } from 'express';
import cors_config from 'api/middleware/cors';
import { uploadError } from 'api/middleware/upload';
import routes from 'api/routes';
import dbInit from 'api/db.init';

dbInit();

const port = 4000;

export const start = () => {
    const app: Application = express();

    // Body parsing Middleware
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // Enable CORS
    app.use(cors_config);

    app.use('/uploads/', express.static('uploads'));
    app.use('/api/v1', routes);
    app.use(uploadError);

    try {
        app.listen(port, () => {
            console.log(`Server running on http://localhost:${port}`);
        })
    } catch (error: any) {
        console.log(`Error occurred: ${error.message}`);
    }
}

start();
