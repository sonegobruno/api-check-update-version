import { NextFunction, Request, Response } from "express";
import { verify } from 'jsonwebtoken';

import { AppError } from "../errors";
import { UserRepository } from '../modules/users/repositories/implementations/UserRepository';

interface IPayload {
    sub: string;
}

export async function ensureAuthenticated(
    request: Request, 
    response: Response, 
    next: NextFunction
) {
    const authHeader = request.headers.authorization;

    if(!authHeader) {
        throw new AppError('Token não enviado', 401)
    }

    const [, token] = authHeader.split(" ");

    try {
        const { sub: user_id } = verify(token, "46796b236e2931b76f41d9b54794e700") as IPayload;

        const usersRepository = new UserRepository()

        const user = usersRepository.findById(user_id);

        if(!user) {
            throw new AppError('Usuario não existe', 401)
        }

        next();
    } catch(err) {
        throw new AppError('Token invalido', 401);
    }
}