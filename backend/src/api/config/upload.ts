const multer = require('multer');
const crypto = require('crypto');

// Configuração de armazenamento
const storage = multer.diskStorage({
    destination: function (req: Express.Request, file: Express.Multer.File, callback: (error: Error | null, destination: string) => void) {
        callback(null, 'uploads');
    },
    filename: function (req: Request, file: Express.Multer.File, callback: (error: Error | null, filename: string) => void) {
        const id = crypto.randomUUID();
        callback(null, id + file.originalname);
    }
});

// setando config do multer
const upload = multer({ storage: storage });

export default upload;