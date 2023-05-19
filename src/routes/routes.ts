import { Router } from 'express';
import { isAuthenticated } from '../middlewares/isAuthenticated';
import { CreateOrderController, DetailOrderController, FinishOrderController, ListOrdersController, RemoveOrderController, SendOrderController } from '../resources/order/controler';
import { AddItemController, RemoveItemController } from '../resources/order/item/controller';
import { AuthUserController, CreateUserController, DetailuserController } from '../resources/user/controler';
import CategoryRoutes from './category/index';
import ProductRoutes from './product/index';

const router = Router();


// Rotas user
router.post('/users', new CreateUserController().handle)

router.post('/session', new AuthUserController().handle)

router.get('/me', isAuthenticated, new DetailuserController().handle)


// ---  ROTAS CATEGORY

router.use('/category', isAuthenticated, CategoryRoutes)

// -- ROTAS PRODUCT

router.use('/product', isAuthenticated, ProductRoutes)


//-- ROTAS ORDER

router.post('/order', isAuthenticated, new CreateOrderController().handle)

router.delete('/order', isAuthenticated, new RemoveOrderController().handle)

router.post('/order/add', isAuthenticated, new AddItemController().handle)

router.delete('/order/remove', isAuthenticated, new RemoveItemController().handle)

router.put('/order/send', isAuthenticated, new SendOrderController().handle)

router.get('/order/list', isAuthenticated, new ListOrdersController().handle)

router.get('/order/detail', isAuthenticated, new DetailOrderController().handle)

router.put('/order/finish', isAuthenticated, new FinishOrderController().handle)

export { router };

