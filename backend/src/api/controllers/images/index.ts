import { Request, Response } from 'express';
import { CreateImageDTO, UpdateImageDTO } from 'api/types/image.dto';
import { dirUploads } from 'api/middleware/upload'
import * as service from 'api/services/imageService';
import fs from 'fs';

export const getAll = async (req: Request, res: Response) => {
    const results = await service.getAll();
    return res.status(200).send(results);
}

export const getPacienteImages = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const result = await service.getAllByPaciente(id);
    return res.status(200).send(result);
}

export const create = async (req: Request, res: Response) => {
    // se houver problemas com o multer e salvamento no disco cairá aqui
    if (!req.file) {
        const error = { code: "ERRO_ARQUIVO" }
        return res.status(422).send(error);
    } else {
        const path: string = req.file!.filename; //obtendo caminho em q arquivo foi salva
        console.log('\n\nArquivo enviado com sucesso para o disco: ' + path);
        //criando dto para passar dados para próx camada da aplicação
        const payload: CreateImageDTO = {
            idPaciente: req.body.idPaciente,
            caminho: path,
            tipo: "NIFTI",
            aquisicao: req.body.aquisicao,
            arquivado: false
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

// respinsavel por alterar entre imagem arquivada/N arquivada
export const updateVisibility = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const result = await service.changeVisibility(id);
    return res.status(204).send(result);
}

export const erase = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const caminho = dirUploads + await service.getCaminhoById(id);
    //uso de fs para primeiro apagar imagem do disco e depois info do bd
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