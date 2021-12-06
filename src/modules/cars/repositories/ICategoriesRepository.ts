import { Category } from '../infra/typeorm/entities/Category';

//DTO => Data Transfer Object
interface ICreateCategoryDTO {
    name: String;
    description: String;
}

interface ICategoriesRepository {
    findByName(name: String): Promise<Category>;
    list(): Promise<Category[]>;
    create({ name, description }: ICreateCategoryDTO): Promise<void>;
}

export { ICreateCategoryDTO, ICategoriesRepository };
