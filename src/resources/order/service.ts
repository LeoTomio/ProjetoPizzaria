import prismaClient from "../../prisma";
import { OrderRemove, OrderRequest } from "./interface";

class RemoveOrderService {
    async execute(removeData: OrderRemove) {

        const order = await prismaClient.order.delete({
            where: {
                id: removeData.order_id
            }
        })
        return order
    }
}

class CreateOrderService {
    async execute(orderData: OrderRequest) {
        const order = await prismaClient.order.create({
            data: {
                table: orderData.table,
                name: orderData.name,

            }
        })
        return order
    }

}

export { CreateOrderService, RemoveOrderService }