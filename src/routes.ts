import { Router, Response, Request } from 'express'

const router = Router();

router.get('/teste', (request: Request, response: Response) => {
    return response.json({ name: 'Leonardo Tomio' })
})

export { router }