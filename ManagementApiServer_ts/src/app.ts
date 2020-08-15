//Import
import * as express from 'express';
import { json as BodyParserJson }  from 'body-parser';
//#################################
//ImportRouter
import { requestRouter } from './router/requestRouter'
//#################################
//MagicNumber
const PORT:Number = 80
//################################
const app = express()
app.use(BodyParserJson())
//#################################
app.use('/requests', requestRouter);
//#################################
app.listen(PORT, () => {
    console.log('Lisnig Started!!')
})

