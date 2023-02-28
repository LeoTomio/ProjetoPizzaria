import { ItemAdd, ItemRemove } from "./interface";
import prismaClient from "../../../prisma";

class AddItemService {
    async execute(itemData: ItemAdd) {
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

class RemoveItem {
    async execute(itemData: ItemRemove) {
        const item = await prismaClient.item.delete({
            where: {
                id: itemData.item_id
            }
        })
        return item
    }
}

export { AddItemService, RemoveItem }