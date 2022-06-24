import multer from 'multer';
import crypto from 'crypto';
import fs from 'fs';
import { Request, Response } from 'express';
//const path = require('path')

// diretório em que serão armazenados os uploads
export const dirUploads = 'uploads/';

type FormImage = {
    idPaciente: number;
    idUser: number;
}

// Configuração de armazenamento
const storage = multer.diskStorage({
    destination: function (req: Express.Request, file: Express.Multer.File, callback: (error: Error | null, destination: string) => void) {
        callback(null, dirUploads);
    },
    filename: function (req: Request, file: Express.Multer.File, callback: (error: Error | null, filename: string) => void) {

        const fileFormat = /\.([^/]+)$/.exec(file.originalname)![1] //separando extensao do arquivo
        const body = req.body! as unknown as FormImage;
        const idsPath = body.idUser + '/' + body.idPaciente;
        const dirImage = dirUploads + idsPath;
        if (!fs.existsSync(dirImage)) {   //cria diretorio se n existir
            fs.mkdirSync(dirImage);
        }
        const idImage = crypto.randomUUID();
        const filePath = idsPath + "/" + idImage + '.' + fileFormat;

        callback(null, filePath);
    }
});

// setando config do multer
export const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024000 * 1024000,
    },
    fileFilter: (req, file, callback) => {
        const formats = /nii.gz|nii/;   //formatos suportados
        const fileFormat = /\.([^/]+)$/.exec(file.originalname)![1] //separando extensao do arquivo
        console.log('Extensão: ' + fileFormat)
        if (formats.test(fileFormat)) {
            callback(null, true);
        } else {
            callback(null, false);
        }
    },
});

//Error handling
export const uploadError = function (err: { code: any; message: string; }, req: Request, res: Response, next: any) {
    if (err instanceof multer.MulterError) {
        res.statusCode = 400;
        res.send({ code: err.code });
    } else if (err) {
        if (err.message === "ERRO_ARQUIVO") {
            res.statusCode = 400;
            res.send({ code: err.message });
        } else {
            res.statusCode = 500;
            res.send({ code: "GENERIC_ERROR" });
        }
    }
};