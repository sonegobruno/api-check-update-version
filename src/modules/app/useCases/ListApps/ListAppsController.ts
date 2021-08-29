import { Request, Response } from "express";
import { container } from 'tsyringe';
import { ListAppsUseCase } from "./ListAppsUseCase";

export class ListAppsController {
    async handle(request: Request, response: Response) {
        const listApps = container.resolve(ListAppsUseCase);

        const app = await listApps.execute();

        return response.json(app);
    }
}
