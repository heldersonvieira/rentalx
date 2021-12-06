import { v4 as uuidv4 } from 'uuid';
import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity('cars_image')
class CarImage {
    map(arg0: (image: any) => Promise<void>) {
        throw new Error('Method not implemented.');
    }
    length(length: any) {
        throw new Error('Method not implemented.');
    }
    @PrimaryColumn()
    id?: string;

    @Column()
    car_id: string;

    @Column()
    image_name: string;

    @CreateDateColumn()
    created_at: Date;

    constructor() {
        if (!this.id) {
            this. id = uuidv4();
        }
    }
}

export { CarImage };
