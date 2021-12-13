import multer from 'multer';
import { resolve } from 'path'; // do proprio node
import crypto from 'crypto'; // do proprio node

const tmpFolder = resolve(__dirname, '..', '..', 'tmp');

export default {
    tmpFolder,

    storage: multer.diskStorage({
        destination: tmpFolder,
        filename: (request, file, callback) => {
            const fileHash = crypto.randomBytes(16).toString('hex'); // criando hash randomicamente para evitar nomes duplicados
            const fileName = `${fileHash}-${file.originalname}`;

            return callback(null, fileName);
        },
    }),
};
