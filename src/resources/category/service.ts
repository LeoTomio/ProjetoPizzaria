import { Category } from '@prisma/client';
import moment from 'moment';
import { ApiResponse } from '../../config/apiReturn';
import prismaClient from "../../prisma";
export class CategoryService {

    async GetOne(id: string) {
        try {
            return await prismaClient.category.findFirst({
                select: {
                    id: true,
                    name: true,
                },
                where: {
                    id: id
                }
            })
        } catch (error) {
            console.log(error)
            return error
        }
    }
    async List() {
        try {
            return await prismaClient.category.findMany({
                select: {
                    id: true,
                    name: true,
                },
                orderBy:{
                    name: 'asc'
                }
            })
        } catch (error) {
            console.log(error)
            return error
        }
    }
    async Create(response: Category) {
        try { 
            const { name } = response
            if (name === '') throw new Error('Nome invalido')

            return await prismaClient.category.create({
                data: {
                    name: name
                },
                select: {
                    id: true,
                    name: true
                }
            }) 
        } catch (error) {
            console.log(error)
            return error
        }
    }
    async Edit(response: Category) {
        try {
            const { id, name } = response
            if (name === '') {
                throw new Error('Nome invalido')
            }
            await prismaClient.category.update({
                data: {
                    name: name,
                    updated_at: moment().toDate()
                },
                where: {
                    id: id
                }
            })
            return new ApiResponse('Categoria editada', 200)
        } catch (error) {
            console.log(error)
            return error
        }
    }
    async Delete(id: Category['id']) {
        try {
            let haveProduct = !!await prismaClient.product.findFirst({
                where: {
                    category_id: id
                },
            })
            if (haveProduct) return new ApiResponse('Não é possivel deletar, pois existem produtos cadastrados nesta categoria', 400)
            await prismaClient.category.delete({
                where: {
                    id: id
                }
            })
            return new ApiResponse('Categoria deletada', 200)
        } catch (error) {
            console.log('erro no delete', error)
            return error
        }
    }
}
