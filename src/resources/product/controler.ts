import { Request, Response } from "express";
import { CreateProductService, ListByCategoryService } from "./service";

class ListByCategoryController {
    async handle(request: Request, response: Response) {

        const listByCategory = new ListByCategoryService();
        const products = await listByCategory.executa(String(request.query.category_id))

        return response.json(products)
    }
} 

class CreateProductController {
    async handle(request: Request, response: Response) {

        const createProductService = new CreateProductService()
        if (!request.file) {
            throw new Error("error upload file")
        } else {
            const { originalname, filename } = request.file
            request.body.banner = filename
            const product = await createProductService.execute(request.body)

            return response.json(product)
        }
    }
}

export { CreateProductController, ListByCategoryController }