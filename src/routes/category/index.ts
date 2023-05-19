import express from 'express';
import { CategoryController } from '../../resources/category/controler';

const router = express.Router();

router.route('/').get(new CategoryController().List)

router.route('/').post(new CategoryController().Create)

router.route('/').put(new CategoryController().Edit)

router.route('/:id').delete(new CategoryController().Delete)

export default router;


