import { Request, Response } from "express";
import { container } from 'tsyringe';
import { ListAppByIdUseCase } from "./ListAppByIdUseCase";

export class ListAppByIdController {
    async handle(request: Request, response: Response) {
        const { id } = request.params ;

        const listAppById = container.resolve(ListAppByIdUseCase);

        const app = await listAppById.execute({id: id as string});
        return response.json(app);
    }
}
