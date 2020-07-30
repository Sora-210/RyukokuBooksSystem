const express = require('express')
const uuid = require('uuid')
require('date-utils')

const collectionsRouter = express.Router()
const DB = require('../models/index')
const sequelize = require('sequelize')
const  DBOP = sequelize.Op

const { CreateQrcode } = require('./func/CreateQrcode.js')
const { GetBook } = require('./func/GetBooks.js')
const { CheckAuth } = require('./func/Auth.js')
/*
################################
Collection処理
GET /
GET /:uuid
GET /isbn/:idbn
POST /
PATCH /:uuid/rental
PATCH /:uuid/return
DELETE /:uuid
################################
*/

function CustomError(name,message) {
    this.name = name
    this.message = message
}

const GetToday = () => {
    let DateNow = new Date();
    return DateNow.toFormat('YYYY-MM-DD')
}

const CheckCollection = (object) => {
    let ReturnObject = {}

    let DateNow = new Date();
    ReturnObject.registrationData = DateNow.toFormat('YYYY-MM-DD')
    ReturnObject.uuid = uuid.v4()
    ReturnObject.rentalStatus = true

    if (object.isbn === undefined || object.isbn === "") {
        return false
    }
    ReturnObject.isbn = object.isbn
    
    if (object.ndc === undefined || object.ndc === "") {
        return false
    }
    ReturnObject.ndc = object.ndc

    if (object.note !== undefined || object.note !== "") {
        ReturnObject.note = object.note
    }

    return ReturnObject
}

const CheckRental = (object,collectionUuid) => {
    let ReturnObject = {}

    let DateNow = new Date();
    ReturnObject.year = DateNow.toFormat('YYYY')
    ReturnObject.start_day = DateNow.toFormat('YYYY-MM-DD')

    ReturnObject.uuid = collectionUuid

    if (object.grade === undefined || object.grade === "") {
        return false
    }
    ReturnObject.grade = object.grade

    if (object.class === undefined || object.class === "") {
        return false
    }
    ReturnObject.class = object.class

    if (object.number === undefined || object.number === "") {
        console.log(5)
        return false
    }
    ReturnObject.number = object.number
    // if (object.name !== undefined || object.name !== "") {
    //     return false
    // }
    ReturnObject.name = object.name
    console.debug(ReturnObject)
    return ReturnObject
}



// [GET] /collections/
collectionsRouter.get('/', async(req, res) => {
    try {
        const options = {where:{}}
        // uuid関連処理
        if (req.query.uuid !== undefined && req.query.uuid !== "") {
            options.where.uuid = req.query.uuid
        }
        // ndc関連検索
        if (req.query.ndc !== undefined && req.query.ndc !== "") {
            options.where.ndc = req.query.ndc
        }
        // 備考関連処理
        if (req.query.note !== undefined && req.query.note !== "") {
            options.where.note = {[DBOP.like]:"%" + req.query.note + "%"}
        }
        const Count = await DB.Collection.count(options)
        // ソート関連処理
        if (req.query.sortRow !== undefined && req.query.sortRow !== "") {
            if (req.query.sortDirection !== undefined && req.query.sortDirection != 1) {
                options.order = [[req.query.sortRow, "DESC"]]
            } else {
                options.order = [[req.query.sortRow, "ASC"]]
            }
        }
        // ページ関連処理
        if (req.query.page !== undefined && req.query.page !== "") {
            options.limit = 20
            options.offset = (req.query.page - 1) * 20
        }
        // 本データの取得
        const DBres = await DB.Collection.findAll(options)
            .then((DBres) => {
                return DBres
            })
            .catch((err) => {
                throw new CustomError('Unknown', err)
            })
        if (DBres.length !== 0) {
            return res.status(200).json({count:Count,Collections:DBres})
        } else {
            throw new CustomError('Nothing', DBres)
        }
    } catch(e) {
        console.debug("Error:" + e.name)
        console.debug(e)
        switch(e.name){
            case 'Nothing':
                return res.status(404).json()
            case 'Unknown':
                return res.status(500).json(e.message)
        }
    }
})

// [GET] /collections/:uuid
collectionsRouter.get('/:uuid', async(req, res) => {
    console.debug(2)
    try {
        const DBres = await DB.Collection.findAll({
            where:{
                uuid: req.params.uuid
            }
        })
            .then((DBres) => {
                console.debug(21)
                return DBres
            })
            .catch((err) => {
                console.debug(22)
                throw new CustomError('Unknown', err)
            })
        if (DBres.length === 0) {
            throw new CustomError('Nothing', DBres)
        }

        const BookData = await GetBook(DBres[0].isbn)
        console.log(BookData)
        return res.status(200).json({"CollectionData":DBres[0],"BookData":BookData})
    } catch(e) {
        console.debug("Error:" + e.name)
        console.debug(e)
        switch(e.name){
            case 'Nothing':
                return res.status(404).json()
            case 'Unknown':
                return res.status(500).json(e.message)
        }
    }
})

