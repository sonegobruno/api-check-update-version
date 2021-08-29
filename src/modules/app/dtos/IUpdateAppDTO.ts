import { ICreateAppDTO } from "./ICreateAppDTO";

export interface IUpdateAppDTO extends ICreateAppDTO {
    id: string;
}
