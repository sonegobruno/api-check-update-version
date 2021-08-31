
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

    public async create(body: ICreateAppDTO): Promise<void> {
        try {
            const app = this.repository.create(body);

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

    public async findByPackageId(id_app: string): Promise<App> {
        try {
            const app = await this.repository.findOne({ id_app });

            return app;
        } catch(err) {
            console.log(err);
            throw new AppError(err);
        }
    }

    public async findByName(nome: string): Promise<App> {
        try {
            const app = await this.repository.findOne({ nome });

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

    public async update({ id, ...rest }: IUpdateAppDTO): Promise<void> {
        try {
            await this.repository.update(id, {...rest});

        } catch(err) {
            console.log(err);
            throw new AppError(err);
        }
    }


}

export default AppRepository;