import { Request, response, Response } from "express";
import { OrderService } from "./service";

export class OrderController {
    async Create(request: Request, respose: Response) {
        const createrOrderService = new OrderService();
        const order = await createrOrderService.Create(request.body);

        return respose.json(order);
    }

    async Remove(request: Request, response: Response) {
        const order_id = request.query.order_id as string;
        const removeOrder = new OrderService();
        const order = await removeOrder.Remove({ order_id });

        return response.json(order);
    }

    async Send(request: Request, response: Response) {

        const order_id = request.body.order_id as string;
        const sendOrder = new OrderService();
        const order = await sendOrder.Send(order_id);

        return response.json(order);
    }

    async List(request: Request, response: Response) {
        const listOrders = new OrderService();
        const orders = await listOrders.List();

        return response.json(orders);
    }

    async Detail(request: Request, response: Response) {
        const order_id = request.query.order_id as string;
        const detailOrder = new OrderService();
        const order = await detailOrder.Detail(order_id);

        return response.json(order)
    }

    async Finish(request: Request, response: Response) {
        const order_id = request.body.order_id as string;
        const finishOrder = new OrderService();
        const order = await finishOrder.Finish(order_id);

        return response.json(order);
    }
}