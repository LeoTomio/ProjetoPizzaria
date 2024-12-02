import { Router } from 'express';
import { tokenValidator } from '../middlewares/verifyToken';
import { AuthUserController, CreateUserController, DetailuserController } from '../resources/user/controler';
import CategoryRoutes from './category/index';
import OrderRoutes from './order/index';
import ProductRoutes from './product/index';
const router = Router();

router.get('/status', (request, response) => {
  response.status(200).json({ message: "funcionando" });
});
// Rotas user
router.post('/users', new CreateUserController().handle)

router.post('/session', new AuthUserController().handle)

router.use(async (request, response, next) => {
  let verified = await tokenValidator(request);
  if (verified) {
    next();
  } else {
    response.status(401).json({ statusCode: 401, msg: "Token inválido" })
  }
});

router.get('/me', new DetailuserController().handle)

// ---  ROTAS CATEGORY

router.use('/category', CategoryRoutes)

// -- ROTAS PRODUCT

router.use('/product', ProductRoutes)

//-- ROTAS ORDER

router.use('/order', OrderRoutes)

export { router };

