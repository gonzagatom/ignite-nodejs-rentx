import { Category } from "../model/Category";

// DTO = Data transfer object
interface ICreateCategoryDTO {
  name: string;
  description: string;
} // Interfaces começam sempre com I

class CategoriesRepository {
  private categories: Category[];

  constructor() {
    this.categories = []; // Utilizar this para chamar o atributo que está dentro da classe
  }

  create({ description, name }: ICreateCategoryDTO): void {
    const category: Category = new Category();

    Object.assign(category, {
      name,
      description,
      created_at: new Date(),
    });

    this.categories.push(category);
  } // Cadastra categoria na tabela
}

export { CategoriesRepository };
