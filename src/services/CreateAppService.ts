import AppRepository, { IAppRepository } from '../repositories/AppRepository';
import { AppError } from '../errors';

interface Request {
    nome: string;
    versao_android: string;
    versao_ios: string;
}

class CreateAppService {
    private appRepository: IAppRepository;

    constructor(){
        this.appRepository = new AppRepository();
    }

    public async execute({nome, versao_android, versao_ios}: Request): Promise<void> {

        if(!nome) {
            throw new AppError('Nome não informado')
        }

        if(!versao_android) {
            throw new AppError('Versão Android não informado')
        }

        if(!versao_ios) {
            throw new AppError('Versão IOS não informado')
        }

        try {
            await this.appRepository.create({nome, versao_android, versao_ios});
        } catch(err) {
            throw new AppError('Erro ao realizar cadastro', 500)
        }
    }
}

export default CreateAppService;