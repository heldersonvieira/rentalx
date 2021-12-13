import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { AppErros } from '../../../errors/AppErros';
import { UsersTokensRepository } from '../../../../modules/accounts/infra/typeorm/repositories/UsersTokensRepository';
import auth from '../../../../config/auth';

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
            auth.secret_token
        ) as IPayload;

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