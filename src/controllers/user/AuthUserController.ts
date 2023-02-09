import { Request, Response } from "express";
import { AuthUserService } from '../../services/user/AuthUserService'


class AuthUserController {
    async handle(request: Request, response: Response) {

        const authUserService = new AuthUserService();

        const auth = await authUserService.execute(request.body)

        return response.json(auth)
    }
}

export { AuthUserController }