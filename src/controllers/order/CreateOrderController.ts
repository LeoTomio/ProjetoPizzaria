import { Request, Response } from "express";
import { CreateOrderService } from "../../services/order/CreateOrderService";

class CreateOrderController {
    async handle(request: Request, respose: Response) {

        const createrOrderService = new CreateOrderService();

        const order = await createrOrderService.execute(request.body)

        return respose.json(order)


    }
}
export { CreateOrderController }