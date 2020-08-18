/*
################################
Request処理
POST /
[AUTH] GET /
[AUTH] GET /:id
[AUTH] DELETE /;id
################################
*/
//####################################################################
//Import
import { Router } from 'express';
import validator from 'validator';
const requestRouter: Router = Router();
import { DB } from '../database/index';
import { RequestError, NotFoundError } from '../error/index';
//####################################################################
const isCheckRequest = (object):boolean => {
    if (!validator.isInt(object.genre) || object.genre === undefined || object.genre === "") {
        return false
    }
    if (!validator.isLength(object.content, { min: 1 }) || object.content === undefined || object.content === "") {
        return false
    }
    return true
}
//####################################################################
requestRouter.post('/', async (req, res) => {
    const createT = await DB.Sequelize.transaction();
    try {
        if (!isCheckRequest(req.body)) {
            throw new RequestError('DefectiveRequestBody',)
        }
        const sendObject = {
            genre: req.body.genre,
            content: req.body.content
        }
        const createResponse = await DB.Request.create(sendObject, { transaction: createT });
        await createT.commit();
        res.status(201).json(createResponse);
    } catch (e) {
        await createT.rollback();
        if (e instanceof RequestError) {
            res.status(400).json(e.toString());
        } else {
            console.error(e);
            const ErrorMessage = {
                message: "UnknownError"
            };
            res.status(500).json(ErrorMessage);
        };
    }
})
//以下認証が必要
//loadAuthFunction

requestRouter.get('/', async (req, res) => {
    const getT = await DB.Sequelize.transaction();
    try {
        const options = {
            transaction: getT
        };
        const getResponse = await DB.Request.findAll(options);
        if (getResponse.length === 0) {
            throw new NotFoundError('DataNotFound');
        };
        await getT.commit();
        const sendObject = {
            count: getResponse.length,
            data: getResponse
        };
        res.status(200).json(sendObject);
    } catch (e) {
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
})

requestRouter.get('/:requestId', async (req, res) => {
    const getT = await DB.Sequelize.transaction();
    try {
        const options = {
            where: {
                id: req.params.requestId
            },
            transaction: getT
        }
        const getResponse = await DB.Request.findOne(options);
        if (getResponse === null) {
            throw new NotFoundError('DataNotFound');
        };
        await getT.commit();
        const sendObject = {
            count: 1,
            data: [
                getResponse
            ]
        };
        res.status(200).json(sendObject);
    } catch (e) {
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
})

requestRouter.delete('/:requestId', async (req, res) => {
    const deleteT = await DB.Sequelize.transaction();
    try {
        const options = {
            where: {
                id: req.params.requestId
            },
            transaction: deleteT
        };
        const deleteResponse = await DB.Request.destroy(options);
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
})
//####################################################################
export { requestRouter };