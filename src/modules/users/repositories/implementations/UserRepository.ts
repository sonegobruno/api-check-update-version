
// ------------------------------------------------------
// Importa o arquivo de conexão com o banco de dados
// ------------------------------------------------------
import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';
import { AppError } from '../../../../errors';
import { getRepository, Repository } from 'typeorm';
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';


class UserRepository implements IUsersRepository{

    private repository: Repository<User>

    constructor() {
        this.repository = getRepository(User)
    }

    public async create({ nome, email, password }: ICreateUserDTO): Promise<void> {
        try {
            const user = this.repository.create({
                nome,
                email,
                password
            });

            await this.repository.save(user);
        } catch(err) {
            console.log(err);
            throw new AppError(err);
        }
    }

    public async findByEmail(email: string): Promise<User> {
        try {
            const user = this.repository.findOne({ email });

            return user;
        } catch(err) {
            console.log(err);
            throw new AppError(err);
        }
    }

    public async findById(id: string): Promise<User> {
        try {
            const user = this.repository.findOne(id);

            return user;
        } catch(err) {
            console.log(err);
            throw new AppError(err);
        }
    }
}

export { UserRepository };