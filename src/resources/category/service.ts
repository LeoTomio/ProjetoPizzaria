import prismaClient from "../../prisma";
import { CategoryRequest } from "./interface";

class ListCategoryService {
    async execute() {
        const category = await prismaClient.category.findMany({
            select: {
                id: true,
                name: true,
            }
        })
        return category
    }
}

class CreateCaregoryService {
    async execute(response: CategoryRequest) {
        const { name } = response

        if (name === '') {
            throw new Error('Nome invalido')
        }

        const category = await prismaClient.category.create({
            data: {
                name: name
            },
            select: {
                id: true,
                name: true
            }
        })
        return category;
    }
}

export { CreateCaregoryService, ListCategoryService }