import prismaClient from "../../prisma";
import { ProductList } from "../../interface/product/ProductRequest";

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

export { ListByCategoryService }