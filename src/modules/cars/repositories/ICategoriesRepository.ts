import { Category } from "../entities/Category";

// DTO = Data transfer object
interface ICreateCategoryDTO {
  name: string;
  description: string;
} // Interfaces começam sempre com I

interface ICategoriesRepository {
  findByName(name: string): Promise<Category>;
  list(): Promise<Category[]>;
  create({ name, description }: ICreateCategoryDTO): Promise<void>;
}

export { ICategoriesRepository, ICreateCategoryDTO };
