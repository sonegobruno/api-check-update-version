import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity('apps')
export class App {

    @PrimaryColumn()
    id?: string;

    @Column()
    nome: string;

    @Column()
    versao_android: string;

    @Column()
    versao_ios: string;

    @CreateDateColumn()
    created_at: Date;

}
