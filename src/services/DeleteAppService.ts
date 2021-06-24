import AppRepository, { IAppRepository } from '../repositories/AppRepository';
import { AppError } from '../errors';

interface Request {
    id: string,
}

class DeleteAppService {
    private appRepository: IAppRepository;

    constructor(){
        this.appRepository = new AppRepository();
    }

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

export default DeleteAppService;