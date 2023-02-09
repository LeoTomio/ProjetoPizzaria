import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { PayLoad } from "../../interface/user/PayLoad";

export function isAuthenticated(request: Request,
    response: Response, next: NextFunction) {

    const authToken = request.headers.authorization
    if (!authToken) {
        return response.status(401).end();
    }
    const [, token] = authToken.split(" ")

    try {
        //Valida o token
        const { sub } = verify(
            token,
            process.env.JWT_SECRET
        ) as PayLoad;

        return next();
    } catch {
        return response.status(401).end();
    }
}