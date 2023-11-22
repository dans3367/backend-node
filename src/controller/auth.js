import express,{Router} from 'express';
import { sendApiResponse } from '../helpers/response.js';

const app = express()

const authRouter = Router(); 


authRouter.get('/login', (req,res,next) => {
    sendApiResponse(res,100,"this is login",{});
})




app.use('/auth',authRouter);

export default app;