const multer = require('multer');
const crypto = require('crypto');
//const path = require('path')

// Configuração de armazenamento
const storage = multer.diskStorage({
    destination: function (req: Express.Request, file: Express.Multer.File, callback: (error: Error | null, destination: string) => void) {
        callback(null, 'uploads');
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
            const id = crypto.randomUUID();
            const filePath = id + '.' + fileFormat;
            
            callback(null, filePath);
        }
    }
});

// setando config do multer
const upload = multer({ storage: storage });

export default upload;