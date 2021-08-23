export interface ICreateAppDTO {
    nome: string;
    versao_android: string;
    versao_ios: string;
}

export interface IUpdateAppDTO extends ICreateAppDTO {
    id: string;
}