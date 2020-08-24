/*
################################
Collection処理
GET /
GET /:uuid
POST /
PATCH /:uuid/rental
PATCH /:uuid/return
DELETE /:uuid
################################
*/
//####################################################################
import { Router } from 'express';
const collectionRouter = Router();
import { DB } from '../database/index';
import { createQrcode } from '../function/qrcode';
import { getToday,getYear } from '../function/date';
import { collectionQuery } from '../function/query';
import { NotFoundError, RentalStatusError, RequestError } from '../error';

import { v4 as uuid } from 'uuid';
import { getBook } from '../function/getBook';
//####################################################################
interface collectionObject {
    uuid?: string
    isbn?: number
    ndc?: string
    note?: string
    rentalStatus?: boolean
    registrationDate?: Date
};
const createCollectionObject = (object): collectionObject => {
    const collectionObject: collectionObject = {};
    collectionObject.registrationDate = getToday();
    collectionObject.uuid = uuid();
    collectionObject.rentalStatus = true;

    if (object.isbn === undefined || object.isbn === "") {
        throw new RequestError('DefectiveRequestBody')
    }
    collectionObject.isbn = object.isbn;
    if (object.ndc === undefined || object.ndc === "") {
        throw new RequestError('DefectiveRequestBody')
    }
    collectionObject.ndc = object.ndc;
    collectionObject.note = object.note
    return collectionObject;
}
const updateCollectionObject = (object): collectionObject => {
    const collectionObject: collectionObject = {};
    if (object.ndc === undefined || object.ndc === "") {
        throw new RequestError('DefectiveRequestBody')
    }
    collectionObject.ndc = object.ndc;
    collectionObject.note = object.note
    return collectionObject;
};

