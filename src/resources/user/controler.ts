import { Request, Response } from "express";
import { AuthUserService, CreateUserService, DetailUserService } from "./service";

class DetailuserController {
    async handle(request: Request, response: Response) {

        const user_id = request.user_id
        const detailUserService = new DetailUserService();
        const user = await detailUserService.execute(user_id)

        return response.json(user);
    }
}

class CreateUserController {
    async handle(req: Request, res: Response) {

        const createUserService = new CreateUserService();
        const user = await createUserService.execute(req.body)

        return res.json(user)
    }
}

class AuthUserController {
    async handle(request: Request, response: Response) {

        const authUserService = new AuthUserService();
        const auth = await authUserService.execute(request.body)
        return response.json(auth)
    }
}

export { DetailuserController, AuthUserController, CreateUserController }