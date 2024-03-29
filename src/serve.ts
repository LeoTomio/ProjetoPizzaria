import cors from 'cors'
import express, { NextFunction, Request, Response } from 'express'
import 'express-async-errors'
import path from 'path'

import { router } from './routes/routes'

const app = express();
app.use(express.json());
app.use(cors())

app.use(
    '/files',
    express.static(path.resolve(__dirname, '..', 'tmp'))
)
app.use(router);


app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    if (error instanceof Error) {
        //Se for uma instancia do tipo error
        return res.status(400).json({
            error: error.message
        })
    }

    return res.status(500).json({
        status: 'error',
        message: 'Internal server error.'
    })

})


app.listen(3001, () => {
    console.log('Servidor rodando na porta 3001')
})