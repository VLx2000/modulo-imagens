import { Router } from 'express';
import upload from 'api/config/upload';
import * as imageController from 'api/controllers/images';

const imagesRouter = Router();

imagesRouter.get(':/id', imageController.getById);
imagesRouter.get('/', imageController.getAll);
imagesRouter.post('/', upload.single('image'), imageController.create);
imagesRouter.put('/:id', imageController.update);
imagesRouter.delete('/:id', imageController.erase);

export default imagesRouter;