import { Request, Response } from "express";
import { container } from 'tsyringe';
import { CreateAppUseCase } from "./CreateAppUseCase";

export class CreateAppController {
    async handle(request: Request, response: Response) {
        const body = request.body;

        const createAppUseCase = container.resolve(CreateAppUseCase);

        try {
            await createAppUseCase.execute(body);
            return response.json({ message: 'Sucesso ao realizar cadastro'});
        } catch (err) {
            return response.status(err.statusCode).json({ message: err.message});
        }
    }
}
