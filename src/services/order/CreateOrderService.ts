import prismaClient from "../../prisma";
import { OrderRequest } from "../../interface/order/Order";


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

export { CreateOrderService }