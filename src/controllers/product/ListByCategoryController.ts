import { Request, Response } from "express";
import { ListByCategoryService } from "../../services/product/ListByCategoryService";

class ListByCategoryController {
    async handle(request: Request, response: Response) { 
        const listByCategory = new ListByCategoryService();
        const products = await listByCategory.executa(String(request.query.category_id))

        return response.json(products)
    }
}
export { ListByCategoryController }