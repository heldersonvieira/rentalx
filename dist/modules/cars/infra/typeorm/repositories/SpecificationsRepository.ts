import { getRepository, Repository } from 'typeorm';
import {
    ICreateSpecificationDTO,
    ISpecificationsRepository,
} from '../../../repositories/ISpecificationsRepository';
import { Specification } from '../entities/Specification';

class SpecificationsRepository implements ISpecificationsRepository {
    private repository: Repository<Specification>;

    constructor() {
        this.repository = getRepository(Specification);
    }

    async create({
        description,
        name,
    }: ICreateSpecificationDTO): Promise<Specification> {
        const specification = await this.repository.create({
            name,
            description,
        });

        await this.repository.save(specification);

        return specification;
    }

    async findByName(name: string): Promise<Specification> {
        const specification = await this.repository.findOne({ name });

        return specification;
    }

    async findByIds(ids: string[]): Promise<Specification[]> {
        return await this.repository.findByIds(ids);
    }
}

export { SpecificationsRepository };

/*
    async create({
        name,
        description,
    }: ICreateSpecificationDTO): Promise<Specification> {
        const specification = this.repository.create({
            name,
            description,
        });

        await this.repository.save(specification);

        return specification;
    }

*/