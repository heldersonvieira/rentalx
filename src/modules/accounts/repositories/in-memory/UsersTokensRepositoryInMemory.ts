import { utc } from 'dayjs';
import { ICreateUserTokenDTO } from '../../dtos/ICreateUserTokenDTO';
import { UserToken } from '../../infra/typeorm/entities/UserToken';
import { IUsersTokensRepository } from '../IUsersTokensRepository';

class UsersTokensRepositoryInMemory implements IUsersTokensRepository {
    private usersTokens: UserToken[] = [];

    async create({
        user_id,
        expires_date,
        refresh_token,
    }: ICreateUserTokenDTO): Promise<UserToken> {
        const userToken = new UserToken();
        Object.assign(userToken, {
            user_id,
            expires_date,
            refresh_token,
        });

        this.usersTokens.push(userToken);
        return userToken;
    }

    async findByUserIdAndRefreshToken(
        user_id: string,
        refresh_token: string
    ): Promise<UserToken> {
        const userToken = this.usersTokens.find(
            (ut) => ut.user_id === user_id && ut.refresh_token === refresh_token
        );
        return userToken;
    }
    async deleteById(id: string): Promise<void> {
        const index = this.usersTokens.findIndex((ut) => ut.id === id);
        this.usersTokens.splice(index, 1);
    }
    
    async findByRefreshToken(refreshToken: string): Promise<UserToken> {
        const userToken = this.usersTokens.find(
            (ut) => ut.refresh_token === refreshToken
        );
        return userToken;
    }
}

export { UsersTokensRepositoryInMemory };
