import { Request, Response } from "express"; 
import { AddItemService, RemoveItem } from "./service";

class AddItemController {
    async handle(request: Request, response: Response) {

        const addItem = new AddItemService();
        const item = await addItem.execute(request.body)

        return response.json(item)
    }
}

class RemoveItemController {
    async handle(request: Request, response: Response) {
        const item_id = request.query.item_id as string
        const removeItem = new RemoveItem();

        const item = await removeItem.execute({ item_id })

        return response.json(item)
    }
}

export { AddItemController, RemoveItemController }