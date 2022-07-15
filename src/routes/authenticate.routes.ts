import { Router } from "express";

const authenticateRoutes = Router();

// Criando rota de tipo postgres
authenticateRoutes.post("/sessions");

export { authenticateRoutes };
