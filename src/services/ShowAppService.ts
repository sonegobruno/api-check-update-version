import AppRepository, { IAppRepository } from '../repositories/AppRepository';
import { IApp } from '../@types/IApp';
import { AppError } from '../errors';

interface Request {
    id: string,
}

class ShowAppService {
    private appRepository: IAppRepository;

    constructor(){
        this.appRepository = new AppRepository();
    }

    public async execute({ id }: Request): Promise<IApp> {
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

export default ShowAppService;