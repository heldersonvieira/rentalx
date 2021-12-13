import { AppErros } from '../../../../shared/errors/AppErros';
import { UsersRepositoryInMemory } from '../../repositories/in-memory/UsersRepositoryInMemory';
import { CreateUserUseCase } from './CreateUserUseCase';

let createUserUseCse: CreateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;

describe('Create user', () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        createUserUseCse = new CreateUserUseCase(usersRepositoryInMemory);
    });

    it('should not be able to create an user already exists', async () => {
        await createUserUseCse.execute({
            driver_license: '12345',
            email: 'test4@test.com',
            name: 'jose',
            password: '1234',
        })

        expect(
            await createUserUseCse.execute({
                driver_license: '12345',
                email: 'test4@test.com',
                name: 'jose',
                password: '1234',
            })
        ).rejects.toEqual(new AppErros('User already exists'));
    });
});
