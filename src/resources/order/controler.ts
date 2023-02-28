import { Request, response, Response } from "express";
import { CreateOrderService, DetailOrderService, FinishOrderService, ListOrdersService, RemoveOrderService, SendOrderService } from "./service";

class CreateOrderController {
    async handle(request: Request, respose: Response) {

        const createrOrderService = new CreateOrderService();
        const order = await createrOrderService.execute(request.body);

        return respose.json(order);
    }
}

class RemoveOrderController {
    async handle(request: Request, response: Response) {

        const order_id = request.query.order_id as string;
        const removeOrder = new RemoveOrderService();
        const order = await removeOrder.execute({ order_id });

        return response.json(order);
    }
}

class SendOrderController {
    async handle(request: Request, response: Response) {

        const order_id = request.body.order_id as string;
        const sendOrder = new SendOrderService();
        const order = await sendOrder.execute(order_id);

        return response.json(order);
    }
}

class ListOrdersController {
    async handle(request: Request, response: Response) {

        const listOrders = new ListOrdersService();
        const orders = await listOrders.execute();

        return response.json(orders);
    }
}

class DetailOrderController {
    async handle(request: Request, response: Response) {

        const order_id = request.query.order_id as string;
        const detailOrder = new DetailOrderService();
        const order = await detailOrder.execute(order_id);
        return response.json(order)
    }
}

class FinishOrderController {
    async handle(request: Request, response: Response) {

        const order_id = request.body.order_id as string;
        const finishOrder = new FinishOrderService();
        const order = await finishOrder.execute(order_id);

        return response.json(order);
    }
}

export { RemoveOrderController, CreateOrderController, SendOrderController, ListOrdersController, DetailOrderController, FinishOrderController }