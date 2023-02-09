import { UserRequest } from '../../interface/user/CreateUser'
import prismaClient from '../../prisma'
import { hash } from 'bcryptjs'

class CreateUserService {
    async execute(response: UserRequest) {
        const { name, email, password } = response
        console.log(response)
        //Verifica se foi enviado um email
        if (!email) {
            throw new Error("Email incorreto")
        }

        //Verifica se esse email já está cadastrado no banco
        await prismaClient.user.findFirst({ where: { email: email } }).then(async (exists) => {
            if (exists)
                throw new Error('Usuario ja existe')
        })
        response.password = await hash(response.password, 8)
        const user = await prismaClient.user.create({
            data: {
                ...response
            },
            select: {
                id: true,
                name: true,
                email: true
            }
        })

        return user
    }
}

export { CreateUserService }