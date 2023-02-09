import { Request, response, Response } from 'express'
import { CreateUserService } from '../../services/user/CreateUserService'

class CreateUserController {
    async handle(req: Request, res: Response) { 

        const createUserService = new CreateUserService();

        const user = await createUserService.execute(req.body)

        return res.json(user)
    }
}

export { CreateUserController }