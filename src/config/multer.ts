import crypto from 'crypto';
import multer from "multer";
import fs from 'fs'
import { extname, resolve } from "path"

export class MulterFunction {
    upload(folder: string) {
        return {
            storage: multer.diskStorage({
                destination: resolve(__dirname, '..', '..', folder),
                filename: (request, file, callback) => {
                    const fileHash = crypto.randomBytes(16).toString("hex")
                    const fileName = `${fileHash}-${file.originalname}`

                    return callback(null, fileName)
                }
            })
        }
    }

    deleteImg(path: string) {
        if (fs.existsSync(path)) { 
            fs.unlinkSync(path);
            console.log('Imagem excluída com sucesso.');
        }
    }


}