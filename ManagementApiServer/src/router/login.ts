/*
################################
Login処理
POST /
################################
*/
//####################################################################
import { Router } from 'express';
const loginRouter = Router();
// import { Collections, DB } from '../database/index';
//####################################################################
loginRouter.post('/', (req, res) => {
    res.status(200).json({token:"token"})
})
//####################################################################
export {
    loginRouter
}