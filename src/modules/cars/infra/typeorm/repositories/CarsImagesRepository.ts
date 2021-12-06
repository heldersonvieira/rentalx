import { getRepository, Repository } from 'typeorm';
import { ICarsImagesRepository } from '../../../repositories/ICarsImagesRepository';
import { CarImage } from '../entities/CarImage';

class CarsImagesRepository implements ICarsImagesRepository {
    private repository: Repository<CarImage>;

    constructor() {
        this.repository = getRepository(CarImage);
    }
    async create(car_id: string, image_name: string): Promise<CarImage> {
        const carImage = await this.repository.create({
            car_id,
            image_name,
        });

        await this.repository.save(carImage);

        return carImage;
    }

    async findById(id: string): Promise<CarImage> {
        const carImage = await this.repository.query(
            `SELECT * FROM cars_image WHERE car_id = '${id}'`
        );
        return carImage;
    }
}

export { CarsImagesRepository };
