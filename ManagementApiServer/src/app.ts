//Import
import express from 'express';
import { json as BodyParserJson } from 'body-parser';
import cors from 'cors';
//#################################
//ImportRouter
import { requestRouter } from './router/requestRouter'
import { rentalRouter } from './router/rentalRouter';
import { collectionRouter } from './router/collectionRouter';
import { loginRouter } from './router/login';
//#################################
//MagicNumber
const PORT:Number = 80
//################################
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
app.use('/login', loginRouter);
//#################################
app.listen(PORT, () => {
    console.log('Lisnig Started!!')
})

