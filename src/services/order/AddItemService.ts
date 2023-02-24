import ItemRequest from "../../interface/order/Item";
import prismaClient from "../../prisma";

class AddItemService {
    async execute(itemData: ItemRequest) {
        const item = await prismaClient.item.create({
            data: {
                amount: itemData.amount,
                order_id: itemData.order_id,
                product_id: itemData.product_id

            }
        })
        return item

    }
}
export { AddItemService }