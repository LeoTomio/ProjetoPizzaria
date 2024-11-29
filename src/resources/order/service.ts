import { ApiResponse } from "../../config/apiReturn";
import prismaClient from "../../prisma";
import { OrderRequest } from "./interface";

export class OrderService {
    async Remove(id: string) {
        try {
            await prismaClient.order.delete({
                where: {
                    id
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
            return await prismaClient.order.create({
                data: {
                    table: orderData.table,
                    name: orderData.name,
                }
            })

            // return new ApiResponse('Pedido adicionado', 200)
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

    async Detail(order_id) {
        try {
            // Consulta ao banco de dados
            const items = await prismaClient.item.findMany({
                where: {
                    order_id: order_id
                },
                include: {
                    product: true,
                    order: true
                }
            });
            if (items.length === 0) {
                return { message: "Nenhum dado encontrado para este pedido." };
            }

            const orderDetails = {
                id: items[0].order.id,
                table: items[0].order.table,
                status: items[0].order.status,
                name: items[0].order.name,
                created_at: items[0].order.created_at,
                updated_at: items[0].order.updated_at,
                products: []
            };

            items.forEach(item => {
                orderDetails.products.push({
                    product_id: item.product.id,
                    name: item.product.name,
                    price: item.product.price,
                    description: item.product.description,
                    banner: item.product.banner,
                    category_id: item.product.category_id,
                    amount: item.amount
                });
            });

            return orderDetails;

        } catch (error) {
            console.error(error);
            throw error;
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