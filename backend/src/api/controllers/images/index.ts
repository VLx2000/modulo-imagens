import { Request, Response } from 'express';
import { CreateImageDTO, UpdateImageDTO } from 'api/types/image.dto';
import { dirUploads } from 'api/middleware/upload'
import * as service from 'api/services/imageService';
import fs from 'fs';

export const getAll = async (req: Request, res: Response) => {
    const results = await service.getAll();
    return res.status(200).send(results);
}

export const getById = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const result = await service.getById(id);
    return res.status(200).send(result);
}

export const create = async (req: Request, res: Response) => {
    if (!req.file) {
        const error = { code: "ERRO_ARQUIVO" }
        return res.status(422).send(error);
    } else {
        const path: string = req.file!.filename;
        console.log('\n\nArquivo enviado com sucesso para o disco: ' + path);
        const payload: CreateImageDTO = {
            caminho: path,
            tipo: "NIFTI",
            aquisicao: req.body.aquisicao
        };
        const result = await service.create(payload);
        return res.status(201).send(result);
    }
}

export const update = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const payload: UpdateImageDTO = req.body;
    const result = await service.update(id, payload);
    return res.status(200).send(result);
}

export const hide = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const result = await service.deleteById(id);
    return res.status(204).send(result);
}

export const erase = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const caminho = dirUploads + await service.getCaminhoById(id);
    fs.unlink(caminho,
        (async error => {
            if (error) return res.status(422).send(error);
            else {
                console.log("\nDeleted file: " + caminho);
                const result = await service.deleteById(id);
                return res.status(204).send(result);
            }
        })
    );
}