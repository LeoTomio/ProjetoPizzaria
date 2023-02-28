import { Request, Response } from "express";
import { CreateCaregoryService, ListCategoryService } from "./service";


class ListCategoryController {
    async handle(request: Request, response: Response) {

        const listCategoryService = new ListCategoryService();

        const category = await listCategoryService.execute();
        return response.json(category)
    }
}

class CreateCategoryController {
    async handle(request: Request, response: Response) {

        const createCaregoryService = new CreateCaregoryService();

        const category = await createCaregoryService.execute(request.body)

        return response.json(category);

    }
}
export { CreateCategoryController, ListCategoryController }