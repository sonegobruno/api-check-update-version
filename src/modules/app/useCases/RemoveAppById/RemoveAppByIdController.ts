import { Request, Response } from "express";
import { container } from 'tsyringe';
import { RemoveAppByIdUseCase } from "./RemoveAppByIdUseCase";

export class RemoveAppByIdController {
    async handle(request: Request, response: Response) {
        const { id } = request.params ;

        const deleteAppService = container.resolve(RemoveAppByIdUseCase);

        await deleteAppService.execute({id: id as string});
        return response.json({ message: 'Sucesso ao excluir App'});
    }
}
