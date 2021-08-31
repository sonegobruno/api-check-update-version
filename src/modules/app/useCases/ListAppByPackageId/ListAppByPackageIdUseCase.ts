import { IAppRepository } from '../../repositories/IAppRepository';
import { AppError } from '../../../../errors';
import { App } from '../../entities/App';
import { inject, injectable} from 'tsyringe';

interface Request {
    id_app: string,
}

@injectable()
class ListAppByPackageIdUseCase {

    constructor(
        @inject("AppRepository")
        private appRepository: IAppRepository
    ){}

    public async execute({ id_app }: Request): Promise<App> {
        const app = await this.appRepository.findByPackageId(id_app);

        if(!app) {
            throw new AppError('Nenhum resultado encontrado', 404)
        }

        return app;
    }
}

export { ListAppByPackageIdUseCase };