import { DayjsDateProvider } from '../../../../shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { MailProviderInMemory } from '../../../../shared/container/providers/MailProvider/in-memory/MailProviderMemory';
import { AppErros } from '../../../../shared/errors/AppErros';
import { UsersRepositoryInMemory } from '../../repositories/in-memory/UsersRepositoryInMemory';
import { UsersTokensRepositoryInMemory } from '../../repositories/in-memory/UsersTokensRepositoryInMemory';
import { SendForgotPasswordMailUseCase } from './SendForgotPasswordMailUseCase';

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;
let mailProviderInMemory: MailProviderInMemory;

describe('Send forgot mail', () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
        dayjsDateProvider = new DayjsDateProvider();
        mailProviderInMemory = new MailProviderInMemory();
        sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
            usersRepositoryInMemory,
            usersTokensRepositoryInMemory,
            dayjsDateProvider,
            mailProviderInMemory
        );
    });

    it('should be able to send a forgot password mail to user', async () => {
        const sendMail = jest.spyOn(mailProviderInMemory, 'sendMail');

        await usersRepositoryInMemory.create({
            driver_license: '123456',
            email: 'test@test.com',
            name: 'Name test',
            password: '1234',
        });

        await sendForgotPasswordMailUseCase.execute('test@test.com');

        expect(sendMail).toHaveBeenCalled();
    });

    it('should not be able to send an email if user does not exists', async () => {
        await expect(
            sendForgotPasswordMailUseCase.execute('test2@test.com')
        ).rejects.toEqual(new AppErros('Users does not exists'));
    });

    it('should be able to create an user token', async () => {
        const generateTokenMail = jest.spyOn(
            usersTokensRepositoryInMemory,
            'create'
        );
        await usersRepositoryInMemory.create({
            driver_license: '654321',
            email: 'test@test.com.br',
            name: 'Name test 2',
            password: '1234',
        });

        await sendForgotPasswordMailUseCase.execute('test@test.com.br');
        expect(generateTokenMail).toBeCalled();
    });
});
