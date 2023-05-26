import express from 'express';
import { verifyTokenLogin } from '../../middlewares/verifyToken';
import { OrderController } from '../../resources/order/controler';
import itemRoutes from './item/index';

const router = express.Router();

verifyTokenLogin(router)

router.post('/', new OrderController().Create)

router.delete('/', new OrderController().Remove)

router.put('/send', new OrderController().Send)

router.get('/list', new OrderController().List)

router.get('/detail', new OrderController().Detail)

router.put('/finish', new OrderController().Finish)

router.post('/item', itemRoutes)

export default router;


