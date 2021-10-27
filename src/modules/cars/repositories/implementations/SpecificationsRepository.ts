import { getRepository, Repository } from 'typeorm';
import { Spectification } from '../../entities/Specification';
import {
    ISpecificationsRepository,
    ICreateSpecificationDTO,
} from '../ISpecificationsRepository';

class SpecificationsRepository implements ISpecificationsRepository {
    private repository: Repository<Spectification>;

    constructor() {
        this.repository = getRepository(Spectification);
    }

    async create({
        name,
        description,
    }: ICreateSpecificationDTO): Promise<void> {
        const specification = this.repository.create({
            name,
            description,
        });

        await this.repository.save(specification);
    }

    async findByName(name: String): Promise<Spectification> {
        const specification = await this.repository.findOne({ name });

        return specification;
    }
}

export { SpecificationsRepository };