interface rentalObject {
    year?: string
    grade?: string
    class?: number
    number?: number
    name?: string
    uuid?: string
    startDay?: Date
}
const createRentalObject = (uuid:string,object): rentalObject => {
    const rentalObject: rentalObject = {};
    rentalObject.year = getYear();
    rentalObject.startDay = getToday();
    rentalObject.uuid = uuid;
    if (object.grade === undefined || object.grade === "") {
        throw new RequestError('DefectiveRequestBody');
    }
    rentalObject.grade = object.grade;
    if (object.class === undefined || object.class === "") {
        throw new RequestError('DefectiveRequestBody');
    }
    rentalObject.class = object.class;
    if (object.number === undefined || object.number === "") {
        throw new RequestError('DefectiveRequestBody');
    }
    rentalObject.number = object.number;
    if (object.name === undefined || object.name === "") {
        throw new RequestError('DefectiveRequestBody');
    }
    rentalObject.name = object.name;
    return rentalObject
};
//####################################################################
collectionRouter.get('/', async (req, res) => {
    const getT = await DB.Sequelize.transaction();
    try {
        const query = new collectionQuery(req.query);
        //NarrowDownConfiguration
        const countOption:object = {
            where: query.getWhereOption(),
            transaction: getT
        };
        const dataCount = await DB.Collections.count(countOption);
        if (dataCount === 0) {
            throw new NotFoundError('DataNotFound');
        }
        //SortConfiguration
        const getOption = query.getOption(getT);
        const getResponse = await DB.Collections.findAll(getOption);
        //TransactionCommit & ResponseJsonSetting
        await getT.commit();
        const sendJson = {
            count: dataCount,
            data: getResponse
        }
        res.status(200).json(sendJson);
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

collectionRouter.get('/:uuid', async (req, res) => {
    const getT = await DB.Sequelize.transaction();
    try {
        const options = {
            where: {
                uuid: req.params.uuid
            },
            transaction: getT
        };
        const getResponse = await DB.Collections.findOne(options);
        if (getResponse === null) {
            throw new NotFoundError('DataNotFound');
        };
        const getBookResponse = await getBook(getResponse.isbn);
        const collection = Object.assign(getResponse.get(), getBookResponse);
        await getT.commit();
        const sendObject = {
            count: 1,
            data: [
                collection 
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
        };

    }
});

collectionRouter.patch('/:uuid/rental', async (req, res) => {
    const rentalT = await DB.Sequelize.transaction();
    try {
        const getOptions = {
            where: {
                uuid: req.params.uuid
            },
            transaction: rentalT
        };
        const getResponse = await DB.Collections.findOne(getOptions);
        if (getResponse === null) {
            throw new NotFoundError('DataNotFound');
        };
        if (!getResponse.rentalStatus) {
            throw new RentalStatusError('AlreadyRented')
        };

        const createData = createRentalObject(req.params.uuid, req.body)
        const createOptions = {
            transaction: rentalT
        };
        const createResponse = await DB.Rentals.create(createData,createOptions);
        const updateData = {
            rentalStatus: false,
            rentalId: createResponse.id
        };
        const updateOptions = {
            where: {
                uuid: req.params.uuid
            },
            transaction: rentalT
        };
        await DB.Collections.update(updateData, updateOptions);
        await rentalT.commit();
        res.status(201).json();
    } catch (e) {
        await rentalT.rollback();
        if (e instanceof NotFoundError) {
            res.status(404).json(e.toString());
        } else if (e instanceof RentalStatusError) {
            res.status(409).json(e.toString());
        } else if (e instanceof RequestError) {
            res.status(400).json(e.toString());
        } else {
            const ErrorMessage = {
                message: "UnknownError"
            };
            res.status(500).json(ErrorMessage);
        }
    }
})

collectionRouter.patch('/:uuid/return', async (req, res) => {
    const returnT = await DB.Sequelize.transaction();
    try {
        const getOptions = {
            where: {
                uuid: req.params.uuid
            },
            transaction: returnT
        };
        const getResponse = await DB.Collections.findOne(getOptions);
        if (getResponse === null) {
            throw new NotFoundError('DataNotFound');
        };
        if (getResponse.rentalStatus) {
            throw new RentalStatusError('NoRent');
        };
        const updateCollectionData = {
            rentalStatus: true,
            rentalId: null
        };
        const updateCollectionOptions = {
            where: {
                uuid: req.params.uuid
            },
            transaction: returnT
        };
        const getCollectionResponse = await DB.Collections.findOne(updateCollectionOptions);
        await DB.Collections.update(updateCollectionData, updateCollectionOptions);
        const updateRentalData = {
            returnDay: getToday()
        };
        const updateRentalOptions = {
            where: {
                id: getCollectionResponse.rentalId
            },
            transactions: returnT
        };
        await DB.Rentals.update(updateRentalData, updateRentalOptions);
        await returnT.commit();
        res.status(201).json();
    } catch (e) {
        console.log(e)
        await returnT.rollback();
        if (e instanceof NotFoundError) {
            res.status(404).json(e.toString());
        } else if (e instanceof RentalStatusError) {
            res.status(409).json(e.toString());
        } else {
            const ErrorMessage = {
                message: "UnknownError"
            };
            res.status(500).json(ErrorMessage);
        }
    }
});
//NeedAuthFromHere
//loadAuthFunctoin

collectionRouter.post('/', async (req, res) => {
    const createT = await DB.Sequelize.transaction();
    try {
        const createObject = createCollectionObject(req.body)
        const createResponse = await DB.Collections.create(createObject, { transaction: createT });
        createQrcode(createResponse.uuid)
        await createT.commit();
        res.status(201).json(createResponse);
    } catch (e) {
        await createT.rollback();
        if (e instanceof RequestError) {
            res.status(400).json(e.toString());
        } else {
            const ErrorMessage = {
                message: "UnknownError"
            };
            res.status(500).json(ErrorMessage);
        }
    }
});
collectionRouter.patch('/:uuid', async (req, res) => {
    const updateT = await DB.Sequelize.transaction()
    try {
        const createObject = updateCollectionObject(req.body)
        const options = {
            where: {
                uuid: req.params.uuid
            },
            transaction: updateT
        };
        const getResponse = await DB.Collections.findOne(options);
        if (getResponse === null) {
            throw new NotFoundError('DataNotFound');
        };
        await DB.Collections.update(createObject, options);
        res.status(201).json();
        updateT.commit();
    } catch (e) {
        await updateT.rollback();
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
collectionRouter.delete('/:uuid', async (req, res) => {
    const deleteT = await DB.Sequelize.transaction();
    try {
        const options = {
            where: {
                uuid: req.params.uuid
            },
            transaction: deleteT
        };
        const deleteResponse = await DB.Collections.destroy(options);
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
export { collectionRouter };