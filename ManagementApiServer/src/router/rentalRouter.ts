//####################################################################
import { Router } from 'express';
const rentalRouter = Router();
import { DB } from '../database/index';
import { NotFoundError } from '../error';
import { rentalQuery } from '../function/query';
import { checkAuthRouter } from '../function/auth';
//####################################################################
//以下認証が必要
//LoadAuthFunction
rentalRouter.use(checkAuthRouter);
rentalRouter.get('/', async (req, res) => {
    const getT = await DB.Sequelize.transaction();
    try {
        const query = new rentalQuery(req.query);
        //NarrowDownConfiguration
        const countOption: object = {
            where: query.getWhereOption(),
            transaction: getT
        }
        const dataCount = await DB.Rentals.count(countOption);
        if (dataCount === 0) {
            throw new NotFoundError('DataNotFound');
        };
        //SortConfiguration
        const getOption = query.getOption(getT);
        const getResponse = await DB.Rentals.findAll(getOption);
        //TransactionCommit & ResponseJsonSetting
        await getT.commit();
        const sendData = {
            count: dataCount,
            data: getResponse
        };
        res.status(200).json(sendData);
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
});

rentalRouter.get('/:rentalId', async (req, res) => {
    const getT = await DB.Sequelize.transaction();
    try {
        const options = {
            where: {
                id:req.params.rentalId
            },
            transaction: getT
        }
        const getResponse = await DB.Rentals.findOne(options);
        if (getResponse === null) {
            throw new NotFoundError('DataNotFound');
        };
        await getT.commit();
        const sendData = {
            const: 1,
            data: [
                getResponse
            ]
        };
        res.status(200).json(sendData);
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
//####################################################################
export { rentalRouter };