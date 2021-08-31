import { Request, Response } from "express";
import { container } from 'tsyringe';
import { ListAppByPackageIdUseCase } from "./ListAppByPackageIdUseCase";

export class ListAppByPackageIdController {
    async handle(request: Request, response: Response) {
        const { id_app } = request.params ;

        const listAppByPackageId = container.resolve(ListAppByPackageIdUseCase);

        const app = await listAppByPackageId.execute({id_app: id_app as string});
        return response.json(app);
    }
}
