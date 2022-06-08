import { Request, Response } from 'express';
import { CreateImageDTO, UpdateImageDTO } from 'api/dto/image.dto';
import * as service from 'db/services/imageService';
import * as mapper from './mapper';
import fs from 'fs';

export const getById = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const result = mapper.toImage(await service.getById(id));
    return res.status(200).send(result);
}

export const getAll = async (req: Request, res: Response) => {
    const results = (await service.getAll()).map(mapper.toImage);
    return res.status(200).send(results);
}

export const create = async (req: Request, res: Response) => {
    try {
        if (req.file != null) {
            const caminho: String = req.file.filename;
            console.log('Arquivo enviado com sucesso: ' + caminho);
            const payload: CreateImageDTO = { caminho: "uploads/" + caminho, tipo: "nii", aquisicao: "20/08/2009" };
            const result = mapper.toImage(await service.create(payload));
            return res.status(200).send(result);
        }
    } catch (error) {
        console.log(error);
    }
}

export const update = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const payload: UpdateImageDTO = req.body;
    const result = mapper.toImage(await service.update(id, payload));
    return res.status(201).send(result);
}

export const erase = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const caminho = await service.getCaminhoById(id);
        fs.unlink(caminho, 
            (async error => {
                if (error) console.log(error);
                else {
                    console.log("\nDeleted file: " + caminho);
                    const result = await service.deleteById(id);
                    return res.status(204).send(result);
                }
            })
        );
    } catch (error) {
        console.error(error);
    }
}