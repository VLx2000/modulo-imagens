import multer from 'multer';
import crypto from 'crypto';
import fs from 'fs';
import { Request, Response } from 'express';
import { dirUploads } from 'api/config/dir.config';

let filePath: string;

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
        // o caminho e ser salvo será gerado a partir da pasta configurada 
        // a receber uploads + id do usuário + id do paciente + nome gerado aleatoriamente da img
        filePath = idsPath + "/" + idImage + '.' + fileFormat;

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
        // verificando se arquivo eh valido
        if (formats.test(fileFormat)) {
            callback(null, true);
        } else {
            callback(null, false);
        }
        // tratando caso em que houve cancelamento de upload por parte do cliente
        req.on('aborted', () => {
            file.stream.on('end', () => {
                const caminho = dirUploads + filePath
                console.log('Canceling the upload')
                console.log(caminho)
                fs.unlink(caminho, (async error => {
                    if (error) console.log('error');
                    else console.log("\nDeleted file: " + caminho);
                }));
                callback(null, false);
            });
            file.stream.emit('end');
        })
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