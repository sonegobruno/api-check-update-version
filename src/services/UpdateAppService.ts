import AppRepository, { IAppRepository } from '../repositories/AppRepository';
import { IApp } from '../@types/IApp';
import { AppError } from '../errors';

interface Request {
    id: string;
    nome: string;
    versao_android: string;
    versao_ios: string;
}

class UpdateAppService {
    private appRepository: IAppRepository;

    constructor(){
        this.appRepository = new AppRepository();
    }

    public async execute({id, nome, versao_android, versao_ios}: Request): Promise<void> {

        if(!id) {
            throw new AppError('ID não informado')
        }

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
            await this.appRepository.update({ id, nome, versao_android, versao_ios});
        } catch (err) {
            throw new AppError('Erro ao atualizar App', 500)
        }

    }
}

export default UpdateAppService;