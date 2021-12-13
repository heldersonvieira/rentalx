import { inject, injectable } from 'tsyringe';
import { v4 as uuidv4 } from 'uuid';
import { resolve } from 'path';
import { IDateProvider } from '../../../../shared/container/providers/DateProvider/IDateProvider';
import { IMailProvider } from '../../../../shared/container/providers/MailProvider/IMailProvider';
import { AppErros } from '../../../../shared/errors/AppErros';
import { IUsersRepository } from '../../repositories/IUsersRepository';
import { IUsersTokensRepository } from '../../repositories/IUsersTokensRepository';

@injectable()
class SendForgotPasswordMailUseCase {
    constructor(
        @inject('UsersRepository')
        private usersRepositoru: IUsersRepository,
        @inject('UsersTokensRepository')
        private usersTokensRepository: IUsersTokensRepository,
        @inject('DayjsDateProvider')
        private dayjsDateProvider: IDateProvider,
        @inject('MailProvider')
        private MailProvider: IMailProvider
    ) {}

    async execute(email: string): Promise<void> {
        const user = await this.usersRepositoru.findByEmail(email);
        const templatePath = resolve(
            __dirname,
            '..',
            '..',
            'views',
            'emails',
            'forgotPassword.hbs'
        );

        if (!user) throw new AppErros('Users does not exists');

        const token = uuidv4();

        const expires_date = this.dayjsDateProvider.addHours(3);

        await this.usersTokensRepository.create({
            refresh_token: token,
            user_id: user.id,
            expires_date,
        });

        const variables = {
            name: user.name,
            link: `${process.env.FORGOT_MAIL_URL}${token}`,
        };

        await this.MailProvider.sendMail(
            email,
            'Recuperação de senha',
            variables,
            templatePath
        );
    }
}

export { SendForgotPasswordMailUseCase };
