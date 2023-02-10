import { Request, Response } from "express";
import { CreateCaregoryService } from "../../services/category/CreateCategoryService";

class CreateCategoryController {
    async handle(request: Request, response: Response) {

        const createCaregoryService = new CreateCaregoryService();

        const category = await createCaregoryService.execute(request.body)

        return response.json(category);

    }
}
export { CreateCategoryController }