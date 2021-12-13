import { inject, injectable } from 'tsyringe';
import { hash } from 'bcrypt';
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { IUsersRepository } from '../../repositories/IUsersRepository';
import { AppErros } from '../../../../shared/errors/AppErros';
import { User } from '../../infra/typeorm/entities/User';

@injectable()
class CreateUserUseCase {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository
    ) {}

    async execute({
        name,
        password,
        email,
        driver_license,
    }: ICreateUserDTO): Promise<User> {
        const userAlreadyExists = await this.usersRepository.findByEmail(email);

        if (userAlreadyExists) {
            throw new AppErros('User already exists');
        }
        
        const passwordHash = await hash(password, 8);

        const user = await this.usersRepository.create({
            name,
            password: passwordHash,
            email,
            driver_license,
        });

        return user;
    }
}

export { CreateUserUseCase };
