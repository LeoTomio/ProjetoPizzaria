import express from 'express';
import { verifyTokenLogin } from '../../middlewares/verifyToken';
import { CategoryController } from '../../resources/category/controler';

const router = express.Router();

verifyTokenLogin(router)

router.route('/:id').get(new CategoryController().GetOne)

router.route('/').get(new CategoryController().List)

router.route('/').post(new CategoryController().Create)

router.route('/').put(new CategoryController().Edit)

router.route('/:id').delete(new CategoryController().Delete)

export default router;


