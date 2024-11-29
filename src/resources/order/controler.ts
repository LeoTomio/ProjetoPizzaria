import { Request, response, Response } from "express";
import { OrderService } from "./service";

export class OrderController {
    async Create(request: Request, respose: Response) {
        const createrOrderService = new OrderService();
        const order = await createrOrderService.Create(request.body);

        return respose.json(order);
    }

    async Remove(request: Request, response: Response) {
        const removeOrder = new OrderService();
        const order = await removeOrder.Remove(request.params.id);

        return response.json(order);
    }

    async Send(request: Request, response: Response) {
        const sendOrder = new OrderService();
        const order = await sendOrder.Send(request.params.id);

        return response.json(order);
    }

    async List(request: Request, response: Response) {
        const listOrders = new OrderService();
        const orders = await listOrders.List();

        return response.json(orders);
    }

    async Detail(request: Request, response: Response) {
        const detailOrder = new OrderService();
        const order = await detailOrder.Detail(request.params.id);

        return response.json(order)
    }

    async Finish(request: Request, response: Response) {
        const finishOrder = new OrderService();
        const order = await finishOrder.Finish(request.params.id);

        return response.json(order);
    }
}