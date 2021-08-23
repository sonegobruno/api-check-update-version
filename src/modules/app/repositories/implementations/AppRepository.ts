
// ------------------------------------------------------
// Importa o arquivo de conexão com o banco de dados
// ------------------------------------------------------
import { App } from '../../entities/App';
import { ICreateAppDTO, IUpdateAppDTO } from '../AppDTO';
import { AppError } from '../../../../errors';
import { getRepository, Repository } from 'typeorm';

export interface IAppRepository {
    findById: (id: string) => Promise<App>;
    delete: (id: string) => Promise<void>;
    create: (body: ICreateAppDTO) => Promise<void>;
    update: (body: IUpdateAppDTO) => Promise<void>;
}

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
            throw err;
        }
    }


    public async findById(id: string): Promise<App> {
        try {
            const app = await this.repository.findOne({id});

            return app;
        } catch(err) {
            console.log(err);
            throw new AppError('Erro ao fazer consulta', 500)
        }
    }


    public async delete(id: string): Promise<void> {
        try {
            await this.repository.delete({ id });
        } catch(err) {
            throw err;
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
            throw err;
        }
    }


}

export default AppRepository;