// [GET] /collections/isbn/:isbn
collectionsRouter.get('/isbn/:isbn', async(req, res) => {
    console.debug(3)
    try {
        const DBres = await DB.Collection.findAll({
            where:{
                isbn: req.params.isbn
            }
        })
            .then((DBres) => {
                return DBres
            })
            .catch((err) => {
                throw new CustomError('Unknown', err)
            })
        if (DBres.length !== 0) {
            return res.status(200).json(DBres)
        } else {
            throw new CustomError('Nothing', DBres)
        }
    } catch(e) {
        console.debug("Error:" + e.name)
        console.debug(e)
        switch(e.name){
            case 'Nothing':
                return res.status(404).json()
            case 'Unknown':
                return res.status(500).json(e.message)
        }
    }
})

// [PATCH] /:uuid/rental
collectionsRouter.patch('/:uuid/rental', async(req, res) => {
    const rentalSend = CheckRental(req.body, req.params.uuid)
    if (!rentalSend) {
        return res.status(400).json()
    }
    let rentalStatus = false
    try {
        const DBres = await DB.Collection.findAll({where:{uuid:req.params.uuid}})
            .then((DBres) => {
                return DBres
            })
        if (DBres.length !== 0) {
            rentalStatus = DBres[0].rentalStatus
        } else {
            throw new CustomError('Nothing', DBres)
        }
    } catch(e) {
        console.debug("Error:1")
        console.log(e)
        return res.status(500).json()
    }
    console.log(rentalStatus)
    if (rentalStatus) {
        const T = await DB.sequelize.transaction()
        try {
            const rentalObject = await DB.Rental.create(rentalSend,{transaction:T})
            console.log(rentalObject)
            const updateObject = {
                rentalStatus:false,
                rentalId:rentalObject.id
            }
            const collection = await DB.Collection.update(updateObject,{where:{uuid:req.params.uuid},transaction:T})
            await T.commit()
            return res.status(201).json({rentalObject:rentalObject,collection:collection})
        } catch(e) {
            console.debug("Error:2")
            console.debug(e)
            await T.rollback()
            return res.status(500).json()
        }
    } else {
        return res.status(507).json()
    }
})

// [PATCH] /:uuid/return
collectionsRouter.patch('/:uuid/return', async(req, res) => {
    let rentalStatus = false
    let rentalId = 0
    try {
        const DBres = await DB.Collection.findAll({where:{uuid:req.params.uuid}})
            .then((DBres) => {
                return DBres
            })
        if (DBres !== 0) {
            rentalStatus = DBres[0].rentalStatus
            rentalId = DBres[0].rentalId
        } else {
            throw new CustomError('Nothing', DBres)
        }
    } catch(e) {
        console.debug("Error:1")
        console.debug(e)
        return res.status(500).json()
    }
    console.log(rentalStatus)
    console.log(rentalId)
    if (!rentalStatus) {
        const T = await DB.sequelize.transaction()
        try {
            const collectionObject = await DB.Collection.update({rentalStatus:true,rentalId:null},{where:{uuid:req.params.uuid},transaction:T})
            const rentalObject = await DB.Rental.update({return_day:GetToday()},{where:{id:rentalId},transaction:T})
            await T.commit()
            return res.status(201).json({collection:collectionObject,rental:rentalObject})
        } catch(e) {
            console.debug("Error:2")
            console.debug(e)
            await T.rollback()
            return res.status(500).json()
        }
    } else {
        return res.status(507).json()
    }
})

// [GET] /collections/new
// collectionsRouter.get('/new', async(req, res) => {
//     try {
//         const options = {where:{uuid: req.params.uuid}}
//         const DBres = await DB.Collection.findAll(options)
//         if (DBres.length === 0) {
//             throw new CustomError('Nothing', DBres)
//         }

//         console.log(BookData)
//         return res.status(200).json({"NewCollections":BookData})
//     } catch(e) {
//         console.debug("Error:" + e.name)
//         switch(e.name){
//             case 'Nothing':
//                 return res.status(404).json()
//             case 'Unknown':
//                 return res.status(500).json(e.message)
//         }
//     }
// })


//####################################
//以下認証が必要
collectionsRouter.use(CheckAuth)

// (AUTH) [POST] /collections
collectionsRouter.post('/', async(req, res) => {
    const sendObject = CheckCollection(req.body)
    console.log(sendObject)
    //必要データの存在チェック
    if (sendObject) {
        const T = await DB.sequelize.transaction()
        try {
            const collection = await DB.Collection.create(sendObject,{transaction:T})
            await T.commit();
            CreateQrcode(collection.uuid)
            return res.status(201).json({collection:collection})
        } catch(e) {
            console.debug("Error:")
            console.debug(e)
            await T.rollback();
            return res.status(500).json(e)
        }
    } else {
        return res.status(400).json()
    }
})

// (AUTH) [DELETE] /:uuid
collectionsRouter.delete('/:uuid', async(req, res) => {
    const T = await DB.sequelize.transaction()
    try {
        const DBres = await DB.Collection.destroy({where:{uuid:req.params.uuid},transaction:T})
        if (DBres === 0) {
            throw new CustomError('Nothing')
        }
        await T.commit()
        return res.status(204).json()
    } catch(e) {
        await T.rollback()
        switch(e.name) {
            case 'Nothing':
                return res.status(404).json()
            default:
                return res.status(500).json()
        }
    }
})

module.exports = {
    collectionsRouter
}