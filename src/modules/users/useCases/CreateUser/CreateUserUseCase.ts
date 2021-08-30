import { AppError } from '../../../../errors';
import { inject, injectable} from 'tsyringe';
import { IUsersRepository } from '../../repositories/IUsersRepository';
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { hash } from 'bcrypt';

@injectable()
class CreateUserUseCase {

    constructor(
        @inject("UserRepository")
        private userRepository: IUsersRepository
    ){}

    public async execute({ nome, email, password }: ICreateUserDTO): Promise<void> {

        if(!nome) {
            throw new AppError('Nome não informado')
        }

        if(!email) {
            throw new AppError('E-mail não informado')
        }

        if(!password) {
            throw new AppError('Senha não informada')
        }

        const userAlreadyExists = await this.userRepository.findByEmail(email);

        if(userAlreadyExists) {
            throw new AppError('Usuario ja existe')
        }

        const passwordHash = await hash(password, 8);

        await this.userRepository.create({nome, password: passwordHash, email});
    }
}

export { CreateUserUseCase };