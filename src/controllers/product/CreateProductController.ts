import { Request, Response } from "express";
import { CreateProductService } from "../../services/product/CreateProductService";

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

export { CreateProductController }