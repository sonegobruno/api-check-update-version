
// ------------------------------------------------------
// Importa o arquivo de conexão com o banco de dados
// ------------------------------------------------------
import banco from '../config/banco';
import pg from 'pg';
import { IApp } from '../@types/IApp';
import { ICreateAppDTO, IUpdateAppDTO } from './DTO';
import { AppError } from '../errors';

export interface IAppRepository {
    findById: (id: string) => Promise<IApp>;
    delete: (id: string) => Promise<void>;
    create: (body: ICreateAppDTO) => Promise<void>;
    update: (body: IUpdateAppDTO) => Promise<void>;
}

class AppRepository implements IAppRepository{
    private postgres: pg.Client;

    constructor() {
    }

    public async create({ nome, versao_android, versao_ios }: ICreateAppDTO): Promise<void> {
        this.postgres = new pg.Client(banco.connection);
        this.postgres.connect();

        let query = {
            name: 'create-app',
            text: `INSERT INTO apps (nome, versao_android, versao_ios) VALUES ('${nome}', '${versao_android}', '${versao_ios}')`,
            values: []
        }

        try {
            await this.postgres.query(query);
        } catch(err) {
            console.log(err);
            throw err;
        } finally {
            this.postgres.end();
        }
    }


    public async findById(id: string): Promise<IApp> {
        this.postgres = new pg.Client(banco.connection);
        this.postgres.connect();

        let query = {
            name: 'busca-app-por-id',
            text: `SELECT * FROM apps WHERE id = ${id}`,
            values: []
        }

        try {
            const app = await this.postgres.query(query);

            return app.rows[0];
        } catch(err) {
            console.log(err);
            throw new AppError('Erro ao fazer consulta', 500)
        } finally {
            this.postgres.end();
        }
    }


    public async delete(id: string): Promise<void> {
        this.postgres = new pg.Client(banco.connection);
        this.postgres.connect();

        let query = {
            name: 'deleta-app-por-id',
            text: `DELeTE FROM apps WHERE id = ${id}`,
            values: []
        }

        try {
            await this.postgres.query(query);
        } catch(err) {
            throw err;
        } finally {
            this.postgres.end();
        }
    }

    public async update({ id, nome, versao_android, versao_ios }: IUpdateAppDTO): Promise<void> {
        this.postgres = new pg.Client(banco.connection);
        this.postgres.connect();

        let query = {
            name: 'create-app',
            text: `UPDATE apps SET nome = '${nome}',  versao_android = '${versao_android}', versao_ios = '${versao_ios}' WHERE id = ${id}`,
            values: []
        }

        try {
            await this.postgres.query(query);
        } catch(err) {
            console.log(err);
            throw new AppError('Erro ao deletar App', 500)
        } finally {
            this.postgres.end();
        }
    }


}

export default AppRepository;