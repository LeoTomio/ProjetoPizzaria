import { Request, Response } from "express";
import { ProductService } from "./service";

export class ProductController {
    async List(request: Request, response: Response) {
        try {
            const listProduct = new ProductService();
            const products = await listProduct.List(String(request.query.category_id))
            return response.json(products)
        } catch (error) {
            console.log(error)
            return error
        }
    }

    async Create(request: Request, response: Response) {
        try {
            const createProduct = new ProductService()
            if (!request.file) {
                throw new Error("error upload file")
            } else {
                const { originalname, filename } = request.file
                request.body.banner = filename
                const product = await createProduct.Create(request.body)
                return response.json(product)
            }
        } catch (error) {
            console.log(error)
            return error
        }
    }

    async Edit(request: Request, response: Response) {
        try {
            const editProduct = new ProductService()
            return await editProduct.Edit(request.body).then((data) => {
                return response.status(data.statusCode || 200).send(data)
            })
        } catch (error) {
            console.log(error)
            return response.status(error.statusCode || 500).send(error)
        }
    }

    async Delete(request: Request, response: Response) {
        try {
            const deleteProduct = new ProductService()
            return await deleteProduct.Delete(request.params.id).then((data) => {
                return response.status(data.statusCode || 200).send(data)
            })
        } catch (error) {
            console.log(error)
            return response.status(error.statusCode || 500).send(error)
        }
    }
}