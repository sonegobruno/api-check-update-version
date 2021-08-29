import { Request, Response } from "express";
import { container } from 'tsyringe';
import { UpdateAppUseCase } from "./UpdateAppUseCase";

export class UpdateAppController {
    async handle(request: Request, response: Response) {
        const body = request.body;

        const updateAppService = container.resolve(UpdateAppUseCase);

        await updateAppService.execute(body);
        return response.json({ message: 'Sucesso ao atualizar App'});
    }
}
