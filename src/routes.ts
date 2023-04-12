import { Router } from 'express';
import multer from 'multer';

import uploadConfig from './config/multer';
import { isAuthenticated } from './middlewares/isAuthenticated';
import { CreateCategoryController, ListCategoryController } from './resources/category/controler';
import { CreateOrderController, DetailOrderController, FinishOrderController, ListOrdersController, RemoveOrderController, SendOrderController } from './resources/order/controler';
import { AddItemController, RemoveItemController } from './resources/order/item/controller';
import { CreateProductController, ListByCategoryController } from './resources/product/controler';
import { AuthUserController, CreateUserController, DetailuserController } from './resources/user/controler';


const router = Router();

const upload = multer(uploadConfig.upload("./tmp"))

// Rotas user
router.post('/users', new CreateUserController().handle)

router.post('/session', new AuthUserController().handle)

router.get('/me', isAuthenticated, new DetailuserController().handle)

// ---  ROTAS CATEGORY

router.post('/category', isAuthenticated, new CreateCategoryController().handle)

router.get('/category', isAuthenticated, new ListCategoryController().handle)

// -- ROTAS PRODUCT

router.post('/product', isAuthenticated, upload.single('file'), new CreateProductController().handle)

router.get('/category/product', isAuthenticated, new ListByCategoryController().handle)

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
