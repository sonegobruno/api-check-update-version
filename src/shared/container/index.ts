import { container } from 'tsyringe';
import AppRepository, { IAppRepository } from '../../modules/app/repositories/implementations/AppRepository';

container.registerSingleton<IAppRepository>(
    "AppRepository",
    AppRepository
)