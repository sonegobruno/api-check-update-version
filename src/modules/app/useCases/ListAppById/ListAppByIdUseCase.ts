import { IAppRepository } from '../../repositories/implementations/AppRepository';
import { AppError } from '../../../../errors';
import { App } from '../../entities/App';
import { inject, injectable} from 'tsyringe';

interface Request {
    id: string,
}

@injectable()
class ListAppByIdUseCase {

    constructor(
        @inject("AppRepository")
        private appRepository: IAppRepository
    ){}

    public async execute({ id }: Request): Promise<App> {
        try {
            const app = await this.appRepository.findById(id);

            if(!app) {
                throw new AppError('Nenhum resultado encontrado', 404)
            }
    
            return app;
        } catch(err) {
            throw new AppError(err.message, err.statusCode)
        }
    }
}

export { ListAppByIdUseCase };