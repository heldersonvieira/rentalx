import { inject, injectable } from 'tsyringe';
import { Rental } from '../../infra/typeorm/entities/Rental';
import { IRentalsRepository } from '../../repositories/IRentalsRepository';

@injectable()
class ListRentalsByUserUseCase {
    constructor(
        @inject('RentalsRepository')
        private rentalsRepositoy: IRentalsRepository
    ) {}

    async execute(user_id: string): Promise<Rental[]> {
        const rentalsByUser = await this.rentalsRepositoy.findByUser(
            user_id
        );
        return rentalsByUser;
    }   
}

export { ListRentalsByUserUseCase };
