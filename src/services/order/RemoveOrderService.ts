import prismaClient from "../../prisma";
import { OrderRemove } from "../../interface/order/Order";

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
export {RemoveOrderService}