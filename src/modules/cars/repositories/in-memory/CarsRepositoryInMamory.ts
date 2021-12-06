import { ICreateCarDTO } from '../../dto/ICreateCarDTO';
import { Car } from '../../infra/typeorm/entities/Car';
import { ICarsRepository } from '../ICarsRepository';

class CarsRepositoryInMemory implements ICarsRepository {
    cars: Car[] = [];

    async create({
        name,
        description,
        daily_rate,
        license_plate,
        fine_amount,
        brand,
        category_id,
        specifications,
        id,
    }: ICreateCarDTO): Promise<Car> {
        const car = new Car();

        Object.assign(car, {
            name,
            description,
            daily_rate,
            license_plate,
            fine_amount,
            brand,
            category_id,
            specifications,
            id,
        });

        this.cars.push(car);

        return car;
    }

    async findByLicensePlate(license_plate: string): Promise<Car> {
        return this.cars.find((car) => car.license_plate === license_plate);
    }

    async findAvailable(
        name?: string,
        category_id?: string,
        brand?: string
    ): Promise<Car[]> {
        const cars = this.cars.filter((car) => {
            if (
                car.available === true ||
                (name && car.name.toLowerCase() === name.toLowerCase()) ||
                (category_id && car.category_id === category_id) ||
                (brand && car.brand.toLowerCase() === brand.toLowerCase())
            )
                return car;
        });
        return cars;
    }

    async findById(id: string): Promise<Car> {
        return this.cars.find((car) => car.id === id);
    }

    async updateAvailable(id: string, available: boolean): Promise<void> {
        const carIndex = this.cars.findIndex(car => car.id === id);
        this.cars[carIndex].available = available
    }
}

export { CarsRepositoryInMemory };
