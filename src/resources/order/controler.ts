import { Request, Response } from "express";
import { CreateOrderService, RemoveOrderService } from "./service";

class CreateOrderController {
    async handle(request: Request, respose: Response) {

        const createrOrderService = new CreateOrderService();
        const order = await createrOrderService.execute(request.body)

        return respose.json(order)
    }
}

class RemoveOrderController {
    async handle(request: Request, response: Response) {

        const order_id = request.query.order_id as string;
        const removeOrder = new RemoveOrderService();
        const order = await removeOrder.execute({ order_id });

        return response.json(order)
    }
}

export { RemoveOrderController, CreateOrderController }