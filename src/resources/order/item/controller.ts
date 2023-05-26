import { Request, Response } from "express";
import { ItemService } from "./service";

export class ItemController {

    async Create(request: Request, response: Response) {
        try {
            const addItem = new ItemService();
            const item = await addItem.Create(request.body)
            return response.json(item)
        } catch (error) {
            console.log(error)
            return error
        }
    }

    async Remove(request: Request, response: Response) {
        try {
            const item_id = request.query.item_id as string
            const removeItem = new ItemService();
            const item = await removeItem.Remove({ item_id })
            return response.json(item)
        } catch (error) {
            console.log(error)
            return error
        }
    }
}