import { inject, injectable } from 'tsyringe';
import { AppErros } from '../../../../errors/AppErros';
import { ISpecificationsRepository } from '../../repositories/ISpecificationsRepository';

interface IRequest {
    name: String;
    description: String;
}

@injectable()
class CreateSpecificationUseCase {
    constructor(
        @inject('SpecificationsRepository')
        private specificationsRepository: ISpecificationsRepository
    ) {}

    async execute({ name, description }: IRequest): Promise<void> {
        const specificationAlreadyExists =
            await this.specificationsRepository.findByName(name);

        if (specificationAlreadyExists) {
            throw new AppErros('Specification already exists');
        }

        await this.specificationsRepository.create({ name, description });
    }
}

export { CreateSpecificationUseCase };