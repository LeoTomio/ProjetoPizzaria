import { Router, Request, Response } from 'express';
import { decode, loginJwt } from './loginJwt';
import prismaClient from '../prisma';
let verifyLogin;

export const verifyTokenLogin = (router: Router) => {

    router.use((request: Request, response: Response, next) => {
        const token = request.headers.authorization?.split(' ')[1];
        verifyLogin = loginJwt(token);

        if (verifyLogin.login === false || verifyLogin.incorrectLogin === true) {

            return response
                .status(verifyLogin.statusCode || 500)
                .send({ statusCode: verifyLogin.statusCode, msg: verifyLogin.msg });
        }
        let dataLogin = decode(token);

        request.body.local = dataLogin;

        next();
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