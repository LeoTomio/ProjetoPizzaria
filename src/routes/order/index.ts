import express from 'express';
import { verifyTokenLogin } from '../../middlewares/verifyToken';
import { OrderController } from '../../resources/order/controler';
import itemRoutes from './item/index';

const router = express.Router();

// verifyTokenLogin(router)

router.post('/', new OrderController().Create)

router.delete('/:id', new OrderController().Remove)

router.put('/send/:id', new OrderController().Send)

router.get('/list', new OrderController().List)

router.get('/detail/:id', new OrderController().Detail)

router.put('/finish/:id', new OrderController().Finish)

router.use('/item', itemRoutes)

export default router;


