import { inject, injectable } from 'tsyringe';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { IUsersRepository } from '../../repositories/IUsersRepository';
import { AppErros } from '../../../../shared/errors/AppErros';

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: {
        name: string;
        email: string;
    };
    token: string;
}

@injectable()
class AuthenticateUserUseCase {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository
    ) {}

    async execute({ email, password }: IRequest): Promise<IResponse> {
        // usuario existe
        const user = await this.usersRepository.findByEmail(email);

        if (!user) {
            throw new AppErros('Email or password incorrect');
        }

        //senha esta correta
        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) {
            throw new AppErros('Email or password incorrect');
        }

        // gerar jsonwebtoken
        const token = sign({}, 'b9b3527123d1a59e9f897a62154e051e', {
            subject: user.id,
            expiresIn: '1d',
        });

        return {
            user: {
                name: user.name,
                email: user.email,
            },
            token,
        };
    }
}

export { AuthenticateUserUseCase };
