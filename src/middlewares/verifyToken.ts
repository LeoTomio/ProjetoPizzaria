import { Router, Request, Response, NextFunction } from 'express';
import { decode, loginJwt } from './loginJwt';
import prismaClient from '../prisma';
import { PayLoad } from '../resources/user/interface';
import { verify } from 'jsonwebtoken';
let verifyLogin;

export const verifyTokenLogin = (router: Router) => {
    router.use((request: Request, response: Response, next) => {
        const token = request.headers.authorization?.split(' ')[1];
        try {
            const { sub } = verify(token, process.env.JWT_SECRET) as PayLoad;
            request.user_id = sub

            return next();
        } catch {
            return response.status(401).end();
        }
    });
};



export const tokenValidator = async (request: Request) => {
    const token = request.headers.authorization?.split(' ')[1];
    verifyLogin = await loginJwt(token);

    if (verifyLogin.statusCode === 401) {
        return false;
    }
    return !!await prismaClient.user.findUnique({
        where: { id: verifyLogin.sub }
    })

};


