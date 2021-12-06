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
        const rental = await createRentalUseCase.execute({
            car_id: '12345',
            user_id: '121212',
            expected_return_date: dayAdd24Hours,
        });

        expect(rental).toHaveProperty('id');
        expect(rental).toHaveProperty('start_date');
    });

    it('should not be able to create a new rental if there is another open rental to the same user', async () => {
        expect(async () => {
            await createRentalUseCase.execute({
                car_id: '12345',
                user_id: '121212',
                expected_return_date: dayAdd24Hours,
            });

            await createRentalUseCase.execute({
                car_id: '67891',
                user_id: '121212',
                expected_return_date: dayAdd24Hours,
            });
        }).rejects.toBeInstanceOf(AppErros);
    });

    it('should not be able to create a new rental if there is another open rental to the same car', () => {
        expect(async () => {
            await createRentalUseCase.execute({
                car_id: '12345',
                user_id: '121212',
                expected_return_date: dayAdd24Hours,
            });

            await createRentalUseCase.execute({
                car_id: '12345',
                user_id: '313131',
                expected_return_date: dayAdd24Hours,
            });
        }).rejects.toBeInstanceOf(AppErros);
    });

    it('should not be able to create a new rental with invalid return time', () => {
        expect(async () => {
            await createRentalUseCase.execute({
                car_id: '12345',
                user_id: '121212',
                expected_return_date: dayjs().toDate(),
            });
        }).rejects.toBeInstanceOf(AppErros);
    });
});
