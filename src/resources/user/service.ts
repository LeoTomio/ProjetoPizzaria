import prismaClient from "../../prisma";
import { hash } from 'bcryptjs'
import { compare } from "bcryptjs";
import { sign } from 'jsonwebtoken'
import { AuthRequest, UserRequest } from "./interface";

class DetailUserService {
    async execute(user_id: string) {
        const user = await prismaClient.user.findFirst({
            where: {
                id: user_id
            },
            select: {
                id: true,
                name: true,
                email: true
            }
        })
        return { user }
    }
}

class CreateUserService {
    async execute(response: UserRequest) {
        const { email } = response
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

class AuthUserService {
    async execute(response: AuthRequest) {
        const { email, password } = response
        const user = await prismaClient.user.findFirst({
            where: {
                email: email
            }
        })

        if (!user || !await compare(password, user.password)) {
            throw new Error("Usuário ou senha errado")
        }
        //Gerar token JWT e devolve os dados do usuario como id nome e email 
        const token = sign({
            name: user.name,
            email: user.email
        },
            process.env.JWT_SECRET,
            {
                subject: user.id,
                expiresIn: '30d'
            }
        )
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            token: token
        }
    }
}

export { DetailUserService, CreateUserService, AuthUserService }