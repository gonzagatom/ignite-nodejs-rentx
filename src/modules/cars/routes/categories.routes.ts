import { Router } from "express";

import { CategoriesRepository } from "../repositories/CategoriesRepository";
import { createCategoryController } from "../useCases/createCategory";

const categoriesRoutes = Router();
const categoriesRepository = new CategoriesRepository();

categoriesRoutes.post("/", (request, response) => {
  return createCategoryController.handle(request, response);
});

categoriesRoutes.get("/", (request, response) => {
  const all = categoriesRepository.list();

  return response.json(all);
});

export { categoriesRoutes };
