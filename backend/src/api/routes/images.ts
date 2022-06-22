import { Router } from 'express';
import { upload } from 'api/middleware/upload';
import * as imageController from 'api/controllers/images';

const imagesRouter = Router();

imagesRouter.get('/', imageController.getAll);
imagesRouter.get(':/id', imageController.getById);
imagesRouter.post('/', upload.single('image'), imageController.create);
imagesRouter.put('/:id', imageController.update);
imagesRouter.delete('/:id', imageController.hide);

export default imagesRouter;