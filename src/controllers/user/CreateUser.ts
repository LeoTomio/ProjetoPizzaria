import { Request, response, Response } from 'express'
import { CreateUserService } from '../../services/user/CreateUser'

class CreateUserController {
    async handle(req: Request, res: Response) {
        const { name, email, password } = req.body

        const createUserService = new CreateUserService();

        const user = await createUserService.execute( req.body)

        return res.json(user)
    }
}

export { CreateUserController }