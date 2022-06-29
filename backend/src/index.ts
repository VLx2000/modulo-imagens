import express, { Application } from 'express';
import cors_config from 'api/middleware/cors';
import { uploadError } from 'api/middleware/upload';
import imagesRouter from 'api/routes';
import dbInit from 'api/db.init';
import { dirUploads, dirApagados } from 'api/config/saving';

dbInit();

const port = 4000;
const route = '/api/v1/images';

export const start = () => {
    const app: Application = express();

    // Body parsing Middleware
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // Enable CORS
    app.use(cors_config);

    app.use(dirUploads, express.static('uploads'));    //pasta de uploads
    app.use(dirApagados, express.static('apagados'));  //pasta q imagens serão salvas apos serem removidas pelo cliente
    app.use(route, imagesRouter);
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
