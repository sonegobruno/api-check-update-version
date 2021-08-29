import { IAppRepository } from '../../repositories/IAppRepository';
import { AppError } from '../../../../errors';
import { App } from '../../entities/App';
import { inject, injectable} from 'tsyringe';

@injectable()
class ListAppsUseCase {

    constructor(
        @inject("AppRepository")
        private appRepository: IAppRepository
    ){}

    public async execute(): Promise<App[]> {
        const app = await this.appRepository.list();

        if(!app) {
            throw new AppError('Nenhum resultado encontrado', 404)
        }

        return app;
    }
}

export { ListAppsUseCase };