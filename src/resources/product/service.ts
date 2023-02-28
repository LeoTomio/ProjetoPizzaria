import prismaClient from "../../prisma";
import { ProductRequest } from "./interface";

class ListByCategoryService {
    async executa(category_id: string) {
        const findByCategory = await prismaClient.product.findMany({
            where: {
                category_id: category_id
            }
        })
        return findByCategory
    }
}

class CreateProductService {
    async execute(response: ProductRequest) {
        const product = await prismaClient.product.create({ data: { ...response } })
        return { product }
    }
}

export { ListByCategoryService, CreateProductService }