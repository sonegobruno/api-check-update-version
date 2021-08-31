import { ICreateAppDTO } from "../dtos/ICreateAppDTO";
import { IUpdateAppDTO } from "../dtos/IUpdateAppDTO";
import { App } from "../entities/App";

export interface IAppRepository {
    create: (body: ICreateAppDTO) => Promise<void>;
    findById: (id: string) => Promise<App>;
    findByPackageId: (id_app: string) => Promise<App>;
    findByName: (nome: string) => Promise<App>;
    list: () => Promise<App[]>;
    update: (body: IUpdateAppDTO) => Promise<void>;
    delete: (id: string) => Promise<void>;
}