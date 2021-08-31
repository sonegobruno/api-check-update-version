import { Request, Response } from "express";
import { container } from 'tsyringe';
import { CreateAppUseCase } from "./CreateAppUseCase";

export class CreateAppController {
    async handle(request: Request, response: Response) {
        const { body } = request;

        const createAppUseCase = container.resolve(CreateAppUseCase);

        await createAppUseCase.execute({
            ...body,
            versao_android: '0.0.0',
            versao_ios: '0.0.0'
        });
        
        return response.json({ message: 'Sucesso ao realizar cadastro'});
    }
}
