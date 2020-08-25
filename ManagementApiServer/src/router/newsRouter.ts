/*
################################
News処理
GET /
[AUTH] POST /:id
[DELETE] DELETE /:id
################################
*/
//####################################################################
import { Router } from 'express';
const newsRouter: Router = Router();
import { DB } from '../database/index';
import { RequestError, NotFoundError } from '../error/index';
import { newsQuery } from '../function/query';
//####################################################################
newsRouter.get('/', async (req, res) => {
    const getT = await DB.Sequelize.transaction();
    try {
        const query = new newsQuery(req.query);
        const dataCount = await DB.News.count({transaction:getT});
        if (dataCount === 0) {
            throw new NotFoundError('DataNotFound');
        };
        //SortConfiguration
        const getOption = query.getOption(getT);
        const getResponse = await DB.News.findAll(getOption);
        //TransactionCommit & ResponseJsonSetting
        await getT.commit();
        const sendData = {
            count: dataCount,
            data: getResponse
        };
        res.status(200).json(sendData);
    } catch(e) {
        await getT.rollback();
        if (e instanceof NotFoundError) {
            res.status(404).json(e.toString());
        } else {
            const ErrorMessage = {
                message: "UnknownError"
            };
            res.status(500).json(ErrorMessage);
        }
    }
});
//以下認証が必要
//loadAuthFunction

newsRouter.post('/', async (req, res) => {
    const createT = await DB.Sequelize.transaction();
    try {
        if (req.body.content === null || req.body.content === undefined) {
            throw new RequestError('DefectiveRequestBody');
        }
        const sendObject = {
            content: req.body.content
        }
        const createResponse = await DB.News.create(sendObject, { transaction:createT});
        await createT.commit();
        res.status(201).json(createResponse);
    } catch(e) {
        await createT.rollback();
        if (e instanceof RequestError) {
            res.status(400).json(e.toString());
        } else {
            const ErrorMessage = {
                message: "UnknownError"
            };
            res.status(500).json(ErrorMessage);
        };
    }
});
newsRouter.delete('/:newsid', async (req, res) => {
    const deleteT = await DB.Sequelize.transaction();
    try {
        const options = {
            where: {
                id: req.params.newsid
            },
            transaction: deleteT
        };
        const deleteResponse = await DB.News.destroy(options);
        if (deleteResponse === 0) {
            throw new NotFoundError('DataNotFound');
        };
        await deleteT.commit();
        res.status(204).json();
    } catch (e) {
        await deleteT.rollback();
        if (e instanceof NotFoundError) {
            res.status(404).json(e.toString());
        } else {
            const ErrorMessage = {
                message: "UnknownError"
            };
            res.status(500).json(ErrorMessage);
        }
    }
});
//####################################################################
export { newsRouter };