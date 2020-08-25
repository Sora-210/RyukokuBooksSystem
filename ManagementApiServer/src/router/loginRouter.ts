/*
################################
Login処理
POST /
################################
*/
//####################################################################
import { Router } from 'express';
const loginRouter = Router();
import {checkAuthRouter, createToken, createUser} from '../function/auth'
//####################################################################
loginRouter.post('/', async (req, res) => {
    const token = await createToken(req.body.name,req.body.password)
    res.status(200).json({token:token});
});

loginRouter.get('/test', async (req, res) => {
    await createUser('sora','pass')
    res.status(200).json();
});

loginRouter.use(checkAuthRouter)

loginRouter.get('/', async (req, res) => {
    res.status(200).json();
});
//####################################################################
export {
    loginRouter
}