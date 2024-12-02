import cors from 'cors'
import express, { NextFunction, Request, Response } from 'express'
import 'express-async-errors'
import fileUpload from 'express-fileupload'
import { router } from './routes/routes'

const app = express();
app.use(express.json());
app.use(cors())
app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 } // max 50 mb
}))
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
app.listen(process.env.PORT, () => {
    console.log(`Servidor rodando na porta ${process.env.PORT}`)
})




