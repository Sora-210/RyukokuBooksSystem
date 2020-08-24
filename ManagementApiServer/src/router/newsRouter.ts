/*
################################
News処理
GET /
[AUTH] POST /:id
################################
*/
import { Router } from 'express';
import validator from 'validator';
const newsRouter: Router = Router();
import { DB } from '../database/index';
import { RequestError, NotFoundError } from '../error/index';