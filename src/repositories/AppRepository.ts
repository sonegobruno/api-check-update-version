
// ------------------------------------------------------
// Importa o arquivo de conexão com o banco de dados
// ------------------------------------------------------
import { App } from '../entities/App';
import { ICreateAppDTO, IUpdateAppDTO } from './DTO';
import { AppError } from '../errors';
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
        // this.postgres = new pg.Client(banco.connection);
        // this.postgres.connect();

        // let query = {
        //     name: 'create-app',
        //     text: `UPDATE apps SET nome = '${nome}',  versao_android = '${versao_android}', versao_ios = '${versao_ios}' WHERE id = ${id}`,
        //     values: []
        // }

        // try {
        //     await this.postgres.query(query);
        // } catch(err) {
        //     console.log(err);
        //     throw new AppError('Erro ao deletar App', 500)
        // } finally {
        //     this.postgres.end();
        // }
    }


}

export default AppRepository;