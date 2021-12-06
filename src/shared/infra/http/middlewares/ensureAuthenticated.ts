import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { AppErros } from '../../../errors/AppErros';
import { UsersRepository } from '../../../../modules/accounts/infra/typeorm/repositories/UsersRespository';

interface IPayload {
    sub: string;
}

export async function ensureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction
) {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw new AppErros('Token missing', 401);
    }

    const [, token] = authHeader.split(' ');

    try {
        const { sub: user_id } = verify(
            token,
            'b9b3527123d1a59e9f897a62154e051e'
        ) as IPayload;

        const usersRepository = new UsersRepository();
        const user = await usersRepository.findById(user_id);

        if (!user) {
            throw new AppErros('User does not exists', 401);
        }

        // inserindo o user dentro da requisição, 
        // para ser pegue no UpdateUserAvatarController
        request.user = {
            id: user_id,
        };

        next();
    } catch (error) {
        throw new AppErros('Invalid token', 401);
    }
}
