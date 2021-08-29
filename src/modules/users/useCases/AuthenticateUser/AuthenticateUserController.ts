import { Request, Response } from "express";
import { container } from 'tsyringe';
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

export class AuthenticateUserController {
    async handle(request: Request, response: Response) {
        const body = request.body;

        const authenticateUserUseCase = container.resolve(AuthenticateUserUseCase);

        const authenticateInfo = await authenticateUserUseCase.execute(body);
        
        return response.json(authenticateInfo);
    }
}
