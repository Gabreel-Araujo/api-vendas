import 'reflect-metadata';
import express, { Request, Response, NextFunction} from 'express';
import cors from 'cors';
import { errors } from 'celebrate';
import 'express-async-errors'
import routes from './routes/index';
import AppError from '@shared/errors/AppError';
import '@shared/typeorm';

const app = express();



app.use(cors());
app.use(express.json());

app.use(routes);

app.use(errors());

app.use((error:Error, req: Request, res: Response, next: NextFunction)=>{
    if(error instanceof AppError){
        return res.status(error.statusCode).json({
            status: 'error',
            message: error.message,
        })
    }
    return res.status(500).json({
        status: 'error',
        message:'internal server error',
    })
})


app.listen(3333,()=>{
    console.log('Server started on port 3333! ');
})
