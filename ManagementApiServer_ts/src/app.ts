//Import
import * as express from 'express';
import { json as BodyParserJson }  from 'body-parser';
//#################################
//ImportRouter
//#################################
//MagicNumber
const PORT:Number = 80
//################################
const app = express()
app.use(BodyParserJson())
//#################################
app.listen(PORT, () => {
    console.log('Lisnig Started!!')
})

