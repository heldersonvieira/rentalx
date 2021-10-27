import { Spectification } from "../entities/Specification";

interface ICreateSpecificationDTO {
    name: String;
    description: String;
}

interface ISpecificationsRepository {
    create({ name, description }: ICreateSpecificationDTO): Promise<void>;
    findByName(name: String): Promise<Spectification>;
}

export { ICreateSpecificationDTO, ISpecificationsRepository };
