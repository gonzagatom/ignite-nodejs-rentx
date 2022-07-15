/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { AppError } from "../errors/AppError";
import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRepository";

interface IPayload {
  sub: string;
}

// Next = Seguir fluxo normalmente ou ser barrado
export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("Token missing", 401); // Erro de autorização = 401
  }

  // Quebrando token
  const [, token] = authHeader.split("  ");

  // Sucesso = try
  // Erro = catch
  // Verificando token
  try {
    const { sub: user_id } = verify(
      token,
      "ad93e99e01bac057dc966f9f084420584e7cfb9a"
    ) as IPayload;

    const usersRepository = new UsersRepository();

    const user = await usersRepository.findById(user_id);

    if (!user) {
      throw new AppError("User does not exists!", 401); // Erro de autorização = 401
    }
  } catch {
    throw new AppError("Invalid token!", 401); // Erro de autorização = 401
  }
}
