import { ProductRequest } from "../../interface/product/ProductRequest";
import prismaClient from "../../prisma";


class CreateProductService {
    async execute(response: ProductRequest) {

        const product = await prismaClient.product.create({ data: { ...response } })

        return { product }

    }
}

export { CreateProductService }