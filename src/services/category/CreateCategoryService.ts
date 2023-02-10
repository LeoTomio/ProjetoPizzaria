import prismaClient from "../../prisma";
import { CategoryRequest } from "../../interface/category/CategoryRequest";

class CreateCaregoryService {
    async execute(response: CategoryRequest) {
        const { name } = response

        if (name === '') {
            throw new Error('Nome invalido')
        }

        const catergory = await prismaClient.category.create({
            data: {
                name: name
            },
            select: {
                id: true,
                name: true
            }
        })

        return catergory;
    }
}

export { CreateCaregoryService }