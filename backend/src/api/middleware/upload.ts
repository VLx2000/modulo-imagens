const multer = require('multer');
const crypto = require('crypto');
const fs = require('fs');
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
        const formats = /nii.gz|nii/;   //formatos suportados
        const fileFormat = /\.([^/]+)$/.exec(file.originalname)![1] //separando extensao do arquivo
        //const fileFormat = path.extname(file.originalname);
        console.log('Extensão: ' + fileFormat)
        if (!formats.test(fileFormat)) {
            callback(new Error('Esse formato de arquivo n eh permitido'), file.originalname);
        }
        else {
            const body = req.body! as unknown as FormImage;
            const idsPath = body.idUser + '/' + body.idPaciente;
            const dirImage = dirUploads + idsPath;
            if (!fs.existsSync(dirImage)){   //cria diretorio se n existir
                fs.mkdirSync(dirImage);
            }
            const idImage = crypto.randomUUID();
            const filePath = idsPath + "/" + idImage + '.' + fileFormat;

            callback(null, filePath);
        }
    }
});

// setando config do multer
export const upload = multer({ storage: storage });