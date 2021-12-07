import dayjs from 'dayjs';
import { DayjsDateProvider } from '../../../../shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { AppErros } from '../../../../shared/errors/AppErros';
import { CarsRepositoryInMemory } from '../../../cars/repositories/in-memory/CarsRepositoryInMamory';
import { RentalsRepositoryInMemory } from '../../repositories/in-memory/RentalsRepositoryInMemory';
import { CreateRentalUseCase } from './CreateRentalUseCase';

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;

describe('Create Rental', () => {
    const dayAdd24Hours = dayjs().add(1, 'day').toDate();

    beforeEach(() => {
        rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        dayjsDateProvider = new DayjsDateProvider();
        createRentalUseCase = new CreateRentalUseCase(
            rentalsRepositoryInMemory,
            dayjsDateProvider,
            carsRepositoryInMemory
        );
    });

    it('should be able to create a new rental', async () => {
        const car = await carsRepositoryInMemory.create({
            name: 'Test',
            description: 'Car test',
            daily_rate: 100,
            license_plate: 'test',
            fine_amount: 40,
            category_id: '1234',
            brand: 'brand',
        });

        const rental = await createRentalUseCase.execute({
            car_id: car.id,
            user_id: '121212',
            expected_return_date: dayAdd24Hours,
        });

        expect(rental).toHaveProperty('id');
        expect(rental).toHaveProperty('start_date');
    });

    it('should not be able to create a new rental if there is another open rental to the same user', async () => {
        const car = await rentalsRepositoryInMemory.create({
            car_id: '22222',
            user_id: '22222',
            expected_return_date: dayAdd24Hours,
        });

        await expect(
            createRentalUseCase.execute({
                car_id: car.id,
                user_id: car.user_id,
                expected_return_date: dayAdd24Hours,
            })
        ).rejects.toEqual(new AppErros("There's a rental in progress for user"));
    });

    it('should not be able to create a new rental if there is another open rental to the same car', async () => {
        const car = await rentalsRepositoryInMemory.create({
            car_id: '33333',
            user_id: '33333',
            expected_return_date: dayAdd24Hours,
        });

        await expect(
            createRentalUseCase.execute({
                car_id: car.id,
                user_id: car.user_id,
                expected_return_date: dayAdd24Hours,
            })
        ).rejects.toEqual(new AppErros("There's a rental in progress for user"));
    });

    it('should not be able to create a new rental with invalid return time', async () => {
        await expect(
            createRentalUseCase.execute({
                car_id: '12345',
                user_id: '121212',
                expected_return_date: dayjs().toDate(),
            })
        ).rejects.toEqual(new AppErros('Invalid return time'));
    });
});
