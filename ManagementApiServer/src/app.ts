//Import
import express from 'express';
import { json as BodyParserJson } from 'body-parser';
import cors from 'cors';
//#################################
//ImportRouter
import { requestRouter } from './router/requestRouter'
import { rentalRouter } from './router/rentalRouter';
import { collectionRouter } from './router/collectionRouter';
import { loginRouter } from './router/loginRouter';
import { newsRouter } from './router/newsRouter';
import { DB } from './database';
import { createUser } from './function/auth'
//#################################
//MagicNumber
const PORT:Number = 80
//################################
DB.Users.count()
    .then((res) => {
        if (res === 0) {
            //Userが0の場合初期アカウントの追加
            createUser('root', process.env.API_ROOT_PASSWORD)
        }
    })
//#################################
const app = express()
app.use(BodyParserJson())
app.use(cors())
//#################################
app.get('/version',(req, res) => {
    const sendJson = {
        name: "ManagementApiServer",
        version: 2
    };
    res.status(200).json(sendJson);
})
//#################################
app.use('/collections', collectionRouter);
app.use('/rentals', rentalRouter);
app.use('/requests', requestRouter);
app.use('/news', newsRouter);
app.use('/login', loginRouter);
//#################################
app.listen(PORT, () => {
    console.log('Lisnig Started!!')
})

