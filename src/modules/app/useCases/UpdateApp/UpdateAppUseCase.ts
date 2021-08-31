import { IAppRepository } from '../../repositories/IAppRepository';
import { AppError } from '../../../../errors';
import { inject, injectable} from 'tsyringe';
import { IUpdateAppDTO } from '../../dtos/IUpdateAppDTO';

@injectable()
class UpdateAppUseCase {

    constructor(
        @inject("AppRepository")
        private appRepository: IAppRepository
    ){}

    public async execute({
        id, 
        nome, 
        versao_android, 
        versao_ios,
        descricao,
        id_app,
        tecnologia
    }: IUpdateAppDTO): Promise<void> {

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

        if(!id_app) {
            throw new AppError('Versão IOS não informado')
        }

        if(!tecnologia) {
            throw new AppError('Versão IOS não informado')
        }

        await this.appRepository.update({ 
            id, 
            nome, 
            versao_android, 
            versao_ios,
            descricao,
            id_app,
            tecnologia
        });
    }
}

export { UpdateAppUseCase };