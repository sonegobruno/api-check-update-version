import { IAppRepository } from '../../repositories/implementations/AppRepository';
import { AppError } from '../../../../errors';
import { inject, injectable} from 'tsyringe';

interface Request {
    id: string,
}

@injectable()
class RemoveAppByIdUseCase {

    constructor(
        @inject("AppRepository")
        private appRepository: IAppRepository
    ){}

    public async execute({ id }: Request): Promise<void> {
        try {
            const app = await this.appRepository.findById(id);

            if(!app) {
                throw new AppError('Nenhum resultado encontrado', 404)
            }

            await this.appRepository.delete(id);
        } catch(err) {
            throw new AppError(err.message, err.statusCode)
        }
    }
}

export { RemoveAppByIdUseCase };