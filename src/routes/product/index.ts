


import express from 'express';
import { ProductController } from '../../resources/product/controler';

import multer from 'multer';
import { MulterFunction } from '../../config/multer';


const router = express.Router();

const upload = multer(new MulterFunction().upload("./tmp"))

router.route('/').get(new ProductController().List)

router.route('/').post(upload.single('file'), new ProductController().Create)

router.route('/').put(new ProductController().Edit)

router.route('/:id').delete(new ProductController().Delete)


export default router;


