import { AppErros } from '../../../../shared/errors/AppErros';
import { CarsRepositoryInMemory } from '../../repositories/in-memory/CarsRepositoryInMamory';
import { CreateCarUseCase } from './CreateCarUseCase';

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('Create car', () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
    });

    it('should be able to create a new car', async () => {
        const car = await createCarUseCase.execute({
            name: 'Name car',
            description: 'Description car',
            daily_rate: 100,
            license_plate: 'ABC-1234',
            fine_amount: 60,
            brand: 'Brand',
            category_id: 'Category',
        });

        expect(car).toHaveProperty('id');
    });

    it('should not be able to create a car if exists license_plate', async () => {
        await createCarUseCase.execute({
            name: 'Car1',
            description: 'Description car',
            daily_rate: 100,
            license_plate: 'ABC-1234',
            fine_amount: 60,
            brand: 'Brand',
            category_id: 'Category',
        });
        await expect(createCarUseCase.execute({
            name: 'Car1',
            description: 'Description car',
            daily_rate: 100,
            license_plate: 'ABC-1234',
            fine_amount: 60,
            brand: 'Brand',
            category_id: 'Category',
        })
        ).rejects.toEqual(new AppErros('Car already exists'));
    });

    it('should be able to create a car with available true by default', async () => {
        const car = await createCarUseCase.execute({
            name: 'Car Available',
            description: 'Description car',
            daily_rate: 100,
            license_plate: 'ABC-1234',
            fine_amount: 60,
            brand: 'Brand',
            category_id: 'Category',
        });

        expect(car.available).toBe(true);
    });
});
