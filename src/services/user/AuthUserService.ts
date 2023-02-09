import prismaClient from "../../prisma";
import { AuthRequest } from "../../interface/user/AuthRequest";
import { compare } from "bcryptjs";
import { sign } from 'jsonwebtoken'

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

export { AuthUserService }