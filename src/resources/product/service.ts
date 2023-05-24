import { ApiResponse } from "../../config/apiReturn";
import { MulterFunction } from "../../config/multer";
import prismaClient from "../../prisma";
import { Product } from '@prisma/client';
import moment from 'moment'
import path from 'path'
export class ProductService {

    async List(category_id: string) {
        try {
            return await prismaClient.product.findMany({
                where: {
                    category_id: category_id
                }
            })
        } catch (error) {
            console.log(error)
            return error
        }
    }

    async Create(response: Product) {
        try {
            await prismaClient.product.create({
                data: {
                    ...response
                }
            })
            return new ApiResponse('Produto Adicionado', 200)
        } catch (error) {
            console.log(error)
            return error
        }
    }

    async Edit(response: Product) {
        try {
            await prismaClient.product.update({
                data: {
                    name: response.name,
                    description: response.description,
                    price: response.price,
                    updated_at: moment().toDate()
                },
                where: {
                    id: response.id,
                }
            })
            return new ApiResponse('Produto Atualizado', 200)
        } catch (error) {
            console.log(error)
            return error
        }
    }

    async Delete(id: Product['id']) {
        try {
            let hasOrder = !!await prismaClient.item.findFirst({
                where: {
                    product_id: id
                }
            })
            if (hasOrder) return new ApiResponse('Não é possivel deletar, pois este item já foi cadastrado em um pedido.', 400)

            const photoName = await prismaClient.product.delete({
                where: {
                    id: id,
                },
                select: {
                    banner: true
                }
            })
            const caminhoImagem = path.join(__dirname, '..', '..', '..', 'tmp', photoName.banner);
            new MulterFunction().deleteImg(caminhoImagem)
            return new ApiResponse('Produto Deletado', 200)
        } catch (error) {
            console.log(error)
            return error
        }
    }
}