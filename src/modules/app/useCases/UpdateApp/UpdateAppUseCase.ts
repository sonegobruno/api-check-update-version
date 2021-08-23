import { IAppRepository } from '../../repositories/implementations/AppRepository';
import { AppError } from '../../../../errors';
import { inject, injectable} from 'tsyringe';

interface Request {
    id: string;
    nome: string;
    versao_android: string;
    versao_ios: string;
}

@injectable()
class UpdateAppUseCase {

    constructor(
        @inject("AppRepository")
        private appRepository: IAppRepository
    ){}

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

export { UpdateAppUseCase };