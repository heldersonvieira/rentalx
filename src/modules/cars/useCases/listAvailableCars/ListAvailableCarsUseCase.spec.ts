import { CarsRepositoryInMemory } from '../../repositories/in-memory/CarsRepositoryInMamory';
import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase';

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('List cars', () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory);
    });

    it('should be able to list all available cars', async () => {
        await carsRepositoryInMemory.create({
            name: 'Car1',
            description: 'Car test description',
            daily_rate: 110.0,
            license_plate: 'DEF-5678',
            fine_amount: 40,
            brand: 'Car brand',
            category_id: 'category_id',
        });

        await carsRepositoryInMemory.create({
            name: 'Car2',
            description: 'Car test description',
            daily_rate: 110.0,
            license_plate: 'DEF-5678',
            fine_amount: 40,
            brand: 'Car brand',
            category_id: 'category_id',
        });

        const carNotAvailable = await carsRepositoryInMemory.create({
            name: 'Car not available',
            description: 'Car test not available',
            daily_rate: 110.0,
            license_plate: 'DEF-9876',
            fine_amount: 40,
            brand: 'Car not aviailble',
            category_id: 'category_id',
        });

        carNotAvailable.available = false;

        const cars = await listAvailableCarsUseCase.execute({});
        
        expect(cars).toHaveLength(2);
    });

    it('should be able to list all available cars by name', async () => {
        const carOne = await carsRepositoryInMemory.create({
            name: 'Car3',
            description: 'Car test description',
            daily_rate: 110.0,
            license_plate: 'DEF-5678',
            fine_amount: 40,
            brand: 'Car brand',
            category_id: 'category_id',
        });

        const cars = await listAvailableCarsUseCase.execute({
            name: 'Car3',
        })

        expect(cars).toEqual([carOne]);
    });

    it('should be able to list all available cars by brand', async () => {
        const carOne = await carsRepositoryInMemory.create({
            name: 'Car4',
            description: 'Car test description',
            daily_rate: 110.0,
            license_plate: 'DEF-5678',
            fine_amount: 40,
            brand: 'CarBrand',
            category_id: 'category_id',
        });

        const cars = await listAvailableCarsUseCase.execute({
            brand: 'CarBrand',
        })

        expect(cars).toEqual([carOne]);
    });

    it('should be able to list all available cars by category', async () => {
        const carOne = await carsRepositoryInMemory.create({
            name: 'Car4',
            description: 'Car test description',
            daily_rate: 110.0,
            license_plate: 'DEF-5678',
            fine_amount: 40,
            brand: 'CarBrand',
            category_id: '123456',
        });

        const cars = await listAvailableCarsUseCase.execute({
            category_id: '123456',
        })

        expect(cars).toEqual([carOne]);
    });
});
