import { Router, Request, Response } from 'express'
import { CreateImageDTO, UpdateImageDTO, FilterImageDTO } from '../dto/image.dto'
import upload from '../controllers/images/upload';

import * as imageController from '../controllers/images'

const imagesRouter = Router()

imagesRouter.get(':/id', async (req: Request, res: Response) => {
  const id = Number(req.params.id)

  const result = await imageController.getById(id)
  return res.status(200).send(result)
})

imagesRouter.put('/:id', async (req: Request, res: Response) => {
  const id = Number(req.params.id)
  const payload: UpdateImageDTO = req.body

  const result = await imageController.update(id, payload)
  return res.status(201).send(result)
})

imagesRouter.delete('/:id', async (req: Request, res: Response) => {
  const id = Number(req.params.id)

  const result = await imageController.deleteById(id)
  return res.status(204).send({
    success: result
  })
})

imagesRouter.post('/', upload.single('image'), async (req: Request, res: Response)  => {
  try {
    if (req.file != null){
      const caminho: String = req.file.filename;
      console.log('Arquivo enviado com sucesso:' + caminho);
      //const payload: CreateImageDTO = req.body;
      const payload: CreateImageDTO = { caminho: "/uploads/" + caminho, tipo: "nii", aquisicao: "20/08/2009" };
      const result = await imageController.create(payload);
      return res.status(200).send(result);
    }
  } catch (error) {
      console.log(error);
  }
});

/* imagesRouter.get('/', async (req: Request, res: Response) => {
  const filters:FilterIngredientsDTO = req.query

  const results = await imageController.getAll(filters)
  return res.status(200).send(results)
}) */
export default imagesRouter