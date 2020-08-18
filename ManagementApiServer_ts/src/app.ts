//Import
import express from 'express';
import { json as BodyParserJson }  from 'body-parser';
//#################################
//ImportRouter
import { requestRouter } from './router/requestRouter'
import { rentalRouter } from './router/rentalRouter';
//#################################
//MagicNumber
const PORT:Number = 80
//################################
const app = express()
app.use(BodyParserJson())
//#################################
app.use('/rentals', rentalRouter);
app.use('/requests', requestRouter);
//#################################
app.listen(PORT, () => {
    console.log('Lisnig Started!!')
})

