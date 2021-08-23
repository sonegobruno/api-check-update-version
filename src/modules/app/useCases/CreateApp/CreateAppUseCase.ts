import { IAppRepository } from '../../repositories/implementations/AppRepository';
import { AppError } from '../../../../errors';
import { inject, injectable} from 'tsyringe';

interface Request {
    nome: string;
    versao_android: string;
    versao_ios: string;
}

@injectable()
class CreateAppUseCase {

    constructor(
        @inject("AppRepository")
        private appRepository: IAppRepository
    ){}

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

export { CreateAppUseCase };