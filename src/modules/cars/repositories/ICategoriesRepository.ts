import { Category } from "../entities/Category";

// DTO = Data transfer object
interface ICreateCategoryDTO {
  name: string;
  description: string;
} // Interfaces começam sempre com I

interface ICategoriesRepository {
  findByName(name: string): Category;
  list(): Category[];
  create({ name, description }: ICreateCategoryDTO): void;
}

export { ICategoriesRepository, ICreateCategoryDTO };
