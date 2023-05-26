import { ApiResponse } from "../../config/apiReturn";
import prismaClient from "../../prisma";
import { OrderRemove, OrderRequest } from "./interface";

export class OrderService {
    async Remove(removeData: OrderRemove) {
        try {
            await prismaClient.order.delete({
                where: {
                    id: removeData.order_id
                }
            })
            return new ApiResponse('Pedido removido', 200)
        } catch (error) {
            console.log(error)
            return error
        }
    }

    async Create(orderData: OrderRequest) {
        try {
            await prismaClient.order.create({
                data: {
                    table: orderData.table,
                    name: orderData.name,
                }
            })
            return new ApiResponse('Pedido adicionado', 200)
        } catch (error) {
            console.log(error)
            return error
        }
    }

    async Send(order_id: string) {
        try {
            await prismaClient.order.update({
                data: {
                    draft: false,
                },
                where: {
                    id: order_id
                }
            })
            return new ApiResponse('Pedido enviado', 200)
        } catch (error) {
            console.log(error)
            return error
        }
    }

    async List() {
        try {
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
        } catch (error) {
            console.log(error)
            return error
        }
    }

    async Detail(order_id: string) {
        try {
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
        } catch (error) {
            console.log(error)
            return error
        }
    }

    async Finish(order_id: string) {
        try {
            await prismaClient.order.update({
                data: {
                    status: true
                },
                where: {
                    id: order_id
                }
            })
            return new ApiResponse('Pedido finalizado', 200)
        } catch (error) {
            console.log(error)
            return error
        }
    }
}