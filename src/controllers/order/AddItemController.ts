import { Request, Response } from "express";
import { AddItemService } from "../../services/order/AddItemService";

class AddItemController {
    async handle(request: Request, response: Response) {

        const addItem = new AddItemService();
        const item = await addItem.execute(request.body)

        return response.json(item)
    }
}
export { AddItemController }