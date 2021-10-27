import { Column, CreateDateColumn, Entity, PrimaryColumn, Timestamp } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity('specifications')
class Spectification {
    @PrimaryColumn()
    id?: String;

    @Column()
    name: String;

    @Column()
    description: String;

    @CreateDateColumn()
    created_at: Date;

    constructor() {
        if (!this.id) {
            this.id = uuidv4();
        }
    }
}

export { Spectification };
