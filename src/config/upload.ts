import multer from 'multer';
import { resolve } from 'path'; // do proprio node
import crypto from 'crypto'; // do proprio node

export default {
    upload(folder: string) {
        return {
            storage: multer.diskStorage({
                destination: resolve(__dirname, '..', '..', folder),
                filename: (request, file, callback) => {
                    const fileHash = crypto.randomBytes(16).toString('hex'); // criando hash randomicamente para evitar nomes duplicados
                    const fileName = `${fileHash}-${file.originalname}`;

                    return callback(null, fileName);
                },
            }),
        };
    },
};
