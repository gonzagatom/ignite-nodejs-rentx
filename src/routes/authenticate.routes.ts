import { Router } from "express";

import { AuthenticateUserController } from "../modules/accounts/UseCases/authenticateUser/AuthenticateUserController";

const authenticateRoutes = Router();

const authenticateUserController = new AuthenticateUserController();

// Criando rota de tipo postgres
authenticateRoutes.post("/sessions", authenticateUserController.handle);

export { authenticateRoutes };
