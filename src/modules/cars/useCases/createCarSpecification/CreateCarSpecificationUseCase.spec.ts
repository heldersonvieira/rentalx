import { AppErros } from '../../../../shared/errors/AppErros';
import { CarsRepositoryInMemory } from '../../repositories/in-memory/CarsRepositoryInMamory';
import { SpecificationsRepositoryInMemory } from '../../repositories/in-memory/SpecificationsRepositoryInMemory';
import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase';

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory;

describe('Create car specification', () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        specificationsRepositoryInMemory =
            new SpecificationsRepositoryInMemory();
        createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
            carsRepositoryInMemory,
            specificationsRepositoryInMemory
        );
    });

    it('should not be able to add a specification to a non-existent car', async () => {
        const car_id = '123';
        const specifications_id = ['54321'];
        await expect(createCarSpecificationUseCase.execute({
                car_id,
                specifications_id,
            })
        ).rejects.toEqual(new AppErros('Car does not exists'));
    });

    it('should be able to add a specification to the car', async () => {
        const car = await carsRepositoryInMemory.create({
            name: 'Car',
            description: 'Description car',
            daily_rate: 100,
            license_plate: 'ABC-1234',
            fine_amount: 60,
            brand: 'Brand',
            category_id: 'Category',
        });

        const speciticationTest1 =
            await specificationsRepositoryInMemory.create({
                description: 'Description test',
                name: 'Test',
            });

        const speciticationTest2 =
            await specificationsRepositoryInMemory.create({
                description: 'Description test',
                name: 'Test',
            });

        const specifications_id = [
            speciticationTest1.id,
            speciticationTest2.id,
        ];

        const specificationsCars = await createCarSpecificationUseCase.execute({
            car_id: car.id,
            specifications_id,
        });

        expect(specificationsCars).toHaveProperty('specifications');
        expect(specificationsCars.specifications).toHaveLength(2);
    });
});
