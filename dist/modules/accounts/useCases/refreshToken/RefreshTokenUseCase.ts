import { verify, sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';
import auth from '../../../../config/auth';
import { IDateProvider } from '../../../../shared/container/providers/DateProvider/IDateProvider';
import { AppErros } from '../../../../shared/errors/AppErros';
import { IUsersTokensRepository } from '../../repositories/IUsersTokensRepository';

interface IPayLoad {
    sub: string;
    email: string;
}

interface ITokensReponse {
    token: string;
    refresh_token: string;
}

@injectable()
class RefreshTokenUseCase {
    constructor(
        @inject('UsersTokensRepository')
        private usersTokensRepository: IUsersTokensRepository,
        @inject('DayjsDateProvider')
        private dayjsDateProvider: IDateProvider
    ) {}

    async execute(token: string): Promise<ITokenResponse> {
        const { email, sub } = verify(
            token,
            auth.secret_refresh_token
        ) as IPayLoad;

        const user_id = sub;
        const userToken =
            await this.usersTokensRepository.findByUserIdAndRefreshToken(
                user_id,
                token
            );

        if (!userToken) throw new AppErros('Refresh token does not exists');

        await this.usersTokensRepository.deleteById(userToken.id);

        const refresh_token = sign({ email }, auth.secret_refresh_token, {
            subject: sub,
            expiresIn: auth.expires_in_refresh_token,
        });

        const expires_date = this.dayjsDateProvider.addDays(
            auth.expires_refresh_token_days
        );

        await this.usersTokensRepository.create({
            expires_date,
            refresh_token,
            user_id,
        });

        const newToken = sign({}, auth.secret_token, {
            subject: user_id,
            expiresIn: auth.expires_in_token,
        });

        return { token: newToken, refresh_token };
    }
}

export { RefreshTokenUseCase };