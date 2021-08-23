import { Request, Response } from "express";
import { container } from 'tsyringe';
import { RemoveAppByIdUseCase } from "./RemoveAppByIdUseCase";

export class RemoveAppByIdController {
    async handle(request: Request, response: Response) {
        const { id } = request.params ;

        const deleteAppService = container.resolve(RemoveAppByIdUseCase);

        try {
            await deleteAppService.execute({id: id as string});
            return response.json({ message: 'Sucesso ao excluir App'});
        } catch (err) {
            return response.status(err.statusCode).json({ message: err.message});
        }
    }
}
