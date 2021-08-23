import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

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

    constructor() {
        if(!this.id) {
            this.id = uuidv4();
        }
    }

}
