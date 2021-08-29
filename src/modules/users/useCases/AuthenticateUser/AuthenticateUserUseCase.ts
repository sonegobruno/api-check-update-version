import { compare } from 'bcrypt';
import { inject, injectable} from 'tsyringe';
import { sign } from 'jsonwebtoken';
import { AppError } from '../../../../errors';
import { IUsersRepository } from '../../repositories/IUsersRepository';

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: {
        nome: string,
        email: string;
    };
    token: string;
}

@injectable()
class AuthenticateUserUseCase {

    constructor(
        @inject("UserRepository")
        private userRepository: IUsersRepository
    ){}

    public async execute({ email, password} : IRequest): Promise<IResponse> {

        if(!email) {
            throw new AppError('E-mail não informado')
        }

        if(!password) {
            throw new AppError('Senha não informada')
        }

        const user = await this.userRepository.findByEmail(email);

        if(!user) {
            throw new AppError('E-mail ou senha incorreta')
        }

        const passwordMatch = await compare(password, user.password);

        if(!passwordMatch) {
            throw new AppError('E-mail ou senha incorreta')
        }

        const token = sign({}, "46796b236e2931b76f41d9b54794e700", {
            subject: user.id,
            expiresIn: "1d"
        })

        return {
            user: {
                nome: user.nome,
                email: user.email,
            },
            token
        }
    }
}

export { AuthenticateUserUseCase };