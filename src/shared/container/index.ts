import { container } from 'tsyringe';
import AppRepository, { IAppRepository } from '../../modules/app/repositories/implementations/AppRepository';
import { UserRepository } from '../../modules/users/repositories/implementations/UserRepository';
import { IUsersRepository } from '../../modules/users/repositories/IUsersRepository';

container.registerSingleton<IAppRepository>(
    "AppRepository",
    AppRepository
);

container.registerSingleton<IUsersRepository>(
    "UserRepository",
    UserRepository
);