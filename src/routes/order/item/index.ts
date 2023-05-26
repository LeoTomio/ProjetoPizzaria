import express from 'express';
import { verifyTokenLogin } from '../../../middlewares/verifyToken';
import { ItemController } from '../../../resources/order/item/controller';

const router = express.Router();

verifyTokenLogin(router)

router.post('/add', new ItemController().Create)

router.delete('/remove', new ItemController().Remove)

export default router;


