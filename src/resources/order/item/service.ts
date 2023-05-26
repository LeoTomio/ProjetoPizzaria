import { ApiResponse } from "../../../config/apiReturn";
import prismaClient from "../../../prisma";
import { ItemAdd, ItemRemove } from "./interface";

export class ItemService {
    async Create(itemData: ItemAdd) {
        try {
            await prismaClient.item.create({
                data: {
                    amount: itemData.amount,
                    order_id: itemData.order_id,
                    product_id: itemData.product_id

                }
            })
            return new ApiResponse('Item inserido', 200)
        } catch (error) {
            console.log(error)
            return error

        }
    }

    async Remove(itemData: ItemRemove) {
        try {
            await prismaClient.item.delete({
                where: {
                    id: itemData.item_id
                }
            })
            return new ApiResponse('Item removido', 200)
        } catch (error) {
            console.log(error)
            return error
        }
    }
}
