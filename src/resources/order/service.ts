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

class SendOrderService {
    async execute(order_id: string) {
        const order = await prismaClient.order.update({
            data: {
                draft: false,
            },
            where: {
                id: order_id
            }
        })
        return order
    }
}

class ListOrdersService {
    async execute() {
        const orders = await prismaClient.order.findMany({
            where: {
                draft: false,
                status: false,
            },
            orderBy: {
                created_at: 'desc'
            }
        })
        return orders
    }
}

class DetailOrderService {
    async execute(order_id: string) {
        const order = await prismaClient.item.findMany({
            where: {
                order_id: order_id
            },
            include: {
                product: true,
                order: true

            }
        })
        return order
    }
}

export { CreateOrderService, RemoveOrderService, SendOrderService, ListOrdersService, DetailOrderService }