import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  email: string;
  password: string;
} // Recebimento das informações

// Retornando
interface IResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {} // Trazendo repositório

  async execute({ email, password }: IRequest): Promise<IResponse> {
    // Variável que tentará encontrar o e-mail
    const user = await this.usersRepository.findByEmail(email);

    // Mensagem se o usuário não existir
    if (!user) {
      throw new AppError("Email or password incorrect!");
    }

    // Variável de comparação da senha digitada e da senha salva
    const passwordMatch = await compare(password, user.password);

    // Mensagem se a senha estiver incorreta
    if (!passwordMatch) {
      // Colocar e-mail e senha incorretos para dificultar bypass.
      throw new AppError("Email or password incorrect!");
    }

    // Utilizar sha1 hash generator para gerar chave aleatória
    // Nunca colocar senha na const token
    // Requisição e retorno do token
    // Gerar jsonwebtoken
    const token = sign({}, "ad93e99e01bac057dc966f9f084420584e7cfb9a", {
      subject: user.id, // Sempre passar ID do usuário
      expiresIn: "1d", // Expirar token em um dia
    });

    const tokenReturn: IResponse = {
      token,
      user: {
        name: user.name,
        email: user.email,
      },
    };

    // Retornando para quem requisitou o token
    return tokenReturn;
  }
}

export { AuthenticateUserUseCase };
