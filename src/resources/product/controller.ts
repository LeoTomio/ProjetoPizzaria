
import { Request, Response } from "express";
import { ProductService } from "./service";
import { UploadedFile } from "express-fileupload";
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary'


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
})
export class ProductController {

    async GetOne(request: Request, response: Response) {
        try {
            const listProduct = new ProductService();
            const products = await listProduct.GetOne(String(request.params.id))
            return response.json(products)
        } catch (error) {
            console.log(error)
            return error
        }
    }

    async List(request: Request, response: Response) {
        try {
            const listProduct = new ProductService();
            const products = await listProduct.List()
            return response.json(products)
        } catch (error) {
            console.log(error)
            return error
        }
    }

    async Create(request: Request, response: Response) {
        try {
            const createProduct = new ProductService()
            if (!request.files || Object.keys(request.files).length === 0) {
                throw new Error("error upload file image")
            } else {
                const file: UploadedFile = request.files['file'] as UploadedFile
                const resultFile: UploadApiResponse = await new Promise((resolve, reject) => {
                    cloudinary.uploader.upload_stream({}, function (error, result) {
                        if (error) {
                            reject(error);
                            return
                        }
                        resolve(result)
                    }).end(file.data)
                })
                request.body.banner = resultFile.url

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