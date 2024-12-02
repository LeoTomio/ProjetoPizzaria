


import express from 'express';
import { ProductController } from '../../resources/product/controller';

// import multer from 'multer';
// import { MulterFunction } from '../../config/multer';
import { verifyTokenLogin } from '../../middlewares/verifyToken';

const router = express.Router();

verifyTokenLogin(router)

// const upload = multer(new MulterFunction().upload("./tmp"))

router.route('/:id').get(new ProductController().GetOne)

router.route('/').get(new ProductController().List)

// router.route('/').post(upload.single('file'), new ProductController().Create)
router.route('/').post(new ProductController().Create)

router.route('/').put(new ProductController().Edit)

router.route('/:id').delete(new ProductController().Delete)


export default router;


