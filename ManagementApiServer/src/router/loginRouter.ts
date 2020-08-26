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
import { LoginError } from '../error';
//####################################################################
loginRouter.post('/', async (req, res) => {
    try {
        const token = await createToken(req.body.name,req.body.password);
        const sendJson = {
            message:"success Login",
            token: token
        };
        res.status(200).json(sendJson);
    } catch(e) {
        if (e instanceof LoginError) {
            res.status(403).json(e.toString());
        } else {
            const ErrorMessage = {
                message: "UnknownError"
            };
            res.status(500).json(ErrorMessage);
        }
    };
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