import { Request } from 'express';
import { NextFunction, Response } from 'express-serve-static-core';
import { UsersRepository } from '../../../../modules/accounts/infra/typeorm/repositories/UsersRespository';
import { AppErros } from '../../../errors/AppErros';

export async function ensureAdmin(
    request: Request,
    response: Response,
    next: NextFunction
) {
    const { id } = request.user;
    const usersRepository = new UsersRepository();
    const user = await usersRepository.findById(id);

    if (!user.isAdmin) {
        throw new AppErros('User not is admin');
    }

    return next();
}
