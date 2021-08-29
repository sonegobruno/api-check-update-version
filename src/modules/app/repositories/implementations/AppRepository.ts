
// ------------------------------------------------------
// Importa o arquivo de conexão com o banco de dados
// ------------------------------------------------------
import { App } from '../../entities/App';
import { IAppRepository } from '../IAppRepository';
import { AppError } from '../../../../errors';
import { getRepository, Repository } from 'typeorm';
import { ICreateAppDTO } from '../../dtos/ICreateAppDTO';
import { IUpdateAppDTO } from '../../dtos/IUpdateAppDTO';

class AppRepository implements IAppRepository{

    private repository: Repository<App>

    constructor() {
        this.repository = getRepository(App)
    }

    public async create({ nome, versao_android, versao_ios }: ICreateAppDTO): Promise<void> {
        try {
            const app = this.repository.create({
                nome,
                versao_android,
                versao_ios
            });

            await this.repository.save(app);
        } catch(err) {
            console.log(err);
            throw new AppError(err);
        }
    }

    public async list(): Promise<App[]> {
        try {
            const app = await this.repository.find();

            return app;
        } catch(err) {
            console.log(err);
            throw new AppError(err);
        }
    }


    public async findById(id: string): Promise<App> {
        try {
            const app = await this.repository.findOne({id});

            return app;
        } catch(err) {
            console.log(err);
            throw new AppError(err);
        }
    }


    public async delete(id: string): Promise<void> {
        try {
            await this.repository.delete({ id });
        } catch(err) {
            throw new AppError(err);
        } 
    }

    public async update({ id, nome, versao_android, versao_ios }: IUpdateAppDTO): Promise<void> {
        try {
            await this.repository.update(id, {
                nome,
                versao_android,
                versao_ios
            });

        } catch(err) {
            console.log(err);
            throw new AppError(err);
        }
    }


}

export default AppRepository;