import { IAppRepository } from '../../repositories/IAppRepository';
import { AppError } from '../../../../errors';
import { inject, injectable} from 'tsyringe';
import { ICreateAppDTO } from '../../dtos/ICreateAppDTO';

@injectable()
class CreateAppUseCase {

    constructor(
        @inject("AppRepository")
        private appRepository: IAppRepository
    ){}

    public async execute({nome, versao_android, versao_ios}: ICreateAppDTO): Promise<void> {

        if(!nome) {
            throw new AppError('Nome não informado')
        }

        const appAlreadyExists = await this.appRepository.findByName(nome);

        if(appAlreadyExists) {
            throw new AppError('App já cadastrado')
        }

        await this.appRepository.create({nome, versao_android, versao_ios});
    }
}

export { CreateAppUseCase };